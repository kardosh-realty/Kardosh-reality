import { ref, computed, watch } from 'vue'
import {
  fetchProjects,
  fetchProjectById,
  fetchProjectBySlug,
  fetchProjectMarkers,
  fetchProjectUnits,
  fetchDeveloperById,
  fetchDeveloperLogos,
} from '@/services/reelly/client'
import { mapReellyProject, mapReellyMarker } from '@/services/reelly/mapProject'
import { enrichProjectsWithAmenities, clearAmenitiesDetailCache } from '@/services/reelly/enrichAmenities'
import { enrichLiveUnitsWithPlans } from '@/services/reelly/media'
import { properties as localProperties } from '@/component/data/data'
import { formatArea } from '@/config/uae'
import { buildDeveloperStats, enrichDeveloperLogo, mapDeveloper } from '@/utils/mapDeveloper'
import { loadVisibility, isProjectHiddenCascade, slugify } from '@/services/visibility'
import { normalizeRouteSlug, parseSlugParam, projectSlug } from '@/utils/seoRoutes'
import { getLocaleId } from '@/composables/useLanguage'
import {
  reellyLogosCacheKey,
  reellyProjectDetailCacheKey,
  reellyProjectsCacheKey,
  reellyQueryParams,
} from '@/services/reelly/locale'
import { getMessages } from '@/locales'
import {
  localizeCatalogItem,
  localizeLocalListing,
} from '@/services/reelly/localizeCatalog'

const projects = ref([])
const markers = ref([])
const developerLogos = ref([])
const loading = ref(false)
const markersLoading = ref(false)
const error = ref(null)

let projectsPromise = null
let markersPromise = null
let logosPromise = null
let loadedLocale = null
let localeWatcherInstalled = false

const CACHE_TTL_MS = 1000 * 60 * 60 * 12

function readCache(key, { arrayOnly = true } = {}) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { savedAt, data } = JSON.parse(raw)
    if (Date.now() - savedAt > CACHE_TTL_MS) return null
    if (arrayOnly && !Array.isArray(data)) return null
    if (data == null) return null
    return data
  } catch {
    return null
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    /* quota / private mode */
  }
}

function applyVisibility(list) {
  return list.filter((p) => !isProjectHiddenCascade(p))
}

function mapAndLocalizeProject(raw, options = {}) {
  return localizeCatalogItem(mapReellyProject(raw, options), getLocaleId())
}

function mapAndLocalizeMarker(raw) {
  return localizeCatalogItem(mapReellyMarker(raw), getLocaleId())
}

function resetReellyPromises() {
  projectsPromise = null
  markersPromise = null
  logosPromise = null
}

const projectDetailMemory = new Map()

export function invalidateReellyCatalog() {
  resetReellyPromises()
  projectDetailMemory.clear()
  clearAmenitiesDetailCache()
  projects.value = []
  markers.value = []
  loadedLocale = null
}

function installLocaleWatcher() {
  if (localeWatcherInstalled || typeof window === 'undefined') return
  localeWatcherInstalled = true
  watch(
    () => getLocaleId(),
    (next, prev) => {
      if (next === prev) return
      invalidateReellyCatalog()
      void loadProjects(true)
      void loadMarkers(true)
    }
  )
}

export async function loadProjects(force = false) {
  installLocaleWatcher()
  const locale = getLocaleId()

  if (projects.value.length && loadedLocale === locale && !force) return projects.value
  if (projectsPromise && !force && loadedLocale === locale) return projectsPromise

  await loadVisibility()

  const cacheKey = reellyProjectsCacheKey(locale)
  const cached = !force ? readCache(cacheKey) : null
  if (cached?.length) {
    projects.value = applyVisibility(cached)
    loadedLocale = locale
    return projects.value
  }

  if (force || loadedLocale !== locale) {
    resetReellyPromises()
    projects.value = []
  }

  loading.value = true
  error.value = null

  projectsPromise = fetchProjects({ limit: '50', offset: '0', ...reellyQueryParams(locale) })
    .then(async ({ results }) => {
      const mapped = results.map((p) => mapAndLocalizeProject(p))
      if (mapped.length) writeCache(cacheKey, mapped)
      projects.value = applyVisibility(mapped)
      loadedLocale = locale
      void enrichProjectsWithAmenities(projects.value, { locale })
      return projects.value
    })
    .catch((e) => {
      error.value = e.message
      projects.value = []
      return []
    })
    .finally(() => {
      loading.value = false
    })

  return projectsPromise
}

export async function loadMarkers(force = false) {
  installLocaleWatcher()
  const locale = getLocaleId()

  if (markers.value.length && loadedLocale === locale && !force) return markers.value
  if (markersPromise && !force && loadedLocale === locale) return markersPromise

  markersLoading.value = true
  const query = reellyQueryParams(locale)
  markersPromise = Promise.all([
    fetchProjectMarkers({ limit: '50', ...query }),
    fetchProjects({ limit: '50', offset: '0', ...query }).catch(() => ({ results: [] })),
  ])
    .then(([{ results: markerRows }, { results: projectRows }]) => {
      const byId = new Map(projectRows.map((p) => [p.id, p]))
      const merged = markerRows.map((row) => {
        const full = byId.get(row.id)
        return mapAndLocalizeMarker(
          full
            ? { ...full, location: row.location || full.location, id: row.id }
            : row
        )
      })
      markers.value = applyVisibility(merged).filter((m) => m.latitude && m.longitude)
      return markers.value
    })
    .catch(() => {
      markers.value = []
      return []
    })
    .finally(() => {
      markersLoading.value = false
    })

  return markersPromise
}

export async function loadDeveloperLogos(force = false) {
  const locale = getLocaleId()
  if (developerLogos.value.length && !force) return developerLogos.value
  if (logosPromise && !force) return logosPromise

  const cacheKey = reellyLogosCacheKey(locale)
  const cached = !force ? readCache(cacheKey) : null
  if (cached?.length) {
    developerLogos.value = cached
    return cached
  }

  logosPromise = fetchDeveloperLogos()
    .then(({ results }) => {
      developerLogos.value = results
      if (results.length) writeCache(cacheKey, results)
      return results
    })
    .catch(() => developerLogos.value)

  return logosPromise
}

export async function fetchFullProject(id) {
  const locale = getLocaleId()
  const numericId = Number(id)
  const memoryKey = `${locale}:${numericId}`
  if (projectDetailMemory.has(memoryKey)) {
    return projectDetailMemory.get(memoryKey)
  }

  const cacheKey = reellyProjectDetailCacheKey(numericId, locale)
  const cached = readCache(cacheKey, { arrayOnly: false })
  if (cached) {
    projectDetailMemory.set(memoryKey, cached)
    return cached
  }

  const raw = await fetchProjectById(numericId, reellyQueryParams(locale))
  const mapped = mapAndLocalizeProject(raw, { full: true })
  projectDetailMemory.set(memoryKey, mapped)
  writeCache(cacheKey, mapped)
  return mapped
}

export async function fetchProjectUnitsSafe(projectId, typicalUnitsWithPlans = []) {
  const locale = getLocaleId()
  const restrictedMessage =
    getMessages(locale).reelly?.unitInventoryRestricted ||
    'Live unit inventory is not available for this project. Typical units and brochures are still available below.'

  try {
    const { results, count } = await fetchProjectUnits(projectId, {
      limit: '50',
      ...reellyQueryParams(locale),
    })
    const units = enrichLiveUnitsWithPlans(results, typicalUnitsWithPlans)
    return { units, count, restricted: false }
  } catch (e) {
    if (e.status === 403 || e.status === 401) {
      return {
        units: [],
        count: 0,
        restricted: true,
        message: restrictedMessage,
      }
    }
    if (e.status === 408 || e.status === 502 || e.status === 504) {
      return { units: [], count: 0, restricted: false }
    }
    throw e
  }
}

/** Resolve Reelly developer id from numeric id or name slug (logos, markers, projects). */
export async function resolveDeveloperIdBySlug(param) {
  const raw = normalizeRouteSlug(param)
  if (!raw) return null
  if (/^\d+$/.test(raw)) return Number(raw)

  const want = slugify(raw)
  const legacy = raw.match(/^\d+-(.+)$/)
  const wantLegacy = legacy ? slugify(legacy[1]) : null

  await loadDeveloperLogos()
  const logoHit = developerLogos.value.find(
    (d) => d.id && (slugify(d.name) === want || (wantLegacy && slugify(d.name) === wantLegacy))
  )
  if (logoHit?.id) return logoHit.id

  await loadMarkers()
  for (const m of markers.value) {
    if (!m.developerId) continue
    const mSlug = slugify(m.developer)
    if (mSlug === want || (wantLegacy && mSlug === wantLegacy)) return m.developerId
  }

  await loadProjects()
  const projectHit = projects.value.find(
    (p) =>
      slugify(p.developer) === want ||
      (wantLegacy && slugify(p.developer) === wantLegacy)
  )
  if (projectHit?.developerId) return projectHit.developerId

  const statName = Object.keys(buildDeveloperStats(projects.value)).find((n) => slugify(n) === want)
  if (statName) {
    for (const m of markers.value) {
      if (m.developerId && m.developer === statName) return m.developerId
    }
  }

  return null
}

export async function fetchDeveloperDetail(param) {
  const raw = normalizeRouteSlug(param)
  if (!raw) throw new Error('Developer not found')

  const locale = getLocaleId()
  const query = reellyQueryParams(locale)

  if (/^\d+$/.test(raw)) {
    return mapDeveloper(await fetchDeveloperById(Number(raw), query), locale)
  }

  const id = await resolveDeveloperIdBySlug(raw)
  if (!id) throw new Error('Developer not found')
  return mapDeveloper(await fetchDeveloperById(id, query), locale)
}

export function findDeveloperIdByName(name) {
  if (!name) return null
  const match = developerLogos.value.find((d) => d.name === name)
  if (match?.id) return match.id
  for (const m of markers.value) {
    if (m.developer === name && m.developerId) return m.developerId
  }
  return null
}

function normalizeDeveloper(name) {
  return (name || '').trim().toLowerCase()
}

function locationKey(location) {
  if (!location) return ''
  if (typeof location === 'string') return location.trim().toLowerCase()
  return [location.district, location.region, location.city]
    .filter(Boolean)
    .join('|')
    .toLowerCase()
}

export async function getRelatedListings({ currentId, developer, location, limit = 4 } = {}) {
  await loadProjects()

  const excludeId = Number(currentId)
  const devNorm = normalizeDeveloper(developer)
  const areaKey = locationKey(location)
  const locale = getLocaleId()

  const pool = [
    ...projects.value,
    ...localProperties.filter((p) => p.listingType !== 'rent').map((p) => localizeLocalListing(p, locale)),
  ].filter((p) => p.id !== excludeId)

  const seen = new Set()
  const appendUntil = (related, candidates) => {
    for (const p of candidates) {
      if (related.length >= limit) break
      if (seen.has(p.id)) continue
      seen.add(p.id)
      related.push(p)
    }
    return related
  }

  let related = []
  let matchType = 'explore'

  if (devNorm) {
    const byDev = pool.filter((p) => normalizeDeveloper(p.developer) === devNorm)
    if (byDev.length) matchType = 'developer'
    related = appendUntil(related, byDev)
  }

  if (related.length < limit && areaKey) {
    const byArea = pool.filter((p) => locationKey(p.location) === areaKey)
    if (byArea.length && matchType !== 'developer') matchType = 'area'
    related = appendUntil(related, byArea)
  }

  if (related.length < limit) {
    related = appendUntil(related, pool)
  }

  return { items: related, matchType }
}

function mapLocal(p) {
  const locale = getLocaleId()
  return {
    ...localizeLocalListing(p, locale),
    source: 'local',
    listingType: p.listingType || 'rent',
    areaLabel: formatArea(p.square),
  }
}

export function useReelly() {
  installLocaleWatcher()

  const rentListings = computed(() =>
    localProperties.filter((p) => p.listingType === 'rent').map(mapLocal)
  )

  const saleListings = computed(() => [
    ...projects.value,
    ...localProperties.filter((p) => p.listingType !== 'rent').map(mapLocal),
  ])

  const developerStatsByName = computed(() => buildDeveloperStats(projects.value))

  const developerIdByName = computed(() => {
    const map = new Map()
    for (const m of markers.value) {
      if (m.developer && m.developerId && !map.has(m.developer)) {
        map.set(m.developer, m.developerId)
      }
    }
    for (const d of developerLogos.value) {
      if (d.name && d.id && !map.has(d.name)) map.set(d.name, d.id)
    }
    return map
  })

  const uaeDevelopers = computed(() => {
    const stats = developerStatsByName.value
    const logoByName = new Map(developerLogos.value.map((d) => [d.name, d]))
    const idByName = developerIdByName.value

    const names = Object.keys(stats).filter((name) => stats[name]?.projectCount > 0)
    if (!names.length) return []

    return names
      .map((name) => {
        const logo = logoByName.get(name)
        const row = logo || { id: idByName.get(name) ?? null, name }
        if (!row.id && idByName.has(name)) row.id = idByName.get(name)
        return enrichDeveloperLogo(row, stats)
      })
      .sort((a, b) => b.projectCount - a.projectCount)
  })

  return {
    projects,
    markers,
    developerLogos,
    uaeDevelopers,
    loading,
    markersLoading,
    error,
    rentListings,
    saleListings,
    loadProjects,
    loadMarkers,
    loadDeveloperLogos,
  }
}

export { loadProjects as loadReellyProjects }

export async function getListingById(param) {
  const locale = getLocaleId()
  const raw = String(param || '').trim()
  if (!raw) return null

  if (/^\d+$/.test(raw)) {
    const numericId = Number(raw)
    const local = localProperties.find((p) => p.id === numericId)
    if (local) return mapLocal(local)
    try {
      return await fetchFullProject(numericId)
    } catch {
      const cacheKey = reellyProjectsCacheKey(locale)
      if (!projects.value.length) {
        const cachedList = readCache(cacheKey)
        if (cachedList?.length) projects.value = cachedList
      }
      if (!projects.value.length) await loadProjects()
      return projects.value.find((p) => p.id === numericId) || null
    }
  }

  const detailParams = reellyQueryParams(locale)

  try {
    const data = await fetchProjectBySlug(raw, detailParams)
    return mapAndLocalizeProject(data, { full: true })
  } catch {
    /* try slug-id suffix or catalogue */
  }

  const { slug, id } = parseSlugParam(raw)
  if (id) {
    try {
      return await fetchFullProject(id)
    } catch {
      /* fall through */
    }
  }

  const cacheKey = reellyProjectsCacheKey(locale)
  if (!projects.value.length) {
    const cachedList = readCache(cacheKey)
    if (cachedList?.length) projects.value = cachedList
  }
  if (!projects.value.length) await loadProjects()

  const want = slugify(slug || raw)
  return (
    projects.value.find((p) => projectSlug(p) === raw || slugify(p.slug || '') === want) ||
    null
  )
}
