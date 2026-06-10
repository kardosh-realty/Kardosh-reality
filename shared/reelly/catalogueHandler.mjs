import { fetchAllPaginatedConcurrent } from './pagination.js'
import { readDiskCatalogue, writeDiskCatalogue } from './catalogueDiskCache.mjs'

const UPSTREAM = 'https://api-reelly.up.railway.app/api/v2/clients'
const CACHE_TTL_MS = 1000 * 60 * 60 * 6
const DISK_STALE_MS = 1000 * 60 * 60 * 24 * 7
const PAGE_CONCURRENCY = 3
const MAX_UPSTREAM_CONCURRENCY = 3

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
    return fetchAllPaginatedConcurrent(
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
      { concurrency: PAGE_CONCURRENCY }
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

function storeCatalogue(key, payload) {
  memoryCache.set(key, { expires: Date.now() + CACHE_TTL_MS, payload })
  writeDiskCatalogue(key, payload)
  return payload
}

function refreshCatalogue(kind, searchParams, apiKey, key) {
  if (inflight.has(key)) return inflight.get(key)

  const promise = fetchCataloguePayload(kind, searchParams, apiKey)
    .then((payload) => storeCatalogue(key, payload))
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, promise)
  return promise
}

/**
 * Serve a fully aggregated Reelly catalogue (projects, markers, developer logos).
 * Memory + disk cache with stale-while-revalidate for fast cold starts.
 */
export async function handleCatalogueRequest(kind, searchParams, apiKey) {
  if (!CATALOGUE_ROUTES[kind]) return null

  const key = cacheKey(kind, searchParams)

  const mem = memoryCache.get(key)
  if (mem && mem.expires > Date.now()) return mem.payload

  if (inflight.has(key)) return inflight.get(key)

  const disk = readDiskCatalogue(key)
  if (disk && disk.age < CACHE_TTL_MS) {
    memoryCache.set(key, { expires: Date.now() + CACHE_TTL_MS, payload: disk.payload })
    return disk.payload
  }

  if (disk && disk.age < DISK_STALE_MS) {
    memoryCache.set(key, { expires: Date.now() + 60_000, payload: disk.payload })
    void refreshCatalogue(kind, searchParams, apiKey, key)
    return disk.payload
  }

  return refreshCatalogue(kind, searchParams, apiKey, key)
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
