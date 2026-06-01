import { supabase, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Save a contact / inquiry lead to Supabase, then notify admins by email.
 * Email uses Edge Function secrets (RESEND_*, ADMIN_NOTIFY_EMAILS) — not kardosh/.env.
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

  const { data: leadId, error } = await supabase.rpc('submit_lead', {
    p_name: payload.name,
    p_email: payload.email,
    p_phone: payload.phone,
    p_message: payload.message,
    p_listing_type: payload.listing_type,
    p_project_id: payload.project_id,
    p_project_name: payload.project_name,
    p_source: payload.source,
  })

  if (error) {
    const { error: insertError } = await supabase.from('leads').insert(payload)
    if (insertError) throw insertError
    await notifyNewLeadByEmail(payload)
    return { stored: true }
  }

  const record = { ...payload, id: leadId }
  await notifyNewLeadByEmail(record)
  return { stored: true, id: leadId }
}

async function notifyNewLeadByEmail(record) {
  const base = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '')
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!base || !anonKey) return

  try {
    const res = await fetch(`${base}/functions/v1/notify-new-lead`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ record }),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok || (body?.ok === false && !body?.skipped)) {
      console.warn('[leads] notify-new-lead:', body?.error || body?.skipped || res.status)
    }
  } catch (e) {
    console.warn('[leads] notify-new-lead request failed', e)
  }
}
