import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { buildHead, buildStaticRouteHead } from '@/seo/headData'
import { getLocaleId } from '@/composables/useLanguage'
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

/** Apply SEO tags from a plain object (reactive when passed a getter/ref watch). */
export function useSeo(getOptions) {
  const resolve = typeof getOptions === 'function' ? getOptions : () => getOptions

  useHead(() => {
    trackSiteSettingsForHead()
    return buildHead(resolve(), getLocaleId())
  })
}

/** Default SEO for static routes from `route.meta.seo` or `ROUTE_SEO[name]`. */
export function useRouteSeo() {
  const route = useRoute()

  useHead(() => {
    if (route.meta.dynamicSeo) return {}
    trackSiteSettingsForHead()
    return buildStaticRouteHead(route, getLocaleId())
  })
}
