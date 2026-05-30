import { ref, computed } from 'vue'
import { buildNotifications } from '@/services/notifications'
import {
  markNotificationRead,
  markAllNotificationsRead,
} from '@/services/notificationReads'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuth } from '@/composables/useAuth'

let realtimeChannel = null

const items = ref([])
const loading = ref(false)
const error = ref('')

const unreadCount = computed(() => items.value.filter((n) => !n.read).length)

let refreshPromise = null

async function refresh() {
  if (!isSupabaseConfigured()) {
    items.value = []
    error.value = ''
    return
  }

  const { user } = useAuth()
  const email = user.value?.email
  if (!email) {
    items.value = []
    return
  }

  if (refreshPromise) return refreshPromise

  loading.value = true
  error.value = ''

  refreshPromise = (async () => {
    try {
      items.value = await buildNotifications({ adminEmail: email })
    } catch (e) {
      error.value = e.message || 'Could not load notifications'
      items.value = []
    } finally {
      loading.value = false
      refreshPromise = null
    }
  })()

  return refreshPromise
}

async function markRead(id) {
  if (!id) return
  const { user } = useAuth()
  const email = user.value?.email
  if (!email) return

  try {
    await markNotificationRead(id, email)
    const row = items.value.find((n) => n.id === id)
    if (row) row.read = true
  } catch {
    /* keep UI responsive */
    const row = items.value.find((n) => n.id === id)
    if (row) row.read = true
  }
}

async function markAllRead() {
  const { user } = useAuth()
  const email = user.value?.email
  if (!email) return

  const keys = items.value.filter((n) => !n.read).map((n) => n.id)
  try {
    await markAllNotificationsRead(keys, email)
  } catch {
    /* still update UI */
  }
  for (const n of items.value) {
    n.read = true
  }
}

function subscribeRealtime(onEvent) {
  if (!supabase || realtimeChannel) return

  realtimeChannel = supabase
    .channel('dashboard-admin-notifications')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'admin_notifications' },
      () => onEvent()
    )
    .subscribe()
}

function unsubscribeRealtime() {
  if (realtimeChannel && supabase) {
    supabase.removeChannel(realtimeChannel)
    realtimeChannel = null
  }
}

export function useNotifications() {
  const { isAdmin } = useAuth()

  async function ensureLoaded() {
    if (!isAdmin.value || !isSupabaseConfigured()) return
    if (!items.value.length && !loading.value) await refresh()
    subscribeRealtime(() => {
      refresh()
    })
  }

  return {
    items,
    loading,
    error,
    unreadCount,
    refresh,
    markRead,
    markAllRead,
    ensureLoaded,
    unsubscribeRealtime,
  }
}
