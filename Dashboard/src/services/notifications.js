import { fetchAllTestimonials } from '@/services/testimonials'
import {
  fetchStoredNotifications,
  fetchReadNotificationKeys,
} from '@/services/notificationReads'

const SOURCE_LABELS = {
  property_page: 'project page',
  contact_page: 'contact page',
  home_form: 'home form',
}

const TYPE_ICONS = {
  lead: 'ri-mail-line',
  testimonial: 'ri-chat-quote-line',
}

function rowToItem(row) {
  return {
    id: row.notification_key,
    type: row.type,
    icon: TYPE_ICONS[row.type] || 'ri-notification-3-line',
    title: row.title,
    detail: row.detail || '',
    href: row.href || '/inquiries',
    entityId: row.entity_id,
    createdAt: row.created_at,
    read: false,
  }
}

/**
 * Build admin notification feed from DB + pending testimonials.
 */
export async function buildNotifications({ limit = 50, adminEmail } = {}) {
  const readKeys = await fetchReadNotificationKeys(adminEmail)
  const items = []

  const stored = await fetchStoredNotifications({ limit })
  for (const row of stored) {
    const item = rowToItem(row)
    item.read = readKeys.has(item.id)
    items.push(item)
  }

  const testimonialsResult = await fetchAllTestimonials()
  for (const t of testimonialsResult.items || []) {
    if (!t.pending) continue
    const key = `testimonial:${t.id}`
    if (items.some((i) => i.id === key)) continue
    items.push({
      id: key,
      type: 'testimonial',
      icon: 'ri-chat-quote-line',
      title: 'Review awaiting approval',
      detail: `${t.name || 'A client'} left a ${t.rating}-star review to publish.`,
      href: '/testimonials',
      entityId: t.id,
      createdAt: t.createdAt || t.updatedAt,
      read: readKeys.has(key),
    })
  }

  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function formatRelativeTime(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60_000) return 'Just now'
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  return new Intl.DateTimeFormat('en-AE', { dateStyle: 'medium' }).format(new Date(iso))
}
