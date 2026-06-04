import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  ROUTE_SEO,
  absoluteUrl,
  truncateDescription,
} from '@/config/seo'
import { buildStaticRouteSchema } from '@/config/schema'
import { ogLocaleTag } from '@/config/i18n'
import { getLocaleId } from '@/composables/useLanguage'
import { getMessages } from '@/locales'
import { site } from '@/composables/useSiteSettings'

function trackSiteSettingsForHead() {
  // Re-run head tags when admin updates contact/socials in Supabase.
  void site.companyName
  void site.email
  void site.phone
  void site.address
  void site.tagline
  void site.socials
}

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

function buildHead(input = {}) {
  const title = input.title || `${SITE_NAME} — UAE Real Estate`
  const description = truncateDescription(
    input.description ||
      'Buy, sell, and rent premium UAE properties with Kardosh Realty.'
  )
  const canonical = absoluteUrl(input.path || input.canonicalPath || '/')
  const image = absoluteUrl(input.image || DEFAULT_OG_IMAGE)
  const robots = input.robots || 'index, follow'
  const ogType = input.ogType || 'website'

  const ogLocale = ogLocaleTag(input.locale || getLocaleId())
  const htmlLang = (input.locale || getLocaleId()) === 'pt' ? 'pt' : 'en'

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
    link: [{ rel: 'canonical', href: canonical }],
    htmlAttrs: { lang: htmlLang },
    script: schemaScripts(input.schema),
  }
}

/** Apply SEO tags from a plain object (reactive when passed a getter/ref watch). */
export function useSeo(getOptions) {
  const resolve = typeof getOptions === 'function' ? getOptions : () => getOptions

  useHead(() => {
    trackSiteSettingsForHead()
    return buildHead(resolve())
  })
}

/** Default SEO for static routes from `route.meta.seo` or `ROUTE_SEO[name]`. */
export function useRouteSeo() {
  const route = useRoute()

  useHead(() => {
    if (route.meta.dynamicSeo) return {}
    trackSiteSettingsForHead()
    const locale = getLocaleId()
    const preset = route.meta.seo || getMessages(locale).seo?.[route.name] || ROUTE_SEO[route.name]
    const path = route.fullPath.split('?')[0]

    if (!preset) {
      return buildHead({
        path,
        schema: buildStaticRouteSchema(route),
      })
    }

    return buildHead({
      ...preset,
      path,
      schema: buildStaticRouteSchema(route),
    })
  })
}
