/**
 * Node entry for server-rendered SEO head tags (built with `vite build --ssr`
 * into `dist-ssr/`, loaded by `server/hostinger-server.mjs`).
 *
 * Resolves the request path against the app's own route table and reuses the
 * same head builders as the browser app, so crawlers and link-preview bots that
 * don't run JavaScript get the real title, description, canonical, Open Graph
 * tags and JSON-LD. The Vue app still renders the page body in the browser.
 *
 * Dynamic data (properties, developers, blogs) is fetched in English with a
 * short timeout and cached; on timeout or error the page gets generic tags and
 * the browser app fills them in as before.
 */
import { createRouter, createMemoryHistory } from '@/lib/vue-router-core.js'
import { createHead, transformHtmlTemplate } from '@unhead/vue/server'
import { routes } from '@/router/routes'
import { buildHead, buildStaticRouteHead } from '@/seo/headData'
import { propertySeo, communitySeo, blogSeo, developerSeo } from '@/seo/pageSeo'
import { localeFromPath, stripLocaleFromPath } from '@/config/i18n'
import { isDashboardOnlyPath } from '@/config/dashboard'
import { findCommunity, emirateLabel } from '@/config/communities'
import {
  projectDetailPath,
  developerDetailPath,
  isNumericRouteParam,
  slugRedirectTarget,
} from '@/utils/seoRoutes'
import { loadVisibility, isCommunityHidden } from '@/services/visibility'
import { loadSiteSettings } from '@/composables/useSiteSettings'
import { getListingById, fetchDeveloperDetail } from '@/composables/useReelly'
import { fetchBlogBySlug } from '@/services/blogs'

const LOOKUP_TIMEOUT_MS = 1500
const HIT_TTL_MS = 60 * 60 * 1000
const MISS_TTL_MS = 5 * 60 * 1000
const MAX_CACHE_ENTRIES = 5000
const VISIBILITY_REFRESH_MS = 10 * 60 * 1000

const TIMED_OUT = Symbol('timed-out')

const router = createRouter({ history: createMemoryHistory(), routes })

/** key → { value, expires } */
const cache = new Map()
/** key → in-flight promise (shared by concurrent requests, outlives the timeout) */
const inflight = new Map()

function cacheSet(key, value, ttl) {
  if (cache.size >= MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value)
  cache.set(key, { value, expires: Date.now() + ttl })
}

/**
 * Cached lookup with a response-time budget. A slow lookup keeps running in the
 * background and fills the cache for the next request.
 * Resolves to the value, `null` (definitely not found) or TIMED_OUT (unknown).
 */
function lookup(key, loader) {
  const hit = cache.get(key)
  if (hit && hit.expires > Date.now()) return Promise.resolve(hit.value)

  let pending = inflight.get(key)
  if (!pending) {
    pending = Promise.resolve()
      .then(loader)
      .then((value) => {
        cacheSet(key, value ?? null, value ? HIT_TTL_MS : MISS_TTL_MS)
        return value ?? null
      })
      .catch((err) => {
        console.warn(`[seo] ${key} lookup failed:`, err?.message || err)
        return TIMED_OUT
      })
      .finally(() => inflight.delete(key))
    inflight.set(key, pending)
  }

  return Promise.race([
    pending,
    new Promise((resolve) => setTimeout(() => resolve(TIMED_OUT), LOOKUP_TIMEOUT_MS)),
  ])
}

let initialized = false

/** Call once at server start. `apiFetch` serves `/api/reelly/*` in-process (fetch-compatible). */
export function initSeoServer({ apiFetch }) {
  if (initialized) return
  initialized = true
  globalThis.__KARDOSH_SSR_FETCH__ = apiFetch
  void loadSiteSettings()
  void loadVisibility()
  setInterval(() => void loadVisibility(true).catch(() => {}), VISIBILITY_REFRESH_MS).unref()
}

function redirectTarget(resolved) {
  const record = resolved.matched[resolved.matched.length - 1]
  if (!record?.redirect) return null
  try {
    const raw = typeof record.redirect === 'function' ? record.redirect(resolved) : record.redirect
    return router.resolve(raw).fullPath
  } catch {
    return null
  }
}

async function dynamicHead(resolved, path, locale, query) {
  const slug = String(resolved.params.slug || '')

  switch (resolved.name) {
    case 'property-detail': {
      const p = await lookup(`property:${slug}`, () => getListingById(slug))
      if (!p || p === TIMED_OUT) return { status: 200, head: null }
      if (isNumericRouteParam(slug)) {
        const target = slugRedirectTarget(path, projectDetailPath(p))
        if (target) return { status: 301, location: target }
      }
      const isEmbed = query.get('embed') === '1' || query.get('embed') === 'true'
      return { status: 200, head: buildHead(propertySeo(p, path, { isEmbed }), locale) }
    }

    case 'developer-detail': {
      const d = await lookup(`developer:${slug}`, () => fetchDeveloperDetail(slug))
      if (!d || d === TIMED_OUT) return { status: 200, head: null }
      if (isNumericRouteParam(slug)) {
        const target = slugRedirectTarget(path, developerDetailPath(d))
        if (target) return { status: 301, location: target }
      }
      return { status: 200, head: buildHead(developerSeo(d, path), locale) }
    }

    case 'blog-detail': {
      const result = await lookup(`blog:${slug}`, async () => {
        const { item, configured } = await fetchBlogBySlug(slug)
        if (!configured) throw new Error('Supabase not configured')
        return item
      })
      if (result === TIMED_OUT) return { status: 200, head: null }
      if (!result) {
        return { status: 404, head: buildHead(blogSeo(null, path, { notFound: true }), locale) }
      }
      return { status: 200, head: buildHead(blogSeo(result, path), locale) }
    }

    case 'community-detail': {
      const found = findCommunity(slug)
      const community = found && !isCommunityHidden(found.slug) ? found : null
      const emirate = community ? emirateLabel(community.emirate) : 'UAE'
      return {
        status: community ? 200 : 404,
        head: buildHead(communitySeo(community, path, emirate), locale),
      }
    }

    default:
      return { status: 200, head: null }
  }
}

/**
 * Resolve SEO for a request URL.
 * @returns {Promise<{ status: number, location?: string, head?: object | null }>}
 */
export async function resolveSeo(rawUrl) {
  const url = new URL(rawUrl, 'http://localhost')
  const path = url.pathname
  const locale = localeFromPath(path)

  let resolved
  try {
    resolved = router.resolve(path)
  } catch {
    return { status: 200, head: null }
  }

  const location = redirectTarget(resolved)
  if (location) {
    return location === path ? { status: 200, head: null } : { status: 301, location }
  }

  if (resolved.name === 'NotFound') {
    // Admin-only paths are redirected to the dashboard by the browser router.
    if (isDashboardOnlyPath(stripLocaleFromPath(path))) {
      return { status: 200, head: buildHead({ path, robots: 'noindex, follow' }, locale) }
    }
    return { status: 404, head: buildStaticRouteHead(resolved, locale) }
  }

  if (resolved.meta?.dynamicSeo) {
    const result = await dynamicHead(resolved, path, locale, url.searchParams)
    // Unknown data (timeout/error): fall back to generic tags with the right canonical.
    if (result.status === 200 && !result.head) {
      result.head = buildHead({ path }, locale)
    }
    return result
  }

  return { status: 200, head: buildStaticRouteHead(resolved, locale) }
}

const STATIC_TITLE_RE = /<title>[^<]*<\/title>\s*/i
const STATIC_DESCRIPTION_RE = /<meta\s+name="description"[^>]*>\s*/i

/**
 * Render the SPA shell for a request with its SEO head tags.
 * @returns {Promise<{ status: number, location?: string, html?: string }>}
 */
export async function renderSeoPage(template, rawUrl) {
  const result = await resolveSeo(rawUrl)
  if (result.status === 301) return result

  // The shell already has charset/viewport — skip unhead's defaults.
  const head = createHead({ disableDefaults: true })
  head.push(result.head || {})
  // The shell's own title/description would duplicate the rendered ones.
  const shell = template.replace(STATIC_TITLE_RE, '').replace(STATIC_DESCRIPTION_RE, '')
  const html = await transformHtmlTemplate(head, shell)
  return { status: result.status, html }
}
