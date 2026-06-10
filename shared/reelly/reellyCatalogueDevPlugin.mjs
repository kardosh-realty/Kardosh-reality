import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { handleCatalogueRequest, isCatalogueKind } from './catalogueHandler.mjs'

function loadApiKey(envDir) {
  try {
    const raw = readFileSync(resolve(envDir, '.env'), 'utf8')
    const match = raw.match(/^REELLY_API_KEY=(.+)$/m)
    if (!match) return ''
    return match[1].trim().replace(/^['"]|['"]$/g, '')
  } catch {
    return ''
  }
}

/** Vite dev server — aggregated /api/reelly/catalogue/* routes (same as production Node server). */
export function reellyCatalogueDevPlugin({ envDir }) {
  const apiKey = loadApiKey(envDir)

  return {
    name: 'kardosh-reelly-catalogue-dev',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost')
        const match = url.pathname.match(/^\/api\/reelly\/catalogue\/([^/]+)$/)
        if (!match || req.method !== 'GET') return next()

        const kind = match[1]
        if (!isCatalogueKind(kind)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'Unknown catalogue' }))
          return
        }

        if (!apiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'REELLY_API_KEY is not set in kardosh/.env' }))
          return
        }

        try {
          const payload = await handleCatalogueRequest(kind, url.searchParams, apiKey)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'public, max-age=3600')
          res.end(JSON.stringify(payload))
        } catch (err) {
          res.statusCode = err?.status || 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error: 'Catalogue fetch failed',
              message: err?.message || 'Unknown error',
            })
          )
        }
      })
    },
  }
}
