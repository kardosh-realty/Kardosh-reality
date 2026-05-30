import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { normalizeLinks, linksFromLegacy } from '@/utils/teamLinks'

const TABLE = 'team_members'

export function rowToMember(row) {
  if (!row) return null
  const links =
    Array.isArray(row.links) && row.links.length ? normalizeLinks(row.links) : linksFromLegacy(row)
  return {
    id: row.id,
    name: row.name,
    title: row.designation || '',
    image: row.image_url || '',
    links,
    linkedin: links.find((l) => l.platform === 'linkedin')?.url || '',
    instagram: links.find((l) => l.platform === 'instagram')?.url || '',
    email: links.find((l) => l.platform === 'email')?.url || '',
    phone: links.find((l) => l.platform === 'phone')?.url || '',
    whatsapp: links.find((l) => l.platform === 'whatsapp')?.url || '',
  }
}

export async function fetchPublishedTeam() {
  if (!isSupabaseConfigured()) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, designation, image_url, links, linkedin, instagram, email, phone, whatsapp, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) return null
  return (data || []).map(rowToMember)
}
