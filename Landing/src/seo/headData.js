/**
 * Pure head-tag builders shared by the browser app (`useSeo`) and the Node
 * server (`src/seo/serverEntry.js`), so both emit identical SEO tags.
 * No component context, router hooks or browser globals in here.
 */
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  ROUTE_SEO,
  absoluteUrl,
  truncateDescription,
} from '@/config/seo'
import { buildStaticRouteSchema } from '@/config/schema'
import { ogLocaleTag, localePath, stripLocaleFromPath } from '@/config/i18n'
import { getMessages } from '@/locales'

function schemaScripts(schema) {
  if (!schema) return undefined
  return [
    {
      type: 'application/ld+json',
      key: 'json-ld',
      innerHTML: JSON.stringify(schema),
    },
  ]
}

/** hreflang alternates for the `/pt` suffix locale (indexable pages only). */
function alternateLinks(path, robots) {
  if (/noindex/i.test(robots)) return []
  const bare = stripLocaleFromPath(path || '/')
  const en = absoluteUrl(bare)
  return [
    { rel: 'alternate', hreflang: 'en', href: en },
    { rel: 'alternate', hreflang: 'pt', href: absoluteUrl(localePath(bare, 'pt')) },
    { rel: 'alternate', hreflang: 'x-default', href: en },
  ]
}

/** Head object (unhead input) from page SEO options. */
export function buildHead(input = {}, locale = 'en') {
  const title = input.title || `${SITE_NAME} — UAE Real Estate`
  const description = truncateDescription(
    input.description ||
      'Buy, sell, and rent premium UAE properties with Kardosh Realty.'
  )
  const canonical = absoluteUrl(input.path || input.canonicalPath || '/')
  const image = absoluteUrl(input.image || DEFAULT_OG_IMAGE)
  const robots = input.robots || 'index, follow'
  const ogType = input.ogType || 'website'

  const pageLocale = input.locale || locale
  const ogLocale = ogLocaleTag(pageLocale)
  const htmlLang = pageLocale === 'pt' ? 'pt' : 'en'

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: ogLocale },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [
      { rel: 'canonical', href: canonical },
      ...alternateLinks(input.path || input.canonicalPath || '/', robots),
    ],
    htmlAttrs: { lang: htmlLang },
    script: schemaScripts(input.schema),
  }
}

/** Head object for a static route (`route.meta.seo`, locale messages or `ROUTE_SEO`). */
export function buildStaticRouteHead(route, locale = 'en') {
  const preset = route.meta.seo || getMessages(locale).seo?.[route.name] || ROUTE_SEO[route.name]
  const path = route.fullPath.split('?')[0]
  return buildHead(
    {
      ...(preset || {}),
      path,
      schema: buildStaticRouteSchema(route),
    },
    locale
  )
}
