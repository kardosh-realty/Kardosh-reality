<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center">
        <PageHeader title="Communities" crumb="All UAE communities from the website — hide any to remove it (and its projects) from the public site" />
        <span class="text-slate-400 text-sm mt-2 md:mt-0">
          {{ visibleCount }} shown · {{ communities.length - visibleCount }} hidden
        </span>
      </div>

      <OffPlanNotice :error="error" :source="source" :db-error="dbError" />

      <div class="mt-6 form-icon relative">
        <i class="ri-search-line absolute top-1/2 -translate-y-1/2 mt-px inset-s-3 text-slate-400"></i>
        <input
          v-model="query"
          type="text"
          placeholder="Search community…"
          class="form-input w-full sm:w-72 max-w-full py-2 px-3 ps-9! h-9! bg-white dark:bg-slate-900 rounded-md outline-none border border-gray-200! dark:border-gray-800! focus:ring-0"
        />
      </div>

      <CardGridSkeleton v-if="loading" variant="compact" :count="8" />

      <p v-else-if="!filtered.length" class="mt-6 text-slate-400">No communities match.</p>

      <div v-else class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
        <div
          v-for="area in filtered"
          :key="area.id"
          class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900"
          :class="area.hidden ? 'opacity-60' : ''"
        >
          <div class="p-5">
            <div class="flex items-center justify-between">
              <span class="size-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                <i class="ri-map-pin-line text-xl" />
              </span>
              <span
                v-if="area.hidden"
                class="text-xs font-medium px-2 py-0.5 rounded-sm bg-slate-500/10 text-slate-500"
              >Hidden</span>
              <span
                v-else
                class="text-xs font-medium px-2 py-0.5 rounded-sm bg-emerald-600/10 text-emerald-600"
              >Live</span>
            </div>
            <h6 class="text-lg font-semibold mt-3">{{ area.name }}</h6>
            <p class="text-slate-400 text-sm">{{ area.projectCount }} projects</p>

            <button
              type="button"
              @click="toggleCommunity(area)"
              class="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition"
              :class="area.hidden
                ? 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-600/10'
                : 'border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
            >
              <i :class="area.hidden ? 'ri-eye-line' : 'ri-eye-off-line'" />
              {{ area.hidden ? 'Show on website' : 'Hide from website' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import OffPlanNotice from '@/components/OffPlanNotice.vue'
import CardGridSkeleton from '@/components/skeleton/CardGridSkeleton.vue'
import { useOffPlan } from '@/composables/useOffPlan'

const { communities, loading, error, source, dbError, loadOffPlan, toggleCommunity } = useOffPlan()

const query = ref('')
const visibleCount = computed(() => communities.value.filter((c) => !c.hidden).length)
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return communities.value
  return communities.value.filter(
    (c) => c.name.toLowerCase().includes(q) || (c.emirate || '').toLowerCase().includes(q)
  )
})

onMounted(loadOffPlan)
</script>
