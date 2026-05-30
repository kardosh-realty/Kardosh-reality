/** Normalize link rows from DB or form */
export function normalizeLinks(links) {
  return (Array.isArray(links) ? links : [])
    .filter((l) => l && String(l.url || '').trim())
    .map((l) => ({
      platform: l.platform || 'website',
      url: String(l.url).trim(),
    }))
}

/** Build links array from legacy per-column fields */
export function linksFromLegacy(row) {
  if (!row) return []
  const pairs = [
    ['linkedin', row.linkedin],
    ['instagram', row.instagram],
    ['email', row.email],
    ['phone', row.phone],
    ['whatsapp', row.whatsapp],
  ]
  return pairs
    .filter(([, url]) => url && String(url).trim())
    .map(([platform, url]) => ({ platform, url: String(url).trim() }))
}

export function linkUrl(links, platform) {
  return normalizeLinks(links).find((l) => l.platform === platform)?.url || ''
}
