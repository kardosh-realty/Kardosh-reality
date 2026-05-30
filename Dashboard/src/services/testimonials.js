import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const TABLE = 'testimonials'
const BUCKET = 'branding'

const SELECT =
  'id, name, role, quote_text, image_url, rating, published, sort_order, source, invite_id, created_at, updated_at'

export function rowToTestimonial(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    role: row.role || '',
    text: row.quote_text,
    image: row.image_url || '',
    rating: row.rating ?? 5,
    published: row.published !== false,
    sortOrder: row.sort_order ?? 0,
    source: row.source || 'admin',
    inviteId: row.invite_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    pending: row.source === 'customer' && row.published === false,
  }
}

function testimonialToRow(t) {
  return {
    name: t.name?.trim(),
    role: t.role?.trim() || null,
    quote_text: t.text?.trim(),
    image_url: t.image?.trim() || null,
    rating: Math.min(5, Math.max(1, Number(t.rating) || 5)),
    published: t.published !== false,
    sort_order: Number(t.sortOrder) || 0,
    source: t.source || 'admin',
    updated_at: new Date().toISOString(),
  }
}

/** Publish a customer-submitted review after admin approval. */
export async function approveTestimonial(id) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { error } = await supabase
    .from(TABLE)
    .update({ published: true, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function fetchAllTestimonials() {
  if (!isSupabaseConfigured()) return { items: [], configured: false }
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return {
    items: (data || []).map(rowToTestimonial),
    configured: true,
  }
}

export async function createTestimonial(input) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = testimonialToRow(input)
  if (!row.name || !row.quote_text) throw new Error('Name and review text are required.')
  const { data, error } = await supabase
    .from(TABLE)
    .insert(row)
    .select(SELECT)
    .single()
  if (error) throw error
  return rowToTestimonial(data)
}

export async function updateTestimonial(id, input) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = testimonialToRow(input)
  if (!row.name || !row.quote_text) throw new Error('Name and review text are required.')
  const { data, error } = await supabase
    .from(TABLE)
    .update(row)
    .eq('id', id)
    .select(SELECT)
    .single()
  if (error) throw error
  return rowToTestimonial(data)
}

export async function deleteTestimonial(id) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function uploadTestimonialPhoto(file) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `testimonials/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: '3600' })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
