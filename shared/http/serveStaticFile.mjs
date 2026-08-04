import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const RANGE_MEDIA_EXT = new Set(['.mp4', '.webm', '.ogg', '.m4v'])

const COMPRESSIBLE_EXT = new Set([
  '.css', '.html', '.js', '.json', '.svg', '.txt', '.webmanifest', '.xml',
])

function pickEncoder(req, ext) {
  if (!COMPRESSIBLE_EXT.has(ext)) return null
  const accept = String(req?.headers?.['accept-encoding'] || '')
  if (/\bbr\b/.test(accept)) {
    return ['br', zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })]
  }
  if (/\bgzip\b/.test(accept)) return ['gzip', zlib.createGzip({ level: 6 })]
  return null
}

/**
 * Serve a static file with Content-Length and HTTP byte-range support.
 * Safari requires Accept-Ranges + 206 Partial Content for progressive MP4 playback.
 */
export function serveStaticFile(res, filePath, {
  req = null,
  mime = {},
  cacheControl = 'no-cache',
  extraHeaders = {},
} = {}) {
  const ext = path.extname(filePath).toLowerCase()
  const headers = {
    'Content-Type': mime[ext] || 'application/octet-stream',
    'Cache-Control': cacheControl,
    ...extraHeaders,
  }

  let stat
  try {
    stat = fs.statSync(filePath)
  } catch {
    res.writeHead(404)
    res.end('Not found')
    return
  }

  if (RANGE_MEDIA_EXT.has(ext)) {
    headers['Accept-Ranges'] = 'bytes'
    const size = stat.size
    const rangeHeader = req?.headers?.range

    if (rangeHeader) {
      const match = String(rangeHeader).match(/^bytes=(\d*)-(\d*)$/i)
      if (!match) {
        res.writeHead(416, { 'Content-Range': `bytes */${size}` })
        res.end()
        return
      }

      let start = match[1] === '' ? 0 : Number(match[1])
      let end = match[2] === '' ? size - 1 : Number(match[2])
      if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || end < start || start >= size) {
        res.writeHead(416, { 'Content-Range': `bytes */${size}` })
        res.end()
        return
      }
      end = Math.min(end, size - 1)

      headers['Content-Range'] = `bytes ${start}-${end}/${size}`
      headers['Content-Length'] = String(end - start + 1)
      res.writeHead(206, headers)
      fs.createReadStream(filePath, { start, end }).pipe(res)
      return
    }

    headers['Content-Length'] = String(size)
    res.writeHead(200, headers)
    fs.createReadStream(filePath).pipe(res)
    return
  }

  const encoder = pickEncoder(req, ext)
  if (encoder) {
    headers['Content-Encoding'] = encoder[0]
    headers['Vary'] = 'Accept-Encoding'
    res.writeHead(200, headers)
    fs.createReadStream(filePath).pipe(encoder[1]).pipe(res)
    return
  }

  headers['Content-Length'] = String(stat.size)
  res.writeHead(200, headers)
  fs.createReadStream(filePath).pipe(res)
}
