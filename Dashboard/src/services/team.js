import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { normalizeLinks, linksFromLegacy, linkUrl } from '@/utils/teamLinks'

const TABLE = 'team_members'
const BUCKET = 'branding'

const SELECT =
  'id, name, designation, image_url, links, linkedin, instagram, email, phone, whatsapp, published, sort_order, created_at, updated_at'

export function rowToMember(row) {
  if (!row) return null
  const links =
    Array.isArray(row.links) && row.links.length ? normalizeLinks(row.links) : linksFromLegacy(row)
  return {
    id: row.id,
    name: row.name,
    designation: row.designation || '',
    image: row.image_url || '',
    links,
    linkedin: linkUrl(links, 'linkedin'),
    instagram: linkUrl(links, 'instagram'),
    email: linkUrl(links, 'email'),
    phone: linkUrl(links, 'phone'),
    whatsapp: linkUrl(links, 'whatsapp'),
    published: row.published !== false,
    sortOrder: row.sort_order ?? 0,
  }
}

function memberToRow(m) {
  const links = normalizeLinks(m.links)
  return {
    name: m.name?.trim(),
    designation: m.designation?.trim() || null,
    image_url: m.image?.trim() || null,
    links,
    linkedin: linkUrl(links, 'linkedin') || null,
    instagram: linkUrl(links, 'instagram') || null,
    email: linkUrl(links, 'email') || null,
    phone: linkUrl(links, 'phone') || null,
    whatsapp: linkUrl(links, 'whatsapp') || null,
    published: m.published !== false,
    sort_order: Number(m.sortOrder) || 0,
    updated_at: new Date().toISOString(),
  }
}

export async function fetchAllTeamMembers() {
  if (!isSupabaseConfigured()) return { items: [], configured: false }
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw error
  return { items: (data || []).map(rowToMember), configured: true }
}

export async function createTeamMember(input) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = memberToRow(input)
  if (!row.name) throw new Error('Name is required.')
  const { data, error } = await supabase.from(TABLE).insert(row).select(SELECT).single()
  if (error) throw error
  return rowToMember(data)
}

export async function updateTeamMember(id, input) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = memberToRow(input)
  if (!row.name) throw new Error('Name is required.')
  const { data, error } = await supabase.from(TABLE).update(row).eq('id', id).select(SELECT).single()
  if (error) throw error
  return rowToMember(data)
}

export async function deleteTeamMember(id) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function uploadTeamPhoto(file) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `team/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true, cacheControl: '3600' })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
