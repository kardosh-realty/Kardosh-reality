<template>
    <div class="container-fluid relative px-3 dash-page">
        <div class="layout-specing">
            <div class="flex justify-between items-center gap-3">
                <div class="min-w-0">
                    <h5 class="text-lg md:text-xl font-semibold truncate">{{ BRAND.name }} dashboard</h5>
                    <h6 class="text-slate-400 text-sm line-clamp-2">{{ BRAND.tagline }}</h6>
                </div>
            </div>

            <div
                v-if="loadError"
                class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200"
            >
                {{ loadError }}
                <span v-if="!configured" class="block mt-1 text-xs">Add Supabase keys to <code>.env</code> for inquiry stats.</span>
            </div>

            <StatCardsSkeleton v-if="loading" :count="5" />
            <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-6 gap-4 md:gap-6">
                <div
                    v-for="(item, index) in counters"
                    :key="item.title"
                    class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 dash-stat-card"
                >
                    <div class="p-4 md:p-5 flex items-center justify-between">
                        <span class="me-3">
                            <span class="text-slate-400 block">{{ item.title }}</span>
                            <span class="flex items-center justify-between mt-1">
                                <span class="text-2xl font-medium">{{ item.symbol }} {{ counts[index] }}</span>
                            </span>
                        </span>

                        <span class="flex justify-center items-center rounded-md size-12 min-w-12 bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-100 dark:shadow-gray-700 text-primary">
                            <i :class="`${item.icon} text-[28px]`"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-6">
                <div class="lg:col-span-8">
                    <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="dash-panel-head p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <h6 class="text-lg font-semibold">Inquiries Overview</h6>

                            <div class="position-relative w-full md:w-auto">
                                <select
                                    v-model="chartPeriod"
                                    class="form-select form-input w-full md:w-auto py-2 h-10 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-sm outline-none border border-gray-200! dark:border-gray-800! focus:ring-0"
                                >
                                    <option value="Y">Yearly</option>
                                    <option value="M">Monthly</option>
                                    <option value="W">Weekly</option>
                                    <option value="T">Today</option>
                                </select>
                            </div>
                        </div>

                        <ChartSkeleton v-if="loading" :height="chartHeight" />
                        <VueApexCharts
                            v-else
                            :key="chartPrimary"
                            type="area"
                            :height="chartHeight"
                            width="100%"
                            :options="chartOptions"
                            :series="chartOptions.series"
                            class="apex-chart px-4 pb-6"
                        />
                    </div>
                </div>

                <div class="lg:col-span-4">
                    <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <h6 class="text-lg font-semibold">Inquiry Sources</h6>
                        </div>

                        <div class="dash-panel-body p-6">
                            <SourceBarsSkeleton v-if="loading" />
                            <template v-else>
                            <div
                                v-for="(item, index) in salesData"
                                :key="index"
                                class="mt-5 first:mt-0"
                            >
                                <div class="flex justify-between mb-2">
                                    <span class="text-slate-400">{{ item.title }}</span>
                                    <span class="text-slate-400">{{ item.sale }}</span>
                                </div>
                                <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                                    <div class="bg-primary h-1.5 rounded-full" :style="{ width: item.sale }"></div>
                                </div>
                            </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-4 md:gap-6">
                <div class="xl:col-span-3 lg:col-span-6 order-2 lg:order-1">
                    <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <h6 class="text-lg font-semibold">Popular Areas</h6>

                            <RouterLink to="/off-plan/communities" class="btn btn-link font-normal text-slate-400 hover:text-primary after:bg-primary transition duration-500">All <i class="ri-arrow-right-s-line ms-1"></i></RouterLink>
                        </div>

                        <SimpleBar class="dash-home-section relative overflow-x-auto block w-full max-h-71 p-4 md:p-6">
                            <ListPanelSkeleton v-if="loading" :count="5" padding-class="p-0" />
                            <p v-else-if="!popularAreas.length" class="text-sm text-slate-400">No project areas yet.</p>
                            <template v-else>
                            <div
                                v-for="area in popularAreas"
                                :key="area.slug"
                                class="flex justify-between items-center mt-4 first:mt-0"
                            >
                                <div class="flex items-center">
                                    <span class="size-10 min-w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary me-3">
                                        <i class="ri-map-pin-line text-lg"></i>
                                    </span>
                                    <div>
                                        <RouterLink to="/off-plan/communities" class="font-medium hover:text-primary block">{{ area.name }}</RouterLink>
                                        <span class="text-slate-400 text-sm">{{ area.projects }} {{ area.projects === 1 ? 'project' : 'projects' }}</span>
                                    </div>
                                </div>
                            </div>
                            </template>
                        </SimpleBar>
                    </div>
                </div>

                <div class="xl:col-span-6 lg:col-span-12 order-1 lg:order-2">
                    <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="dash-panel-head p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <h6 class="text-lg font-semibold">Recent Inquiries</h6>

                            <RouterLink to="/inquiries" class="btn btn-link font-normal text-slate-400 hover:text-primary after:bg-primary transition duration-500 shrink-0">View all <i class="ri-arrow-right-s-line ms-1"></i></RouterLink>
                        </div>

                        <div class="dash-home-section">
                            <LeadCardsSkeleton v-if="loading" class="md:hidden" :count="4" />
                            <div v-if="loading" class="hidden md:block p-2">
                                <TableSkeleton :rows="5" :columns="5" :show-header="false" />
                            </div>
                            <p v-else-if="!recentInquiries.length" class="p-6 text-sm text-slate-400">No inquiries yet.</p>
                            <template v-else>
                            <LeadCardList
                                class="md:hidden"
                                :leads="recentInquiries"
                                compact
                                empty-text="No inquiries yet."
                                @select="(item) => router.push({ path: '/inquiries', query: { lead: item.id } })"
                            />
                            <SimpleBar class="hidden md:block relative overflow-x-auto w-full xl:max-h-71 max-h-87.5">
                            <table class="w-full text-start">
                                <thead class="text-base">
                                    <tr>
                                        <th class="text-start font-semibold text-[15px] px-4 py-3 min-w-30">Name</th>
                                        <th class="text-start font-semibold text-[15px] px-4 py-3 min-w-35">Date</th>
                                        <th class="text-start font-semibold text-[15px] px-4 py-3 min-w-25">Interest</th>
                                        <th class="text-start font-semibold text-[15px] px-4 py-3 min-w-40">Project</th>
                                        <th class="text-end font-semibold text-[15px] px-4 py-3 min-w-17.5">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in recentInquiries"
                                        :key="item.id"
                                        class="cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                                        @click="router.push({ path: '/inquiries', query: { lead: item.id } })"
                                    >
                                        <th class="text-start border-t border-gray-100 dark:border-gray-800 px-4 py-3 font-semibold">{{ item.name }}</th>
                                        <td class="text-start border-t border-gray-100 dark:border-gray-800 px-4 py-3">
                                            <span class="text-slate-400">{{ item.date }}</span>
                                        </td>
                                        <td class="text-start border-t border-gray-100 dark:border-gray-800 px-4 py-3">
                                            <span class="text-slate-400 capitalize">{{ item.interest }}</span>
                                        </td>
                                        <th class="text-start border-t border-gray-100 dark:border-gray-800 px-4 py-3 font-semibold">{{ item.project }}</th>
                                        <td class="text-end border-t border-gray-100 dark:border-gray-800 px-4 py-3">
                                            <span
                                                class="text-xs font-medium px-2.5 py-0.5 rounded-sm border"
                                                :class="item.statusClass"
                                            >
                                                {{ item.status }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </SimpleBar>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-3 lg:col-span-6 order-3">
                    <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <h6 class="text-lg font-semibold">Top Projects</h6>

                            <RouterLink to="/off-plan/projects" class="btn btn-link font-normal text-slate-400 hover:text-primary after:bg-primary transition duration-500">See More <i class="ri-arrow-right-s-line ms-1"></i></RouterLink>
                        </div>

                        <SimpleBar class="dash-home-section relative overflow-x-auto block w-full max-h-71 p-4 md:p-6">
                            <ListPanelSkeleton
                                v-if="loading"
                                :count="5"
                                padding-class="p-0"
                                avatar-size="3.5rem"
                                :show-trailing="true"
                            />
                            <p v-else-if="!topProperties.length" class="text-sm text-slate-400">No off-plan projects loaded.</p>
                            <template v-else>
                            <div
                                v-for="item in topProperties"
                                :key="item.id"
                                class="flex justify-between items-center mt-4 first:mt-0"
                            >
                                <div class="flex items-center min-w-0">
                                    <div class="relative md:shrink-0">
                                        <img
                                            v-if="item.image"
                                            :src="item.image"
                                            class="object-cover size-14 min-w-14 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700"
                                            alt=""
                                        />
                                        <span
                                            v-else
                                            class="size-14 min-w-14 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400"
                                        >
                                            <i class="ri-building-line text-xl"></i>
                                        </span>
                                    </div>

                                    <div class="ms-2 min-w-0">
                                        <RouterLink
                                            :to="item.id ? `/off-plan/projects/${item.id}` : '/off-plan/projects'"
                                            class="font-medium hover:text-primary block text-lg truncate"
                                        >
                                            {{ item.name }}
                                        </RouterLink>
                                        <span class="text-slate-400 text-sm block truncate">{{ item.loction }}</span>
                                    </div>
                                </div>
                                <span v-if="item.inquiries" class="text-emerald-600 text-end text-sm shrink-0 ms-2 whitespace-nowrap">
                                    {{ item.rate }}
                                </span>
                            </div>
                            </template>
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

import VueApexCharts from 'vue3-apexcharts'

import SimpleBar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

import { BRAND } from '@/config/brand'
import { fetchDashboardData, buildInquiryChart } from '@/services/dashboard'
import StatCardsSkeleton from '@/components/skeleton/StatCardsSkeleton.vue'
import ChartSkeleton from '@/components/skeleton/ChartSkeleton.vue'
import SourceBarsSkeleton from '@/components/skeleton/SourceBarsSkeleton.vue'
import ListPanelSkeleton from '@/components/skeleton/ListPanelSkeleton.vue'
import TableSkeleton from '@/components/skeleton/TableSkeleton.vue'
import LeadCardsSkeleton from '@/components/skeleton/LeadCardsSkeleton.vue'
import LeadCardList from '@/components/LeadCardList.vue'
import { useChartHeight } from '@/composables/useChartHeight'
import { useChartPrimaryColor } from '@/composables/useChartPrimaryColor'

const { chartHeight } = useChartHeight(360, 280, 220)
const { primary: chartPrimary, colors: chartColors } = useChartPrimaryColor()

const loading = ref(true)
const loadError = ref('')
const configured = ref(true)
const chartPeriod = ref('Y')

const counters = ref([])
const counts = ref([])
const recentInquiries = ref([])
const popularAreas = ref([])
const salesData = ref([])
const topProperties = ref([])
const allLeads = ref([])

const chartOptions = computed(() => {
    const { categories, series } = buildInquiryChart(allLeads.value, chartPeriod.value)
    return {
        chart: {
            height: chartHeight.value,
            type: 'area',
            width: '100%',
            toolbar: { show: false },
        },
        colors: chartColors.value,
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        grid: {
            padding: { left: 0, right: 0 },
            strokeDashArray: 3,
        },
        markers: { size: 0, hover: { size: 4 } },
        series,
        xaxis: {
            categories,
            axisBorder: { show: true },
            axisTicks: { show: true },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.8,
                opacityFrom: 0.35,
                opacityTo: 0.1,
                stops: [0, 80, 100],
            },
        },
        tooltip: {
            y: { formatter: (v) => `${v} inquiries` },
        },
        legend: { show: false },
    }
})

let counterTimer = null

function animateCounters(items) {
    if (counterTimer) clearInterval(counterTimer)
    const targets = items.map((i) => Number(i.target) || 0)
    counts.value = targets.map(() => 0)
    if (!targets.some((t) => t > 0)) {
        counts.value = targets
        return
    }

    const duration = 1000
    const frameRate = 16
    const increments = targets.map((t) => t / (duration / frameRate))
    let current = targets.map(() => 0)

    counterTimer = setInterval(() => {
        current = current.map((val, i) => {
            const next = val + increments[i]
            return next > targets[i] ? targets[i] : next
        })
        counts.value = current.map((v) => Math.floor(v))
        if (current.every((v, i) => v >= targets[i])) clearInterval(counterTimer)
    }, frameRate)
}

async function loadDashboard() {
    loading.value = true
    loadError.value = ''
    try {
        const data = await fetchDashboardData()
        configured.value = data.configured
        counters.value = data.counters
        recentInquiries.value = data.recentInquiries
        popularAreas.value = data.popularAreas
        salesData.value = data.salesData
        topProperties.value = data.topProperties
        allLeads.value = data.leads

        const messages = [data.errors?.leads, data.errors?.projects].filter(Boolean)
        if (messages.length) loadError.value = messages.join(' ')

        animateCounters(data.counters)
    } catch (e) {
        loadError.value = e.message || 'Could not load dashboard data'
        counters.value = []
        counts.value = []
    } finally {
        loading.value = false
    }
}

watch(chartPeriod, () => {
    /* chartOptions recomputes from allLeads */
})

onMounted(loadDashboard)

onBeforeUnmount(() => {
    if (counterTimer) clearInterval(counterTimer)
})
</script>
