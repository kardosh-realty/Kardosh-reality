import { mapReellyProject } from '@/services/reelly/mapProject'
import { developerDetailPath } from '@/utils/seoRoutes'

const ROLE_LABELS = {
  sales_executive: 'Sales executive',
  sales_manager: 'Sales manager',
  broker: 'Broker',
  agent: 'Agent',
}

export function formatContactRole(role) {
  if (!role) return null
  return ROLE_LABELS[role] || role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function excerpt(text, max = 160) {
  const plain = (text || '').replace(/\s+/g, ' ').trim()
  if (!plain) return ''
  if (plain.length <= max) return plain
  return `${plain.slice(0, max).trim()}…`
}

function regionsFromProjects(projects = []) {
  const regions = new Set()
  for (const p of projects) {
    const r = p?.location?.region || p?.location?.district
    if (r) regions.add(r)
  }
  return [...regions]
}

function mapOfficeContact(c) {
  return {
    id: c.id,
    name: c.display_name || c.name,
    phone: c.phone,
    email: c.email,
    role: formatContactRole(c.role),
    languages: c.languages || [],
    contactType: c.contact_type,
    whatsapp: c.whatsapp,
    socialLinks: c.social_links || [],
  }
}

function mapOffice(o) {
  const contacts = (o.office_contacts || []).map(mapOfficeContact)
  return {
    id: o.id,
    name: o.name,
    address: o.address,
    city: o.city,
    region: o.region,
    country: o.country,
    email: o.email,
    isMain: o.is_main,
    workingHours: (o.working_hours || []).map((w) => ({
      days: w.days,
      timeRange: w.time_range,
    })),
    contacts,
  }
}

/** Normalize Reelly developer detail payload */
export function mapDeveloper(raw) {
  if (!raw) return null

  const projects = raw.projects || []
  const offices = (raw.offices || []).map(mapOffice)
  const contactCount = offices.reduce((n, o) => n + o.contacts.length, 0)

  return {
    id: raw.id,
    name: raw.name,
    website: raw.website,
    description: raw.description || '',
    descriptionExcerpt: excerpt(raw.description, 200),
    logo: raw.logo,
    offices,
    socialLinks: raw.social_links || [],
    projectCount: projects.length,
    regions: regionsFromProjects(projects),
    officeCount: offices.length,
    contactCount,
    projects: projects.map((p) =>
      mapReellyProject({
        ...p,
        developer: raw.name,
      })
    ),
  }
}

/** Attach catalogue stats to a logo row from /developers/logos */
/** Profile link when Reelly id is known; otherwise off-plan filtered by name */
export function developerProfileRoute(dev) {
  if (!dev?.name) return '/developers'
  if (dev.name) return developerDetailPath(dev)
  return { path: '/off-plan', query: { developer: dev.name } }
}

export function enrichDeveloperLogo(logo, statsByName = {}) {
  const stats = statsByName[logo.name] || { projectCount: 0, regions: [] }
  return {
    ...logo,
    projectCount: stats.projectCount,
    regions: stats.regions,
    descriptionExcerpt: excerpt(logo.description, 120),
  }
}

/** Build name → { projectCount, regions[] } from mapped project list */
export function buildDeveloperStats(projects = []) {
  const map = {}
  for (const p of projects) {
    const name = p.developer
    if (!name) continue
    if (!map[name]) map[name] = { projectCount: 0, regions: new Set() }
    map[name].projectCount += 1
    const region = p.location?.region || p.location?.district
    if (region) map[name].regions.add(region)
  }
  const out = {}
  for (const [name, s] of Object.entries(map)) {
    out[name] = {
      projectCount: s.projectCount,
      regions: [...s.regions].slice(0, 4),
    }
  }
  return out
}
