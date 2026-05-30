import { normalizeList } from './normalize'

const BASE = '/api/reelly'

const DEFAULT_QUERY = {
  language: 'en-us',
  preferred_currency: 'AED',
  preferred_area_unit: 'm2',
}

function buildQuery(params = {}) {
  const merged = { ...DEFAULT_QUERY, ...params }
  const q = new URLSearchParams()
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.set(k, String(v))
  })
  return q.toString()
}

async function reellyFetch(path, params = {}) {
  const qs = buildQuery(params)
  const url = qs ? `${BASE}${path}?${qs}` : `${BASE}${path}`
  const controller = new AbortController()
  const timeoutMs = 90_000
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  let res
  try {
    res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
  } catch (e) {
    if (e?.name === 'AbortError') {
      const err = new Error('Reelly API timed out — the server took too long to respond.')
      err.status = 408
      throw err
    }
    throw e
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) {
    const err = new Error(`Reelly API error: ${res.status}`)
    err.status = res.status
    throw err
  }

  return res.json()
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

export async function fetchDeveloperById(id) {
  return reellyFetch(`/developers/${id}`)
}

export async function fetchDeveloperLogos() {
  const data = await reellyFetch('/developers/logos')
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
