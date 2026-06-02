/** @see https://docs.reelly.ai/docs/media-documents */

import {
  LISTING_GALLERY_IMAGE_WIDTH,
  proxyReellyImageUrl,
} from '@/services/reelly/imageProxy'

const GROUP_LABELS = {
  cover: 'Cover',
  lobby: 'Lobby',
  interior: 'Interior',
  architecture: 'Exterior',
  masterplan: 'Master plan',
}

export function mediaUrl(item) {
  const url = item?.url || null
  return url
    ? proxyReellyImageUrl(url, { width: LISTING_GALLERY_IMAGE_WIDTH, quality: 80 })
    : null
}

function isImageUrl(url) {
  if (!url) return false
  return /\.(jpe?g|png|webp|gif)(\?|$)/i.test(url) || url.includes('image')
}

function isPdfUrl(url) {
  if (!url) return false
  return /\.pdf(\?|$)/i.test(url) || url.toLowerCase().includes('.pdf')
}

/** Strip Reelly vault paths from display names. */
export function cleanDocumentName(name, fallback = 'Document') {
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

/**
 * Photo gallery only (no unit layout / floor-plan images).
 */
export function collectGalleryImages(project) {
  if (!project) return []

  const seen = new Set()
  const gallery = []

  const push = (item, group) => {
    const url = mediaUrl(item)
    if (!url || seen.has(url)) return
    seen.add(url)
    gallery.push({
      url,
      group,
      label: GROUP_LABELS[group] || group,
    })
  }

  push(project.cover_image, 'cover')
  ;(project.architecture || []).forEach((i) => push(i, 'architecture'))
  ;(project.interior || []).forEach((i) => push(i, 'interior'))
  ;(project.lobby || []).forEach((i) => push(i, 'lobby'))
  push(project.general_plan, 'masterplan')
  ;(project.buildings || []).forEach((b) => {
    if (b.cover_image?.url) push(b.cover_image, 'architecture')
  })

  return gallery
}

/**
 * Typical units with layout images (floor plans) from Reelly.
 */
export function buildTypicalUnitsWithPlans(project) {
  return (project?.typical_units || []).map((u, index) => {
    const floorPlans = (u.layout || [])
      .map((l, i) => ({
        url: mediaUrl(l.image),
        name: l.name || l.title || `Floor plan ${i + 1}`,
      }))
      .filter((p) => p.url)

    return {
      id: `typical-${index}-${u.bedrooms}-${u.unit_type || 'unit'}`,
      bedrooms: u.bedrooms,
      unitType: u.unit_type,
      fromPriceAed: u.from_price_aed,
      toPriceAed: u.to_price_aed,
      minSize: u.min_size,
      maxSize: u.max_size,
      floorPlans,
    }
  })
}

/** Floor-plan files from project (PDF or image). */
export function collectProjectFloorPlanFiles(project) {
  return (project?.floor_plans || [])
    .map((fp) => ({
      id: fp.id,
      name: fp.name || 'Floor plan',
      url: fp.file,
      description: fp.description,
      isImage: isImageUrl(fp.file),
    }))
    .filter((fp) => fp.url)
}

export function collectProjectMedia(project) {
  if (!project) {
    return {
      gallery: [],
      images: [],
      documents: [],
      marketingBrochure: null,
      floorPlanPdfs: [],
      typicalUnitsWithPlans: [],
      projectFloorPlans: [],
    }
  }

  const gallery = collectGalleryImages(project)
  const typicalUnitsWithPlans = buildTypicalUnitsWithPlans(project)
  const projectFloorPlans = collectProjectFloorPlanFiles(project)

  const floorPlanPdfs = projectFloorPlans
    .filter((fp) => !fp.isImage && (isPdfUrl(fp.url) || fp.url))
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

  /** Other downloadable files (not brochure, not unit/building floor plans). */
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

  return {
    gallery,
    /** @deprecated use gallery — kept for compatibility */
    images: gallery.map((g) => ({ url: g.url, group: g.group, label: g.label })),
    marketingBrochure,
    floorPlanPdfs,
    documents,
    typicalUnitsWithPlans,
    projectFloorPlans: projectFloorPlans.filter((fp) => fp.isImage),
  }
}

/** Extract floor-plan URLs from a live unit payload when API provides them. */
export function floorPlansFromLiveUnit(unit) {
  const plans = []
  const push = (url, name) => {
    if (url) plans.push({ url, name: name || 'Floor plan' })
  }

  if (unit?.layout?.length) {
    unit.layout.forEach((l, i) => push(mediaUrl(l.image || l), l.name || `Layout ${i + 1}`))
  }
  push(mediaUrl(unit.floor_plan), 'Floor plan')
  push(mediaUrl(unit.layout_image), 'Layout')
  push(unit.floor_plan_url, 'Floor plan')
  if (typeof unit.floor_plan === 'string') push(unit.floor_plan, 'Floor plan')

  return plans
}

export function enrichLiveUnitsWithPlans(liveUnits, typicalUnitsWithPlans) {
  return liveUnits.map((unit) => {
    const own = floorPlansFromLiveUnit(unit)
    if (own.length) return { ...unit, floorPlans: own }

    const beds = unit.bedrooms
    const match = typicalUnitsWithPlans.find((t) => t.bedrooms === beds)
    return { ...unit, floorPlans: match?.floorPlans || [] }
  })
}
