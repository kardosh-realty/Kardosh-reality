import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const TABLE = 'site_settings'
const ROW_ID = 1

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
