/** Host suffixes allowed through /api/proxy-image (Reelly CDNs + storage). */
export const REELLY_IMAGE_HOST_SUFFIXES = [
  'storage.googleapis.com',
  'googleapis.com',
  'reelly.io',
  'amazonaws.com',
  'cloudfront.net',
  'railway.app',
]

export function isAllowedReellyImageHost(hostname) {
  if (!hostname) return false
  return REELLY_IMAGE_HOST_SUFFIXES.some(
    (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`)
  )
}
