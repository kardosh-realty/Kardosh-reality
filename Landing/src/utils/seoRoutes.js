import { slugify } from '@/services/visibility'

/** URL slug for a developer name (SEO segment only). */
export function developerSlug(dev) {
  return slugify(dev?.slug || dev?.name || '')
}

/**
 * Developer profile URL — Reelly API uses numeric id only (no /developers/slug/…).
 * Format: /developer/12-damac (id + name for SEO). Falls back to /developer/12.
 */
export function developerDetailPath(dev) {
  const id = dev?.id
  if (id == null || id === '') return '/developers'
  const slug = developerSlug(dev)
  return slug ? `/developer/${id}-${slug}` : `/developer/${id}`
}

/** Parse /developer/:param — supports 12, 12-damac, or legacy name-only slugs. */
export function parseDeveloperRouteParam(param) {
  const raw = String(param || '').trim()
  const idSlug = raw.match(/^(\d+)-(.+)$/)
  if (idSlug) {
    return { id: Number(idSlug[1]), slugPart: idSlug[2] }
  }
  if (/^\d+$/.test(raw)) {
    return { id: Number(raw), slugPart: null }
  }
  return { id: null, slugPart: raw }
}

/** Slug segment for a project detail URL (Reelly: GET /projects/slug/{slug}). */
export function projectSlug(item) {
  const api = item?.slug || item?.slug_name || item?._raw?.slug_name
  if (api) return slugify(api)
  const title = item?.title || (item?.name && String(item.name).split(',')[0]) || ''
  const base = slugify(title)
  if (!base) return item?.id != null ? String(item.id) : ''
  return item?.id != null ? `${base}-${item.id}` : base
}

/** Public project detail path, e.g. /property-detail/damac-lagoons */
export function projectDetailPath(item) {
  const slug = projectSlug(item)
  if (!slug) return '/off-plan'
  return `/property-detail/${slug}`
}

export function isNumericRouteParam(param) {
  return /^\d+$/.test(String(param || ''))
}

/** Parse slug param that may end with -{id} for fallback lookup. */
export function parseSlugParam(param) {
  const raw = String(param || '')
  const m = raw.match(/^(.+)-(\d+)$/)
  if (m) return { slug: m[1], id: Number(m[2]) }
  return { slug: raw, id: null }
}
