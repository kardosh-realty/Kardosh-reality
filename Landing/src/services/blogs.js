import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const SELECT =
  'id, slug, title, excerpt, body, cover_image_url, category, author_name, read_minutes, published_at, created_at'

function rowToBlog(row) {
  if (!row) return null
  const date = row.published_at || row.created_at
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    body: row.body || '',
    image: row.cover_image_url || '',
    publishedAt: date || undefined,
    type: row.category || 'Insights',
    author: row.author_name || 'Kardosh Realty',
    readMinutes: row.read_minutes ?? 5,
    date: date
      ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(
          new Date(date)
        )
      : '',
  }
}

export async function fetchPublishedBlogs({ limit = 50 } = {}) {
  if (!isSupabaseConfigured()) {
    return {
      items: [],
      configured: false,
      error:
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to kardosh/.env, then restart the landing dev server (npm run dev).',
    }
  }
  const { data, error } = await supabase
    .from('blogs')
    .select(SELECT)
    .eq('published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('sort_order', { ascending: true })
    .limit(limit)
  if (error) {
    console.error('[blogs] fetchPublishedBlogs', error)
    return { items: [], configured: true, error: error.message }
  }
  return { items: (data || []).map(rowToBlog), configured: true, error: null }
}

export async function fetchBlogBySlug(slug) {
  if (!isSupabaseConfigured()) return { item: null, configured: false }
  const { data, error } = await supabase
    .from('blogs')
    .select(SELECT)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  if (error) throw error
  return { item: rowToBlog(data), configured: true }
}
