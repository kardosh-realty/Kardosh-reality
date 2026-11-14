import { createRouter, createWebHistory } from '@/lib/vue-router-core.js'
import { scrollBehaviorOption } from '@/utils/smoothScroll'
import { isDashboardOnlyPath, redirectToDashboard } from '@/config/dashboard'
import { stripLocaleFromPath } from '@/config/i18n'
import { syncLocaleFromRoute } from '@/composables/useLanguage'
import { routes } from './routes'
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
