import { ref, computed } from 'vue'
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
import { enrichProjectsWithAmenities } from '@/services/reelly/enrichAmenities'
import { enrichLiveUnitsWithPlans } from '@/services/reelly/media'
import { properties as localProperties } from '@/component/data/data'
import { formatAed, formatArea } from '@/config/uae'
import { buildDeveloperStats, enrichDeveloperLogo, mapDeveloper } from '@/utils/mapDeveloper'
import { loadVisibility, isProjectHiddenCascade, slugify } from '@/services/visibility'
import { parseDeveloperRouteParam, parseSlugParam, projectSlug } from '@/utils/seoRoutes'

const projects = ref([])
const markers = ref([])
const developerLogos = ref([])
const loading = ref(false)
const markersLoading = ref(false)
const error = ref(null)

let projectsPromise = null
let markersPromise = null
let logosPromise = null

const PROJECTS_CACHE_KEY = 'kardosh-reelly-projects-v1'
const LOGOS_CACHE_KEY = 'kardosh-reelly-developer-logos-v1'
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

/** Drop projects the dashboard has hidden (by project, developer, or community). */
function applyVisibility(list) {
  return list.filter((p) => !isProjectHiddenCascade(p))
}

export async function loadProjects(force = false) {
  if (projects.value.length && !force) return projects.value
  if (projectsPromise && !force) return projectsPromise

  await loadVisibility()

  const cached = !force ? readCache(PROJECTS_CACHE_KEY) : null
  if (cached?.length) {
    projects.value = applyVisibility(cached)
    return projects.value
  }

  loading.value = true
  error.value = null

  projectsPromise = fetchProjects({ limit: '50', offset: '0' })
    .then(async ({ results }) => {
      const mapped = results.map((p) => mapReellyProject(p))
      if (mapped.length) writeCache(PROJECTS_CACHE_KEY, mapped)
      projects.value = applyVisibility(mapped)
      void enrichProjectsWithAmenities(projects.value)
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
  if (markers.value.length && !force) return markers.value
  if (markersPromise && !force) return markersPromise

  markersLoading.value = true
  markersPromise = Promise.all([
    fetchProjectMarkers({ limit: '50' }),
    fetchProjects({ limit: '50', offset: '0' }).catch(() => ({ results: [] })),
  ])
    .then(([{ results: markerRows }, { results: projectRows }]) => {
      const byId = new Map(projectRows.map((p) => [p.id, p]))
      const merged = markerRows.map((row) => {
        const full = byId.get(row.id)
        return mapReellyMarker(
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
  if (developerLogos.value.length && !force) return developerLogos.value
  if (logosPromise && !force) return logosPromise

  const cached = !force ? readCache(LOGOS_CACHE_KEY) : null
  if (cached?.length) {
    developerLogos.value = cached
    return cached
  }

  logosPromise = fetchDeveloperLogos()
    .then(({ results }) => {
      developerLogos.value = results
      if (results.length) writeCache(LOGOS_CACHE_KEY, results)
      return results
    })
    .catch(() => {
      /* Grid still works from project stats; logos enrich when available */
      return developerLogos.value
    })

  return logosPromise
}

const projectDetailMemory = new Map()
const PROJECT_DETAIL_CACHE_PREFIX = 'kardosh-reelly-project-'

export async function fetchFullProject(id) {
  const numericId = Number(id)
  if (projectDetailMemory.has(numericId)) {
    return projectDetailMemory.get(numericId)
  }

  const cached = readCache(`${PROJECT_DETAIL_CACHE_PREFIX}${numericId}`, { arrayOnly: false })
  if (cached) {
    projectDetailMemory.set(numericId, cached)
    return cached
  }

  const raw = await fetchProjectById(numericId, {
    language: 'en-us',
    preferred_currency: 'AED',
    preferred_area_unit: 'm2',
  })
  const mapped = mapReellyProject(raw, { full: true })
  projectDetailMemory.set(numericId, mapped)
  writeCache(`${PROJECT_DETAIL_CACHE_PREFIX}${numericId}`, mapped)
  return mapped
}

export async function fetchProjectUnitsSafe(projectId, typicalUnitsWithPlans = []) {
  try {
    const { results, count } = await fetchProjectUnits(projectId, { limit: '50' })
    const units = enrichLiveUnitsWithPlans(results, typicalUnitsWithPlans)
    return { units, count, restricted: false }
  } catch (e) {
    if (e.status === 403 || e.status === 401) {
      return {
        units: [],
        count: 0,
        restricted: true,
        message:
          'Live unit inventory requires a Reelly Business package. Typical units and brochures are still available below.',
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
  const raw = String(param || '').trim()
  if (!raw) return null
  if (/^\d+$/.test(raw)) return Number(raw)

  const want = slugify(raw)

  await loadDeveloperLogos()
  const logoHit = developerLogos.value.find((d) => d.id && slugify(d.name) === want)
  if (logoHit?.id) return logoHit.id

  await loadMarkers()
  for (const m of markers.value) {
    if (m.developerId && slugify(m.developer) === want) return m.developerId
  }

  await loadProjects()
  const projectHit = projects.value.find((p) => p.developerId && slugify(p.developer) === want)
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
  let { id } = parseDeveloperRouteParam(param)
  if (!id) {
    id = await resolveDeveloperIdBySlug(param)
  }
  if (!id) throw new Error('Developer not found')
  return mapDeveloper(await fetchDeveloperById(id))
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

/** Listings for property detail: same developer first, then same area, then other off-plan. */
export async function getRelatedListings({ currentId, developer, location, limit = 4 } = {}) {
  await loadProjects()

  const excludeId = Number(currentId)
  const devNorm = normalizeDeveloper(developer)
  const areaKey = locationKey(location)

  const pool = [
    ...projects.value,
    ...localProperties.filter((p) => p.listingType !== 'rent').map(mapLocal),
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
  return {
    ...p,
    source: 'local',
    listingType: p.listingType || 'rent',
    priceLabel:
      p.listingType === 'rent'
        ? `${formatAed(p.price)}/year`
        : p.price
          ? `From ${formatAed(p.price)}`
          : 'Price on request',
    areaLabel: formatArea(p.square),
    title: p.name,
  }
}

export function useReelly() {
  const rentListings = computed(() =>
    localProperties.filter((p) => p.listingType === 'rent').map(mapLocal)
  )

  const saleListings = computed(() => [
    ...projects.value,
    ...localProperties.filter((p) => p.listingType !== 'rent').map(mapLocal),
  ])

  const developerStatsByName = computed(() => buildDeveloperStats(projects.value))

  /**
   * Developers with active UAE projects.
   * Built from project stats first so the grid works even if /developers/logos is slow or fails.
   */
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

// Back-compat for existing imports
export { loadProjects as loadReellyProjects }

export async function getListingById(param) {
  const raw = String(param || '').trim()
  if (!raw) return null

  if (/^\d+$/.test(raw)) {
    const numericId = Number(raw)
    const local = localProperties.find((p) => p.id === numericId)
    if (local) return mapLocal(local)
    try {
      return await fetchFullProject(numericId)
    } catch {
      if (!projects.value.length) {
        const cachedList = readCache(PROJECTS_CACHE_KEY)
        if (cachedList?.length) projects.value = cachedList
      }
      if (!projects.value.length) await loadProjects()
      return projects.value.find((p) => p.id === numericId) || null
    }
  }

  const detailParams = {
    language: 'en-us',
    preferred_currency: 'AED',
    preferred_area_unit: 'm2',
  }

  try {
    const data = await fetchProjectBySlug(raw, detailParams)
    return mapReellyProject(data, { full: true })
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

  if (!projects.value.length) {
    const cachedList = readCache(PROJECTS_CACHE_KEY)
    if (cachedList?.length) projects.value = cachedList
  }
  if (!projects.value.length) await loadProjects()

  const want = slugify(slug || raw)
  return (
    projects.value.find((p) => projectSlug(p) === raw || slugify(p.slug || '') === want) ||
    null
  )
}
