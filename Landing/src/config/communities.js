/** UAE communities & areas — SEO landing pages grouped by emirate */

export const COMMUNITY_EMIRATES = [
  { id: 'all', label: 'All UAE' },
  { id: 'dubai', label: 'Dubai' },
  { id: 'abu-dhabi', label: 'Abu Dhabi' },
  { id: 'sharjah', label: 'Sharjah' },
  { id: 'ajman', label: 'Ajman' },
  { id: 'rak', label: 'Ras Al Khaimah' },
]

export const EMIRATE_OVERVIEWS = [
  {
    id: 'dubai',
    name: 'Dubai',
    tagline: 'The UAE’s flagship market — iconic towers, master communities, and the deepest off-plan pipeline.',
    highlights: ['Largest project stock', 'Global investor base', 'Strong resale liquidity'],
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    tagline: 'Capital-city stability with island living, cultural districts, and long-term masterplans.',
    highlights: ['Government hub', 'Island developments', 'Premium end-user demand'],
  },
  {
    id: 'sharjah',
    name: 'Sharjah',
    tagline: 'Value-focused communities with family amenities and connectivity to Dubai.',
    highlights: ['Competitive entry', 'Growing supply', 'End-user appeal'],
  },
  {
    id: 'ajman',
    name: 'Ajman',
    tagline: 'Coastal affordability and rising off-plan stock along the northern corridor.',
    highlights: ['Lower entry points', 'Beach proximity', 'Investor interest'],
  },
  {
    id: 'rak',
    name: 'Ras Al Khaimah',
    tagline: 'Nature-led resorts, marina towns, and lifestyle projects north of Dubai.',
    highlights: ['Tourism growth', 'Freehold zones', 'Lifestyle focus'],
  },
]

export const UAE_COMMUNITIES = [
  {
    slug: 'downtown-dubai',
    emirate: 'dubai',
    name: 'Downtown Dubai',
    tagline: 'Iconic skyline living next to Burj Khalifa & Dubai Mall',
    blurb: 'Explore downtown Dubai projects — iconic skyline living, hospitality-driven demand, and new off plan launches next to Burj Khalifa and Dubai Mall.',
    searchTerms: ['downtown', 'burj khalifa', 'downtown dubai', 'downtown dubai projects'],
    highlights: ['Walkable luxury', 'Strong rental demand', 'Tourism hub'],
  },
  {
    slug: 'dubai-marina',
    emirate: 'dubai',
    name: 'Dubai Marina',
    tagline: 'Waterfront towers, dining & marina lifestyle',
    blurb: 'Dubai Marina and the JBR corridor attract global tenants and investors seeking high occupancy, metro access, and a mature resale market.',
    searchTerms: ['marina', 'jbr', 'jumeirah beach', 'dubai marina'],
    highlights: ['High occupancy', 'Expat favourite', 'Metro access'],
  },
  {
    slug: 'palm-jumeirah',
    emirate: 'dubai',
    name: 'Palm Jumeirah',
    tagline: 'Ultra-luxury island villas and branded residences',
    blurb: 'Browse Palm Jumeirah projects — ultra-luxury island villas and branded residences with scarcity value and strong prestige appeal for investors.',
    searchTerms: ['palm', 'palm jumeirah', 'palm jumeirah projects'],
    highlights: ['Prestige address', 'Limited supply', 'Premium yields'],
  },
  {
    slug: 'dubai-hills',
    emirate: 'dubai',
    name: 'Dubai Hills Estate',
    tagline: 'Green master community with golf & family amenities',
    blurb: 'Dubai Hills projects sit within Emaar’s master community — parkland, schools, golf, and family-friendly off plan stock popular for dubai property investment.',
    searchTerms: ['dubai hills', 'hills estate', 'dubai hills projects'],
    highlights: ['Family-focused', 'Golf course', 'Emaar masterplan'],
  },
  {
    slug: 'business-bay',
    emirate: 'dubai',
    name: 'Business Bay',
    tagline: 'Central canal district with strong investor liquidity',
    blurb: 'Business Bay off plan projects offer central canal living, competitive entry prices, and steady new launch supply — a core district for off plan investment dubai.',
    searchTerms: ['business bay', 'business bay off plan'],
    highlights: ['Central location', 'Competitive entry', 'Off-plan pipeline'],
  },
  {
    slug: 'jvc',
    emirate: 'dubai',
    name: 'Jumeirah Village Circle',
    tagline: 'Affordable community popular with end-users & investors',
    blurb: 'JVC off plan projects deliver affordable apartments with strong rental demand — a practical choice for buyers seeking high ROI property in Dubai.',
    searchTerms: ['jvc', 'jumeirah village', 'jvc off plan'],
    highlights: ['Value entry', 'Rental demand', 'Community feel'],
  },
  {
    slug: 'dubai-creek-harbour',
    emirate: 'dubai',
    name: 'Dubai Creek Harbour',
    tagline: 'Waterfront towers overlooking Dubai Creek & the skyline',
    blurb: 'Dubai Creek Harbour projects combine creek-front living with Emaar masterplan scale — upcoming launches, marina views, and long-term dubai property investment appeal.',
    searchTerms: ['creek harbour', 'dubai creek', 'dubai creek harbour'],
    highlights: ['Creek waterfront', 'Emaar masterplan', 'New launches'],
  },
  {
    slug: 'yas-island',
    emirate: 'abu-dhabi',
    name: 'Yas Island',
    tagline: 'Entertainment, beaches & modern off-plan on Abu Dhabi’s leisure coast',
    blurb: 'Yas Island blends hospitality, retail, and residential towers — a flagship destination for Abu Dhabi lifestyle buyers.',
    searchTerms: ['yas island', 'yas', 'abu dhabi'],
    highlights: ['Leisure district', 'Waterfront', 'Tourism anchor'],
  },
  {
    slug: 'saadiyat-island',
    emirate: 'abu-dhabi',
    name: 'Saadiyat Island',
    tagline: 'Culture, beaches & ultra-prime Abu Dhabi residences',
    blurb: 'Saadiyat hosts museums, beach clubs, and low-density luxury stock favoured by end-users seeking capital-city prestige.',
    searchTerms: ['saadiyat', 'abu dhabi'],
    highlights: ['Cultural district', 'Beachfront', 'Ultra-prime'],
  },
  {
    slug: 'al-reem-island',
    emirate: 'abu-dhabi',
    name: 'Al Reem Island',
    tagline: 'High-rise living minutes from downtown Abu Dhabi',
    blurb: 'Al Reem Island offers marina-style towers and competitive pricing relative to Dubai, with strong appeal to regional investors.',
    searchTerms: ['reem island', 'al reem', 'abu dhabi'],
    highlights: ['Marina living', 'Central AD', 'Investor stock'],
  },
  {
    slug: 'aljada',
    emirate: 'sharjah',
    name: 'Aljada',
    tagline: 'Sharjah’s flagship master community by Arada',
    blurb: 'Aljada is a walkable mixed-use district with schools, retail, and phased off-plan releases — a core Sharjah story for value buyers.',
    searchTerms: ['aljada', 'sharjah'],
    highlights: ['Master community', 'Walkable', 'Value pricing'],
  },
  {
    slug: 'ajman-corniche',
    emirate: 'ajman',
    name: 'Ajman Corniche',
    tagline: 'Coastal towers and affordable off-plan along the emirate waterfront',
    blurb: 'Ajman continues to attract investors priced out of Dubai and Sharjah, with beachfront towers and fast-growing developer activity.',
    searchTerms: ['ajman', 'ajman creek', 'corniche'],
    highlights: ['Affordable', 'Coastal', 'Growing pipeline'],
  },
  {
    slug: 'mina-al-arab',
    emirate: 'rak',
    name: 'Mina Al Arab',
    tagline: 'Ras Al Khaimah’s waterfront lifestyle destination',
    blurb: 'Mina Al Arab and surrounding RAK districts target lifestyle buyers and holiday-home investors benefiting from tourism expansion.',
    searchTerms: ['mina al arab', 'ras al khaimah', 'rak'],
    highlights: ['Waterfront', 'Lifestyle', 'Tourism growth'],
  },
  {
    slug: 'al-marjan-island',
    emirate: 'rak',
    name: 'Al Marjan Island',
    tagline: 'Island resorts and branded residences in RAK',
    blurb: 'Al Marjan Island is Ras Al Khaimah’s answer to beachfront resort living — hotel-branded stock and marina-front projects.',
    searchTerms: ['marjan', 'al marjan', 'ras al khaimah'],
    highlights: ['Island living', 'Resort stock', 'Branded residences'],
  },
]

/** @deprecated Use UAE_COMMUNITIES */
export const DUBAI_COMMUNITIES = UAE_COMMUNITIES.filter((c) => c.emirate === 'dubai')

export function findCommunity(slug) {
  return UAE_COMMUNITIES.find((c) => c.slug === slug)
}

export function communitiesByEmirate(emirateId) {
  if (!emirateId || emirateId === 'all') return UAE_COMMUNITIES
  return UAE_COMMUNITIES.filter((c) => c.emirate === emirateId)
}

export function emirateLabel(emirateId) {
  return COMMUNITY_EMIRATES.find((e) => e.id === emirateId)?.label || 'UAE'
}
