import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const TABLE = 'site_settings'
const ROW_ID = 1
const BUCKET = 'branding'

/** DB row (snake_case) → app shape (camelCase). Only non-empty values returned. */
export function rowToSettings(row) {
  if (!row) return {}
  const out = {}
  if (row.logo_url) out.logo = row.logo_url
  if (row.company_name) out.companyName = row.company_name
  if (row.tagline) out.tagline = row.tagline
  if (row.email) out.email = row.email
  if (row.phone) out.phone = row.phone
  if (row.address) out.address = row.address
  if (row.address_short) out.addressShort = row.address_short
  if (row.rera_license) out.reraLicense = row.rera_license
  if (row.whatsapp_phone) out.whatsappPhone = row.whatsapp_phone

  // Socials: prefer the flexible jsonb list; migrate legacy columns if empty.
  const list = Array.isArray(row.socials) ? row.socials : []
  const socials = list
    .filter((s) => s && s.url)
    .map((s) => ({ platform: s.platform || 'website', url: s.url }))
  if (!socials.length) {
    if (row.linkedin) socials.push({ platform: 'linkedin', url: row.linkedin })
    if (row.instagram) socials.push({ platform: 'instagram', url: row.instagram })
  }
  if (socials.length) out.socials = socials
  return out
}

function settingsToRow(s) {
  const row = { id: ROW_ID }
  if (s.logo !== undefined) row.logo_url = s.logo
  if (s.companyName !== undefined) row.company_name = s.companyName
  if (s.tagline !== undefined) row.tagline = s.tagline
  if (s.email !== undefined) row.email = s.email
  if (s.phone !== undefined) row.phone = s.phone
  if (s.address !== undefined) row.address = s.address
  if (s.addressShort !== undefined) row.address_short = s.addressShort
  if (s.reraLicense !== undefined) row.rera_license = s.reraLicense
  if (s.whatsappPhone !== undefined) row.whatsapp_phone = s.whatsappPhone
  if (s.socials !== undefined) {
    row.socials = (Array.isArray(s.socials) ? s.socials : [])
      .filter((x) => x && x.url)
      .map((x) => ({ platform: x.platform || 'website', url: x.url }))
  }
  return row
}

export async function fetchSiteSettings() {
  if (!isSupabaseConfigured()) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', ROW_ID)
    .maybeSingle()
  if (error) return null
  return rowToSettings(data)
}

export async function saveSiteSettings(patch) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = { ...settingsToRow(patch), updated_at: new Date().toISOString() }
  const { error } = await supabase.from(TABLE).upsert(row, { onConflict: 'id' })
  if (error) throw error
}

/** Upload a logo image to the public `branding` bucket and return its public URL. */
export async function uploadLogo(file) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const ext = (file.name.split('.').pop() || 'png').toLowerCase()
  const path = `logo-${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: '3600' })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/** Upload admin profile photo (stored in auth user_metadata.avatar_url). */
export async function uploadAdminAvatar(file) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `admin-avatars/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: '3600' })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
