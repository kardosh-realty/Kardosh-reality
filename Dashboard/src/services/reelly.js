/**
 * Minimal Reelly client for the dashboard off-plan manager.
 * Uses the same /api/reelly dev proxy as the Landing site (key stays server-side).
 * @see https://docs.reelly.ai/docs/reelly-api-v20-getting-started
 */

const BASE = '/api/reelly'

const DEFAULT_QUERY = {
  language: 'en-us',
  preferred_currency: 'AED',
  preferred_area_unit: 'm2',
}

function buildQuery(params = {}) {
  const merged = { ...DEFAULT_QUERY, ...params }
  const q = new URLSearchParams()
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.set(k, String(v))
  })
  return q.toString()
}

async function reellyFetch(path, params = {}) {
  const qs = buildQuery(params)
  const url = qs ? `${BASE}${path}?${qs}` : `${BASE}${path}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 90_000)

  let res
  try {
    res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
  } catch (e) {
    if (e?.name === 'AbortError') {
      const err = new Error('Reelly API timed out — the server took too long to respond.')
      err.status = 408
      throw err
    }
    throw e
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) {
    const err = new Error(`Reelly API error: ${res.status}`)
    err.status = res.status
    throw err
  }
  return res.json()
}

function normalizeList(data) {
  if (Array.isArray(data)) return { count: data.length, results: data }
  return { count: data?.count ?? 0, results: data?.results ?? [] }
}

function locationLabel(location) {
  if (!location) return 'UAE'
  if (typeof location === 'string') return location
  const parts = [location.district, location.region, location.city].filter(Boolean)
  return parts.length ? parts.join(', ') : 'UAE'
}

function areaName(location) {
  if (!location) return 'Other'
  if (typeof location === 'string') return location
  return location.district || location.region || location.city || 'Other'
}

/** Trim raw Reelly project to the fields the dashboard needs. */
export function mapProject(project) {
  const developerName =
    typeof project.developer === 'string' ? project.developer : project.developer?.name || 'Unknown developer'
  const min = Math.round(Number(project.min_price) || 0)
  const max = Math.round(Number(project.max_price) || 0)
  const price = min || max
  return {
    id: project.id,
    title: project.name,
    image: project.cover_image?.url || '',
    developer: developerName,
    developerId: typeof project.developer === 'object' ? project.developer?.id ?? null : null,
    area: areaName(project.location),
    locationLabel: locationLabel(project.location),
    status: project.sale_status || project.construction_status || project.status || '—',
    completionDate: project.completion_date || null,
    priceLabel: price ? `From AED ${price.toLocaleString('en-AE')}` : 'Price on request',
  }
}

export async function fetchProjects(params = {}) {
  const data = await reellyFetch('/projects', {
    country: 'United Arab Emirates',
    limit: '50',
    offset: '0',
    ...params,
  })
  const { results, count } = normalizeList(data)
  return { count, results: results.map(mapProject) }
}

function collectImages(project) {
  const urls = []
  const push = (v) => {
    if (!v) return
    if (typeof v === 'string') urls.push(v)
    else if (v.url) urls.push(v.url)
  }
  push(project.cover_image)
  for (const key of ['architecture', 'interior', 'lobby', 'masterplan', 'master_plan', 'gallery', 'images']) {
    if (Array.isArray(project[key])) project[key].forEach(push)
  }
  return [...new Set(urls.filter(Boolean))]
}

/** Richer single-project mapping for the dashboard preview page. */
export function mapProjectDetail(project) {
  if (!project) return null
  const base = mapProject(project)
  const min = Math.round(Number(project.min_price) || 0)
  const max = Math.round(Number(project.max_price) || 0)
  const fmt = (n) => `AED ${n.toLocaleString('en-AE')}`
  let priceRange = base.priceLabel
  if (min && max && max !== min) priceRange = `${fmt(min)} – ${fmt(max)}`
  else if (min || max) priceRange = `From ${fmt(min || max)}`

  const docs = collectProjectDocuments(project)

  return {
    ...base,
    images: collectImages(project),
    description: project.description || project.overview || project.about || '',
    priceRange,
    minPrice: min || null,
    maxPrice: max || null,
    paymentPlan:
      project.payment_plan ||
      (Array.isArray(project.payment_plans) ? project.payment_plans[0]?.name : '') ||
      '',
    completionDate: project.completion_date || project.planned_completion_date || base.completionDate,
    salesStatus: project.sale_status || base.status,
    constructionStatus: project.construction_status || '',
    marketingBrochure: docs.marketingBrochure,
    floorPlanPdfs: docs.floorPlanPdfs,
    documents: docs.documents,
  }
}

function isPdfUrl(url) {
  if (!url) return false
  return /\.pdf(\?|$)/i.test(url) || url.toLowerCase().includes('.pdf')
}

function isImageUrl(url) {
  if (!url) return false
  return /\.(jpe?g|png|webp|gif)(\?|$)/i.test(url) || url.includes('image')
}

function cleanDocumentName(name, fallback = 'Document') {
  if (!name) return fallback
  const trimmed = name.split(' - /vault')[0].split('/vault')[0].trim()
  if (!trimmed) return fallback
  return trimmed.replace(/\.pdf$/i, '').trim() || fallback
}

function toDownloadDoc({ id, name, url, description, type }) {
  return {
    id,
    name: cleanDocumentName(name, name),
    url,
    description: description || null,
    type,
  }
}

function mediaUrl(item) {
  if (!item) return null
  if (typeof item === 'string') return item
  return item.url || null
}

/** PDFs and brochures available for admin download only. */
export function collectProjectDocuments(project) {
  if (!project) {
    return { marketingBrochure: null, floorPlanPdfs: [], documents: [] }
  }

  const floorPlanPdfs = (project.floor_plans || [])
    .map((fp) => ({
      id: fp.id,
      name: fp.name || 'Floor plan',
      url: fp.file,
      description: fp.description,
      isImage: isImageUrl(fp.file),
    }))
    .filter((fp) => fp.url && !fp.isImage && (isPdfUrl(fp.url) || fp.url))
    .map((fp) =>
      toDownloadDoc({
        id: fp.id,
        name: fp.name || 'Floor plan PDF',
        url: fp.url,
        description: fp.description,
        type: 'floor_plan',
      })
    )

  const marketingBrochure = project.marketing_brochure
    ? toDownloadDoc({
        id: 'brochure',
        name: 'Marketing brochure',
        url: project.marketing_brochure,
        type: 'brochure',
      })
    : null

  const documents = []
  ;(project.documents || []).forEach((doc, i) => {
    const url = doc.url || doc.file
    if (!url) return
    documents.push(
      toDownloadDoc({
        id: doc.id || `doc-${i}`,
        name: doc.name || doc.title || 'Document',
        url,
        description: doc.description,
        type: doc.type || 'document',
      })
    )
  })

  const generalPlanUrl = mediaUrl(project.general_plan)
  if (generalPlanUrl && !isImageUrl(generalPlanUrl) && isPdfUrl(generalPlanUrl)) {
    documents.push(
      toDownloadDoc({
        id: 'general-plan',
        name: 'Master plan',
        url: generalPlanUrl,
        type: 'masterplan',
      })
    )
  }

  return { marketingBrochure, floorPlanPdfs, documents }
}

export async function fetchProjectById(id, params = {}) {
  const data = await reellyFetch(`/projects/${id}`, params)
  const raw = data?.results || data?.data || data
  return mapProjectDetail(raw)
}
