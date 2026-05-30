import { ref, computed } from 'vue'
import { fetchProjects } from '@/services/reelly'
import { fetchHidden, setHidden, entityKey, slugify } from '@/services/visibility'
import { UAE_COMMUNITIES, projectCommunitySlugs, emirateLabel } from '@/config/communities'

const projects = ref([])
const hidden = ref(new Set())
const source = ref('unconfigured')
const dbError = ref('')
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

  loadPromise = (async () => {
    // 1) Visibility flags — fast and independent. Drives the banner regardless of Reelly.
    loading.value = true
    try {
      const vis = await fetchHidden()
      hidden.value = vis.hidden
      source.value = vis.source
      dbError.value = vis.error || ''
    } catch (e) {
      source.value = 'error'
      dbError.value = e?.message || 'Could not read visibility settings.'
    } finally {
      loading.value = false
    }

    // 2) Reelly projects — for counts/lists. A slow or failed call must not block
    //    the page or the visibility banner above.
    if (!projects.value.length || force) {
      projectsLoading.value = true
      error.value = ''
      try {
        const { results } = await fetchProjects({ limit: '50' })
        projects.value = results
      } catch (e) {
        error.value = e?.message || 'Could not load off-plan data from Reelly.'
      } finally {
        projectsLoading.value = false
      }
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

  const projectRows = computed(() =>
    projects.value
      .map((p) => {
        const ownHidden = isKeyHidden('project', p.id)
        const devHidden = isKeyHidden('developer', developerId(p.developer))
        const communityHidden = projectCommunitySlugs(p).some((slug) =>
          isKeyHidden('community', slug)
        )
        const cascadedBy = devHidden ? 'developer' : communityHidden ? 'community' : null
        return {
          ...p,
          ownHidden,
          cascadedBy,
          effectiveHidden: ownHidden || devHidden || communityHidden,
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))
  )

  const stats = computed(() => ({
    projects: projects.value.length,
    visibleProjects: projectRows.value.filter((p) => !p.effectiveHidden).length,
    communities: communities.value.length,
    developers: developers.value.length,
  }))

  const listLoading = computed(() => loading.value || projectsLoading.value)

  return {
    loading,
    projectsLoading,
    listLoading,
    error,
    source,
    dbError,
    communities,
    developers,
    projectRows,
    stats,
    loadOffPlan,
    toggleCommunity: (c) => toggle('community', c.id, c.name),
    toggleDeveloper: (d) => toggle('developer', d.id, d.name),
    toggleProject: (p) => toggle('project', p.id, p.title),
  }
}
