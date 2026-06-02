/**
 * Build-time sitemap for the public Landing site.
 * Reads kardosh/.env for REELLY_API_KEY, VITE_SITE_URL, Supabase keys.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { envDir } from '../../env-dir.mjs'
import { UAE_COMMUNITIES } from '../src/config/communities.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')

function loadEnvFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      let val = trimmed.slice(idx + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (process.env[key] === undefined) process.env[key] = val
    }
  } catch {
    /* optional .env */
  }
}

loadEnvFile(path.join(envDir, '.env'))

const SITE_URL = (process.env.VITE_SITE_URL || 'https://kardoshrealty.ae').replace(/\/+$/, '')
const REELLY_UPSTREAM = 'https://api-reelly.up.railway.app/api/v2/clients'
const DEFAULT_QS = {
  language: 'en-us',
  preferred_currency: 'AED',
  preferred_area_unit: 'm2',
  country: 'United Arab Emirates',
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function projectSlug(item) {
  const api = item?.slug || item?.slug_name
  if (api) return slugify(api)
  const title = item?.title || (item?.name && String(item.name).split(',')[0]) || ''
  const base = slugify(title)
  if (!base) return item?.id != null ? String(item.id) : ''
  return item?.id != null ? `${base}-${item.id}` : base
}

function developerSlug(dev) {
  return slugify(dev?.slug || dev?.name || '')
}

const STATIC_PATHS = [
  '/',
  '/off-plan',
  '/rent',
  '/sell',
  '/developers',
  '/communities',
  '/why-dubai',
  '/aboutus',
  '/contact',
  '/blogs',
  '/terms',
  '/privacy',
]

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function urlEntry(loc, lastmod) {
  const parts = [`  <url>`, `    <loc>${xmlEscape(loc)}</loc>`]
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
  parts.push('  </url>')
  return parts.join('\n')
}

async function reellyFetch(pathSegment, params = {}) {
  const apiKey = process.env.REELLY_API_KEY
  if (!apiKey) {
    console.warn('[sitemap] REELLY_API_KEY missing — skipping project/developer URLs')
    return null
  }
  const q = new URLSearchParams({ ...DEFAULT_QS, ...params })
  const url = `${REELLY_UPSTREAM}/${pathSegment.replace(/^\/+/, '')}?${q}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'X-API-Key': apiKey },
  })
  if (!res.ok) {
    console.warn(`[sitemap] Reelly ${pathSegment} → ${res.status}`)
    return null
  }
  return res.json()
}

function normalizeList(data) {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data.results)) return data.results
  if (Array.isArray(data.data)) return data.data
  return []
}

async function fetchAllProjects() {
  const out = []
  const limit = 100
  let offset = 0
  for (let page = 0; page < 30; page++) {
    const data = await reellyFetch('projects', {
      limit: String(limit),
      offset: String(offset),
    })
    const batch = normalizeList(data)
    if (!batch.length) break
    out.push(...batch)
    if (batch.length < limit) break
    offset += limit
  }
  return out
}

async function fetchDeveloperSlugs() {
  const data = await reellyFetch('developers/logos', {})
  const list = normalizeList(data)
  const slugs = new Set()
  for (const dev of list) {
    const slug = developerSlug(dev)
    if (slug) slugs.add(slug)
  }
  return [...slugs]
}

async function fetchBlogSlugs() {
  const base = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!base || !key) {
    console.warn('[sitemap] Supabase env missing — skipping blog URLs')
    return []
  }
  const url = `${base.replace(/\/+$/, '')}/rest/v1/blogs?select=slug,published_at&published=eq.true&order=published_at.desc&limit=200`
  const res = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
    },
  })
  if (!res.ok) {
    console.warn(`[sitemap] blogs → ${res.status}`)
    return []
  }
  const rows = await res.json()
  return (rows || []).filter((r) => r?.slug).map((r) => r.slug)
}

async function main() {
  const today = new Date().toISOString().slice(0, 10)
  const locs = new Set(STATIC_PATHS.map((p) => `${SITE_URL}${p === '/' ? '' : p}`))

  for (const c of UAE_COMMUNITIES) {
    locs.add(`${SITE_URL}/communities/${c.slug}`)
  }

  const [projects, devSlugs, blogSlugs] = await Promise.all([
    fetchAllProjects(),
    fetchDeveloperSlugs(),
    fetchBlogSlugs(),
  ])

  for (const p of projects) {
    const slug = projectSlug(p)
    if (slug) locs.add(`${SITE_URL}/property-detail/${slug}`)
  }

  for (const slug of devSlugs) {
    locs.add(`${SITE_URL}/developer/${slug}`)
  }

  for (const slug of blogSlugs) {
    locs.add(`${SITE_URL}/blog/${slug}`)
  }

  const body = [...locs]
    .sort()
    .map((loc) => urlEntry(loc, today))
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

  fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')

  const robotsPath = path.join(publicDir, 'robots.txt')
  let robots = fs.readFileSync(robotsPath, 'utf8')
  const sitemapLine = `Sitemap: ${SITE_URL}/sitemap.xml`
  const llmsLine = `LLMs: ${SITE_URL}/llms.txt`
  const llmsFullLine = `LLMs-Full: ${SITE_URL}/llms-full.txt`

  if (!robots.includes('Sitemap:')) {
    robots = `${robots.trim()}\n\n${sitemapLine}\n`
  } else {
    robots = robots.replace(/Sitemap:.*/g, sitemapLine)
  }

  if (!robots.includes('LLMs:')) {
    robots = `${robots.trim()}\n\n# AI / LLM context (llms.txt)\n${llmsLine}\n${llmsFullLine}\n`
  } else {
    robots = robots.replace(/LLMs:.*/g, llmsLine).replace(/LLMs-Full:.*/g, llmsFullLine)
  }

  if (!robots.includes('Allow: /llms.txt')) {
    robots = robots.replace(
      /^(User-agent: \*\r?\nAllow: \/\r?\n)/m,
      '$1Allow: /llms.txt\nAllow: /llms-full.txt\n'
    )
  }

  fs.writeFileSync(robotsPath, robots, 'utf8')

  console.log(`[sitemap] Wrote ${locs.size} URLs → public/sitemap.xml (${SITE_URL})`)
}

main().catch((e) => {
  console.error('[sitemap] failed:', e)
  process.exit(1)
})
