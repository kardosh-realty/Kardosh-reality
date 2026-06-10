/**
 * Shared Reelly image proxy — fetch upstream, resize to WebP, cache-friendly response.
 */
import { isAllowedReellyImageHost } from '../../shared/reelly/imageHosts.js'

const UPSTREAM_TIMEOUT_MS = 20_000

export const IMAGE_PROXY_CACHE_HEADER =
  'public, max-age=31536000, immutable, s-maxage=31536000, stale-while-revalidate=86400'

export function isAllowedImageUrl(value) {
  let parsed
  try {
    parsed = new URL(value)
  } catch {
    return false
  }
  if (parsed.protocol !== 'https:') return false
  return isAllowedReellyImageHost(parsed.hostname)
}

/**
 * @param {{ url: string, width?: number, quality?: number, method?: string }} input
 * @returns {Promise<{ status: number, contentType: string, body: Buffer, cacheControl: string }>}
 */
export async function processImageProxy({ url, width = 0, quality = 72, method = 'GET' }) {
  if (!url || !isAllowedImageUrl(url)) {
    return { status: 400, contentType: 'text/plain', body: Buffer.from('Invalid image URL'), cacheControl: 'no-store' }
  }

  const maxWidth = Math.min(Math.max(Number(width) || 0, 0), 1920)
  const q = Math.min(Math.max(Number(quality) || 72, 40), 90)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  let upstream
  try {
    upstream = await fetch(String(url), {
      method: method === 'HEAD' ? 'HEAD' : 'GET',
      headers: { Accept: 'image/*,*/*;q=0.8' },
      signal: controller.signal,
    })
  } catch {
    return { status: 502, contentType: 'text/plain', body: Buffer.alloc(0), cacheControl: 'no-store' }
  } finally {
    clearTimeout(timer)
  }

  if (!upstream.ok) {
    return { status: upstream.status, contentType: 'text/plain', body: Buffer.alloc(0), cacheControl: 'no-store' }
  }

  if (method === 'HEAD') {
    return {
      status: 200,
      contentType: upstream.headers.get('content-type') || 'application/octet-stream',
      body: Buffer.alloc(0),
      cacheControl: IMAGE_PROXY_CACHE_HEADER,
    }
  }

  let body = Buffer.from(await upstream.arrayBuffer())
  let contentType = upstream.headers.get('content-type') || 'application/octet-stream'

  if (maxWidth > 0 && /^image\//i.test(contentType) && !contentType.includes('svg')) {
    try {
      const sharp = (await import('sharp')).default
      body = await sharp(body)
        .rotate()
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: q, effort: 4, smartSubsample: true })
        .toBuffer()
      contentType = 'image/webp'
    } catch {
      /* keep original if resize fails */
    }
  }

  return {
    status: 200,
    contentType,
    body,
    cacheControl: IMAGE_PROXY_CACHE_HEADER,
  }
}
