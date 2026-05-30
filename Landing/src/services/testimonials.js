import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const TABLE = 'testimonials'

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'

export function rowToTestimonial(row) {
  if (!row) return null
  return {
    id: row.id,
    text: row.quote_text,
    name: row.name,
    role: row.role || '',
    image: row.image_url || DEFAULT_AVATAR,
    rating: row.rating ?? 5,
  }
}

/** Published testimonials for the public site, ordered for display. */
export async function fetchPublishedTestimonials() {
  if (!isSupabaseConfigured()) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, role, quote_text, image_url, rating, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) return null
  return (data || []).map(rowToTestimonial)
}
