import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { MAIN_SITE_URL } from '@/config/navigation'

const TABLE = 'testimonial_invites'

export function shareReviewUrl(token) {
  const base = MAIN_SITE_URL.replace(/\/$/, '')
  return `${base}/share-review/${token}`
}

export async function fetchInvites() {
  if (!isSupabaseConfigured()) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, token, label, active, expires_at, created_at')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createInvite({ label = '' } = {}) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ label: label?.trim() || null })
    .select('id, token, label, active, created_at')
    .single()
  if (error) throw error
  return { ...data, shareUrl: shareReviewUrl(data.token) }
}

export async function setInviteActive(id, active) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { error } = await supabase.from(TABLE).update({ active }).eq('id', id)
  if (error) throw error
}
