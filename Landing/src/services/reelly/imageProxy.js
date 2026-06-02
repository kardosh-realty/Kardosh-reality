/** Width tuned for property cards (~651px display in Lighthouse). */
export const LISTING_CARD_IMAGE_WIDTH = 651

/** Gallery / detail hero slides */
export const LISTING_GALLERY_IMAGE_WIDTH = 1280

/** Map marker preview thumbnail */
export const MAP_MARKER_IMAGE_WIDTH = 420

/** Developer logo strip */
export const DEVELOPER_LOGO_WIDTH = 200

const ALLOWED_HOST_SUFFIXES = ['storage.googleapis.com', 'googleapis.com', 'reelly.io']

export function isReellyCdnUrl(url) {
  if (!url || typeof url !== 'string') return false
  if (url.startsWith('/') || url.startsWith('data:') || url.startsWith('blob:')) return false
  try {
    const { hostname } = new URL(url)
    return ALLOWED_HOST_SUFFIXES.some(
      (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`)
    )
  } catch {
    return false
  }
}

/**
 * Route Reelly CDN images through our proxy in production for long cache TTL + optional resize.
 * @param {string | null | undefined} url
 * @param {{ width?: number, quality?: number }} [options]
 */
export function proxyReellyImageUrl(url, { width = LISTING_CARD_IMAGE_WIDTH, quality = 78 } = {}) {
  if (!url || !isReellyCdnUrl(url)) return url || ''
  if (!import.meta.env.PROD) return url

  const params = new URLSearchParams({ url })
  if (width > 0) params.set('w', String(Math.min(width, 1920)))
  if (quality > 0) params.set('q', String(Math.min(quality, 90)))

  return `/api/proxy-image?${params.toString()}`
}
