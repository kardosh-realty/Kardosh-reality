import { createRouter, createWebHistory } from 'vue-router'
import { ensureAuthReady, useAuth } from '@/composables/useAuth'

import Index from '@/views/index.vue'
import Communities from '@/views/off-plan/communities.vue'
import Developers from '@/views/off-plan/developers.vue'
import Projects from '@/views/off-plan/projects.vue'
import PropertyDetail from '@/views/property-detail.vue'
import Inquiries from '@/views/inquiries.vue'
import Testimonials from '@/views/testimonials.vue'
import Blog from '@/views/blog.vue'
import Team from '@/views/team.vue'
import Notifications from '@/views/notifications.vue'
import Reports from '@/views/reports.vue'
import Settings from '@/views/settings.vue'

import Login from '@/views/login.vue'
import ResetPassword from '@/views/reset-password.vue'
import Error from '@/views/error.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Index },

  { path: '/off-plan/communities', name: 'communities', component: Communities },
  { path: '/off-plan/developers', name: 'developers', component: Developers },
  { path: '/off-plan/projects', name: 'projects', component: Projects },
  { path: '/off-plan/projects/:id', name: 'project-detail', component: PropertyDetail },

  { path: '/inquiries', name: 'inquiries', component: Inquiries },
  { path: '/testimonials', name: 'testimonials', component: Testimonials },
  { path: '/blog', name: 'blog', component: Blog },
  { path: '/team', name: 'team', component: Team },
  { path: '/notifications', name: 'notifications', component: Notifications },
  { path: '/reports', name: 'reports', component: Reports },
  { path: '/settings', name: 'settings', component: Settings },

  { path: '/login', name: 'login', component: Login },
  { path: '/reset-password', name: 'reset-password', component: ResetPassword },

  { path: '/:pathMatch(.*)*', name: 'not-found', component: Error },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/** Public routes that never require an admin session. */
const PUBLIC_ROUTES = new Set(['/login', '/reset-password'])

router.beforeEach(async (to) => {
  await ensureAuthReady()
  const { isAuthenticated } = useAuth()
  const isPublic = PUBLIC_ROUTES.has(to.path)

  if (!isAuthenticated.value) {
    return isPublic ? true : { path: '/login', query: { redirect: to.fullPath } }
  }

  // Already signed in → keep admins out of the login screen
  if (to.path === '/login') return { path: '/' }

  return true
})

export default router
