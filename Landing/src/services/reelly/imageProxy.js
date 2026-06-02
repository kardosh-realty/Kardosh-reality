/** Width tuned for property cards (~651px display in Lighthouse). */
export const LISTING_CARD_IMAGE_WIDTH = 651

/** Gallery / detail hero slides */
export const LISTING_GALLERY_IMAGE_WIDTH = 960

/** Gallery srcset — mobile capped at 720w to cut PageSpeed overserving on 3x DPR */
export const LISTING_GALLERY_MOBILE_WIDTHS = [360, 480, 640, 720]
export const LISTING_GALLERY_DESKTOP_WIDTHS = [720, 960, 1280]

/** Map marker preview thumbnail */
export const MAP_MARKER_IMAGE_WIDTH = 420

/** Gallery strip thumbnails */
export const LISTING_THUMB_IMAGE_WIDTH = 160

/** Developer logo strip */
export const DEVELOPER_LOGO_WIDTH = 200

/** Default responsive breakpoints for srcset (mobile loads smallest first). */
export const LISTING_CARD_SRCSET_WIDTHS = [320, 480, 651, 800]

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

/** Unwrap /api/proxy-image?url=… back to the original CDN URL. */
export function extractOriginalImageUrl(url) {
  if (!url || typeof url !== 'string') return ''
  if (url.startsWith('/api/proxy-image')) {
    try {
      const params = new URL(url, 'https://local.invalid').searchParams
      return params.get('url') || ''
    } catch {
      return ''
    }
  }
  return isReellyCdnUrl(url) ? url : ''
}

/**
 * Compressed WebP URL — resized on our server before the browser downloads.
 * @param {string | null | undefined} url
 * @param {{ width?: number, quality?: number }} [options]
 */
export function proxyReellyImageUrl(url, { width = LISTING_CARD_IMAGE_WIDTH, quality = 72 } = {}) {
  const original = extractOriginalImageUrl(url) || (isReellyCdnUrl(url) ? url : '')
  if (!original) return url || ''

  const params = new URLSearchParams({ url: original })
  if (width > 0) params.set('w', String(Math.min(width, 1920)))
  if (quality > 0) params.set('q', String(Math.min(quality, 90)))

  return `/api/proxy-image?${params.toString()}`
}

/**
 * Responsive srcset — browser picks smallest width that fits (faster on mobile).
 */
export function proxyReellyImageSrcSet(
  url,
  { widths = LISTING_CARD_SRCSET_WIDTHS, quality = 72 } = {}
) {
  const original = extractOriginalImageUrl(url) || (isReellyCdnUrl(url) ? url : '')
  if (!original) return ''

  return widths
    .map((w) => `${proxyReellyImageUrl(original, { width: w, quality })} ${w}w`)
    .join(', ')
}
