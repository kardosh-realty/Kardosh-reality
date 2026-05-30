/**
 * Curated UAE communities — must stay in sync with the Landing site
 * (kardosh/Landing/src/config/communities.js). Visibility is keyed by `slug`.
 */

export const EMIRATE_LABELS = {
  dubai: 'Dubai',
  'abu-dhabi': 'Abu Dhabi',
  sharjah: 'Sharjah',
  ajman: 'Ajman',
  rak: 'Ras Al Khaimah',
}

export const UAE_COMMUNITIES = [
  { slug: 'downtown-dubai', emirate: 'dubai', name: 'Downtown Dubai', searchTerms: ['downtown', 'burj khalifa', 'downtown dubai'] },
  { slug: 'dubai-marina', emirate: 'dubai', name: 'Dubai Marina', searchTerms: ['marina', 'jbr', 'jumeirah beach', 'dubai marina'] },
  { slug: 'palm-jumeirah', emirate: 'dubai', name: 'Palm Jumeirah', searchTerms: ['palm', 'palm jumeirah'] },
  { slug: 'dubai-hills', emirate: 'dubai', name: 'Dubai Hills Estate', searchTerms: ['dubai hills', 'hills estate'] },
  { slug: 'business-bay', emirate: 'dubai', name: 'Business Bay', searchTerms: ['business bay'] },
  { slug: 'jvc', emirate: 'dubai', name: 'Jumeirah Village Circle', searchTerms: ['jvc', 'jumeirah village'] },
  { slug: 'yas-island', emirate: 'abu-dhabi', name: 'Yas Island', searchTerms: ['yas island', 'yas'] },
  { slug: 'saadiyat-island', emirate: 'abu-dhabi', name: 'Saadiyat Island', searchTerms: ['saadiyat'] },
  { slug: 'al-reem-island', emirate: 'abu-dhabi', name: 'Al Reem Island', searchTerms: ['reem island', 'al reem'] },
  { slug: 'aljada', emirate: 'sharjah', name: 'Aljada', searchTerms: ['aljada'] },
  { slug: 'ajman-corniche', emirate: 'ajman', name: 'Ajman Corniche', searchTerms: ['ajman', 'ajman creek', 'corniche'] },
  { slug: 'mina-al-arab', emirate: 'rak', name: 'Mina Al Arab', searchTerms: ['mina al arab', 'ras al khaimah', 'rak'] },
  { slug: 'al-marjan-island', emirate: 'rak', name: 'Al Marjan Island', searchTerms: ['marjan', 'al marjan'] },
]

const MATCHERS = UAE_COMMUNITIES.map((c) => ({
  slug: c.slug,
  terms: [...(c.searchTerms || []), c.name].filter(Boolean).map((t) => t.toLowerCase()),
}))

/** Curated community slugs a Reelly project belongs to (by area / title text). */
export function projectCommunitySlugs(project) {
  const hay = `${project?.title || ''} ${project?.area || ''} ${project?.locationLabel || ''}`.toLowerCase()
  return MATCHERS.filter((m) => m.terms.some((t) => hay.includes(t))).map((m) => m.slug)
}

export function emirateLabel(id) {
  return EMIRATE_LABELS[id] || 'UAE'
}
