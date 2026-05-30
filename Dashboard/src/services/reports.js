import { fetchLeads } from '@/services/leads'
import { fetchAllTestimonials } from '@/services/testimonials'
import { fetchProjects } from '@/services/reelly'
import { buildInquiryChart } from '@/services/dashboard'
import { UAE_COMMUNITIES, projectCommunitySlugs } from '@/config/communities'

const SOURCE_LABELS = {
  property_page: 'Project page',
  contact_page: 'Contact page',
  home_form: 'Home form',
  website_form: 'Website form',
  whatsapp: 'WhatsApp',
  referral: 'Referral',
}

export function sourceLabel(source) {
  if (!source) return 'Other'
  return SOURCE_LABELS[source] || String(source).replace(/_/g, ' ')
}

function filterLeadsByDays(leads, days) {
  if (!days || days === 'all') return leads
  const cutoff = Date.now() - Number(days) * 86400000
  return leads.filter((l) => new Date(l.created_at).getTime() >= cutoff)
}

function topCommunityName(projects) {
  const counts = new Map()
  for (const p of projects) {
    for (const slug of projectCommunitySlugs(p)) {
      counts.set(slug, (counts.get(slug) || 0) + 1)
    }
  }
  let best = null
  let max = 0
  for (const [slug, n] of counts) {
    if (n > max) {
      max = n
      best = slug
    }
  }
  if (!best) return '—'
  return UAE_COMMUNITIES.find((c) => c.slug === best)?.name || best
}

function topSourceLabel(leads) {
  if (!leads.length) return '—'
  const counts = new Map()
  for (const l of leads) {
    const label = sourceLabel(l.source)
    counts.set(label, (counts.get(label) || 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
}

function buildSourceRows(leads) {
  if (!leads.length) return []
  const counts = new Map()
  for (const l of leads) {
    const label = sourceLabel(l.source)
    counts.set(label, (counts.get(label) || 0) + 1)
  }
  const total = leads.length
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({
      source,
      count,
      percent: `${Math.round((count / total) * 100)}%`,
    }))
}

function formatDateTime(iso) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function escapeCsv(val) {
  const s = String(val ?? '')
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function csvRow(cells) {
  return cells.map(escapeCsv).join(',')
}

/** Download CSV in the browser. */
export function downloadCsv(filename, content) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/** Export inquiries + summary header as one CSV file. */
export function exportReportCsv({ leads, periodLabel, stats, sourceRows }) {
  const lines = [
    csvRow(['Kardosh Realty — Inquiries Report']),
    csvRow(['Generated', formatDateTime(new Date().toISOString())]),
    csvRow(['Period', periodLabel]),
    csvRow([]),
    csvRow(['Summary metric', 'Value']),
    ...stats.map((s) => csvRow([s.title, s.exportValue ?? s.value])),
    csvRow([]),
    csvRow(['Inquiry sources', 'Count', 'Share']),
    ...sourceRows.map((r) => csvRow([r.source, r.count, r.percent])),
    csvRow([]),
    csvRow([
      'Name',
      'Email',
      'Phone',
      'Status',
      'Interest',
      'Project',
      'Project ID',
      'Source',
      'Message',
      'Internal notes',
      'Received',
    ]),
    ...leads.map((l) =>
      csvRow([
        l.name,
        l.email,
        l.phone,
        l.status || 'new',
        l.listing_type,
        l.project_name,
        l.project_id,
        sourceLabel(l.source),
        l.message,
        l.internal_notes,
        formatDateTime(l.created_at),
      ])
    ),
  ]
  const stamp = new Date().toISOString().slice(0, 10)
  downloadCsv(`kardosh-inquiries-report-${stamp}.csv`, lines.join('\n'))
}

export async function fetchReportData({ rangeDays = '30' } = {}) {
  const [leadsSettled, testimonialsSettled, projectsSettled] = await Promise.allSettled([
    fetchLeads({ limit: 500 }),
    fetchAllTestimonials(),
    fetchProjects({ limit: '100' }),
  ])

  const allLeads =
    leadsSettled.status === 'fulfilled' && leadsSettled.value.configured !== false
      ? leadsSettled.value.leads || []
      : []
  const configured =
    leadsSettled.status === 'fulfilled' && leadsSettled.value.configured !== false

  const testimonials =
    testimonialsSettled.status === 'fulfilled' ? testimonialsSettled.value.items || [] : []
  const projects =
    projectsSettled.status === 'fulfilled' ? projectsSettled.value.results || [] : []

  const filtered = filterLeadsByDays(allLeads, rangeDays)
  const last30 = filterLeadsByDays(allLeads, 30)
  const withProject = filtered.filter((l) => l.project_name || l.project_id).length
  const projectRate = filtered.length
    ? `${Math.round((withProject / filtered.length) * 100)}%`
    : '0%'

  const publishedReviews = testimonials.filter((t) => t.published !== false).length
  const pendingReviews = testimonials.filter((t) => t.pending).length

  const stats = [
    {
      title: 'Inquiries (period)',
      value: String(filtered.length),
      exportValue: filtered.length,
      icon: 'ri-mail-line',
    },
    {
      title: 'Inquiries (30d)',
      value: String(last30.length),
      exportValue: last30.length,
      icon: 'ri-calendar-line',
    },
    {
      title: 'With project context',
      value: projectRate,
      exportValue: projectRate,
      icon: 'ri-building-line',
    },
    {
      title: 'Top source',
      value: topSourceLabel(filtered),
      exportValue: topSourceLabel(filtered),
      icon: 'ri-links-line',
    },
    {
      title: 'Published reviews',
      value: String(publishedReviews),
      exportValue: publishedReviews,
      icon: 'ri-chat-quote-line',
    },
    {
      title: 'Pending reviews',
      value: String(pendingReviews),
      exportValue: pendingReviews,
      icon: 'ri-time-line',
    },
    {
      title: 'Top community',
      value: topCommunityName(projects),
      exportValue: topCommunityName(projects),
      icon: 'ri-map-pin-line',
    },
    {
      title: 'Off-plan projects',
      value: String(projectsSettled.status === 'fulfilled' ? projectsSettled.value.count || projects.length : 0),
      exportValue: projectsSettled.status === 'fulfilled' ? projectsSettled.value.count || projects.length : 0,
      icon: 'ri-community-line',
    },
  ]

  const chart = buildInquiryChart(
    rangeDays === 'all' ? allLeads : filtered,
    rangeDays === '30' || rangeDays === '90' ? 'M' : 'Y'
  )

  const periodLabels = {
    7: 'Last 7 days',
    30: 'Last 30 days',
    90: 'Last 90 days',
    all: 'All time',
  }

  return {
    configured,
    error: leadsSettled.status === 'rejected' ? leadsSettled.reason?.message : '',
    allLeads,
    filteredLeads: filtered,
    stats,
    sourceRows: buildSourceRows(filtered),
    chart,
    periodLabel: periodLabels[rangeDays] || `Last ${rangeDays} days`,
  }
}
