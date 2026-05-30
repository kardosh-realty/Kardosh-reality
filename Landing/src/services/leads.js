import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Save a contact / inquiry lead to Supabase.
 * Requires `leads` table — see supabase/migrations/001_leads.sql
 */
export async function submitLead({ name, email, phone, message, listingType, projectId, projectName, source }) {
  const payload = {
    name: name?.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    message: message?.trim() || null,
    listing_type: listingType || null,
    project_id: projectId ? String(projectId) : null,
    project_name: projectName?.trim() || null,
    source: source || null,
  }

  if (!payload.name) {
    throw new Error('Name is required')
  }

  if (!isSupabaseConfigured()) {
    console.warn('[Kardosh Realty] Supabase not configured. Lead (dev only):', payload)
    return { stored: false, dev: true, payload }
  }

  // Insert only — do NOT chain .select() here. Anon visitors have an INSERT
  // policy but no SELECT policy on `leads`, so returning the row would be
  // rejected by RLS ("new row violates row-level security policy").
  const { error } = await supabase.from('leads').insert(payload)

  if (error) throw error
  return { stored: true }
}
