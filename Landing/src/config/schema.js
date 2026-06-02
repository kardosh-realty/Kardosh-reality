import { BRAND, SOCIAL } from '@/config/brand'
import { BRAND_ICON } from '@/config/brand-assets'
import { CONTACT } from '@/config/uae'
import { buildBreadcrumbItems } from '@/config/breadcrumbs'
import {
  SITE_URL,
  SITE_NAME,
  ROUTE_SEO,
  absoluteUrl,
  truncateDescription,
} from '@/config/seo'

export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
}

const NOINDEX_ROUTES = new Set(['terms', 'privacy', 'NotFound', 'share-review'])

/** Map vue-router route names to Schema.org page types. */
const ROUTE_PAGE_TYPES = {
  index: 'WebPage',
  'off-plan': 'CollectionPage',
  rent: 'CollectionPage',
  sell: 'WebPage',
  'grid-map': 'WebPage',
  developers: 'CollectionPage',
  communities: 'CollectionPage',
  'why-dubai': 'WebPage',
  aboutus: 'AboutPage',
  contact: 'ContactPage',
  blogs: 'CollectionPage',
  terms: 'WebPage',
  privacy: 'WebPage',
}

function toJsonLd(graph) {
  const nodes = graph.filter(Boolean)
  if (!nodes.length) return null
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

function organizationNode() {
  return {
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': SCHEMA_IDS.organization,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(BRAND_ICON),
    image: absoluteUrl(BRAND_ICON),
    email: BRAND.email,
    telephone: BRAND.phone,
    description: BRAND.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    sameAs: [SOCIAL.linkedin, SOCIAL.instagram].filter(Boolean),
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: SITE_NAME,
    description: BRAND.tagline,
    publisher: { '@id': SCHEMA_IDS.organization },
    inLanguage: 'en-AE',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/off-plan?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function breadcrumbNode(pageUrl, crumbs) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.url || pageUrl),
    })),
  }
}

function locationToPostalAddress(location) {
  if (!location) return null
  if (typeof location === 'string') {
    return {
      '@type': 'PostalAddress',
      streetAddress: location,
      addressCountry: 'AE',
    }
  }
  const locality = location.city || location.region || location.district
  if (!locality && !location.country) return null
  return {
    '@type': 'PostalAddress',
    streetAddress: location.district || undefined,
    addressLocality: locality || undefined,
    addressRegion: location.region || location.city || undefined,
    addressCountry: location.country === 'United Arab Emirates' ? 'AE' : location.country || 'AE',
  }
}

function breadcrumbsForRoute(route, currentLabel = null) {
  const items = buildBreadcrumbItems(route, currentLabel)
  if (items.length <= 1) return null
  return items.map((item) => ({
    label: item.label,
    url: item.to || route.path,
  }))
}

function buildPageGraph({
  url,
  name,
  description,
  pageType = 'WebPage',
  breadcrumbs = null,
  mainEntity = null,
  extraNodes = [],
  includeWebsite = false,
}) {
  const pageUrl = absoluteUrl(url)
  const graph = [
    organizationNode(),
    ...(includeWebsite ? [websiteNode()] : []),
    {
      '@type': pageType,
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description: truncateDescription(description),
      isPartOf: { '@id': SCHEMA_IDS.website },
      about: { '@id': SCHEMA_IDS.organization },
      publisher: { '@id': SCHEMA_IDS.organization },
      inLanguage: 'en-AE',
      ...(mainEntity ? { mainEntity } : {}),
      ...(breadcrumbs?.length
        ? { breadcrumb: { '@id': `${pageUrl}#breadcrumb` } }
        : {}),
    },
  ]

  if (breadcrumbs?.length) {
    graph.push(breadcrumbNode(pageUrl, breadcrumbs))
  }

  graph.push(...extraNodes)
  return toJsonLd(graph)
}

/** JSON-LD for static routes (via useRouteSeo). */
export function buildStaticRouteSchema(route) {
  if (route.meta.dynamicSeo || NOINDEX_ROUTES.has(route.name)) return null

  const preset = route.meta.seo || ROUTE_SEO[route.name]
  const path = route.fullPath.split('?')[0]
  const name = preset?.title?.replace(` | ${SITE_NAME}`, '') || SITE_NAME
  const description = preset?.description || BRAND.tagline
  const pageType = ROUTE_PAGE_TYPES[route.name] || 'WebPage'
  const breadcrumbs = breadcrumbsForRoute(route)

  return buildPageGraph({
    url: path,
    name,
    description,
    pageType,
    breadcrumbs,
    includeWebsite: route.name === 'index',
  })
}

export function buildPropertySchema(property, path) {
  if (!property) return null

  const url = absoluteUrl(path)
  const name = property.title || property.name || 'Property'
  const description =
    (typeof property.overview === 'string' ? property.overview : null) ||
    property.description ||
    `${name} — off-plan property in the UAE from ${SITE_NAME}.`

  const images = [
    property.image,
    ...(property.gallery || []).map((g) => g?.url),
    ...(property.images || []).map((i) => i?.url),
    ...(property.detail || []),
  ]
    .filter(Boolean)
    .map((img) => absoluteUrl(img))

  const listing = {
    '@type': 'RealEstateListing',
    '@id': `${url}#listing`,
    name,
    description: truncateDescription(description, 500),
    url,
    ...(images.length ? { image: images.length === 1 ? images[0] : images } : {}),
  }

  if (property.updatedAt) {
    listing.dateModified = property.updatedAt
  }

  if (property.latitude && property.longitude) {
    listing.geo = {
      '@type': 'GeoCoordinates',
      latitude: Number(property.latitude),
      longitude: Number(property.longitude),
    }
  }

  const address = locationToPostalAddress(property.location)
  if (address) listing.address = address

  if (property.price > 0) {
    listing.offers = {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.priceCurrency || 'AED',
      availability: 'https://schema.org/InStock',
    }
  }

  if (property.developer) {
    listing.creator = {
      '@type': 'Organization',
      name: property.developer,
    }
  }

  const routeLike = { name: 'property-detail', path }
  const breadcrumbs = breadcrumbsForRoute(routeLike, name)

  return buildPageGraph({
    url: path,
    name: `${name} | ${SITE_NAME}`,
    description,
    mainEntity: { '@id': `${url}#listing` },
    breadcrumbs,
    extraNodes: [listing],
  })
}

export function buildDeveloperSchema(developer, path) {
  if (!developer) return null

  const url = absoluteUrl(path)
  const name = developer.name || 'Developer'
  const description =
    developer.description ||
    `${name} off-plan projects in Dubai and the UAE — browse developments on ${SITE_NAME}.`

  const org = {
    '@type': 'Organization',
    '@id': `${url}#developer`,
    name,
    description: truncateDescription(description, 500),
    url,
    ...(developer.logo?.url ? { logo: absoluteUrl(developer.logo.url) } : {}),
    ...(developer.website ? { sameAs: [developer.website] } : {}),
  }

  const routeLike = { name: 'developer-detail', path }
  const breadcrumbs = breadcrumbsForRoute(routeLike, name)

  return buildPageGraph({
    url: path,
    name: `${name} Projects in Dubai | ${SITE_NAME}`,
    description,
    mainEntity: { '@id': `${url}#developer` },
    breadcrumbs,
    extraNodes: [org],
  })
}

export function buildCommunitySchema(community, path, emirateName = 'UAE') {
  if (!community) return null

  const url = absoluteUrl(path)
  const name = community.name || 'Community'
  const description =
    community.blurb ||
    community.tagline ||
    `Off-plan projects and area guide for ${name}, ${emirateName}.`

  const place = {
    '@type': 'Place',
    '@id': `${url}#place`,
    name,
    description: truncateDescription(description, 500),
    url,
    ...(community.emirate
      ? {
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: emirateName,
          },
        }
      : {}),
  }

  const routeLike = { name: 'community-detail', path }
  const breadcrumbs = breadcrumbsForRoute(routeLike, name)

  return buildPageGraph({
    url: path,
    name: `${name} — ${emirateName} | ${SITE_NAME}`,
    description,
    mainEntity: { '@id': `${url}#place` },
    breadcrumbs,
    extraNodes: [place],
  })
}

export function buildBlogPostingSchema(post, path) {
  if (!post) return null

  const url = absoluteUrl(path)
  const title = post.title || 'Blog post'
  const description = post.excerpt || 'Insights from Kardosh Realty.'

  const article = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description: truncateDescription(description, 500),
    url,
    inLanguage: 'en-AE',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(BRAND_ICON),
      },
    },
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
  }

  const routeLike = { name: 'blog-detail', path }
  const breadcrumbs = breadcrumbsForRoute(routeLike, title)

  return buildPageGraph({
    url: path,
    name: `${title} | ${SITE_NAME}`,
    description,
    pageType: 'WebPage',
    mainEntity: { '@id': `${url}#article` },
    breadcrumbs,
    extraNodes: [article],
  })
}
