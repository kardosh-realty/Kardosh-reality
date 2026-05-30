import { LEAD_STATUSES } from '@/config/leads'

export function leadStatusLabel(status) {
  return LEAD_STATUSES.find((s) => s.value === status)?.label || 'New'
}

export function filterLeads(leads, { status = 'all', dateFrom = '', dateTo = '' } = {}) {
  let list = [...(leads || [])]

  if (status && status !== 'all') {
    list = list.filter((l) => (l.status || 'new') === status)
  }

  if (dateFrom) {
    const from = startOfDay(new Date(dateFrom))
    list = list.filter((l) => l.created_at && new Date(l.created_at) >= from)
  }

  if (dateTo) {
    const to = endOfDay(new Date(dateTo))
    list = list.filter((l) => l.created_at && new Date(l.created_at) <= to)
  }

  return list
}

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function endOfDay(d) {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}
