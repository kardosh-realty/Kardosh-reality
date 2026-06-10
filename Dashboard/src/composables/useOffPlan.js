import { ref, computed } from 'vue'
import { fetchAllProjects } from '@/services/reelly'
import { fetchHidden, setHidden, entityKey, slugify } from '@/services/visibility'
import {
  fetchCuration,
  setProjectFeatured,
  moveFeaturedProject,
} from '@/services/projectCuration'
import { UAE_COMMUNITIES, projectCommunitySlugs, emirateLabel } from '@/config/communities'
import { sortOffPlanProjects } from '@kardosh/shared/offPlan/projectMeta.js'
import { readBrowserCatalogueCache } from '@kardosh/shared/reelly/browserCatalogueCache.js'

const PROJECTS_CACHE_KEY = 'kardosh-dashboard-projects-v2'

const projects = ref([])
const hidden = ref(new Set())
const featuredOrder = ref(new Map())
const source = ref('unconfigured')
const curationSource = ref('unconfigured')
const dbError = ref('')
const curationError = ref('')
const loading = ref(false)
const projectsLoading = ref(false)
const error = ref('')
let loadPromise = null

/** Stable ids used as visibility keys. */
export function developerId(name) {
  return slugify(name)
}

function isKeyHidden(type, id) {
  return hidden.value.has(entityKey(type, id))
}

export async function loadOffPlan(force = false) {
  if (loadPromise && !force) return loadPromise

  if (!force && !projects.value.length) {
    const hit = readBrowserCatalogueCache(PROJECTS_CACHE_KEY, { arrayOnly: true })
    if (hit?.data?.length) projects.value = hit.data
  }

  loadPromise = (async () => {
    loading.value = true
    try {
      const vis = await fetchHidden()
      hidden.value = vis.hidden
      source.value = vis.source
      dbError.value = vis.error || ''

      const cur = await fetchCuration()
      featuredOrder.value = cur.order
      curationSource.value = cur.source
      curationError.value = cur.error || ''
    } catch (e) {
      source.value = 'error'
      dbError.value = e?.message || 'Could not read visibility settings.'
    } finally {
      loading.value = false
    }

    const showProjectsSpinner = !projects.value.length
    if (showProjectsSpinner) projectsLoading.value = true
    error.value = ''
    try {
      const { results } = await fetchAllProjects({}, { force })
      if (results?.length) projects.value = results
    } catch (e) {
      if (!projects.value.length) {
        error.value = e?.message || 'Could not load off-plan data from Reelly.'
      }
    } finally {
      projectsLoading.value = false
    }

    loadPromise = null
  })()

  return loadPromise
}

/** Optimistic toggle + persist. */
async function toggle(type, id, label) {
  const key = entityKey(type, id)
  const next = !hidden.value.has(key)
  const updated = new Set(hidden.value)
  if (next) updated.add(key)
  else updated.delete(key)
  hidden.value = updated

  source.value = await setHidden(type, id, next, label)
}

async function refreshCuration() {
  const cur = await fetchCuration()
  featuredOrder.value = cur.order
  curationSource.value = cur.source
  curationError.value = cur.error || ''
}

export function useOffPlan() {
  const communities = computed(() => {
    const counts = new Map()
    for (const p of projects.value) {
      for (const slug of projectCommunitySlugs(p)) {
        counts.set(slug, (counts.get(slug) || 0) + 1)
      }
    }
    return UAE_COMMUNITIES.map((c) => ({
      id: c.slug,
      name: c.name,
      emirate: emirateLabel(c.emirate),
      projectCount: counts.get(c.slug) || 0,
      hidden: isKeyHidden('community', c.slug),
    })).sort((a, b) => b.projectCount - a.projectCount)
  })

  const developers = computed(() => {
    const map = new Map()
    for (const p of projects.value) {
      const name = p.developer || 'Unknown developer'
      const id = developerId(name)
      if (!map.has(id)) {
        map.set(id, { id, name, projectCount: 0, image: p.image })
      }
      const row = map.get(id)
      row.projectCount += 1
      if (!row.image && p.image) row.image = p.image
    }
    return [...map.values()]
      .map((d) => ({ ...d, hidden: isKeyHidden('developer', d.id) }))
      .sort((a, b) => b.projectCount - a.projectCount)
  })

  const projectRows = computed(() => {
    const rows = projects.value.map((p) => {
      const ownHidden = isKeyHidden('project', p.id)
      const devHidden = isKeyHidden('developer', developerId(p.developer))
      const communityHidden = projectCommunitySlugs(p).some((slug) =>
        isKeyHidden('community', slug)
      )
      const cascadedBy = devHidden ? 'developer' : communityHidden ? 'community' : null
      const id = String(p.id)
      return {
        ...p,
        ownHidden,
        cascadedBy,
        effectiveHidden: ownHidden || devHidden || communityHidden,
        adminFeatured: featuredOrder.value.has(id),
        featuredSort: featuredOrder.value.get(id) ?? null,
      }
    })
    return sortOffPlanProjects(rows, featuredOrder.value)
  })

  const stats = computed(() => ({
    projects: projects.value.length,
    visibleProjects: projectRows.value.filter((p) => !p.effectiveHidden).length,
    featuredProjects: projectRows.value.filter((p) => p.adminFeatured).length,
    communities: communities.value.length,
    developers: developers.value.length,
  }))

  const listLoading = computed(() => loading.value || projectsLoading.value)

  async function toggleFeatured(p) {
    const next = !p.adminFeatured
    await setProjectFeatured(p.id, next, p.title)
    await refreshCuration()
  }

  async function moveFeatured(p, direction) {
    await moveFeaturedProject(p.id, direction)
    await refreshCuration()
  }

  return {
    loading,
    projectsLoading,
    listLoading,
    error,
    source,
    curationSource,
    dbError,
    curationError,
    communities,
    developers,
    projectRows,
    stats,
    loadOffPlan,
    toggleCommunity: (c) => toggle('community', c.id, c.name),
    toggleDeveloper: (d) => toggle('developer', d.id, d.name),
    toggleProject: (p) => toggle('project', p.id, p.title),
    toggleFeatured,
    moveFeatured,
  }
}
