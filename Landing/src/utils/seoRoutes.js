import { slugify } from '@/services/visibility'

/** URL slug for a developer name (Reelly has no /developers/slug API — id resolved server-side in proxy). */
export function developerSlug(dev) {
  return slugify(dev?.slug || dev?.name || '')
}

/** SEO path only, e.g. /developer/damac */
export function developerDetailPath(dev) {
  const slug = developerSlug(dev)
  if (!slug) return '/developers'
  return `/developer/${slug}`
}

/** Normalize route param (spaces → hyphens). */
export function normalizeRouteSlug(param) {
  return String(param || '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/\/+/g, '-')
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
  return /^\d+$/.test(normalizeRouteSlug(param))
}

/** Parse slug param that may end with -{id} for fallback lookup. */
export function parseSlugParam(param) {
  const raw = String(param || '')
  const m = raw.match(/^(.+)-(\d+)$/)
  if (m) return { slug: m[1], id: Number(m[2]) }
  return { slug: raw, id: null }
}
