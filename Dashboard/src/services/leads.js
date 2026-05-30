import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const SELECT =
  'id, name, email, phone, message, listing_type, project_id, project_name, source, status, internal_notes, contacted_at, created_at, updated_at'

export async function fetchLeads({ limit = 200 } = {}) {
  if (!isSupabaseConfigured()) {
    return { leads: [], configured: false }
  }

  const { data, error } = await supabase
    .from('leads')
    .select(SELECT)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return { leads: data ?? [], configured: true }
}

export async function fetchLeadById(id) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase.from('leads').select(SELECT).eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function updateLead(id, patch) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = { updated_at: new Date().toISOString() }

  if (patch.status !== undefined) {
    row.status = patch.status
    if (patch.status === 'contacted' && !patch.contacted_at) {
      row.contacted_at = new Date().toISOString()
    }
  }
  if (patch.internal_notes !== undefined) row.internal_notes = patch.internal_notes || null
  if (patch.contacted_at !== undefined) row.contacted_at = patch.contacted_at

  const { data, error } = await supabase.from('leads').update(row).eq('id', id).select(SELECT).single()
  if (error) throw error
  return data
}

export async function markLeadContacted(id) {
  return updateLead(id, { status: 'contacted' })
}

export async function deleteLead(id) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
}
