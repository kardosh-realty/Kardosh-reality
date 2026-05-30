import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { UAE_COMMUNITIES } from '@/config/communities'

/**
 * Read-only visibility flags shared with the Kardosh dashboard.
 * The dashboard writes to the `visibility_overrides` Supabase table; the public
 * site reads it here to hide communities / developers / projects on demand.
 *
 * Identity keys (must match the dashboard):
 *   community : the curated community `slug`
 *   developer : slugify(developer name)
 *   project   : the Reelly project id
 */

const TABLE = 'visibility_overrides'

const hidden = ref(new Set())
let loaded = false
let loadPromise = null

export function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const communityKey = (slug) => `community:${slug}`
const developerKey = (name) => `developer:${slugify(name)}`
const projectKey = (id) => `project:${id}`

export async function loadVisibility(force = false) {
  if (loaded && !force) return hidden.value
  if (loadPromise && !force) return loadPromise

  loadPromise = (async () => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from(TABLE)
        .select('entity_type, entity_id, hidden')
      if (!error && Array.isArray(data)) {
        const set = new Set()
        for (const row of data) {
          if (row.hidden) set.add(`${row.entity_type}:${row.entity_id}`)
        }
        hidden.value = set
      }
    }
    loaded = true
    loadPromise = null
    return hidden.value
  })()

  return loadPromise
}

export function isCommunityHidden(slug) {
  return hidden.value.has(communityKey(slug))
}
export function isDeveloperHidden(name) {
  return hidden.value.has(developerKey(name))
}
export function isProjectHidden(id) {
  return hidden.value.has(projectKey(id))
}

function locationHaystack(project) {
  const loc = project?.location
  const parts = []
  if (typeof loc === 'string') parts.push(loc)
  else if (loc && typeof loc === 'object') parts.push(loc.district, loc.region, loc.city, loc.country)
  return parts.filter(Boolean).join(' ').toLowerCase()
}

const COMMUNITY_MATCHERS = UAE_COMMUNITIES.map((c) => ({
  slug: c.slug,
  terms: [...(c.searchTerms || []), c.name].filter(Boolean).map((t) => t.toLowerCase()),
}))

/** Best-effort: which curated community slugs a Reelly project belongs to. */
export function projectCommunitySlugs(project) {
  const hay = `${project?.title || ''} ${project?.name || ''} ${locationHaystack(project)}`.toLowerCase()
  return COMMUNITY_MATCHERS.filter((m) => m.terms.some((t) => hay.includes(t))).map((m) => m.slug)
}

/** A project is hidden if itself, its developer, or its community is hidden. */
export function isProjectHiddenCascade(project) {
  if (!project) return false
  if (isProjectHidden(project.id)) return true
  if (project.developer && isDeveloperHidden(project.developer)) return true
  return projectCommunitySlugs(project).some((slug) => isCommunityHidden(slug))
}
