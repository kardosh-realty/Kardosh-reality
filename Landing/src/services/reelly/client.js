import { normalizeList } from './normalize'
import { reellyQueryParams } from './locale'

const BASE = '/api/reelly'
const RETRYABLE = new Set([429, 502, 503, 504])

function buildQuery(params = {}) {
  const merged = { ...reellyQueryParams(), ...params }
  const q = new URLSearchParams()
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.set(k, String(v))
  })
  return q.toString()
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function reellyFetch(path, params = {}, { retries = 3, timeoutMs } = {}) {
  const qs = buildQuery(params)
  const url = qs ? `${BASE}${path}?${qs}` : `${BASE}${path}`
  const controller = new AbortController()
  const waitMs = timeoutMs ?? (path.startsWith('/catalogue/') ? 180_000 : 120_000)
  const timer = setTimeout(() => controller.abort(), waitMs)

  try {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        if (res.ok || !RETRYABLE.has(res.status) || attempt === retries - 1) {
          if (!res.ok) {
            const err = new Error(`Unable to load project catalogue (${res.status})`)
            err.status = res.status
            throw err
          }
          return res.json()
        }
      } catch (e) {
        if (e?.name === 'AbortError') {
          const err = new Error('The project catalogue took too long to load. Please try again.')
          err.status = 408
          throw err
        }
        if (!RETRYABLE.has(e?.status) || attempt === retries - 1) throw e
      }
      await sleep(400 * (attempt + 1))
    }
  } finally {
    clearTimeout(timer)
  }

  throw new Error('Unable to load project catalogue')
}

/** @see https://docs.reelly.ai/docs/reelly-api-v20-getting-started */

// ——— Projects ———
export async function fetchProjects(params = {}) {
  const data = await reellyFetch('/projects', {
    country: 'United Arab Emirates',
    limit: '50',
    offset: '0',
    ...params,
  })
  return normalizeList(data)
}

/** Fetch every UAE project page from Reelly (single aggregated server request). */
export async function fetchAllProjects(params = {}) {
  const data = await reellyFetch('/catalogue/projects', {
    country: 'United Arab Emirates',
    ...params,
  })
  return normalizeList(data)
}

export async function fetchProjectById(id, params = {}) {
  return reellyFetch(`/projects/${id}`, params)
}

export async function fetchProjectBySlug(slug, params = {}) {
  return reellyFetch(`/projects/slug/${slug}`, params)
}

export async function fetchProjectMarkers(params = {}) {
  const data = await reellyFetch('/projects/markers', {
    country: 'United Arab Emirates',
    limit: '50',
    offset: '0',
    ...params,
  })
  return normalizeList(data)
}

/** Fetch every map marker page from Reelly (single aggregated server request). */
export async function fetchAllProjectMarkers(params = {}) {
  const data = await reellyFetch('/catalogue/markers', {
    country: 'United Arab Emirates',
    ...params,
  })
  return normalizeList(data)
}

/** @see https://docs.reelly.ai/docs/available-units — Business/Enterprise only */
export async function fetchProjectUnits(projectId, params = {}) {
  const data = await reellyFetch(`/projects/${projectId}/units`, {
    limit: '50',
    offset: '0',
    ...params,
  })
  return normalizeList(data)
}

// ——— Developers ———
export async function fetchDevelopers(params = {}) {
  const data = await reellyFetch('/developers', params)
  return normalizeList(data)
}

export async function fetchDeveloperById(id, params = {}) {
  return reellyFetch(`/developers/${id}`, params)
}

export async function fetchDeveloperLogos(params = {}) {
  const data = await reellyFetch('/developers/logos', params)
  return normalizeList(data)
}

/** Fetch all developer logos (single aggregated server request). */
export async function fetchAllDeveloperLogos(params = {}) {
  const data = await reellyFetch('/catalogue/developer-logos', params)
  return normalizeList(data)
}

export async function fetchDeveloperLogo(id) {
  return reellyFetch(`/developers/${id}/logo`)
}

// ——— Metadata ———
export async function fetchCountries() {
  return reellyFetch('/countries')
}

export async function fetchRegions() {
  return reellyFetch('/regions')
}

export async function fetchDistricts() {
  return reellyFetch('/districts')
}

export async function fetchProjectLanguages() {
  return reellyFetch('/projects/languages')
}

export async function fetchUnitTypes() {
  return reellyFetch('/units/types')
}
