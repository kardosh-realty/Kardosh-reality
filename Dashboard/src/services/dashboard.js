import { fetchLeads } from '@/services/leads'
import { fetchAllTestimonials } from '@/services/testimonials'
import { fetchAllProjects } from '@/services/reelly'
import { UAE_COMMUNITIES, projectCommunitySlugs } from '@/config/communities'
import { LEAD_STATUS_STYLES } from '@/config/leads'
import { leadStatusLabel } from '@/utils/leadFilters'

const SOURCE_LABELS = {
  property_page: 'Project page',
  contact_page: 'Contact page',
  home_form: 'Home form',
  website_form: 'Website form',
  whatsapp: 'WhatsApp',
  referral: 'Referral',
}

function sourceLabel(source) {
  if (!source) return 'Other'
  return SOURCE_LABELS[source] || source.replace(/_/g, ' ')
}

function formatInquiryDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(iso)
  )
}

function uniqueDevelopers(projects) {
  const names = new Set()
  for (const p of projects) {
    if (p.developer) names.add(p.developer)
  }
  return names.size
}

function buildPopularAreas(projects, limit = 6) {
  const counts = new Map()
  for (const p of projects) {
    for (const slug of projectCommunitySlugs(p)) {
      counts.set(slug, (counts.get(slug) || 0) + 1)
    }
  }
  return UAE_COMMUNITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    projects: counts.get(c.slug) || 0,
  }))
    .filter((a) => a.projects > 0)
    .sort((a, b) => b.projects - a.projects)
    .slice(0, limit)
    .map((a) => ({ ...a, rate: `${a.projects}`, status: 'up' }))
}

function buildTopProjects(projects, leads, limit = 6) {
  const inquiryByName = new Map()
  for (const l of leads) {
    const key = (l.project_name || '').trim().toLowerCase()
    if (!key) continue
    inquiryByName.set(key, (inquiryByName.get(key) || 0) + 1)
  }

  const scored = projects.map((p) => {
    const key = (p.title || '').trim().toLowerCase()
    const inquiries = inquiryByName.get(key) || 0
    return {
      id: p.id,
      image: p.image,
      name: p.title,
      loction: p.locationLabel || p.area || 'UAE',
      rate: inquiries ? `${inquiries} inq.` : '—',
      status: inquiries ? 'up' : 'up',
      inquiries,
    }
  })

  return scored
    .sort((a, b) => b.inquiries - a.inquiries || a.name.localeCompare(b.name))
    .slice(0, limit)
}

function buildSourceBreakdown(leads) {
  if (!leads.length) {
    return [{ title: 'No inquiries yet', sale: '0%' }]
  }
  const counts = new Map()
  for (const l of leads) {
    const label = sourceLabel(l.source)
    counts.set(label, (counts.get(label) || 0) + 1)
  }
  const total = leads.length
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([title, n]) => ({
      title,
      sale: `${Math.round((n / total) * 100)}%`,
    }))
}

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** Bucket leads for the inquiries chart by period key. */
export function buildInquiryChart(leads, period = 'Y') {
  const now = new Date()
  let buckets = []
  let categories = []

  if (period === 'T') {
    for (let h = 0; h < 24; h++) {
      buckets.push(0)
      categories.push(`${h}:00`)
    }
    const dayStart = startOfDay(now)
    for (const l of leads) {
      const d = new Date(l.created_at)
      if (d < dayStart) continue
      buckets[d.getHours()] += 1
    }
  } else if (period === 'W') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      buckets.push(0)
      categories.push(
        new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(d)
      )
    }
    const weekStart = startOfDay(now)
    weekStart.setDate(weekStart.getDate() - 6)
    for (const l of leads) {
      const d = startOfDay(new Date(l.created_at))
      if (d < weekStart) continue
      const diff = Math.round((d - weekStart) / 86400000)
      if (diff >= 0 && diff < 7) buckets[diff] += 1
    }
  } else if (period === 'M') {
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      buckets.push(0)
      categories.push(String(d.getDate()))
    }
    const monthStart = startOfDay(now)
    monthStart.setDate(monthStart.getDate() - 29)
    for (const l of leads) {
      const d = startOfDay(new Date(l.created_at))
      if (d < monthStart) continue
      const diff = Math.round((d - monthStart) / 86400000)
      if (diff >= 0 && diff < 30) buckets[diff] += 1
    }
  } else {
    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    buckets = new Array(12).fill(0)
    const year = now.getFullYear()
    for (const l of leads) {
      const d = new Date(l.created_at)
      if (d.getFullYear() !== year) continue
      buckets[d.getMonth()] += 1
    }
  }

  return {
    categories,
    series: [{ name: 'Inquiries', data: buckets }],
  }
}

export async function fetchDashboardData() {
  const [leadsSettled, testimonialsSettled, projectsSettled] = await Promise.allSettled([
    fetchLeads({ limit: 200 }),
    fetchAllTestimonials(),
    fetchAllProjects(),
  ])

  const leads =
    leadsSettled.status === 'fulfilled' && leadsSettled.value.configured !== false
      ? leadsSettled.value.leads || []
      : []
  const testimonials =
    testimonialsSettled.status === 'fulfilled' ? testimonialsSettled.value.items || [] : []
  const projects =
    projectsSettled.status === 'fulfilled' ? projectsSettled.value.results || [] : []
  const projectTotal =
    projectsSettled.status === 'fulfilled'
      ? projectsSettled.value.count || projects.length
      : 0

  const publishedTestimonials = testimonials.filter((t) => t.published !== false).length
  const communitiesWithProjects = buildPopularAreas(projects, 99).length

  const counters = [
    { icon: 'ri-mail-line', title: 'New inquiries', target: leads.length, symbol: '' },
    { icon: 'ri-building-line', title: 'Off-plan projects', target: projectTotal || projects.length, symbol: '' },
    { icon: 'ri-community-line', title: 'Developers', target: uniqueDevelopers(projects), symbol: '' },
    { icon: 'ri-map-pin-line', title: 'Communities', target: communitiesWithProjects, symbol: '' },
    { icon: 'ri-chat-quote-line', title: 'Testimonials', target: publishedTestimonials, symbol: '' },
  ]

  const recentInquiries = leads.slice(0, 8).map((l) => {
    const key = l.status || 'new'
    return {
      id: l.id,
      date: formatInquiryDate(l.created_at),
      name: l.name || '—',
      interest: l.listing_type || 'General',
      project: l.project_name || (l.project_id ? `#${l.project_id}` : 'General'),
      status: leadStatusLabel(key),
      statusKey: key,
      statusClass: LEAD_STATUS_STYLES[key] || LEAD_STATUS_STYLES.new,
    }
  })

  return {
    configured: leadsSettled.status === 'fulfilled' && leadsSettled.value.configured !== false,
    errors: {
      leads: leadsSettled.status === 'rejected' ? leadsSettled.reason?.message : '',
      projects: projectsSettled.status === 'rejected' ? projectsSettled.reason?.message : '',
    },
    counters,
    recentInquiries,
    popularAreas: buildPopularAreas(projects),
    topProperties: buildTopProjects(projects, leads),
    salesData: buildSourceBreakdown(leads),
    leads,
  }
}
