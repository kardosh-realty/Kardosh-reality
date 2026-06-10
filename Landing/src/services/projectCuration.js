import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const TABLE = 'project_curation'

let featuredOrder = new Map()
let loaded = false
let loadPromise = null

function applyRows(rows) {
  const map = new Map()
  for (const row of rows || []) {
    if (row.featured === false) continue
    map.set(String(row.project_id), Number(row.sort_order) || 0)
  }
  featuredOrder = map
  return map
}

/** @returns {Promise<Map<string, number>>} project id → sort_order */
export async function loadProjectCuration(force = false) {
  if (loaded && !force) return featuredOrder
  if (loadPromise && !force) return loadPromise

  loadPromise = (async () => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from(TABLE)
        .select('project_id, featured, sort_order')
        .eq('featured', true)
        .order('sort_order', { ascending: true })

      if (!error) applyRows(data)
    }
    loaded = true
    loadPromise = null
    return featuredOrder
  })()

  return loadPromise
}

export function getFeaturedOrder() {
  return featuredOrder
}

export function isProjectFeatured(id) {
  return featuredOrder.has(String(id))
}

export function invalidateProjectCuration() {
  loaded = false
  loadPromise = null
}
