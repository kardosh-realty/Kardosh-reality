import { fetchProjectById } from './client'
import { extractProjectAmenities, extractProjectBedrooms } from './mapProject'

const detailCache = new Map()

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
 * Mutates listing objects in place and caches by project id for the session.
 */
export async function enrichProjectsWithAmenities(projects, { concurrency = 8 } = {}) {
  const reelly = projects.filter((p) => p?.id && p.source === 'reelly')
  if (!reelly.length) return

  for (const p of reelly) {
    const cached = detailCache.get(p.id)
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
      try {
        const raw = await fetchProjectById(listing.id, {
          language: 'en-us',
          preferred_currency: 'AED',
          preferred_area_unit: 'm2',
        })
        const amenities = extractProjectAmenities(raw)
        const bedrooms = extractProjectBedrooms(raw)
        detailCache.set(listing.id, { amenities, bedrooms })
        listing.amenities = amenities
        listing.bedrooms = bedrooms
        if (listing._raw) {
          listing._raw.typical_units = raw.typical_units ?? listing._raw.typical_units
          listing._raw.available_unit_types =
            raw.available_unit_types ?? listing._raw.available_unit_types
        }
      } catch {
        detailCache.set(listing.id, { amenities: [], bedrooms: [] })
        listing.amenities = []
        listing.bedrooms = []
      }
    },
    concurrency
  )
}
