<template>
  <div class="container-fluid relative px-3">
    <div class="layout-specing">
      <!-- Toolbar -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="min-w-0">
          <RouterLink to="/off-plan/projects" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition">
            <i class="ri-arrow-left-line"></i> Back to projects
          </RouterLink>
          <div class="flex items-center gap-2 mt-3">
            <span class="bg-primary text-white text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded">Off-Plan</span>
            <span
              v-if="row?.effectiveHidden"
              class="bg-slate-500/15 text-slate-500 text-[11px] font-medium px-2 py-1 rounded"
            >{{ row.cascadedBy ? `Hidden via ${row.cascadedBy}` : 'Hidden' }}</span>
            <span v-else-if="row" class="bg-emerald-600/10 text-emerald-600 text-[11px] font-medium px-2 py-1 rounded">Live</span>
          </div>
          <h5 class="text-lg font-semibold mt-2 truncate">{{ row?.title || 'Project preview' }}</h5>
          <p v-if="row" class="text-slate-400 text-sm truncate">{{ row.developer }} · {{ row.locationLabel }}</p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <a
            :href="publicUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <i class="ri-external-link-line"></i> Open in new tab
          </a>
          <button
            v-if="row"
            type="button"
            @click="onToggle"
            :disabled="!!row.cascadedBy"
            :title="row.cascadedBy ? `Unhide the ${row.cascadedBy} to control this project` : ''"
            class="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
            :class="row.ownHidden
              ? 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-600/10'
              : 'bg-primary border-primary text-white hover:bg-primary-dark'"
          >
            <i :class="row.ownHidden ? 'ri-eye-line' : 'ri-eye-off-line'" />
            {{ row.ownHidden ? 'Show on website' : 'Hide from website' }}
          </button>
        </div>
      </div>

      <ProjectDocumentsSkeleton v-if="detailLoading" class="mt-6" />
      <ProjectDocumentsPanel
        v-else-if="projectDetail"
        class="mt-6"
        :marketing-brochure="projectDetail.marketingBrochure"
        :floor-plan-pdfs="projectDetail.floorPlanPdfs"
        :documents="projectDetail.documents"
      />

      <!-- Embedded public project page -->
      <div class="mt-6 relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
        <div
          v-if="!iframeLoaded"
          class="absolute inset-0 flex items-center justify-center text-slate-400 text-sm"
        >
          <i class="ri-loader-4-line animate-spin me-2"></i> Loading project preview…
        </div>
        <iframe
          :src="previewUrl"
          :title="row?.title || 'Project preview'"
          class="w-full h-[calc(100vh-230px)] min-h-[560px] block"
          loading="lazy"
          @load="iframeLoaded = true"
        ></iframe>
      </div>
      <p class="text-xs text-slate-400 mt-2">
        Live preview of the public project page. If it doesn’t appear, use “Open in new tab”.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOffPlan } from '@/composables/useOffPlan'
import { useToast } from '@/composables/useToast'
import { MAIN_SITE_URL } from '@/config/navigation'
import { fetchProjectById } from '@/services/reelly'
import ProjectDocumentsPanel from '@/components/ProjectDocumentsPanel.vue'
import ProjectDocumentsSkeleton from '@/components/skeleton/ProjectDocumentsSkeleton.vue'

const route = useRoute()
const toast = useToast()
const { projectRows, loadOffPlan, toggleProject } = useOffPlan()

const iframeLoaded = ref(false)
const detailLoading = ref(false)
const projectDetail = ref(null)

const row = computed(() =>
  projectRows.value.find((p) => String(p.id) === String(route.params.id)) || null
)

const base = computed(
  () => `${MAIN_SITE_URL.replace(/\/$/, '')}/property-detail/${route.params.id}`
)
// Embedded preview hides the public site's navbar/footer/related sections.
const previewUrl = computed(() => `${base.value}?embed=1`)
// "Open in new tab" shows the full public page.
const publicUrl = computed(() => base.value)

function onToggle() {
  if (!row.value || row.value.cascadedBy) return
  toggleProject(row.value)
  toast.success(row.value.ownHidden ? 'Project hidden from website.' : 'Project is live on website.')
}

async function loadProjectDetail() {
  detailLoading.value = true
  try {
    projectDetail.value = await fetchProjectById(route.params.id)
  } catch {
    projectDetail.value = null
  } finally {
    detailLoading.value = false
  }
}

onMounted(async () => {
  await loadOffPlan()
  loadProjectDetail()
})
</script>
