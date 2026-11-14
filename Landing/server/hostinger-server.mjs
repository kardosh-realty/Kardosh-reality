import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { processImageProxy } from '../lib/imageProxyCore.mjs'
import { handleCatalogueRequest, isCatalogueKind } from '../../shared/reelly/catalogueHandler.mjs'
import { resolveStaticPath } from '../../shared/staticPath.mjs'
import { serveStaticFile } from '../../shared/http/serveStaticFile.mjs'
import { isKnownSpaRoute } from './knownRoutes.mjs'

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
  '.mjs': 'text/javascript; charset=utf-8',
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

const JSON_TYPE = 'application/json; charset=utf-8'

function jsonResult(status, body, cacheControl = 'no-store') {
  return {
    status,
    headers: { 'Content-Type': JSON_TYPE, 'Cache-Control': cacheControl },
    body: Buffer.from(JSON.stringify(body)),
  }
}

/**
 * Reelly proxy as a plain function → `{ status, headers, body }`.
 * Shared by the HTTP route and the SEO renderer, which calls it in-process
 * (Hostinger's Node runtime does not expose the app on a loopback port).
 */
async function reellyResult({ method = 'GET', pathname, search = '', body }) {
  const apiKey = process.env.REELLY_API_KEY
  if (!apiKey) {
    return jsonResult(500, {
      error: 'Server misconfiguration',
      message: 'REELLY_API_KEY is not set in Hostinger environment variables.',
    })
  }

  const catalogueMatch = pathname.match(/^\/api\/reelly\/catalogue\/([^/]+)$/)
  if (catalogueMatch && method === 'GET') {
    const kind = catalogueMatch[1]
    if (!isCatalogueKind(kind)) return jsonResult(404, { error: 'Unknown catalogue' })
    try {
      const payload = await handleCatalogueRequest(kind, new URLSearchParams(search), apiKey)
      return jsonResult(200, payload, 'public, max-age=3600')
    } catch (err) {
      return jsonResult(err?.status || 502, {
        error: 'Catalogue fetch failed',
        message: err?.message || 'Unknown error',
      })
    }
  }

  const upstreamPath = pathname.replace(/^\/api\/reelly\/?/, '')
  const target = `${UPSTREAM}${upstreamPath ? `/${upstreamPath}` : ''}${search}`
  const hasBody = method !== 'GET' && method !== 'HEAD' && body

  try {
    const upstream = await fetch(target, {
      method,
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
      body: hasBody ? body : undefined,
      duplex: hasBody ? 'half' : undefined,
    })
    return {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || JSON_TYPE,
        'Cache-Control': 'no-store',
      },
      body: Buffer.from(await upstream.arrayBuffer()),
    }
  } catch (err) {
    return jsonResult(502, {
      error: 'Upstream request failed',
      message: err?.message || 'Unknown error',
    })
  }
}

async function proxyReelly(req, res, requestUrl) {
  const result = await reellyResult({
    method: req.method,
    pathname: requestUrl.pathname,
    search: requestUrl.search,
    body: req,
  })
  res.writeHead(result.status, result.headers)
  res.end(result.body)
}

/** `fetch`-compatible in-process API for the SEO renderer (only /api/reelly is supported). */
async function inProcessApiFetch(input) {
  const url = new URL(String(input), 'http://localhost')
  if (!url.pathname.startsWith('/api/reelly')) {
    throw new Error(`In-process fetch only supports /api/reelly (got ${url.pathname})`)
  }
  const result = await reellyResult({ pathname: url.pathname, search: url.search })
  return new Response(result.body, { status: result.status, headers: result.headers })
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

const LONG_CACHE_EXT = new Set([
  '.css', '.gif', '.ico', '.jpg', '.jpeg', '.js', '.mjs', '.mp4', '.png', '.svg', '.webp', '.woff', '.woff2',
])

function cacheControlFor(filePath, ext) {
  if (filePath.includes(`${path.sep}assets${path.sep}`)) return 'public, max-age=31536000, immutable'
  if (LONG_CACHE_EXT.has(ext)) return 'public, max-age=2592000'
  return 'no-cache'
}

function serveFile(res, filePath, req) {
  const ext = path.extname(filePath).toLowerCase()
  const extraHeaders = {}
  if (ext === '.html') {
    // Explicitly allow muted autoplay — Hostinger CDN challenge pages send autoplay=()
    extraHeaders['Permissions-Policy'] = 'autoplay=(self)'
  }
  serveStaticFile(res, filePath, {
    req,
    mime: MIME,
    cacheControl: cacheControlFor(filePath, ext),
    extraHeaders,
  })
}

function resolveHeroVideoPath() {
  const candidates = [
    path.join(distDir, 'videos', 'dubai-hero.mp4'),
    path.join(landingRoot, 'public', 'videos', 'dubai-hero.mp4'),
    path.join(repoRoot, 'Landing', 'public', 'videos', 'dubai-hero.mp4'),
  ]
  return candidates.find((p) => fs.existsSync(p)) || null
}

/** Safari-safe MP4 stream — bypasses Hostinger CDN static cache that strips Range. */
function serveHeroVideo(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    res.end('Method not allowed')
    return
  }

  const filePath = resolveHeroVideoPath()
  if (!filePath) {
    sendJson(res, 404, { error: 'Hero video not found' })
    return
  }

  serveStaticFile(res, filePath, {
    req,
    mime: MIME,
    cacheControl: 'public, max-age=86400',
    extraHeaders: {
      'Permissions-Policy': 'autoplay=(self)',
    },
  })
}

const indexHtmlPath = path.join(distDir, 'index.html')

/** Server-rendered SEO head tags (src/seo/serverEntry.js → dist-ssr). Optional: falls back to the plain shell. */
const seo = await import('../dist-ssr/serverEntry.js').catch((err) => {
  console.warn('[hostinger] SEO head rendering disabled —', err?.code || err?.message || err)
  return null
})
seo?.initSeoServer({ apiFetch: inProcessApiFetch })

let shellCache = { mtimeMs: 0, html: '' }

function readShell() {
  const { mtimeMs } = fs.statSync(indexHtmlPath)
  if (mtimeMs !== shellCache.mtimeMs) {
    shellCache = { mtimeMs, html: fs.readFileSync(indexHtmlPath, 'utf8') }
  }
  return shellCache.html
}

function sendHtml(req, res, status, html) {
  const headers = {
    'Content-Type': MIME['.html'],
    'Cache-Control': 'no-cache',
    'Permissions-Policy': 'autoplay=(self)',
    Vary: 'Accept-Encoding',
  }
  const accept = String(req.headers['accept-encoding'] || '')
  let body = Buffer.from(html)
  if (/\bbr\b/.test(accept)) {
    body = zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })
    headers['Content-Encoding'] = 'br'
  } else if (/\bgzip\b/.test(accept)) {
    body = zlib.gzipSync(body, { level: 6 })
    headers['Content-Encoding'] = 'gzip'
  }
  headers['Content-Length'] = String(body.length)
  res.writeHead(status, headers)
  res.end(req.method === 'HEAD' ? undefined : body)
}

/** SPA shell for an app route — with SEO head tags and status when available. */
async function serveAppShell(req, res, requestUrl) {
  if (seo && (req.method === 'GET' || req.method === 'HEAD')) {
    try {
      const page = await seo.renderSeoPage(readShell(), requestUrl.pathname + requestUrl.search)
      if (page.status === 301) {
        res.writeHead(301, { Location: page.location + requestUrl.search, 'Cache-Control': 'no-cache' })
        res.end()
        return
      }
      sendHtml(req, res, page.status, page.html)
      return
    } catch (err) {
      console.error('[hostinger] SEO render failed for', requestUrl.pathname, err?.message || err)
    }
  }

  // Unknown routes still render the Vue 404 page, but with a real 404 status.
  serveStaticFile(res, indexHtmlPath, {
    req,
    mime: MIME,
    cacheControl: 'no-cache',
    extraHeaders: { 'Permissions-Policy': 'autoplay=(self)' },
    status: isKnownSpaRoute(requestUrl.pathname) ? 200 : 404,
  })
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (requestUrl.pathname === '/api/health') {
    sendJson(res, 200, {
      ok: true,
      app: 'kardosh-landing',
      routes: ['/', '/api/hero-video', '/api/reelly/*', '/api/reelly/catalogue/*', '/api/proxy-image'],
      seoHead: Boolean(seo),
    })
    return
  }

  if (requestUrl.pathname === '/api/hero-video') {
    serveHeroVideo(req, res)
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

  let filePath = resolveStaticPath(distDir, requestUrl.pathname)
  if (!filePath) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  if (filePath === indexHtmlPath) {
    await serveAppShell(req, res, requestUrl)
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    // Also route static hero MP4 through range-aware handler
    if (filePath.endsWith(`${path.sep}dubai-hero.mp4`)) {
      serveHeroVideo(req, res)
      return
    }
    serveFile(res, filePath, req)
    return
  }

  await serveAppShell(req, res, requestUrl)
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[hostinger] serving ${distDir}`)
  console.log(`[hostinger] listening on 0.0.0.0:${PORT}`)
})
