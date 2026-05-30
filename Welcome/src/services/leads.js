import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Save a contact / inquiry lead to Supabase.
 * Requires `leads` table — see supabase/migrations/001_leads.sql
 */
export async function submitLead({ name, email, phone, message, listingType, projectId }) {
  const payload = {
    name: name?.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    message: message?.trim() || null,
    listing_type: listingType || null,
    project_id: projectId ? String(projectId) : null,
  }

  if (!payload.name) {
    throw new Error('Name is required')
  }

  if (!isSupabaseConfigured()) {
    console.warn('[Kardosh Realty] Supabase not configured. Lead (dev only):', payload)
    return { stored: false, dev: true, payload }
  }

  const { data, error } = await supabase.from('leads').insert(payload).select('id').single()

  if (error) throw error
  return { stored: true, id: data.id }
}
