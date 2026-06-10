<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center">
        <PageHeader
          title="Projects"
          crumb="Pin featured projects to the top of the public off-plan page — new launches also rise automatically"
        />
        <span class="text-slate-400 text-sm mt-2 md:mt-0">
          {{ stats.visibleProjects }} shown · {{ stats.featuredProjects }} featured ·
          {{ stats.projects - stats.visibleProjects }} hidden
        </span>
      </div>

      <OffPlanNotice :error="error" :source="source" :db-error="dbError" />

      <div
        v-if="curationSource === 'error'"
        class="mt-4 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-900 dark:text-amber-100"
      >
        <p class="font-medium">Could not read <code>project_curation</code> table.</p>
        <p v-if="curationError" class="text-xs mt-1 opacity-80">{{ curationError }}</p>
        <p class="mt-2 text-xs">Run <code>supabase/migrations/008_project_curation.sql</code> in Supabase, then refresh.</p>
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <div class="form-icon relative">
          <i class="ri-search-line absolute top-1/2 -translate-y-1/2 mt-px inset-s-3 text-slate-400"></i>
          <input
            v-model="query"
            type="text"
            placeholder="Search project, developer or area…"
            class="form-input w-full sm:w-72 max-w-full py-2 px-3 ps-9! h-9! bg-white dark:bg-slate-900 rounded-md outline-none border border-gray-200! dark:border-gray-800! focus:ring-0"
          />
        </div>
        <label class="inline-flex items-center gap-2 text-sm text-slate-500">
          <input v-model="hiddenOnly" type="checkbox" class="form-checkbox accent-primary rounded-sm" />
          Hidden only
        </label>
        <label class="inline-flex items-center gap-2 text-sm text-slate-500">
          <input v-model="featuredOnly" type="checkbox" class="form-checkbox accent-primary rounded-sm" />
          Featured only
        </label>
      </div>

      <CardGridSkeleton v-if="loading" variant="project" :count="8" />

      <p v-else-if="!filtered.length" class="mt-6 text-slate-400">No projects match.</p>

      <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
        <div
          v-for="p in filtered"
          :key="p.id"
          class="group relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 border border-gray-100 dark:border-gray-800 transition hover:shadow-md"
          :class="p.effectiveHidden ? 'opacity-70' : ''"
        >
          <RouterLink :to="`/off-plan/projects/${p.id}`" class="block relative">
            <div class="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                v-if="p.image"
                :src="p.image"
                :alt="p.title"
                class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
                <i class="ri-building-line text-4xl"></i>
              </div>
            </div>
            <span class="absolute top-3 start-3 bg-primary text-white text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded">
              Off-Plan
            </span>
            <span
              v-if="p.adminFeatured"
              class="absolute top-3 end-3 bg-amber-500 text-white text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded"
            >
              Featured
            </span>
            <span
              v-else-if="p.effectiveHidden"
              class="absolute top-3 end-3 bg-slate-900/85 text-white text-[11px] font-medium px-2 py-1 rounded"
            >
              {{ p.cascadedBy ? `Hidden via ${p.cascadedBy}` : 'Hidden' }}
            </span>
          </RouterLink>

          <div class="p-4 flex flex-col flex-1">
            <p class="text-[11px] uppercase tracking-wide text-slate-400 truncate">{{ p.developer }}</p>
            <RouterLink
              :to="`/off-plan/projects/${p.id}`"
              class="font-semibold mt-1 leading-snug line-clamp-2 hover:text-primary transition-colors"
            >
              {{ p.title }}
            </RouterLink>
            <p class="text-slate-400 text-xs mt-1 truncate">{{ p.locationLabel }}</p>

            <div class="mt-4 flex items-end justify-between gap-2">
              <div class="min-w-0">
                <p class="text-[11px] uppercase tracking-wide text-slate-400">Starting from</p>
                <p class="font-semibold truncate">{{ p.priceLabel }}</p>
              </div>
              <RouterLink
                :to="`/off-plan/projects/${p.id}`"
                class="shrink-0 size-9 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition"
                aria-label="Open project"
              >
                <i class="ri-arrow-right-line"></i>
              </RouterLink>
            </div>

            <div v-if="p.adminFeatured" class="mt-3 flex gap-2">
              <button
                type="button"
                class="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-gray-200 dark:border-gray-700 py-1.5 text-xs font-medium"
                @click="moveFeatured(p, 'up')"
              >
                <i class="ri-arrow-up-line" /> Up
              </button>
              <button
                type="button"
                class="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-gray-200 dark:border-gray-700 py-1.5 text-xs font-medium"
                @click="moveFeatured(p, 'down')"
              >
                <i class="ri-arrow-down-line" /> Down
              </button>
            </div>

            <button
              type="button"
              class="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition"
              :class="p.adminFeatured
                ? 'border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10'
                : 'border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
              @click="toggleFeatured(p)"
            >
              <i :class="p.adminFeatured ? 'ri-star-fill' : 'ri-star-line'" />
              {{ p.adminFeatured ? 'Remove from featured' : 'Feature on top' }}
            </button>

            <button
              type="button"
              @click="toggleProject(p)"
              :disabled="!!p.cascadedBy"
              :title="p.cascadedBy ? `Unhide the ${p.cascadedBy} to control this project` : ''"
              class="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
              :class="p.ownHidden
                ? 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-600/10'
                : 'border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
            >
              <i :class="p.ownHidden ? 'ri-eye-line' : 'ri-eye-off-line'" />
              {{ p.ownHidden ? 'Show on website' : 'Hide from website' }}
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

const {
  projectRows,
  stats,
  listLoading: loading,
  error,
  source,
  dbError,
  curationSource,
  curationError,
  loadOffPlan,
  toggleProject,
  toggleFeatured,
  moveFeatured,
} = useOffPlan()

const query = ref('')
const hiddenOnly = ref(false)
const featuredOnly = ref(false)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projectRows.value.filter((p) => {
    if (hiddenOnly.value && !p.effectiveHidden) return false
    if (featuredOnly.value && !p.adminFeatured) return false
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.developer.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q)
    )
  })
})

onMounted(loadOffPlan)
</script>
