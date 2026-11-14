import { BRAND } from '@/config/brand'
import { BRAND_ICON } from '@/config/brand-assets'

/** Canonical public site origin (no trailing slash). */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://kardoshrealty.ae'
).replace(/\/+$/, '')

export const SITE_NAME = BRAND.name

const DEFAULT_DESCRIPTION =
  'Buy off plan property in Dubai and the UAE — browse new launch and upcoming projects, and get Dubai property investment advice from Kardosh Realty.'

export const DEFAULT_OG_IMAGE = `${SITE_URL}${BRAND_ICON}`

/** Static route SEO keyed by vue-router `name`. */
export const ROUTE_SEO = {
  index: {
    title: `Off Plan Projects Dubai & UAE Property | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  },
  'off-plan': {
    title: `Off Plan Projects Dubai — New & Upcoming Launches | ${SITE_NAME}`,
    description:
      'Explore off plan projects in Dubai and the UAE — new launches, payment plans, and investment opportunities from Emaar, DAMAC, Sobha, and more.',
  },
  rent: {
    title: `Properties for Rent in the UAE | ${SITE_NAME}`,
    description:
      'Find premium rental homes and apartments across the UAE. Browse listings and speak with Kardosh Realty for viewings and tenancy support.',
  },
  sell: {
    title: `Sell Your Property in the UAE | ${SITE_NAME}`,
    description:
      'List your UAE property with Kardosh Realty. Market valuation, buyer matching, and end-to-end sale support from a licensed brokerage.',
  },
  developers: {
    title: `Dubai Property Developers — Emaar, DAMAC, Sobha & More | ${SITE_NAME}`,
    description:
      'Compare Emaar, DAMAC, Sobha, Binghatti, Meraas, and Nakheel projects in Dubai — live off plan pipelines, payment plans, and developer profiles.',
  },
  communities: {
    title: `Best Areas to Invest in Dubai — Community Guides | ${SITE_NAME}`,
    description:
      'Downtown Dubai, Business Bay, Dubai Hills, Palm Jumeirah, JVC, Dubai Creek Harbour, and more — off plan projects by community with live UAE listings.',
  },
  'why-dubai': {
    title: `Dubai Property Investment Guide & Golden Visa | ${SITE_NAME}`,
    description:
      'Your Dubai property investment guide — best areas to invest, off plan investing, golden visa property rules, and high ROI communities explained.',
  },
  aboutus: {
    title: `About ${SITE_NAME}`,
    description:
      'Meet Kardosh Realty — UAE-focused brokerage for buy, rent, sell, and off-plan advisory with transparent, client-first service.',
  },
  contact: {
    title: `Contact ${SITE_NAME}`,
    description:
      'Get in touch with Kardosh Realty for property enquiries, off-plan consultations, and viewings across the UAE.',
  },
  blogs: {
    title: `Insights & News | ${SITE_NAME}`,
    description:
      'Market updates, area guides, and off-plan insights from the Kardosh Realty team.',
  },
  terms: {
    title: `Terms & Conditions | ${SITE_NAME}`,
    description: `Terms and conditions for using the ${SITE_NAME} website.`,
    robots: 'noindex, follow',
  },
  privacy: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy policy for the ${SITE_NAME} website.`,
    robots: 'noindex, follow',
  },
  'cookie-policy': {
    title: `Cookie Policy | ${SITE_NAME}`,
    description: `Cookie policy for the ${SITE_NAME} website.`,
    robots: 'noindex, follow',
  },
  'finance-policy': {
    title: `Finance Policy | ${SITE_NAME}`,
    description: `Finance policy for the ${SITE_NAME} website.`,
    robots: 'noindex, follow',
  },
  NotFound: {
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The page you requested could not be found.',
    robots: 'noindex, follow',
  },
  'share-review': {
    title: `Share Your Review | ${SITE_NAME}`,
    description: 'Submit your property experience review for Kardosh Realty.',
    robots: 'noindex, nofollow',
  },
  'grid-map': {
    title: `Off-Plan Map — UAE Projects | ${SITE_NAME}`,
    description:
      'Explore off-plan projects across the UAE on an interactive map. Filter by area and browse new launches from leading developers.',
  },
}

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

/** Plain text from Markdown/HTML snippets (Reelly overviews start with `##### Project General Facts`). */
export function stripMarkup(text) {
  return String(text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+[^\n]*\n/gm, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*(?:[-*+]|\d+\.|>)\s+/gm, '')
    .replace(/(\*\*|__|\*|_|`|~~)(\S[^]*?\S|\S)\1/g, '$2')
    .replace(/&nbsp;/g, ' ')
}

export function truncateDescription(text, max = 155) {
  const clean = stripMarkup(text)
    .replace(/\s+/g, ' ')
    .trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const head = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut
  return `${head.replace(/[\s,;:—–-]+$/, '')}…`
}
