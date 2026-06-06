import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { processImageProxy } from '../lib/imageProxyCore.mjs'

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
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
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

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase()
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': filePath.includes(`${path.sep}assets${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'no-cache',
  })
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (requestUrl.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, app: 'kardosh-landing', routes: ['/', '/api/reelly/*', '/api/proxy-image'] })
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
    serveFile(res, filePath)
    return
  }

  serveFile(res, path.join(distDir, 'index.html'))
})

server.listen(PORT, () => {
  console.log(`[hostinger] serving ${distDir}`)
  console.log(`[hostinger] listening on :${PORT}`)
})
