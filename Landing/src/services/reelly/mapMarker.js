import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'
import {
  MAP_MARKER_IMAGE_WIDTH,
  proxyReellyImageUrl,
} from '@/services/reelly/imageProxy'
import { formatAedInMillions } from '@/config/uae'
import { normalizePaymentPlans } from '@/utils/parsePaymentPlans'
import { extractProjectBedrooms } from './mapProject'

/** @deprecated Use formatAedInMillions from @/config/uae */
export const formatCompactAed = formatAedInMillions

export function formatMapLocationLine(location = {}, projectName = '') {
  const parts = []
  const add = (v) => {
    const s = v && String(v).trim()
    if (!s) return
    if (!parts.some((p) => p.toLowerCase() === s.toLowerCase())) parts.push(s)
  }
  add(location.city)
  add(location.region)
  add(location.district)
  add(location.area)
  add(location.subregion)
  if (projectName) add(projectName)
  return parts.join(', ') || 'UAE'
}

export function formatPaymentPlanBadge(plans) {
  const plan = plans?.[0]
  if (!plan) return null
  if (plan.showSplitRatio && plan.splitBefore != null && plan.splitAfter != null) {
    return `${plan.splitBefore}/${plan.splitAfter}`
  }
  const parts = [
    Math.round(plan.onBooking || 0),
    Math.round(plan.duringConstruction || 0),
    Math.round(plan.onHandover || 0),
  ].filter((x) => x > 0)
  if (parts.length >= 2) return parts.join('/')
  return null
}

export function formatBedroomsLabel(bedrooms = []) {
  if (!bedrooms?.length) return null
  const sorted = [...bedrooms].sort((a, b) => a - b)
  return sorted.map((n) => (n === 0 ? 'Studio' : String(n))).join(',')
}

function collectImages(raw) {
  const urls = []
  const push = (url) => {
    if (!url || typeof url !== 'string') return
    const proxied = proxyReellyImageUrl(url, { width: MAP_MARKER_IMAGE_WIDTH, quality: 72 })
    if (!urls.includes(proxied)) urls.push(proxied)
  }
  push(raw.cover_image?.url)
  push(raw.image)
  for (const img of raw.images || raw.gallery || []) {
    push(typeof img === 'string' ? img : img?.url)
  }
  return urls.length ? urls : [DUBAI_PROPERTY_FALLBACK]
}

/** Map marker + popup card fields from Reelly list or markers API payload. */
export function enrichMapMarker(raw) {
  const location = raw.location || {}
  const paymentPlans = normalizePaymentPlans(raw.payment_plans)
  const bedrooms = extractProjectBedrooms(raw)
  const minPrice = Math.round(Number(raw.min_price ?? raw.minPrice) || 0)
  const title = raw.name || raw.title || 'Project'
  const developer =
    typeof raw.developer === 'object' ? raw.developer?.name : raw.developer

  return {
    id: raw.id,
    slug: raw.slug_name || raw.slug,
    title,
    name: title,
    latitude: location.latitude ?? raw.latitude,
    longitude: location.longitude ?? raw.longitude,
    location,
    locationLine: formatMapLocationLine(location, title),
    image:
      proxyReellyImageUrl(raw.cover_image?.url || raw.image, {
        width: MAP_MARKER_IMAGE_WIDTH,
      }) || DUBAI_PROPERTY_FALLBACK,
    images: collectImages(raw),
    minPrice,
    launchPrice: formatAedInMillions(minPrice),
    priceLabel: (() => {
      const compact = formatAedInMillions(minPrice)
      return compact ? `From ${compact}` : 'Price on request'
    })(),
    developer,
    developerId: typeof raw.developer === 'object' ? raw.developer?.id : raw.developer_id,
    completionDate: raw.completion_date || raw.completionDate || null,
    saleStatus: raw.sale_status || raw.saleStatus,
    bedrooms,
    bedroomsLabel: formatBedroomsLabel(bedrooms),
    paymentPlanBadge: formatPaymentPlanBadge(paymentPlans),
    listingType: 'off-plan',
  }
}
