import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const INVITES = 'testimonial_invites'
const TESTIMONIALS = 'testimonials'
const BUCKET = 'branding'
const MAX_PHOTO_BYTES = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/** Upload a customer photo (public testimonials/ path). */
export async function uploadCustomerTestimonialPhoto(file) {
  if (!isSupabaseConfigured()) throw new Error('Reviews are not available right now.')
  if (!file) throw new Error('Please choose a photo.')
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Use a JPG, PNG, or WebP image.')
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error('Photo must be 2 MB or smaller.')
  }
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
  const path = `testimonials/customer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/** Check that a share link token is valid and active. */
export async function validateInviteToken(token) {
  if (!isSupabaseConfigured() || !token) return null
  const { data, error } = await supabase
    .from(INVITES)
    .select('id, label')
    .eq('token', token)
    .eq('active', true)
    .maybeSingle()
  if (error || !data) return null
  return data
}

/**
 * Customer submission — stored as pending (published=false) for admin approval.
 * Insert only (no .select()) so anon RLS insert policy applies.
 */
export async function submitCustomerReview(inviteId, { name, role, text, rating = 5, image = '' }) {
  if (!isSupabaseConfigured()) throw new Error('Reviews are not available right now.')
  const payload = {
    name: name?.trim(),
    role: role?.trim() || null,
    quote_text: text?.trim(),
    image_url: image?.trim() || null,
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    published: false,
    source: 'customer',
    invite_id: inviteId,
    sort_order: 0,
  }
  if (!payload.name || !payload.quote_text) {
    throw new Error('Please enter your name and review.')
  }
  const { error } = await supabase.from(TESTIMONIALS).insert(payload)
  if (error) throw error
  return { submitted: true }
}
