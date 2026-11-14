/**
 * Fallback mirror of `src/router/routes.js`, used only when the SEO bundle
 * (`dist-ssr/serverEntry.js`) is missing or fails — that bundle resolves paths
 * with the real route table. Decides whether the SPA shell answers 200 or 404
 * (unknown paths still render the Vue 404 page; only the HTTP status changes).
 */

/** Exact paths (without the optional trailing `/pt` locale segment). */
const STATIC_PATHS = new Set([
  '/',
  '/off-plan',
  '/why-dubai',
  '/communities',
  '/rent',
  '/sell',
  '/grid-map',
  '/developers',
  '/about',
  '/aboutus',
  '/contact',
  '/terms',
  '/privacy',
  '/cookie-policy',
  '/finance-policy',
  '/blogs',
  // Legacy URLs redirected client-side by the router
  '/buy',
  '/grid',
  '/list',
  '/list-sidebar',
  '/list-map',
  '/grid-sidebar',
  '/property-detail-two',
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
  '/agent-profile',
  '/agency-profile',
  // Dashboard-only paths (router redirects to the admin app) — see src/config/dashboard.js
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
])

/** `prefix/:param` routes — exactly one segment after the prefix. */
const PARAM_PREFIXES = [
  '/communities/',
  '/developer/',
  '/property-detail/',
  '/share-review/',
  '/blog/',
  '/agent-profile/',
  '/agency-profile/',
  '/blog-detail/',
  '/off-plan/projects/',
]

export function isKnownSpaRoute(pathname) {
  let p = String(pathname || '/')
  try {
    p = decodeURIComponent(p)
  } catch {
    return false
  }

  // Legacy `/pt/...` prefix URLs are redirected client-side to the suffix form.
  if (p === '/pt' || p.startsWith('/pt/')) return true

  p = p.replace(/\/+$/, '') || '/'
  p = p.replace(/\/pt$/, '') || '/'

  if (STATIC_PATHS.has(p)) return true

  return PARAM_PREFIXES.some((prefix) => {
    if (!p.startsWith(prefix)) return false
    const rest = p.slice(prefix.length)
    return rest.length > 0 && !rest.includes('/')
  })
}
