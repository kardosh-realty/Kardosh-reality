import { fetchAllPaginated } from './pagination.js'

const UPSTREAM = 'https://api-reelly.up.railway.app/api/v2/clients'
const CACHE_TTL_MS = 1000 * 60 * 60 * 6
const PAGE_DELAY_MS = 150
const MAX_UPSTREAM_CONCURRENCY = 2

/** @type {Map<string, { expires: number, payload: object }>} */
const memoryCache = new Map()
/** @type {Map<string, Promise<object>>} */
const inflight = new Map()

const CATALOGUE_ROUTES = {
  projects: { path: 'projects', requireCountry: true, paginate: true },
  markers: { path: 'projects/markers', requireCountry: true, paginate: true },
  'developer-logos': { path: 'developers/logos', requireCountry: false, paginate: false },
}

let upstreamActive = 0
/** @type {Array<() => void>} */
const upstreamWaiters = []

function normalizeList(data) {
  if (Array.isArray(data)) {
    return { count: data.length, results: data }
  }
  return {
    count: data?.count ?? data?.results?.length ?? 0,
    results: data?.results ?? [],
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function cacheKey(kind, searchParams) {
  const entries = [...searchParams.entries()].sort(([a], [b]) => a.localeCompare(b))
  return `${kind}?${entries.map(([k, v]) => `${k}=${v}`).join('&')}`
}

async function acquireUpstreamSlot() {
  if (upstreamActive < MAX_UPSTREAM_CONCURRENCY) {
    upstreamActive++
    return
  }
  await new Promise((resolve) => upstreamWaiters.push(resolve))
  upstreamActive++
}

function releaseUpstreamSlot() {
  upstreamActive--
  const next = upstreamWaiters.shift()
  if (next) next()
}

async function upstreamFetch(apiKey, path, searchParams, { retries = 3 } = {}) {
  const qs = searchParams.toString()
  const url = `${UPSTREAM}/${path}${qs ? `?${qs}` : ''}`

  await acquireUpstreamSlot()
  try {
    for (let attempt = 0; attempt < retries; attempt++) {
      const res = await fetch(url, {
        headers: { Accept: 'application/json', 'X-API-Key': apiKey },
      })
      if (res.ok || (res.status < 500 && res.status !== 429)) return res
      if (attempt < retries - 1) await sleep(400 * (attempt + 1))
    }
    return fetch(url, {
      headers: { Accept: 'application/json', 'X-API-Key': apiKey },
    })
  } finally {
    releaseUpstreamSlot()
  }
}

async function fetchCataloguePayload(kind, searchParams, apiKey) {
  const cfg = CATALOGUE_ROUTES[kind]
  if (!cfg) return null

  const params = new URLSearchParams(searchParams)
  if (cfg.requireCountry && !params.get('country')) {
    params.set('country', 'United Arab Emirates')
  }

  if (cfg.paginate) {
    return fetchAllPaginated(
      async (page) => {
        const pageParams = new URLSearchParams(params)
        pageParams.set('limit', page.limit)
        pageParams.set('offset', page.offset)
        const res = await upstreamFetch(apiKey, cfg.path, pageParams)
        if (!res.ok) {
          const err = new Error(`Reelly upstream returned ${res.status}`)
          err.status = res.status
          throw err
        }
        return normalizeList(await res.json())
      },
      { pageDelayMs: PAGE_DELAY_MS }
    )
  }

  const res = await upstreamFetch(apiKey, cfg.path, params)
  if (!res.ok) {
    const err = new Error(`Reelly upstream returned ${res.status}`)
    err.status = res.status
    throw err
  }
  return normalizeList(await res.json())
}

/**
 * Serve a fully aggregated Reelly catalogue (projects, markers, developer logos).
 * Cached in memory with single-flight deduplication for concurrent requests.
 */
export async function handleCatalogueRequest(kind, searchParams, apiKey) {
  if (!CATALOGUE_ROUTES[kind]) return null

  const key = cacheKey(kind, searchParams)
  const cached = memoryCache.get(key)
  if (cached && cached.expires > Date.now()) return cached.payload

  if (inflight.has(key)) return inflight.get(key)

  const promise = fetchCataloguePayload(kind, searchParams, apiKey)
    .then((payload) => {
      memoryCache.set(key, { expires: Date.now() + CACHE_TTL_MS, payload })
      return payload
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, promise)
  return promise
}

export function isCatalogueKind(kind) {
  return Boolean(CATALOGUE_ROUTES[kind])
}

/** Pre-fetch catalogues after deploy/restart so the first visitor does not wait. */
export function warmCatalogueCache(apiKey) {
  if (!apiKey) return Promise.resolve()

  const baseParams = new URLSearchParams({
    language: 'en-us',
    preferred_currency: 'AED',
    preferred_area_unit: 'm2',
  })
  const uaeParams = new URLSearchParams(baseParams)
  uaeParams.set('country', 'United Arab Emirates')

  const jobs = [
    ['developer-logos', baseParams],
    ['markers', uaeParams],
    ['projects', uaeParams],
  ]

  return Promise.allSettled(
    jobs.map(async ([kind, params]) => {
      await handleCatalogueRequest(kind, params, apiKey)
      console.log(`[reelly] catalogue warmed: ${kind}`)
    })
  )
}
