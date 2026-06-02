import { processImageProxy } from './imageProxyCore.mjs'

/** Vite dev server — same /api/proxy-image compression as Vercel production. */
export function imageProxyDevPlugin() {
  return {
    name: 'kardosh-image-proxy-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0] || ''
        if (path !== '/api/proxy-image') return next()

        try {
          const params = new URL(req.url, 'http://localhost').searchParams
          const url = params.get('url')
          const width = params.get('w')
          const quality = params.get('q')

          const result = await processImageProxy({
            url,
            width,
            quality,
            method: req.method,
          })

          res.statusCode = result.status
          res.setHeader('Content-Type', result.contentType)
          res.setHeader('Cache-Control', result.cacheControl)
          if (req.method === 'HEAD') {
            res.setHeader('Content-Length', String(result.body.length))
            res.end()
            return
          }
          res.end(result.body)
        } catch (err) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Image proxy failed', message: err?.message || 'Unknown error' }))
        }
      })
    },
  }
}
