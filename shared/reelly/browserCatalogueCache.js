export const DEFAULT_CACHE_TTL_MS = 1000 * 60 * 60 * 12
export const DEFAULT_STALE_MAX_MS = 1000 * 60 * 60 * 24 * 7

/**
 * Read a browser-persisted catalogue payload with optional stale tolerance.
 * @returns {{ data: unknown, savedAt: number, age: number, fresh: boolean, stale: boolean } | null}
 */
export function readBrowserCatalogueCache(
  key,
  {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    staleMaxMs = DEFAULT_STALE_MAX_MS,
    allowStale = true,
    arrayOnly = false,
  } = {}
) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { savedAt, data } = JSON.parse(raw)
    if (data == null) return null
    if (arrayOnly && !Array.isArray(data)) return null
    const age = Date.now() - savedAt
    if (age <= ttlMs) {
      return { data, savedAt, age, fresh: true, stale: false }
    }
    if (allowStale && age <= staleMaxMs) {
      return { data, savedAt, age, fresh: false, stale: true }
    }
    return null
  } catch {
    return null
  }
}

export function writeBrowserCatalogueCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    /* quota / private mode */
  }
}
