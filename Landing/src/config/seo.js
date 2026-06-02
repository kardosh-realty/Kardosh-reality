import { BRAND } from '@/config/brand'
import { BRAND_ICON } from '@/config/brand-assets'

/** Canonical public site origin (no trailing slash). */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://kardoshrealty.ae'
).replace(/\/+$/, '')

export const SITE_NAME = BRAND.name

const DEFAULT_DESCRIPTION =
  'Buy off plan property in Dubai and across the UAE — browse Dubai off plan projects, new launch and upcoming developments, and speak with Kardosh Realty for dubai property investment advice.'

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
      'Explore off plan projects in Dubai and the UAE — new launch projects, payment plans, and off plan investment opportunities from Emaar, DAMAC, Sobha, and leading developers.',
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
      'Compare Emaar, DAMAC, Sobha, Binghatti, Meraas, and Nakheel projects in Dubai — live off plan pipelines, payment plans, and developer profiles on Kardosh Realty.',
  },
  communities: {
    title: `Best Areas to Invest in Dubai — Community Guides | ${SITE_NAME}`,
    description:
      'Downtown Dubai, Business Bay, Dubai Hills, Palm Jumeirah, JVC, Dubai Creek Harbour, and more — off plan projects by community with live UAE listings.',
  },
  'why-dubai': {
    title: `Dubai Property Investment Guide & Golden Visa | ${SITE_NAME}`,
    description:
      'Your dubai property investment guide — best areas to invest, off plan investment dubai, golden visa property rules, and high ROI communities explained by Kardosh Realty.',
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
    title: `Terms of Use | ${SITE_NAME}`,
    description: `Terms of use for the ${SITE_NAME} website.`,
    robots: 'noindex, follow',
  },
  privacy: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy policy for the ${SITE_NAME} website.`,
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

export function truncateDescription(text, max = 160) {
  const clean = String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trim()}…`
}
