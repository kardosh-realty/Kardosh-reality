import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  ROUTE_SEO,
  absoluteUrl,
  truncateDescription,
} from '@/config/seo'

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
      { property: 'og:locale', content: 'en_AE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [{ rel: 'canonical', href: canonical }],
    htmlAttrs: { lang: 'en' },
  }
}

/** Apply SEO tags from a plain object (reactive when passed a getter/ref watch). */
export function useSeo(getOptions) {
  const resolve = typeof getOptions === 'function' ? getOptions : () => getOptions

  useHead(() => buildHead(resolve()))
}

/** Default SEO for static routes from `route.meta.seo` or `ROUTE_SEO[name]`. */
export function useRouteSeo() {
  const route = useRoute()

  useHead(() => {
    if (route.meta.dynamicSeo) return {}
    const preset = route.meta.seo || ROUTE_SEO[route.name]
    if (!preset) {
      return buildHead({ path: route.path })
    }
    return buildHead({
      ...preset,
      path: route.fullPath.split('?')[0],
    })
  })
}
