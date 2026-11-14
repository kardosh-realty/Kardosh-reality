/**
 * `useSeo` inputs for dynamic pages. Shared by the page components and the
 * Node server so server-rendered head tags match what the app renders.
 */
import { truncateDescription } from '@/config/seo'
import {
  buildPropertySchema,
  buildCommunitySchema,
  buildBlogPostingSchema,
  buildDeveloperSchema,
} from '@/config/schema'

export function propertyLocationLabel(p) {
  const loc = p?.location
  if (!loc) return p?.name?.includes(',') ? p.name.split(',').slice(1).join(',').trim() : null
  if (typeof loc === 'string') return loc
  return [loc.district, loc.region, loc.city, loc.country].filter(Boolean).join(', ') || null
}

export function propertySeo(p, path, { isEmbed = false } = {}) {
  const title = p?.title || p?.name || 'Property'
  const loc = propertyLocationLabel(p)
  const desc =
    (typeof p?.overview === 'string' ? p.overview.slice(0, 300) : null) ||
    p?.description ||
    (loc
      ? `${title} — ${loc}. Off-plan and UAE property details from Kardosh Realty.`
      : `${title} — UAE property details from Kardosh Realty.`)
  const image =
    p?.image ||
    p?.gallery?.[0]?.url ||
    p?.images?.[0]?.url ||
    p?.detail?.[0]
  return {
    title: `${title} | Kardosh Realty`,
    description: truncateDescription(desc),
    path,
    image,
    ogType: 'article',
    robots: isEmbed ? 'noindex, nofollow' : 'index, follow',
    schema: isEmbed ? null : buildPropertySchema(p, path),
  }
}

export function communitySeo(c, path, emirateName = 'UAE') {
  const name = c?.name || 'Community'
  return {
    title: `${name} — ${emirateName} | Kardosh Realty`,
    description: truncateDescription(
      c?.blurb || c?.tagline || `Off-plan projects and area guide for ${name}, UAE.`
    ),
    path,
    robots: c ? 'index, follow' : 'noindex, follow',
    schema: c ? buildCommunitySchema(c, path, emirateName) : null,
  }
}

export function blogSeo(p, path, { notFound = false } = {}) {
  return {
    title: p?.title ? `${p.title} | Kardosh Realty` : 'Blog | Kardosh Realty',
    description: p?.excerpt || 'Insights from Kardosh Realty.',
    path,
    image: p?.image,
    ogType: 'article',
    robots: notFound ? 'noindex, follow' : 'index, follow',
    schema: p && !notFound ? buildBlogPostingSchema(p, path) : null,
  }
}

export function developerSeo(d, path) {
  const name = d?.name || 'Developer'
  const count = d?.projectCount || 0
  return {
    title: `${name} Projects in Dubai | Kardosh Realty`,
    description: truncateDescription(
      d?.description ||
        `${name} projects in Dubai — browse ${count || 'active'} off plan developments, payment plans, and new launch stock. Compare ${name} off plan property on Kardosh Realty.`
    ),
    path,
    image: d?.logo?.url,
    ogType: 'profile',
    schema: buildDeveloperSchema(d, path),
  }
}
