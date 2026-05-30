<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center gap-4">
        <PageHeader title="Notifications" crumb="Inquiries and reviews needing your attention" />
        <div class="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
          <div class="inline-flex rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              type="button"
              class="px-3 py-1.5 text-sm"
              :class="filter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-600'"
              @click="filter = 'all'"
            >
              All
            </button>
            <button
              type="button"
              class="px-3 py-1.5 text-sm border-s border-gray-200 dark:border-gray-700"
              :class="filter === 'unread' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-600'"
              @click="filter = 'unread'"
            >
              Unread
              <span
                v-if="unreadCount"
                class="ms-1 inline-flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold rounded-md bg-red-600/20 text-red-600"
              >
                {{ unreadCount }}
              </span>
            </button>
          </div>
          <button
            type="button"
            class="btn border border-gray-200 dark:border-gray-700 rounded-md inline-flex items-center gap-2"
            :disabled="!unreadCount || loading"
            @click="markAllRead"
          >
            <i class="ri-check-double-line" /> Mark all as read
          </button>
        </div>
      </div>

      <div
        v-if="!configured"
        class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200"
      >
        Supabase is not configured. Add <code class="text-xs">VITE_SUPABASE_URL</code> and
        <code class="text-xs">VITE_SUPABASE_ANON_KEY</code> to <code class="text-xs">.env</code>.
      </div>

      <div
        v-else-if="error"
        class="mt-6 rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-200"
      >
        {{ error }}
        <button type="button" class="btn border border-gray-200 rounded-md text-sm mt-3" @click="refresh">
          Retry
        </button>
      </div>

      <NotificationListSkeleton v-else-if="loading" :count="8" />

      <div
        v-else-if="!filteredItems.length"
        class="mt-8 rounded-md border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center text-slate-400"
      >
        <i class="ri-notification-off-line text-3xl mb-3 block opacity-60"></i>
        <p>{{ filter === 'unread' ? 'No unread notifications.' : 'No activity yet.' }}</p>
        <p class="text-xs mt-2">New inquiries and customer reviews will appear here.</p>
      </div>

      <div
        v-else
        class="mt-6 relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900"
      >
        <ul class="list-none p-0 m-0">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            class="border-b border-gray-100 dark:border-gray-800 last:border-0"
            :class="!item.read ? 'bg-primary/5' : ''"
          >
            <NotificationItem :item="item" @activate="onActivate" />
            <div v-if="item.type === 'lead' && item.entityId" class="px-5 pb-4 -mt-2 flex gap-3">
              <button
                type="button"
                class="text-xs font-medium text-primary hover:underline"
                @click="onMarkContacted(item)"
              >
                Mark contacted
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import NotificationListSkeleton from '@/components/skeleton/NotificationListSkeleton.vue'
import NotificationItem from '@/components/NotificationItem.vue'
import { useNotifications } from '@/composables/useNotifications'
import { markLeadContacted } from '@/services/leads'
import { useToast } from '@/composables/useToast'
import { isSupabaseConfigured } from '@/lib/supabase'

const router = useRouter()
const toast = useToast()
const configured = isSupabaseConfigured()
const filter = ref('all')

const { items, loading, error, unreadCount, refresh, markRead, markAllRead } = useNotifications()

const filteredItems = computed(() => {
  if (filter.value === 'unread') return items.value.filter((n) => !n.read)
  return items.value
})

async function onActivate(item) {
  await markRead(item.id)
  if (item.type === 'lead' && item.entityId) {
    router.push({ path: '/inquiries', query: { lead: item.entityId } })
  } else if (item.href) {
    router.push(item.href)
  }
}

async function onMarkContacted(item) {
  if (!item.entityId) return
  try {
    await markLeadContacted(item.entityId)
    await markRead(item.id)
    await refresh()
    toast.success('Marked as contacted.')
  } catch (e) {
    toast.error(e.message || 'Could not update lead')
  }
}

onMounted(() => {
  if (configured) refresh()
})
</script>
