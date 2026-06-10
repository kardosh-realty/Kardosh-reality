import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'
import { proxyReellyImageUrl } from '@/services/reelly/imageProxy'
import { formatAedInMillions, formatArea } from '@/config/uae'
import { parseOverviewToFaq } from '@/utils/parseOverviewFaq'
import { collectProjectMedia } from './media'
import { normalizePaymentPlans } from '@/utils/parsePaymentPlans'
import { normalizeBuildings } from '@/utils/parseBuildings'
import { enrichMapMarker } from './mapMarker'

function locationLabel(location = {}) {
  if (typeof location === 'string') return location
  const parts = [location.district, location.region, location.city, location.country].filter(Boolean)
  return parts.length ? parts.join(', ') : 'UAE'
}

function priceLabel(minPrice, maxPrice) {
  const min = Math.round(Number(minPrice) || 0)
  const max = Math.round(Number(maxPrice) || 0)
  if (!min && !max) return 'Price on request'
  const compact = formatAedInMillions(min || max)
  return compact ? `From ${compact}` : 'Price on request'
}

/** Bedroom counts from typical units and unit-type labels (list API often omits units). */
export function extractProjectBedrooms(project) {
  const counts = new Set()

  const add = (value) => {
    if (value == null || value === '') return
    const n = Number(value)
    if (Number.isFinite(n) && n >= 0) counts.add(n)
  }

  for (const u of project?.typical_units || []) {
    add(u.bedrooms ?? u.bedroom_count ?? u.beds)
  }

  for (const entry of project?.available_unit_types || []) {
    const text =
      typeof entry === 'string'
        ? entry
        : entry?.name ?? entry?.label ?? entry?.unit_type ?? ''
    const parsed = parseBedroomCountFromText(text)
    if (parsed != null) add(parsed)
  }

  return [...counts]
}

export function parseBedroomCountFromText(text) {
  if (!text) return null
  const s = String(text).toLowerCase()
  if (/\bstudio\b/.test(s)) return 0
  const m = s.match(/(\d+)\s*(?:\+)?\s*(?:br|bed|bedroom|bedrooms)\b/i)
  if (m) return Number(m[1])
  return null
}

/** True when project offers the requested bedroom count (Reelly list data may be incomplete). */
export function projectMatchesBedroomFilter(item, bedroomQuery) {
  if (!bedroomQuery) return true

  const want = Number(bedroomQuery)
  if (!Number.isFinite(want)) return true

  const beds = new Set()

  const collect = (values) => {
    for (const b of values || []) {
      const n = Number(b)
      if (Number.isFinite(n) && n >= 0) beds.add(n)
    }
  }

  collect(item.bedrooms)
  collect(extractProjectBedrooms(item._raw))

  if (!beds.size) return false

  if (want >= 5) return [...beds].some((b) => b >= 5)
  return beds.has(want)
}

/** Reelly list endpoint omits amenities; detail includes `project_amenities`. */
export function extractProjectAmenities(project) {
  const raw = project?.project_amenities ?? project?.amenities ?? []
  if (!Array.isArray(raw)) return []
  return raw
    .map((a) => {
      if (typeof a === 'string') return a
      return a?.amenity?.name ?? a?.name ?? a?.title ?? null
    })
    .filter(Boolean)
}

export function mapReellyProject(project, { full = false } = {}) {
  const minPrice = project.min_price
  const maxPrice = project.max_price
  const square = Math.round(Number(project.min_size) || Number(project.max_size) || 0)
  const developerName =
    typeof project.developer === 'string'
      ? project.developer
      : project.developer?.name

  const amenities = extractProjectAmenities(project)

  const mapped = {
    id: project.id,
    slug: project.slug_name,
    image: proxyReellyImageUrl(project.cover_image?.url, { quality: 72 }) || DUBAI_PROPERTY_FALLBACK,
    name: `${project.name}, ${locationLabel(project.location)}`,
    title: project.name,
    square,
    beds: null,
    baths: null,
    price: Math.round(Number(minPrice) || Number(maxPrice) || 0),
    minPrice: Math.round(Number(minPrice) || 0),
    maxPrice: Math.round(Number(maxPrice) || 0),
    priceLabel: priceLabel(minPrice, maxPrice),
    rating: 5,
    source: 'reelly',
    listingType: 'off-plan',
    developer: developerName,
    developerId:
      typeof project.developer === 'object'
        ? project.developer?.id
        : project.developer_id ?? project.developerId ?? null,
    saleStatus: project.sale_status,
    constructionStatus: project.construction_status || project.status,
    completionDate: project.completion_date,
    modifiedAt: project.modified || project.updated || project.created_at || project.created || null,
    overview: project.overview || project.short_description || '',
    bedrooms: extractProjectBedrooms(project),
    amenities,
    areaLabel: square ? formatArea(square) : '—',
    location: project.location,
    latitude: project.location?.latitude,
    longitude: project.location?.longitude,
    detail: project.cover_image?.url ? [project.cover_image.url] : [],
    _raw: project,
  }

  if (full) {
    const media = collectProjectMedia(project)
    mapped.media = media
    mapped.gallery = media.gallery
    mapped.images = media.images
    mapped.marketingBrochure = media.marketingBrochure
    mapped.floorPlanPdfs = media.floorPlanPdfs
    mapped.documents = media.documents
    mapped.typicalUnitsWithPlans = media.typicalUnitsWithPlans
    mapped.projectFloorPlanImages = media.projectFloorPlans
    mapped.amenities = amenities
    mapped.buildings = normalizeBuildings(project.buildings, {
      areaUnit: project.area_unit || 'm2',
    })
    mapped.typicalUnits = project.typical_units || []
    mapped.paymentPlans = normalizePaymentPlans(project.payment_plans)
    mapped.overviewFaq = parseOverviewToFaq(mapped.overview)
    mapped.maxSize = project.max_size
    mapped.minSize = project.min_size
    mapped.priceCurrency = project.price_currency
    mapped.areaUnit = project.area_unit
    mapped.unitsCount = project.units_count ?? null
    mapped.availableUnitTypes = project.available_unit_types || []
    mapped.updatedAt = project.modified || project.updated || null
  }

  return mapped
}

export function mapReellyMarker(marker) {
  return enrichMapMarker(marker)
}
