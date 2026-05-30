import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { scrollBehaviorOption } from '@/utils/smoothScroll'

/** Align with page-cross out-in transition in App.vue */
const PAGE_TRANSITION_MS = 420

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

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index/index.vue'),
  },
  {
    path: '/off-plan',
    name: 'off-plan',
    component: () => import('@/views/listings/ListingsView.vue'),
    props: { mode: 'off-plan' },
  },
  {
    path: '/why-dubai',
    name: 'why-dubai',
    component: () => import('@/views/kardosh/why-dubai.vue'),
  },
  {
    path: '/communities',
    name: 'communities',
    component: () => import('@/views/kardosh/communities.vue'),
  },
  {
    path: '/communities/:slug',
    name: 'community-detail',
    component: () => import('@/views/kardosh/community-detail.vue'),
  },
  {
    path: '/rent',
    name: 'rent',
    component: () => import('@/views/listings/ListingsView.vue'),
    props: { mode: 'rent' },
  },
  {
    path: '/sell',
    name: 'sell',
    component: () => import('@/views/sell.vue'),
  },
  {
    path: '/grid-map',
    name: 'grid-map',
    component: () => import('@/views/listing/grid-view/grid-map.vue'),
  },
  {
    path: '/developers',
    name: 'developers',
    component: () => import('@/views/reelly/developers.vue'),
  },
  {
    path: '/developer/:id',
    name: 'developer-detail',
    component: () => import('@/views/reelly/developer-detail.vue'),
  },
  {
    path: '/property-detail/:id?',
    name: 'property-detail',
    component: () => import('@/views/listing/property-detail/property-detail.vue'),
  },
  {
    path: '/about',
    redirect: '/aboutus',
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('@/views/pages/aboutus.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/contact.vue'),
  },
  {
    path: '/share-review/:token',
    name: 'share-review',
    component: () => import('@/views/kardosh/share-review.vue'),
    meta: { minimalLayout: true },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/pages/utility/terms.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/pages/utility/privacy.vue'),
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('@/views/pages/blog/blogs.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('@/views/pages/blog/blog-detail.vue'),
  },
  ...removedToOffPlan.map((path) => ({ path, redirect: '/off-plan' })),
  ...removedToHome.map((path) => ({ path, redirect: '/' })),
  { path: '/agent-profile/:id?', redirect: '/' },
  { path: '/agency-profile/:id?', redirect: '/' },
  { path: '/blog-detail/:id', redirect: (to) => ({ path: `/blog/${to.params.id}` }) },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/pages/special-pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const behavior = scrollBehaviorOption()
    const isInitialLoad = from === START_LOCATION

    const runAfterTransition = (resolve) => {
      setTimeout(resolve, PAGE_TRANSITION_MS)
    }

    /** Full refresh / first entry — jump to top immediately (hero on home) */
    if (isInitialLoad) {
      if (to.hash) {
        return { el: to.hash, top: 88, behavior: 'auto' }
      }
      return { top: 0, left: 0, behavior: 'auto' }
    }

    if (savedPosition) {
      return new Promise((resolve) => {
        runAfterTransition(() => resolve({ ...savedPosition, behavior }))
      })
    }

    if (to.hash) {
      return new Promise((resolve) => {
        runAfterTransition(() =>
          resolve({
            el: to.hash,
            behavior,
            top: 88,
          })
        )
      })
    }

    return new Promise((resolve) => {
      runAfterTransition(() => resolve({ top: 0, left: 0, behavior }))
    })
  },
})

/** Belt-and-suspenders after hydration on direct loads */
router.isReady().then(() => {
  if (!router.currentRoute.value.hash) {
    window.scrollTo(0, 0)
  }
})

export default router
