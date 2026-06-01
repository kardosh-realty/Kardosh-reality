/** Public admin app URL (separate Vercel project). Set VITE_DASHBOARD_URL in kardosh/.env */
export const DASHBOARD_URL = String(import.meta.env.VITE_DASHBOARD_URL || '').replace(/\/+$/, '')

export function dashboardUrl(path = '/') {
  if (!DASHBOARD_URL) return null
  const p = path.startsWith('/') ? path : `/${path}`
  return `${DASHBOARD_URL}${p}`
}

/** Paths that exist only on the Dashboard app — redirect when VITE_DASHBOARD_URL is set. */
export const DASHBOARD_ONLY_PATHS = [
  '/inquiries',
  '/login',
  '/reset-password',
  '/reports',
  '/settings',
  '/notifications',
  '/testimonials',
  '/team',
  '/blog',
  '/off-plan/communities',
  '/off-plan/developers',
  '/off-plan/projects',
]

export function isDashboardOnlyPath(path) {
  const p = path.split('?')[0]
  if (DASHBOARD_ONLY_PATHS.includes(p)) return true
  return /^\/off-plan\/projects\/[^/]+$/.test(p)
}

export function redirectToDashboard(fullPath) {
  const target = dashboardUrl(fullPath)
  if (!target) return false
  window.location.assign(target)
  return true
}
