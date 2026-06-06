import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { processImageProxy } from '../Landing/lib/imageProxyCore.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const adminDir = path.join(distDir, 'admin')

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

    res.writeHead(upstream.status, {
      'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    })
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

function safeJoin(baseDir, requestPath) {
  const decoded = decodeURIComponent(requestPath)
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  return path.join(baseDir, normalized)
}

function serveFile(res, filePath, { admin = false } = {}) {
  const ext = path.extname(filePath).toLowerCase()
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': filePath.includes(`${path.sep}assets${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'no-cache',
  }

  if (admin) headers['X-Robots-Tag'] = 'noindex, nofollow'

  res.writeHead(200, headers)
  fs.createReadStream(filePath).pipe(res)
}

function serveSpa(reqPath, res, { basePath, baseDir, admin = false }) {
  const relativePath = basePath ? reqPath.slice(basePath.length) || '/' : reqPath
  let filePath = safeJoin(baseDir, relativePath)

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath, { admin })
    return
  }

  serveFile(res, path.join(baseDir, 'index.html'), { admin })
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const pathname = requestUrl.pathname

  if (pathname === '/api/health') {
    sendJson(res, 200, {
      ok: true,
      app: 'kardosh-realty',
      routes: ['/', '/admin', '/api/reelly/*', '/api/proxy-image'],
    })
    return
  }

  if (pathname === '/api/proxy-image') {
    await proxyImage(req, res, requestUrl)
    return
  }

  if (pathname.startsWith('/api/reelly')) {
    await proxyReelly(req, res, requestUrl)
    return
  }

  if (pathname === '/admin') {
    res.writeHead(308, { Location: '/admin/' })
    res.end()
    return
  }

  if (pathname.startsWith('/admin/')) {
    serveSpa(pathname, res, { basePath: '/admin', baseDir: adminDir, admin: true })
    return
  }

  serveSpa(pathname, res, { basePath: '', baseDir: distDir })
})

server.listen(PORT, () => {
  console.log(`[hostinger] serving Landing from ${distDir}`)
  console.log(`[hostinger] serving Dashboard from ${adminDir}`)
  console.log(`[hostinger] listening on :${PORT}`)
})
