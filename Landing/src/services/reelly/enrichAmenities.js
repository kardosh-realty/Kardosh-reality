import { fetchProjectById } from './client'
import { extractProjectAmenities, extractProjectBedrooms } from './mapProject'
import { getLocaleId } from '@/composables/useLanguage'
import { reellyQueryParams } from './locale'
import { localizeCatalogItem } from './localizeCatalog'

const detailCache = new Map()

export function clearAmenitiesDetailCache() {
  detailCache.clear()
}

async function runPool(items, worker, concurrency = 8) {
  let index = 0
  async function next() {
    while (index < items.length) {
      const i = index++
      await worker(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next))
}

/**
 * List `/projects` responses omit amenities and often typical_units; fetch detail per project.
 * Mutates listing objects in place and caches by project id + locale for the session.
 */
export async function enrichProjectsWithAmenities(projects, { concurrency = 8, locale = getLocaleId() } = {}) {
  const reelly = projects.filter((p) => p?.id && p.source === 'reelly')
  if (!reelly.length) return

  for (const p of reelly) {
    const cacheKey = `${locale}:${p.id}`
    const cached = detailCache.get(cacheKey)
    if (cached) {
      if (cached.amenities?.length) p.amenities = cached.amenities
      if (cached.bedrooms?.length) p.bedrooms = cached.bedrooms
    }
  }

  const pending = reelly.filter((p) => !p.amenities?.length || !p.bedrooms?.length)
  if (!pending.length) return

  await runPool(
    pending,
    async (listing) => {
      const cacheKey = `${locale}:${listing.id}`
      try {
        const raw = await fetchProjectById(listing.id, reellyQueryParams(locale))
        const amenities = extractProjectAmenities(raw)
        const bedrooms = extractProjectBedrooms(raw)
        const localized = localizeCatalogItem({ amenities, bedrooms }, locale)
        detailCache.set(cacheKey, localized)
        listing.amenities = localized.amenities
        listing.bedrooms = localized.bedrooms
        if (listing._raw) {
          listing._raw.typical_units = raw.typical_units ?? listing._raw.typical_units
          listing._raw.available_unit_types =
            raw.available_unit_types ?? listing._raw.available_unit_types
        }
      } catch {
        detailCache.set(cacheKey, { amenities: [], bedrooms: [] })
        listing.amenities = []
        listing.bedrooms = []
      }
    },
    concurrency
  )
}
