import { SOCIAL_PLATFORMS, socialMeta } from '@/composables/useSiteSettings'

export { socialMeta }

export function normalizeLinks(links) {
  return (Array.isArray(links) ? links : [])
    .filter((l) => l && String(l.url || '').trim())
    .map((l) => ({ platform: l.platform || 'website', url: String(l.url).trim() }))
}

export function linksFromLegacy(member) {
  if (!member) return []
  const pairs = [
    ['linkedin', member.linkedin],
    ['instagram', member.instagram],
    ['email', member.email],
    ['phone', member.phone],
    ['whatsapp', member.whatsapp],
  ]
  return pairs
    .filter(([, url]) => url && String(url).trim())
    .map(([platform, url]) => ({ platform, url: String(url).trim() }))
}

/** Resolve href for About page team card icons */
export function teamLinkHref(platform, url) {
  const v = String(url || '').trim()
  if (!v) return ''
  if (platform === 'email') {
    return v.startsWith('mailto:') ? v : `mailto:${v}`
  }
  if (platform === 'phone') {
    return v.startsWith('tel:') ? v : `tel:${v.replace(/\s/g, '')}`
  }
  if (platform === 'whatsapp') {
    const digits = v.replace(/\D/g, '')
    return digits ? `https://wa.me/${digits}` : v
  }
  if (/^https?:\/\//i.test(v)) return v
  return `https://${v}`
}

/** Slots to render on card (known platforms + any extras from links) */
export function teamDisplayLinks(member) {
  const links = member.links?.length ? normalizeLinks(member.links) : linksFromLegacy(member)
  const order = ['linkedin', 'instagram', 'email', 'phone', 'whatsapp', 'facebook', 'x', 'youtube', 'tiktok', 'website']
  const sorted = [...links].sort(
    (a, b) => order.indexOf(a.platform) - order.indexOf(b.platform) || 0
  )
  return sorted.map((l) => ({
    ...l,
    ...socialMeta(l.platform),
    href: teamLinkHref(l.platform, l.url),
  }))
}
