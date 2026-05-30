import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Visibility overrides for off-plan entities (communities, developers, projects).
 *
 * Canonical store is Supabase table `visibility_overrides` so the public website
 * can read the same flags. Falls back to localStorage when Supabase is not
 * configured (or the table is missing) so the dashboard still works locally.
 *
 * Suggested table:
 *   create table visibility_overrides (
 *     entity_type text not null,   -- 'community' | 'developer' | 'project'
 *     entity_id   text not null,
 *     hidden      boolean not null default true,
 *     label       text,
 *     updated_at  timestamptz not null default now(),
 *     primary key (entity_type, entity_id)
 *   );
 */

const TABLE = 'visibility_overrides'
const LS_KEY = 'kardosh-visibility-overrides'

export function entityKey(type, id) {
  return `${type}:${id}`
}

export function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {}
  } catch {
    return {}
  }
}

function writeLocal(map) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map))
  } catch {
    /* quota / private mode */
  }
}

function localHidden() {
  const map = readLocal()
  return new Set(
    Object.entries(map)
      .filter(([, v]) => v)
      .map(([k]) => k)
  )
}

/**
 * @returns {Promise<{ hidden: Set<string>, source: 'supabase' | 'unconfigured' | 'error', error?: string }>}
 * - `supabase`     → connected and reading the shared table (affects the website)
 * - `unconfigured` → no Supabase keys; using this device only
 * - `error`        → keys present but the table read failed (table missing / RLS)
 */
export async function fetchHidden() {
  if (!isSupabaseConfigured()) {
    return { hidden: localHidden(), source: 'unconfigured' }
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('entity_type, entity_id, hidden')

  if (error) {
    return { hidden: localHidden(), source: 'error', error: error.message }
  }

  const hidden = new Set()
  for (const row of data || []) {
    if (row.hidden) hidden.add(entityKey(row.entity_type, row.entity_id))
  }
  return { hidden, source: 'supabase' }
}

/** Persist a single override. @returns {Promise<'supabase' | 'unconfigured' | 'error'>} */
export async function setHidden(type, id, hidden, label = '') {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from(TABLE)
      .upsert(
        {
          entity_type: type,
          entity_id: String(id),
          hidden,
          label,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'entity_type,entity_id' }
      )
    if (!error) return 'supabase'
    // Keep a local copy so the admin doesn't lose the toggle on write failure
    const map = readLocal()
    map[entityKey(type, id)] = hidden
    writeLocal(map)
    return 'error'
  }
  const map = readLocal()
  map[entityKey(type, id)] = hidden
  writeLocal(map)
  return 'unconfigured'
}
