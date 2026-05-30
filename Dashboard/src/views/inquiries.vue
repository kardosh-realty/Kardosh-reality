<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <PageHeader title="Inquiries" crumb="Contact form inquiries from the website" />

      <div
        v-if="!configured"
        class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-900 dark:text-amber-100"
      >
        Supabase is not configured. Add <code class="text-xs">VITE_SUPABASE_URL</code> and
        <code class="text-xs">VITE_SUPABASE_ANON_KEY</code> to <code class="text-xs">kardosh/.env</code>
        (same as Landing). Run migrations <code class="text-xs">008_leads_crm.sql</code> and
        <code class="text-xs">009_admin_notifications.sql</code> for CRM fields.
      </div>

      <div
        v-else-if="error"
        class="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800"
      >
        {{ error }}
      </div>

      <template v-else>
        <div
          class="mt-6 flex flex-col gap-4 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 p-4 md:p-4 shadow-sm"
        >
          <div class="dash-filter-tabs md:flex md:flex-wrap md:gap-2">
            <button
              v-for="tab in statusTabs"
              :key="tab.value"
              type="button"
              class="px-3 py-1.5 rounded-md text-sm font-medium border transition-colors"
              :class="
                statusFilter === tab.value
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:border-primary/40'
              "
              @click="statusFilter = tab.value"
            >
              {{ tab.label }}
              <span
                v-if="tab.count !== undefined"
                class="ms-1 opacity-80 text-xs"
              >({{ tab.count }})</span>
            </button>
          </div>

          <div class="flex flex-col md:flex-row md:flex-wrap md:items-end gap-3">
            <div class="dash-filter-dates md:contents">
              <div class="md:block">
                <label class="text-xs text-slate-400 block mb-1">From</label>
                <input
                  v-model="dateFrom"
                  type="date"
                  class="form-input border border-gray-200! dark:border-gray-800! text-sm rounded-md py-1.5 w-full"
                />
              </div>
              <div class="md:block">
                <label class="text-xs text-slate-400 block mb-1">To</label>
                <input
                  v-model="dateTo"
                  type="date"
                  class="form-input border border-gray-200! dark:border-gray-800! text-sm rounded-md py-1.5 w-full"
                />
              </div>
            </div>
            <button
              v-if="dateFrom || dateTo || statusFilter !== 'all'"
              type="button"
              class="btn border border-gray-200 dark:border-gray-700 rounded-md text-sm px-3 py-1.5 w-full md:w-auto"
              @click="clearFilters"
            >
              Clear filters
            </button>
            <p class="text-xs text-slate-400 dash-filter-meta md:ms-auto md:mb-1">
              Showing {{ filteredLeads.length }} of {{ leads.length }}
            </p>
          </div>
        </div>

        <div
          class="mt-4 relative overflow-hidden rounded-md shadow-sm bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800"
        >
          <LeadCardsSkeleton v-if="loading" class="md:hidden" :count="6" />
          <div v-if="loading" class="hidden md:block overflow-x-auto">
            <TableSkeleton :rows="8" :columns="6" />
          </div>

          <template v-else>
            <LeadCardList
              class="md:hidden"
              :leads="filteredLeads"
              :selected-id="selectedId"
              :source-label="sourceLabel"
              :format-date="formatDate"
              :empty-text="leads.length ? 'No inquiries match these filters.' : 'No inquiries yet.'"
              @select="openLead"
            />

            <div class="hidden md:block overflow-x-auto">
              <table class="w-full text-start">
                <thead class="border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th class="p-4 text-sm font-semibold">Name</th>
                    <th class="p-4 text-sm font-semibold">Contact</th>
                    <th class="p-4 text-sm font-semibold">Project</th>
                    <th class="p-4 text-sm font-semibold">Status</th>
                    <th class="p-4 text-sm font-semibold">Message</th>
                    <th class="p-4 text-sm font-semibold">Received</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!filteredLeads.length">
                    <td colspan="6" class="p-8 text-center text-slate-400">
                      {{ leads.length ? 'No inquiries match these filters.' : 'No inquiries yet.' }}
                    </td>
                  </tr>
                  <tr
                    v-for="lead in filteredLeads"
                    :key="lead.id"
                    class="border-b border-gray-50 dark:border-gray-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                    :class="selectedId === lead.id ? 'bg-primary/5' : ''"
                    @click="openLead(lead)"
                  >
                    <td class="p-4 font-medium">{{ lead.name }}</td>
                    <td class="p-4 text-sm text-slate-500">
                      <div v-if="lead.email">{{ lead.email }}</div>
                      <div v-if="lead.phone">{{ lead.phone }}</div>
                    </td>
                    <td class="p-4 text-sm" @click.stop>
                      <template v-if="lead.project_name || lead.project_id">
                        <RouterLink
                          v-if="lead.project_id"
                          :to="`/off-plan/projects/${lead.project_id}`"
                          class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                        >
                          <i class="ri-building-line"></i>
                          {{ lead.project_name || `#${lead.project_id}` }}
                        </RouterLink>
                        <span v-else class="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                          <i class="ri-building-line"></i> {{ lead.project_name }}
                        </span>
                        <span v-if="lead.source" class="block text-[11px] text-slate-400 mt-0.5">{{ sourceLabel(lead.source) }}</span>
                      </template>
                      <span v-else class="text-slate-400">General</span>
                    </td>
                    <td class="p-4" @click.stop>
                      <span
                        class="inline-flex text-xs font-medium px-2 py-0.5 rounded-sm border"
                        :class="statusBadgeClass(lead.status)"
                      >
                        {{ leadStatusLabel(lead.status) }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-500 max-w-xs truncate">{{ lead.message || '—' }}</td>
                    <td class="p-4 text-sm text-slate-400 whitespace-nowrap">{{ formatDate(lead.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
      </template>
    </div>

    <InquiryDetailDrawer
      :open="drawerOpen"
      :lead="activeLead"
      @close="closeDrawer"
      @updated="onLeadUpdated"
      @mark-contacted="onLeadUpdated"
      @deleted="onLeadDeleted"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import TableSkeleton from '@/components/skeleton/TableSkeleton.vue'
import LeadCardsSkeleton from '@/components/skeleton/LeadCardsSkeleton.vue'
import LeadCardList from '@/components/LeadCardList.vue'
import InquiryDetailDrawer from '@/components/InquiryDetailDrawer.vue'
import { fetchLeads } from '@/services/leads'
import { LEAD_STATUSES, LEAD_STATUS_STYLES } from '@/config/leads'
import { isSupabaseConfigured } from '@/lib/supabase'
import { useToast } from '@/composables/useToast'
import { filterLeads, leadStatusLabel } from '@/utils/leadFilters'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const leads = ref([])
const loading = ref(true)
const error = ref('')
const configured = isSupabaseConfigured()
const drawerOpen = ref(false)
const selectedId = ref(null)
const statusFilter = ref('all')
const dateFrom = ref('')
const dateTo = ref('')

const activeLead = computed(() => leads.value.find((l) => l.id === selectedId.value) || null)

const filteredLeads = computed(() =>
  filterLeads(leads.value, {
    status: statusFilter.value,
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
  })
)

const statusTabs = computed(() => {
  const counts = { all: leads.value.length }
  for (const s of LEAD_STATUSES) {
    counts[s.value] = leads.value.filter((l) => (l.status || 'new') === s.value).length
  }
  return [
    { value: 'all', label: 'All', count: counts.all },
    ...LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label, count: counts[s.value] })),
  ]
})

const SOURCE_LABELS = {
  property_page: 'From project page',
  contact_page: 'Contact page',
  home_form: 'Home form',
}

function sourceLabel(source) {
  return SOURCE_LABELS[source] || source
}

function statusBadgeClass(status) {
  return LEAD_STATUS_STYLES[status] || LEAD_STATUS_STYLES.new
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-AE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function clearFilters() {
  statusFilter.value = 'all'
  dateFrom.value = ''
  dateTo.value = ''
}

function openLead(lead) {
  selectedId.value = lead.id
  drawerOpen.value = true
  router.replace({ query: { ...route.query, lead: lead.id } })
}

function closeDrawer() {
  drawerOpen.value = false
  const q = { ...route.query }
  delete q.lead
  router.replace({ query: q })
}

function onLeadUpdated(updated) {
  const i = leads.value.findIndex((l) => l.id === updated.id)
  if (i >= 0) leads.value[i] = { ...leads.value[i], ...updated }
}

function onLeadDeleted(id) {
  leads.value = leads.value.filter((l) => l.id !== id)
  closeDrawer()
  toast.success('Inquiry removed.')
}

async function loadLeads() {
  loading.value = true
  error.value = ''
  try {
    const result = await fetchLeads({ limit: 500 })
    leads.value = result.leads
  } catch (e) {
    error.value = e.message || 'Could not load inquiries'
  } finally {
    loading.value = false
  }
}

function openFromQuery() {
  const id = route.query.lead
  if (!id || !leads.value.length) return
  const lead = leads.value.find((l) => l.id === id)
  if (lead) openLead(lead)
}

watch(() => route.query.lead, openFromQuery)

onMounted(async () => {
  if (!configured) {
    loading.value = false
    return
  }
  await loadLeads()
  openFromQuery()
})
</script>
