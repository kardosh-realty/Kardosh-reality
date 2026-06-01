import { formatAedInMillions } from '@/config/uae'

export function bedroomGroupLabel(bedrooms) {
  if (bedrooms == null) return 'Other configurations'
  if (bedrooms === 0) return 'Studio'
  return `${bedrooms} BR`
}

/** One line for accordion header — avoids listing every layout price. */
export function buildGroupPriceLabel(minPrice, maxPrice) {
  if (minPrice == null && maxPrice == null) return null
  const min = minPrice ?? maxPrice
  const max = maxPrice ?? minPrice
  if (min === max) return formatAedInMillions(min)
  if (max > min) {
    const from = formatAedInMillions(min)
    const to = formatAedInMillions(max)
    return from && to ? `From ${from} · Up to ${to}` : from || to
  }
  const from = formatAedInMillions(min)
  return from ? `From ${from}` : null
}

function ingestUnitPrices(group, unit) {
  const from = unit.fromPriceAed
  const to = unit.toPriceAed ?? unit.fromPriceAed
  if (from != null && !Number.isNaN(Number(from))) {
    const n = Number(from)
    group.minPrice = group.minPrice == null ? n : Math.min(group.minPrice, n)
  }
  if (to != null && !Number.isNaN(Number(to))) {
    const n = Number(to)
    group.maxPrice = group.maxPrice == null ? n : Math.max(group.maxPrice, n)
  }
}

/**
 * Merge unit rows that share the same bedroom count into one accordion group.
 */
export function groupFloorPlansByBedroom(units = []) {
  const map = new Map()

  for (const unit of units) {
    const bedrooms = unit.bedrooms
    const key = bedrooms != null ? `br-${bedrooms}` : `unit-${unit.key}`

    if (!map.has(key)) {
      map.set(key, {
        key,
        bedrooms,
        label: bedroomGroupLabel(bedrooms),
        floorPlans: [],
        unitTypes: [],
        subtitles: [],
        minPrice: null,
        maxPrice: null,
      })
    }

    const group = map.get(key)

    if (unit.unitType && !group.unitTypes.includes(unit.unitType)) {
      group.unitTypes.push(unit.unitType)
    }
    if (unit.subtitle && !group.subtitles.includes(unit.subtitle)) {
      group.subtitles.push(unit.subtitle)
    }
    ingestUnitPrices(group, unit)

    for (const plan of unit.floorPlans || []) {
      if (!plan?.url) continue
      if (!group.floorPlans.some((p) => p.url === plan.url)) {
        group.floorPlans.push({
          url: plan.url,
          name: plan.name,
          unitLabel: unit.unitType || null,
          priceLabel: unit.priceText || null,
        })
      }
    }
  }

  return [...map.values()]
    .map((g) => ({
      ...g,
      summary: buildGroupSummary(g),
      priceLabel: buildGroupPriceLabel(g.minPrice, g.maxPrice),
      showPlanPrices: hasDistinctPlanPrices(g.floorPlans),
    }))
    .sort((a, b) => {
      const ba = a.bedrooms ?? 999
      const bb = b.bedrooms ?? 999
      return ba - bb
    })
}

function buildGroupSummary(group) {
  const parts = []
  if (group.floorPlans.length) {
    parts.push(
      `${group.floorPlans.length} floor plan${group.floorPlans.length === 1 ? '' : 's'}`
    )
  }
  if (group.unitTypes.length) {
    parts.push(group.unitTypes.join(', '))
  }
  if (group.subtitles.length === 1) {
    parts.push(group.subtitles[0])
  } else if (group.subtitles.length > 1) {
    parts.push(`${group.subtitles.length} layouts`)
  }
  return parts.join(' · ')
}

function hasDistinctPlanPrices(plans) {
  const labels = new Set(plans.map((p) => p.priceLabel).filter(Boolean))
  return labels.size > 1
}
