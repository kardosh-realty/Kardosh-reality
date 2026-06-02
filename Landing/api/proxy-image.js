import { processImageProxy } from '../server/imageProxyCore.mjs'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    res.status(405).end('Method not allowed')
    return
  }

  const rawUrl = req.query.url
  const target = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl

  try {
    const result = await processImageProxy({
      url: target,
      width: req.query.w,
      quality: req.query.q,
      method: req.method,
    })

    res.status(result.status)
    res.setHeader('Content-Type', result.contentType)
    if (result.cacheControl !== 'no-store') {
      res.setHeader('Cache-Control', result.cacheControl)
      res.setHeader('CDN-Cache-Control', 'public, max-age=31536000, immutable')
    }

    if (req.method === 'HEAD') {
      res.setHeader('Content-Length', String(result.body.length))
      res.end()
      return
    }

    if (result.status !== 200) {
      res.end(result.body.length ? result.body : undefined)
      return
    }

    res.send(result.body)
  } catch (err) {
    res.status(502).json({
      error: 'Image proxy failed',
      message: err?.message || 'Unknown error',
    })
  }
}
