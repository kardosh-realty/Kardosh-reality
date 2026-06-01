<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center gap-4">
        <PageHeader title="Reports" crumb="Inquiry and engagement summaries from your live data" />
        <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 mt-3 md:mt-0 shrink-0 w-full md:w-auto">
          <select
            v-model="rangeDays"
            class="form-select form-input h-10 py-2 w-full sm:w-auto bg-white dark:bg-slate-900 border border-gray-200! dark:border-gray-800! rounded-md text-sm"
            :disabled="loading"
            @change="load"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          <div class="relative w-full sm:w-auto" ref="exportMenuRef">
            <div class="flex rounded-md overflow-hidden border border-primary/20 w-full sm:w-auto">
              <button
                type="button"
                class="btn bg-primary hover:bg-primary-dark text-white rounded-none border-0 inline-flex items-center justify-center gap-2 disabled:opacity-60 flex-1 sm:flex-initial px-4"
                :disabled="loading || exporting || !filteredLeads.length"
                @click="onExport('both')"
              >
                <i class="ri-download-2-line" />
                {{ exporting ? 'Exporting…' : 'Export report' }}
              </button>
              <button
                type="button"
                class="btn bg-primary hover:bg-primary-dark text-white rounded-none border-0 border-s border-white/25 px-3 disabled:opacity-60"
                :disabled="loading || exporting || !filteredLeads.length"
                aria-label="Export format options"
                aria-haspopup="menu"
                :aria-expanded="exportMenuOpen"
                @click.stop="exportMenuOpen = !exportMenuOpen"
              >
                <i class="ri-arrow-down-s-line" />
              </button>
            </div>
            <div
              v-show="exportMenuOpen"
              class="absolute right-0 top-full z-20 mt-1 min-w-[11rem] rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-lg py-1 text-sm"
              role="menu"
            >
              <button
                type="button"
                role="menuitem"
                class="w-full text-start px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2"
                @click="onExport('csv')"
              >
                <i class="ri-file-excel-2-line text-primary" />
                Spreadsheet (CSV)
              </button>
              <button
                type="button"
                role="menuitem"
                class="w-full text-start px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2"
                @click="onExport('pdf')"
              >
                <i class="ri-file-pdf-2-line text-primary" />
                Document (PDF)
              </button>
              <button
                type="button"
                role="menuitem"
                class="w-full text-start px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 border-t border-gray-100 dark:border-gray-800"
                @click="onExport('both')"
              >
                <i class="ri-folder-download-line text-primary" />
                Both files
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!configured && !loading"
        class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200"
      >
        Supabase is not configured. Add <code class="text-xs">VITE_SUPABASE_URL</code> and
        <code class="text-xs">VITE_SUPABASE_ANON_KEY</code> to <code class="text-xs">.env</code> to load reports.
      </div>

      <div
        v-else-if="loadError"
        class="mt-6 rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-200"
      >
        {{ loadError }}
        <button type="button" class="btn border border-gray-200 rounded-md text-sm mt-3" @click="load">Retry</button>
      </div>

      <template v-else>
        <StatCardsSkeleton v-if="loading" :count="stats.length || 6" grid-class="grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-6" />
        <div v-else class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-6 gap-4 md:gap-6">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900"
          >
            <div class="p-5 flex items-center justify-between">
              <span>
                <span class="text-slate-400 block text-sm">{{ stat.title }}</span>
                <span class="text-2xl font-medium mt-1 block truncate">{{ stat.value }}</span>
              </span>
              <span class="flex justify-center items-center rounded-md size-12 min-w-12 bg-slate-50 dark:bg-slate-800 text-primary">
                <i :class="`${stat.icon} text-[28px]`" />
              </span>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-6">
          <div class="lg:col-span-8">
            <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
              <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                <h6 class="text-lg font-semibold">Inquiries over time</h6>
                <p class="text-sm text-slate-400 mt-1">{{ periodLabel }}</p>
              </div>
              <ChartSkeleton v-if="loading" :height="chartHeight" />
              <VueApexCharts
                v-else
                :key="chartPrimary"
                type="bar"
                :height="chartHeight"
                :options="chartOptions"
                :series="chartOptions.series"
                class="px-4 pb-6"
              />
            </div>
          </div>

          <div class="lg:col-span-4">
            <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 h-full">
              <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                <h6 class="text-lg font-semibold">Inquiry sources</h6>
              </div>
              <div class="p-6">
                <SourceBarsSkeleton v-if="loading" />
                <p v-else-if="!sourceRows.length" class="text-sm text-slate-400">No inquiries in this period.</p>
                <template v-else>
                <div v-for="row in sourceRows" :key="row.source" class="mt-4 first:mt-0">
                  <div class="flex justify-between mb-2 text-sm">
                    <span class="text-slate-600 dark:text-slate-300">{{ row.source }}</span>
                    <span class="text-slate-400">{{ row.count }} · {{ row.percent }}</span>
                  </div>
                  <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                    <div class="bg-primary h-1.5 rounded-full" :style="{ width: row.percent }" />
                  </div>
                </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 mt-6 gap-6">
          <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
            <div class="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <div>
                <h6 class="text-lg font-semibold">Inquiries in period</h6>
                <p class="text-sm text-slate-400 mt-1">{{ filteredLeads.length }} rows · export as CSV or PDF</p>
              </div>
              <RouterLink
                to="/inquiries"
                class="btn btn-link font-normal text-slate-400 hover:text-primary after:bg-primary transition duration-500"
              >
                View all <i class="ri-arrow-right-s-line ms-1"></i>
              </RouterLink>
            </div>
            <LeadCardsSkeleton v-if="loading" class="md:hidden" :count="5" />
            <div v-if="loading" class="hidden md:block overflow-x-auto">
              <TableSkeleton :rows="6" :columns="5" />
            </div>
            <template v-else>
            <LeadCardList
              class="md:hidden"
              :leads="previewLeads"
              :interactive="false"
              :source-label="sourceLabel"
              :format-date="formatDate"
              empty-text="No inquiries in this period."
            />
            <div class="hidden md:block overflow-x-auto">
              <table class="w-full text-start">
                <thead class="border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th class="p-4 text-sm font-semibold">Name</th>
                    <th class="p-4 text-sm font-semibold">Contact</th>
                    <th class="p-4 text-sm font-semibold">Project</th>
                    <th class="p-4 text-sm font-semibold">Source</th>
                    <th class="p-4 text-sm font-semibold">Received</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!filteredLeads.length">
                    <td colspan="5" class="p-8 text-center text-slate-400">No inquiries in this period.</td>
                  </tr>
                  <tr
                    v-for="lead in previewLeads"
                    :key="lead.id"
                    class="border-b border-gray-50 dark:border-gray-800/80"
                  >
                    <td class="p-4 font-medium">{{ lead.name }}</td>
                    <td class="p-4 text-sm text-slate-500">
                      <div v-if="lead.email">{{ lead.email }}</div>
                      <div v-if="lead.phone">{{ lead.phone }}</div>
                    </td>
                    <td class="p-4 text-sm">{{ lead.project_name || 'General' }}</td>
                    <td class="p-4 text-sm text-slate-500">{{ sourceLabel(lead.source) }}</td>
                    <td class="p-4 text-sm text-slate-400 whitespace-nowrap">{{ formatDate(lead.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import VueApexCharts from 'vue3-apexcharts'
import PageHeader from '@/components/PageHeader.vue'
import StatCardsSkeleton from '@/components/skeleton/StatCardsSkeleton.vue'
import ChartSkeleton from '@/components/skeleton/ChartSkeleton.vue'
import SourceBarsSkeleton from '@/components/skeleton/SourceBarsSkeleton.vue'
import TableSkeleton from '@/components/skeleton/TableSkeleton.vue'
import LeadCardsSkeleton from '@/components/skeleton/LeadCardsSkeleton.vue'
import LeadCardList from '@/components/LeadCardList.vue'
import { useChartHeight } from '@/composables/useChartHeight'
import { useChartPrimaryColor } from '@/composables/useChartPrimaryColor'
import { useToast } from '@/composables/useToast'

const { chartHeight } = useChartHeight(320, 260, 220)
const { primary: chartPrimary, colors: chartColors } = useChartPrimaryColor()
import { fetchReportData, sourceLabel } from '@/services/reports'
import { exportReportCsv, exportReportPdf, exportReportBundle } from '@/services/reportExport'

const toast = useToast()

const rangeDays = ref('30')
const loading = ref(true)
const exporting = ref(false)
const exportMenuOpen = ref(false)
const exportMenuRef = ref(null)
const loadError = ref('')
const configured = ref(true)
const periodLabel = ref('Last 30 days')

const stats = ref([])
const sourceRows = ref([])
const filteredLeads = ref([])
const chartData = ref({ categories: [], series: [{ name: 'Inquiries', data: [] }] })

const previewLeads = computed(() => filteredLeads.value.slice(0, 25))

const chartOptions = computed(() => ({
  chart: { type: 'bar', toolbar: { show: false } },
  colors: chartColors.value,
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  dataLabels: { enabled: false },
  grid: { borderColor: 'rgba(148,163,184,0.15)' },
  xaxis: { categories: chartData.value.categories },
  series: chartData.value.series,
  tooltip: {
    y: { formatter: (v) => `${v} inquiries` },
  },
}))

function formatDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    const data = await fetchReportData({ rangeDays: rangeDays.value })
    configured.value = data.configured
    stats.value = data.stats
    sourceRows.value = data.sourceRows
    filteredLeads.value = data.filteredLeads
    chartData.value = data.chart
    periodLabel.value = data.periodLabel
  } catch (e) {
    loadError.value = e.message || 'Could not load report'
  } finally {
    loading.value = false
  }
}

const exportPayload = () => ({
  leads: filteredLeads.value,
  periodLabel: periodLabel.value,
  stats: stats.value,
  sourceRows: sourceRows.value,
})

async function onExport(format = 'both') {
  exportMenuOpen.value = false
  if (!filteredLeads.value.length) {
    toast.warning('No inquiries to export for this period.')
    return
  }
  exporting.value = true
  try {
    const payload = exportPayload()
    if (format === 'csv') {
      exportReportCsv(payload)
      toast.success('CSV report downloaded.')
    } else if (format === 'pdf') {
      await exportReportPdf(payload)
      toast.success('PDF report downloaded.')
    } else {
      await exportReportBundle(payload)
      toast.success('CSV and PDF reports downloaded.')
    }
  } catch (e) {
    toast.error(e.message || 'Export failed')
  } finally {
    exporting.value = false
  }
}

function closeExportMenu(e) {
  if (exportMenuRef.value && !exportMenuRef.value.contains(e.target)) {
    exportMenuOpen.value = false
  }
}

onMounted(() => {
  load()
  document.addEventListener('click', closeExportMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeExportMenu)
})
</script>
