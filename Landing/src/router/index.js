import { createRouter, createWebHistory } from '@/lib/vue-router-core.js'
import { scrollBehaviorOption } from '@/utils/smoothScroll'
import { isDashboardOnlyPath, redirectToDashboard } from '@/config/dashboard'
import {
  DEFAULT_LOCALE,
  localeFromPath,
  localePath,
  migrateLegacyLocalePrefix,
  stripLocaleFromPath,
} from '@/config/i18n'
import { syncLocaleFromRoute } from '@/composables/useLanguage'

const removedToOffPlan = [
  '/buy',
  '/grid',
  '/list',
  '/list-sidebar',
  '/list-map',
  '/grid-sidebar',
  '/property-detail-two',
]

const removedToHome = [
  '/index-two',
  '/index-three',
  '/index-four',
  '/index-five',
  '/index-six',
  '/index-seven',
  '/index-eight',
  '/index-nine',
  '/index-ten',
  '/index-eleven',
  '/index-twelve',
  '/index-thirteen',
  '/index-fourteen',
  '/features',
  '/pricing',
  '/faq',
  '/agents',
  '/agencies',
  '/auth-login',
  '/auth-signup',
  '/auth-re-password',
  '/blog-sidebar',
  '/comingsoon',
  '/maintenance',
]

function localeFromTo(to) {
  if (to?.params?.locale === 'pt') return 'pt'
  return localeFromPath(to?.path || '/')
}

function redirectKeepingLocale(targetPath) {
  return (to) => localePath(targetPath, localeFromTo(to))
}

/** Append optional trailing `/pt` segment to a route path. */
function withLocaleSuffix(path) {
  const clean = String(path || '').replace(/^\//, '').replace(/\/$/, '')
  return clean ? `/${clean}/:locale(pt)?` : '/:locale(pt)?'
}

const appRoutes = [
  {
    path: withLocaleSuffix(''),
    name: 'index',
    component: () => import('@/views/index/index.vue'),
  },
  {
    path: withLocaleSuffix('off-plan'),
    name: 'off-plan',
    component: () => import('@/views/listings/ListingsView.vue'),
    props: { mode: 'off-plan' },
  },
  {
    path: withLocaleSuffix('why-dubai'),
    name: 'why-dubai',
    component: () => import('@/views/kardosh/why-dubai.vue'),
  },
  {
    path: withLocaleSuffix('communities'),
    name: 'communities',
    component: () => import('@/views/kardosh/communities.vue'),
  },
  {
    path: withLocaleSuffix('communities/:slug'),
    name: 'community-detail',
    meta: { dynamicSeo: true },
    component: () => import('@/views/kardosh/community-detail.vue'),
  },
  {
    path: withLocaleSuffix('rent'),
    name: 'rent',
    component: () => import('@/views/listings/ListingsView.vue'),
    props: { mode: 'rent' },
  },
  {
    path: withLocaleSuffix('sell'),
    name: 'sell',
    component: () => import('@/views/sell.vue'),
  },
  {
    path: withLocaleSuffix('grid-map'),
    name: 'grid-map',
    component: () => import('@/views/listing/grid-view/grid-map.vue'),
  },
  {
    path: withLocaleSuffix('developers'),
    name: 'developers',
    component: () => import('@/views/reelly/developers.vue'),
  },
  {
    path: withLocaleSuffix('developer/:slug'),
    name: 'developer-detail',
    meta: { dynamicSeo: true },
    component: () => import('@/views/reelly/developer-detail.vue'),
  },
  {
    path: withLocaleSuffix('property-detail/:slug'),
    name: 'property-detail',
    meta: { dynamicSeo: true },
    component: () => import('@/views/listing/property-detail/property-detail.vue'),
  },
  {
    path: withLocaleSuffix('about'),
    redirect: (to) => ({
      name: 'aboutus',
      params: { ...to.params, locale: to.params.locale },
    }),
  },
  {
    path: withLocaleSuffix('aboutus'),
    name: 'aboutus',
    component: () => import('@/views/pages/aboutus.vue'),
  },
  {
    path: withLocaleSuffix('contact'),
    name: 'contact',
    component: () => import('@/views/contact.vue'),
  },
  {
    path: withLocaleSuffix('share-review/:token'),
    name: 'share-review',
    component: () => import('@/views/kardosh/share-review.vue'),
    meta: { minimalLayout: true },
  },
  {
    path: withLocaleSuffix('terms'),
    name: 'terms',
    component: () => import('@/views/pages/utility/LegalDocumentView.vue'),
    props: { legalKey: 'terms' },
  },
  {
    path: withLocaleSuffix('privacy'),
    name: 'privacy',
    component: () => import('@/views/pages/utility/LegalDocumentView.vue'),
    props: { legalKey: 'privacy' },
  },
  {
    path: withLocaleSuffix('cookie-policy'),
    name: 'cookie-policy',
    component: () => import('@/views/pages/utility/LegalDocumentView.vue'),
    props: { legalKey: 'cookie' },
  },
  {
    path: withLocaleSuffix('finance-policy'),
    name: 'finance-policy',
    component: () => import('@/views/pages/utility/LegalDocumentView.vue'),
    props: { legalKey: 'finance' },
  },
  {
    path: withLocaleSuffix('blogs'),
    name: 'blogs',
    component: () => import('@/views/pages/blog/blogs.vue'),
  },
  {
    path: withLocaleSuffix('blog/:slug'),
    name: 'blog-detail',
    meta: { dynamicSeo: true },
    component: () => import('@/views/pages/blog/blog-detail.vue'),
  },
  ...removedToOffPlan.map((path) => ({
    path: withLocaleSuffix(path.replace(/^\//, '')),
    redirect: redirectKeepingLocale('/off-plan'),
  })),
  ...removedToHome.map((path) => ({
    path: withLocaleSuffix(path.replace(/^\//, '')),
    redirect: redirectKeepingLocale('/'),
  })),
  {
    path: withLocaleSuffix('agent-profile/:id?'),
    redirect: redirectKeepingLocale('/'),
  },
  {
    path: withLocaleSuffix('agency-profile/:id?'),
    redirect: redirectKeepingLocale('/'),
  },
  {
    path: withLocaleSuffix('blog-detail/:id'),
    redirect: (to) => localePath(`/blog/${to.params.id}`, localeFromTo(to)),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/pages/special-pages/404.vue'),
  },
]

const routes = [
  /** Legacy prefix URLs (`/pt/off-plan`) → suffix (`/off-plan/pt`) */
  {
    path: '/pt/:rest(.*)',
    redirect: (to) => {
      const legacy = to.params.rest ? `/pt/${to.params.rest}` : '/pt'
      return migrateLegacyLocalePrefix(legacy) || '/pt'
    },
  },
  ...appRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const behavior = scrollBehaviorOption()
    const isInitialLoad = from.matched.length === 0

    if (isInitialLoad) {
      if (to.hash) {
        return { el: to.hash, top: 88, behavior: 'auto' }
      }
      return { top: 0, left: 0, behavior: 'auto' }
    }

    if (savedPosition) {
      return { ...savedPosition, behavior }
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior,
        top: 88,
      }
    }

    return { top: 0, left: 0, behavior: 'auto' }
  },
})

router.beforeEach((to) => {
  syncLocaleFromRoute(to)

  const barePath = stripLocaleFromPath(to.path)
  if (isDashboardOnlyPath(barePath) && redirectToDashboard(to.fullPath)) {
    return false
  }
})

router.isReady().then(() => {
  if (!router.currentRoute.value.hash) {
    window.scrollTo(0, 0)
  }
})

export default router
