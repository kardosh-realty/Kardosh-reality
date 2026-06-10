import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { processImageProxy } from '../lib/imageProxyCore.mjs'
import { handleCatalogueRequest, isCatalogueKind } from '../../shared/reelly/catalogueHandler.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const landingRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(landingRoot, '..')
const distDir = fs.existsSync(path.join(landingRoot, 'dist'))
  ? path.join(landingRoot, 'dist')
  : path.join(repoRoot, 'dist')

const UPSTREAM = 'https://api-reelly.up.railway.app/api/v2/clients'
const PORT = Number(process.env.PORT || 3000)

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(body))
}

async function proxyReelly(req, res, requestUrl) {
  const apiKey = process.env.REELLY_API_KEY
  if (!apiKey) {
    sendJson(res, 500, {
      error: 'Server misconfiguration',
      message: 'REELLY_API_KEY is not set in Hostinger environment variables.',
    })
    return
  }

  const catalogueMatch = requestUrl.pathname.match(/^\/api\/reelly\/catalogue\/([^/]+)$/)
  if (catalogueMatch && req.method === 'GET') {
    const kind = catalogueMatch[1]
    if (!isCatalogueKind(kind)) {
      sendJson(res, 404, { error: 'Unknown catalogue' })
      return
    }
    try {
      const payload = await handleCatalogueRequest(kind, requestUrl.searchParams, apiKey)
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      })
      res.end(JSON.stringify(payload))
    } catch (err) {
      sendJson(res, err?.status || 502, {
        error: 'Catalogue fetch failed',
        message: err?.message || 'Unknown error',
      })
    }
    return
  }

  const upstreamPath = requestUrl.pathname.replace(/^\/api\/reelly\/?/, '')
  const target = `${UPSTREAM}${upstreamPath ? `/${upstreamPath}` : ''}${requestUrl.search}`

  try {
    const upstream = await fetch(target, {
      method: req.method,
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
      duplex: req.method === 'GET' || req.method === 'HEAD' ? undefined : 'half',
    })

    const headers = {
      'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    }
    res.writeHead(upstream.status, headers)
    res.end(Buffer.from(await upstream.arrayBuffer()))
  } catch (err) {
    sendJson(res, 502, {
      error: 'Upstream request failed',
      message: err?.message || 'Unknown error',
    })
  }
}

async function proxyImage(req, res, requestUrl) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    res.end('Method not allowed')
    return
  }

  try {
    const result = await processImageProxy({
      url: requestUrl.searchParams.get('url'),
      width: requestUrl.searchParams.get('w'),
      quality: requestUrl.searchParams.get('q'),
      method: req.method,
    })

    res.writeHead(result.status, {
      'Content-Type': result.contentType,
      'Cache-Control': result.cacheControl,
    })

    if (req.method === 'HEAD') {
      res.end()
      return
    }
    res.end(result.body)
  } catch (err) {
    sendJson(res, 502, {
      error: 'Image proxy failed',
      message: err?.message || 'Unknown error',
    })
  }
}

function safeFilePath(requestUrl) {
  const decoded = decodeURIComponent(requestUrl.pathname)
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  return path.join(distDir, normalized)
}

const LONG_CACHE_EXT = new Set([
  '.css', '.gif', '.ico', '.jpg', '.jpeg', '.js', '.mp4', '.png', '.svg', '.webp', '.woff', '.woff2',
])

function cacheControlFor(filePath, ext) {
  if (filePath.includes(`${path.sep}assets${path.sep}`)) return 'public, max-age=31536000, immutable'
  if (LONG_CACHE_EXT.has(ext)) return 'public, max-age=2592000'
  return 'no-cache'
}

const COMPRESSIBLE_EXT = new Set([
  '.css', '.html', '.js', '.json', '.svg', '.txt', '.webmanifest', '.xml',
])

/** Pick a streaming compressor based on the client's Accept-Encoding. */
function pickEncoder(req, ext) {
  if (!COMPRESSIBLE_EXT.has(ext)) return null
  const accept = String(req.headers['accept-encoding'] || '')
  if (/\bbr\b/.test(accept)) {
    return ['br', zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })]
  }
  if (/\bgzip\b/.test(accept)) return ['gzip', zlib.createGzip({ level: 6 })]
  return null
}

function serveFile(res, filePath, req) {
  const ext = path.extname(filePath).toLowerCase()
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': cacheControlFor(filePath, ext),
  }

  const encoder = req ? pickEncoder(req, ext) : null
  if (encoder) {
    headers['Content-Encoding'] = encoder[0]
    headers['Vary'] = 'Accept-Encoding'
    res.writeHead(200, headers)
    fs.createReadStream(filePath).pipe(encoder[1]).pipe(res)
    return
  }

  res.writeHead(200, headers)
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (requestUrl.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, app: 'kardosh-landing', routes: ['/', '/api/reelly/*', '/api/reelly/catalogue/*', '/api/proxy-image'] })
    return
  }

  if (requestUrl.pathname === '/api/proxy-image') {
    await proxyImage(req, res, requestUrl)
    return
  }

  if (requestUrl.pathname.startsWith('/api/reelly')) {
    await proxyReelly(req, res, requestUrl)
    return
  }

  let filePath = safeFilePath(requestUrl)
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath, req)
    return
  }

  serveFile(res, path.join(distDir, 'index.html'), req)
})

server.listen(PORT, () => {
  console.log(`[hostinger] serving ${distDir}`)
  console.log(`[hostinger] listening on :${PORT}`)
})
