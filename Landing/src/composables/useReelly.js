import { ref, computed, watch } from 'vue'
import {
  fetchAllProjects,
  fetchAllProjectMarkers,
  fetchAllDeveloperLogos,
  fetchProjectById,
  fetchProjectBySlug,
  fetchProjectUnits,
  fetchDeveloperById,
} from '@/services/reelly/client'
import { mapReellyProject, mapReellyMarker } from '@/services/reelly/mapProject'
import { enrichProjectsWithAmenities, clearAmenitiesDetailCache } from '@/services/reelly/enrichAmenities'
import { enrichLiveUnitsWithPlans } from '@/services/reelly/media'
import { properties as localProperties } from '@/component/data/data'
import { formatArea } from '@/config/uae'
import { buildDeveloperStats, enrichDeveloperLogo, mapDeveloper } from '@/utils/mapDeveloper'
import { loadVisibility, isProjectHiddenCascade, slugify } from '@/services/visibility'
import { loadProjectCuration } from '@/services/projectCuration'
import { sortOffPlanProjects } from '@kardosh/shared/offPlan/projectMeta.js'
import { normalizeRouteSlug, parseSlugParam, projectSlug } from '@/utils/seoRoutes'
import { getLocaleId } from '@/composables/useLanguage'
import {
  reellyLogosCacheKey,
  reellyProjectsCacheKey,
  reellyMarkersCacheKey,
  reellyProjectDetailCacheKey,
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

import {
  readBrowserCatalogueCache,
  writeBrowserCatalogueCache,
} from '@kardosh/shared/reelly/browserCatalogueCache.js'

function applyVisibility(list) {
  return list.filter((p) => !isProjectHiddenCascade(p))
}

async function applyProjectPipeline(mapped) {
  const featuredOrder = await loadProjectCuration()
  const visible = applyVisibility(mapped)
  return sortOffPlanProjects(visible, featuredOrder).map((p) => ({
    ...p,
    adminFeatured: featuredOrder.has(String(p.id)),
  }))
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

async function fetchProjectsFromNetwork(locale, cacheKey) {
  const { results } = await fetchAllProjects(reellyQueryParams(locale))
  const mapped = results.map((p) => mapAndLocalizeProject(p))
  const sorted = await applyProjectPipeline(mapped)
  if (mapped.length) writeBrowserCatalogueCache(cacheKey, mapped)
  projects.value = sorted
  loadedLocale = locale
  void enrichProjectsWithAmenities(projects.value, { locale })
  return projects.value
}

async function fetchMarkersFromNetwork(locale, cacheKey) {
  const query = reellyQueryParams(locale)
  const { results: markerRows } = await fetchAllProjectMarkers(query)
  const merged = markerRows.map((row) => mapAndLocalizeMarker(row))
  const visible = applyVisibility(merged).filter((m) => m.latitude && m.longitude)
  if (visible.length) writeBrowserCatalogueCache(cacheKey, visible)
  markers.value = visible
  loadedLocale = locale
  return markers.value
}

export async function loadProjects(force = false) {
  installLocaleWatcher()
  const locale = getLocaleId()

  if (projects.value.length && loadedLocale === locale && !force) return projects.value
  if (projectsPromise && !force && loadedLocale === locale) return projectsPromise

  await loadVisibility()

  const cacheKey = reellyProjectsCacheKey(locale)
  const hit = !force ? readBrowserCatalogueCache(cacheKey, { arrayOnly: true }) : null
  if (hit?.data?.length) {
    projects.value = await applyProjectPipeline(hit.data)
    loadedLocale = locale
    void enrichProjectsWithAmenities(projects.value, { locale })
    if (hit.fresh) return projects.value
    if (!projectsPromise) {
      projectsPromise = fetchProjectsFromNetwork(locale, cacheKey)
        .catch((e) => {
          error.value = e.message
          return projects.value
        })
        .finally(() => {
          projectsPromise = null
          loading.value = false
        })
    }
    return projects.value
  }

  if (force || loadedLocale !== locale) {
    resetReellyPromises()
    projects.value = []
  }

  loading.value = true
  error.value = null

  projectsPromise = fetchProjectsFromNetwork(locale, cacheKey)
    .catch((e) => {
      error.value = e.message
      projects.value = []
      return []
    })
    .finally(() => {
      loading.value = false
      projectsPromise = null
    })

  return projectsPromise
}

export async function loadMarkers(force = false) {
  installLocaleWatcher()
  const locale = getLocaleId()

  if (markers.value.length && loadedLocale === locale && !force) return markers.value
  if (markersPromise && !force && loadedLocale === locale) return markersPromise

  await loadVisibility()

  const cacheKey = reellyMarkersCacheKey(locale)
  const hit = !force ? readBrowserCatalogueCache(cacheKey, { arrayOnly: true }) : null
  if (hit?.data?.length) {
    markers.value = applyVisibility(hit.data).filter((m) => m.latitude && m.longitude)
    loadedLocale = locale
    if (hit.fresh) return markers.value
    if (!markersPromise) {
      markersPromise = fetchMarkersFromNetwork(locale, cacheKey)
        .catch(() => markers.value)
        .finally(() => {
          markersPromise = null
          markersLoading.value = false
        })
    }
    return markers.value
  }

  markersLoading.value = true
  markersPromise = fetchMarkersFromNetwork(locale, cacheKey)
    .catch(() => {
      markers.value = []
      return []
    })
    .finally(() => {
      markersLoading.value = false
      markersPromise = null
    })

  return markersPromise
}

export async function loadDeveloperLogos(force = false) {
  const locale = getLocaleId()
  if (developerLogos.value.length && !force) return developerLogos.value
  if (logosPromise && !force) return logosPromise

  const cacheKey = reellyLogosCacheKey(locale)
  const hit = !force ? readBrowserCatalogueCache(cacheKey, { arrayOnly: true }) : null
  if (hit?.data?.length) {
    developerLogos.value = hit.data
    if (hit.fresh) return hit.data
    logosPromise = fetchAllDeveloperLogos()
      .then(({ results }) => {
        developerLogos.value = results
        if (results.length) writeBrowserCatalogueCache(cacheKey, results)
        return results
      })
      .catch(() => developerLogos.value)
      .finally(() => {
        logosPromise = null
      })
    return hit.data
  }

  logosPromise = fetchAllDeveloperLogos()
    .then(({ results }) => {
      developerLogos.value = results
      if (results.length) writeBrowserCatalogueCache(cacheKey, results)
      return results
    })
    .catch(() => developerLogos.value)
    .finally(() => {
      logosPromise = null
    })

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
  const hit = readBrowserCatalogueCache(cacheKey, { arrayOnly: false })
  if (hit?.data) {
    projectDetailMemory.set(memoryKey, hit.data)
    return hit.data
  }

  const raw = await fetchProjectById(numericId, reellyQueryParams(locale))
  const mapped = mapAndLocalizeProject(raw, { full: true })
  projectDetailMemory.set(memoryKey, mapped)
  writeBrowserCatalogueCache(cacheKey, mapped)
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
        const hit = readBrowserCatalogueCache(cacheKey, { arrayOnly: true })
        if (hit?.data?.length) projects.value = hit.data
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
  if (!projects.value.length) {
    const hit = readBrowserCatalogueCache(cacheKey, { arrayOnly: true })
    if (hit?.data?.length) projects.value = hit.data
  }
  }
  if (!projects.value.length) await loadProjects()

  const want = slugify(slug || raw)
  return (
    projects.value.find((p) => projectSlug(p) === raw || slugify(p.slug || '') === want) ||
    null
  )
}
