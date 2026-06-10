import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const TABLE = 'project_curation'
const LS_KEY = 'kardosh-project-curation'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || []
  } catch {
    return []
  }
}

function writeLocal(rows) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rows))
  } catch {
    /* quota */
  }
}

function rowsToOrder(rows) {
  const map = new Map()
  for (const row of rows || []) {
    if (row.featured === false) continue
    map.set(String(row.project_id), Number(row.sort_order) || 0)
  }
  return map
}

/**
 * @returns {Promise<{ rows: Array, order: Map<string, number>, source: string, error?: string }>}
 */
export async function fetchCuration() {
  if (!isSupabaseConfigured()) {
    const rows = readLocal()
    return { rows, order: rowsToOrder(rows), source: 'unconfigured' }
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('project_id, featured, sort_order, label, updated_at')
    .order('sort_order', { ascending: true })

  if (error) {
    const rows = readLocal()
    return { rows, order: rowsToOrder(rows), source: 'error', error: error.message }
  }

  return { rows: data || [], order: rowsToOrder(data), source: 'supabase' }
}

async function persistRow(row) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from(TABLE).upsert(row, { onConflict: 'project_id' })
    if (!error) return 'supabase'
  }
  const rows = readLocal().filter((r) => String(r.project_id) !== String(row.project_id))
  rows.push(row)
  rows.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  writeLocal(rows)
  return isSupabaseConfigured() ? 'error' : 'unconfigured'
}

export async function setProjectFeatured(projectId, featured, label = '') {
  const id = String(projectId)
  if (!featured) {
    if (isSupabaseConfigured()) {
      await supabase.from(TABLE).delete().eq('project_id', id)
    }
    const rows = readLocal().filter((r) => String(r.project_id) !== id)
    writeLocal(rows)
    return isSupabaseConfigured() ? 'supabase' : 'unconfigured'
  }

  const { order } = await fetchCuration()
  const minOrder = order.size ? Math.min(...order.values()) : 0
  return persistRow({
    project_id: id,
    featured: true,
    sort_order: minOrder - 1,
    label,
    updated_at: new Date().toISOString(),
  })
}

/** Move featured project up/down in pin order. */
export async function moveFeaturedProject(projectId, direction) {
  const { rows } = await fetchCuration()
  const featured = (rows || []).filter((r) => r.featured !== false)
  const idx = featured.findIndex((r) => String(r.project_id) === String(projectId))
  if (idx < 0) return

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= featured.length) return

  const a = featured[idx]
  const b = featured[swapIdx]
  const aOrder = a.sort_order
  a.sort_order = b.sort_order
  b.sort_order = aOrder

  await persistRow({ ...a, updated_at: new Date().toISOString() })
  await persistRow({ ...b, updated_at: new Date().toISOString() })
}

export const CURATION_SQL = `create table if not exists public.project_curation (
  project_id text primary key,
  featured boolean not null default true,
  sort_order int not null default 0,
  label text,
  updated_at timestamptz not null default now()
);

alter table public.project_curation enable row level security;

create policy "read curation" on public.project_curation for select using (true);
create policy "write curation" on public.project_curation for all using (true) with check (true);`
