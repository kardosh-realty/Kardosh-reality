import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { slugify } from '@/utils/slugify'

const TABLE = 'blogs'
const BUCKET = 'branding'

const SELECT =
  'id, slug, title, excerpt, body, cover_image_url, category, author_name, read_minutes, published, published_at, sort_order, created_at, updated_at'

export function rowToBlog(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    body: row.body || '',
    coverImage: row.cover_image_url || '',
    category: row.category || '',
    authorName: row.author_name || 'Kardosh Realty',
    readMinutes: row.read_minutes ?? 5,
    published: row.published === true,
    publishedAt: row.published_at,
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** True when HTML body has text or at least one image. */
export function blogBodyHasContent(body) {
  const raw = String(body || '')
  if (/<img\s/i.test(raw)) return true
  const text = raw.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, ' ').trim()
  return text.length > 0
}

function blogToRow(b) {
  const published = b.published === true || b.published === 'true'
  return {
    slug: (b.slug || slugify(b.title)).trim(),
    title: b.title?.trim(),
    excerpt: b.excerpt?.trim() || null,
    body: b.body || '',
    cover_image_url: b.coverImage?.trim() || null,
    category: b.category?.trim() || null,
    author_name: b.authorName?.trim() || 'Kardosh Realty',
    read_minutes: Math.min(120, Math.max(1, Number(b.readMinutes) || 5)),
    published,
    published_at: published ? b.publishedAt || new Date().toISOString() : null,
    sort_order: Number(b.sortOrder) || 0,
    updated_at: new Date().toISOString(),
  }
}

export async function fetchAllBlogs() {
  if (!isSupabaseConfigured()) return { items: [], configured: false }
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT)
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return { items: (data || []).map(rowToBlog), configured: true }
}

export async function createBlog(input) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = blogToRow(input)
  if (!row.title) throw new Error('Title is required.')
  if (!blogBodyHasContent(row.body)) throw new Error('Post content is required.')
  const { data, error } = await supabase.from(TABLE).insert(row).select(SELECT).single()
  if (error) throw error
  return rowToBlog(data)
}

export async function updateBlog(id, input) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const row = blogToRow(input)
  if (!row.title) throw new Error('Title is required.')
  if (!blogBodyHasContent(row.body)) throw new Error('Post content is required.')
  const { data, error } = await supabase.from(TABLE).update(row).eq('id', id).select(SELECT).single()
  if (error) throw error
  return rowToBlog(data)
}

export async function deleteBlog(id) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function uploadBlogCover(file) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `blogs/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: '3600' })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export const BLOG_SETUP_SQL = `-- Run in Supabase SQL Editor (see supabase/migrations/010_blogs_and_realtime.sql)
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_image_url text,
  category text,
  author_name text not null default 'Kardosh Realty',
  read_minutes smallint not null default 5,
  published boolean not null default false,
  published_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.blogs enable row level security;
create policy blogs_public_read on public.blogs for select using (published = true);
create policy blogs_admin_all on public.blogs for all to authenticated
  using (public.is_admin()) with check (public.is_admin());`
