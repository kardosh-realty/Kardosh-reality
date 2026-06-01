import { slugify } from '@/services/visibility'

/** URL slug for a developer (name-based; matches dashboard visibility keys). */
export function developerSlug(dev) {
  return slugify(dev?.slug || dev?.name || '')
}

/** Public developer profile path, e.g. /developer/damac */
export function developerDetailPath(dev) {
  const slug = developerSlug(dev)
  if (!slug) return '/developers'
  return `/developer/${slug}`
}

/** Slug segment for a project detail URL. */
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
