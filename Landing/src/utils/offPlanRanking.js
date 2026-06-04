/** Rank off-plan listings when Reelly has no explicit sales volume. */

const STATUS_SCORE = [
  ['sold_out', 100],
  ['sold out', 100],
  ['few_units', 85],
  ['few units', 85],
  ['limited', 80],
  ['on_sale', 65],
  ['on sale', 65],
  ['presale', 55],
  ['pre_sale', 55],
  ['announcement', 35],
]

function statusScore(saleStatus = '') {
  const normalized = String(saleStatus).toLowerCase()
  for (const [needle, score] of STATUS_SCORE) {
    if (normalized.includes(needle)) return score
  }
  return normalized ? 45 : 30
}

export function offPlanDemandScore(project) {
  let score = statusScore(project.saleStatus)
  const price = Number(project.minPrice) || Number(project.price) || 0
  if (price > 0) score += Math.min(15, Math.log10(price + 1) * 2.5)
  if (project.image && project.developer) score += 4
  return score
}

/** Badge id for `common.*` / listing card labels — translate in UI. */
export function demandBadge(project) {
  const s = String(project.saleStatus || '').toLowerCase()
  if (s.includes('sold')) return 'highDemand'
  if (s.includes('few') || s.includes('limited')) return 'sellingFast'
  return 'popular'
}

/**
 * @param {object[]} projects — mapped Reelly projects
 * @param {{ limit?: number, excludeIds?: (string|number)[] }} options
 */
export function pickMostSoldOffPlan(projects, { limit = 8, excludeIds = [] } = {}) {
  const exclude = new Set(excludeIds.map(String))

  const sorted = [...projects]
    .filter((p) => p?.id && p.listingType === 'off-plan')
    .sort((a, b) => offPlanDemandScore(b) - offPlanDemandScore(a))

  const picked = sorted.filter((p) => !exclude.has(String(p.id))).slice(0, limit)
  if (picked.length >= limit) return picked

  const used = new Set(picked.map((p) => String(p.id)))
  for (const p of sorted) {
    if (picked.length >= limit) break
    const id = String(p.id)
    if (!used.has(id)) {
      picked.push(p)
      used.add(id)
    }
  }
  return picked
}
