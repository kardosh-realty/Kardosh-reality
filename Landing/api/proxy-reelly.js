/**
 * Reelly API proxy for Vercel (Vite apps cannot use [...path] catch-all routes).
 * Routed via vercel.json: /api/reelly/* → /api/proxy-reelly?path=*
 */
const UPSTREAM = 'https://api-reelly.up.railway.app/api/v2/clients'

function buildUpstreamUrl(req) {
  let path = req.query.path
  if (Array.isArray(path)) path = path.join('/')
  path = String(path || '').replace(/^\/+/, '')

  const q = new URLSearchParams()
  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'path') continue
    if (Array.isArray(value)) {
      value.forEach((v) => q.append(key, String(v)))
    } else if (value != null && value !== '') {
      q.set(key, String(value))
    }
  }

  const qs = q.toString()
  const base = path ? `${UPSTREAM}/${path}` : UPSTREAM
  return qs ? `${base}?${qs}` : base
}

export default async function handler(req, res) {
  const apiKey = process.env.REELLY_API_KEY
  if (!apiKey) {
    res.status(500).json({
      error: 'Server misconfiguration',
      message: 'REELLY_API_KEY is not set in Vercel environment variables.',
    })
    return
  }

  const target = buildUpstreamUrl(req)

  try {
    const upstream = await fetch(target, {
      method: req.method || 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
      body:
        req.method === 'GET' || req.method === 'HEAD'
          ? undefined
          : typeof req.body === 'string'
            ? req.body
            : JSON.stringify(req.body ?? {}),
    })

    const contentType = upstream.headers.get('content-type') || 'application/json'
    const body = await upstream.text()

    res.status(upstream.status).setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'no-store')
    res.send(body)
  } catch (err) {
    res.status(502).json({
      error: 'Upstream request failed',
      message: err?.message || 'Unknown error',
    })
  }
}
