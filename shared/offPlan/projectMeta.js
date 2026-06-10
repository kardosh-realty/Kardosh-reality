/** Shared off-plan project helpers (Landing + Dashboard). */

export const NEW_PROJECT_DAYS = 90

export function parseProjectDate(project) {
  const raw =
    project?.modifiedAt ||
    project?._raw?.modified ||
    project?._raw?.updated ||
    project?._raw?.created_at ||
    project?._raw?.created
  if (!raw) return null
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? null : d
}

export function isNewOffPlanProject(project, days = NEW_PROJECT_DAYS) {
  const d = parseProjectDate(project)
  if (!d) return false
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  return d.getTime() >= cutoff
}

export function hasNoAvailability(project) {
  const s = String(project?.saleStatus || project?._raw?.sale_status || '').toLowerCase()
  return s === 'out_of_stock' || s === 'sold_out' || s === 'unavailable'
}

/**
 * @param {Map<string, number>} featuredOrder project id → sort_order (lower = higher)
 */
export function sortOffPlanProjects(projects, featuredOrder = new Map()) {
  return [...projects].sort((a, b) => {
    const aId = String(a.id)
    const bId = String(b.id)
    const aFeat = featuredOrder.has(aId)
    const bFeat = featuredOrder.has(bId)
    if (aFeat && bFeat) {
      return featuredOrder.get(aId) - featuredOrder.get(bId)
    }
    if (aFeat) return -1
    if (bFeat) return 1

    const aNew = isNewOffPlanProject(a)
    const bNew = isNewOffPlanProject(b)
    if (aNew && !bNew) return -1
    if (!aNew && bNew) return 1

    const aTime = parseProjectDate(a)?.getTime() || 0
    const bTime = parseProjectDate(b)?.getTime() || 0
    if (bTime !== aTime) return bTime - aTime
    return String(a.title || a.name || '').localeCompare(String(b.title || b.name || ''))
  })
}

export function filterOffPlanByStatus(list, status, featuredOrder = new Map()) {
  const key = String(status || '').toLowerCase()
  if (!key) return list

  switch (key) {
    case 'featured':
      return list.filter((p) => featuredOrder.has(String(p.id)))
    case 'new':
      return list.filter((p) => isNewOffPlanProject(p))
    case 'old':
      return list.filter((p) => !isNewOffPlanProject(p))
    case 'no-availability':
      return list.filter((p) => hasNoAvailability(p))
    default:
      return list
  }
}
