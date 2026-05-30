import { formatArea } from '@/config/uae'

const BUILDING_TYPE_LABELS = {
  apartment: 'Apartment tower',
  villa: 'Villa cluster',
  townhouse: 'Townhouses',
  mixed: 'Mixed use',
  commercial: 'Commercial',
}

function formatBuildingType(type) {
  if (!type || type === 'unknown') return null
  return BUILDING_TYPE_LABELS[type] || String(type).replace(/_/g, ' ')
}

function formatBuildingDate(value) {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(d)
}

function formatBuildingArea(area, projectAreaUnit = 'm2') {
  if (area == null || area === '') return null
  if (typeof area === 'object') {
    const n = Number(area.value ?? area.size ?? area.area)
    const unit = area.unit || projectAreaUnit
    if (!Number.isFinite(n) || n <= 0) return null
    return unit === 'm2' || unit === 'sqm' ? formatArea(Math.round(n)) : `${n} ${unit}`
  }
  const n = Number(area)
  if (!Number.isFinite(n) || n <= 0) return null
  return formatArea(Math.round(n))
}

function buildDetailRows(building, projectAreaUnit) {
  const rows = []
  const type = formatBuildingType(building.building_type)
  if (type) rows.push({ label: 'Type', value: type })
  if (building.floors_count != null && building.floors_count > 0) {
    rows.push({ label: 'Floors', value: String(building.floors_count) })
  }
  const areaLabel = formatBuildingArea(building.area, projectAreaUnit)
  if (areaLabel) rows.push({ label: 'Gross area', value: areaLabel })
  const start = formatBuildingDate(building.construction_start_date)
  const end = formatBuildingDate(building.construction_end_date)
  if (start) rows.push({ label: 'Construction start', value: start })
  if (end) rows.push({ label: 'Expected completion', value: end })
  if (building.escrow) rows.push({ label: 'Escrow account', value: String(building.escrow) })
  return rows
}

export function normalizeBuildings(raw, { areaUnit = 'm2' } = {}) {
  if (!Array.isArray(raw)) return []
  return raw.map((b, index) => {
    const details = buildDetailRows(b, areaUnit)
    return {
      id: b.id ?? index,
      name: b.name || `Building ${index + 1}`,
      description: b.description || '',
      imageUrl: b.cover_image?.url || '',
      buildingType: formatBuildingType(b.building_type),
      floorsCount: b.floors_count ?? null,
      areaLabel: formatBuildingArea(b.area, areaUnit),
      constructionStart: formatBuildingDate(b.construction_start_date),
      constructionEnd: formatBuildingDate(b.construction_end_date),
      escrow: b.escrow ? String(b.escrow) : null,
      details,
      hasDetails: details.length > 0,
    }
  })
}
