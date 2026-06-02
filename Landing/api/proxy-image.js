/**
 * Cache-friendly proxy for Reelly listing images (storage.googleapis.com, api.reelly.io).
 * Vercel edge caches responses; browsers get long max-age on repeat visits.
 */
const ALLOWED_HOST_SUFFIXES = ['storage.googleapis.com', 'googleapis.com', 'reelly.io']

const CACHE_HEADER = 'public, max-age=31536000, immutable, s-maxage=31536000, stale-while-revalidate=86400'

function isAllowedUrl(value) {
  let parsed
  try {
    parsed = new URL(value)
  } catch {
    return false
  }
  if (parsed.protocol !== 'https:') return false
  return ALLOWED_HOST_SUFFIXES.some(
    (suffix) =>
      parsed.hostname === suffix || parsed.hostname.endsWith(`.${suffix}`)
  )
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    res.status(405).end('Method not allowed')
    return
  }

  const rawUrl = req.query.url
  const target = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl

  if (!target || !isAllowedUrl(String(target))) {
    res.status(400).end('Invalid or disallowed image URL')
    return
  }

  const width = Math.min(Math.max(parseInt(req.query.w, 10) || 0, 0), 1920)
  const quality = Math.min(Math.max(parseInt(req.query.q, 10) || 78, 40), 90)

  try {
    const upstream = await fetch(String(target), {
      method: req.method,
      headers: { Accept: 'image/*,*/*;q=0.8' },
    })

    if (!upstream.ok) {
      res.status(upstream.status).end()
      return
    }

    let body = Buffer.from(await upstream.arrayBuffer())
    let contentType = upstream.headers.get('content-type') || 'application/octet-stream'

    if (width > 0 && /^image\//i.test(contentType) && !contentType.includes('svg')) {
      try {
        const sharp = (await import('sharp')).default
        body = await sharp(body)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality, effort: 4, smartSubsample: true })
          .toBuffer()
        contentType = 'image/webp'
      } catch {
        /* serve original bytes if resize fails */
      }
    }

    res.status(200)
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', CACHE_HEADER)
    res.setHeader('CDN-Cache-Control', 'public, max-age=31536000, immutable')

    if (req.method === 'HEAD') {
      res.setHeader('Content-Length', String(body.length))
      res.end()
      return
    }

    res.send(body)
  } catch (err) {
    res.status(502).json({
      error: 'Image proxy failed',
      message: err?.message || 'Unknown error',
    })
  }
}
