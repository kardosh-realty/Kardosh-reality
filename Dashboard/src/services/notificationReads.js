import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const READS_TABLE = 'notification_reads'
const NOTIF_TABLE = 'admin_notifications'

export async function fetchReadNotificationKeys(adminEmail) {
  if (!isSupabaseConfigured() || !adminEmail) return new Set()
  const { data, error } = await supabase
    .from(READS_TABLE)
    .select('notification_key')
    .eq('admin_email', adminEmail)
  if (error) return new Set()
  return new Set((data || []).map((r) => r.notification_key))
}

export async function markNotificationRead(notificationKey, adminEmail) {
  if (!isSupabaseConfigured() || !adminEmail || !notificationKey) return
  const { error } = await supabase.from(READS_TABLE).upsert(
    {
      notification_key: notificationKey,
      admin_email: adminEmail,
      read_at: new Date().toISOString(),
    },
    { onConflict: 'notification_key,admin_email' }
  )
  if (error) throw error
}

export async function markAllNotificationsRead(keys, adminEmail) {
  if (!isSupabaseConfigured() || !adminEmail || !keys.length) return
  const rows = keys.map((notification_key) => ({
    notification_key,
    admin_email: adminEmail,
    read_at: new Date().toISOString(),
  }))
  const { error } = await supabase.from(READS_TABLE).upsert(rows, {
    onConflict: 'notification_key,admin_email',
  })
  if (error) throw error
}

export async function fetchStoredNotifications({ limit = 50 } = {}) {
  if (!isSupabaseConfigured()) return []
  const { data, error } = await supabase
    .from(NOTIF_TABLE)
    .select('notification_key, type, title, detail, href, entity_id, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}
