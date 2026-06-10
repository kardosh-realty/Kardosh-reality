<template>
  <section
    v-if="sections.length"
    class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 p-5"
    aria-label="Project documents"
  >
    <header class="mb-4">
      <h6 class="text-base font-semibold text-slate-900 dark:text-white">Project documents</h6>
      <p class="text-sm text-slate-400 mt-1">
        Admin-only downloads — brochures and floor plan PDFs are not available on the public website.
      </p>
    </header>

    <div class="space-y-5">
      <div v-for="section in sections" :key="section.id">
        <h3 class="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          {{ section.title }}
        </h3>
        <p v-if="section.lead" class="text-xs text-slate-400 mb-3">{{ section.lead }}</p>

        <div class="space-y-3">
          <div
            v-for="doc in section.documents"
            :key="doc.id || doc.url"
            class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-800/40"
          >
            <span class="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText class="size-5 text-primary" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-slate-900 dark:text-white truncate">{{ doc.name }}</p>
              <p v-if="doc.description" class="text-sm text-slate-500 mt-0.5 line-clamp-2">
                {{ doc.description }}
              </p>
            </div>
            <a
              :href="doc.url"
              :download="doc.name"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition"
            >
              <Download class="size-4" aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Download, FileText } from 'lucide-vue-next'

const props = defineProps({
  marketingBrochure: { type: Object, default: null },
  floorPlanPdfs: { type: Array, default: () => [] },
  documents: { type: Array, default: () => [] },
})

const sections = computed(() => {
  const list = []
  if (props.marketingBrochure) {
    list.push({
      id: 'brochure',
      title: 'Marketing brochure',
      lead: 'Official marketing brochure with project highlights, visuals, and key information.',
      documents: [props.marketingBrochure],
    })
  }
  if (props.floorPlanPdfs?.length) {
    list.push({
      id: 'floor-plans',
      title: 'Building & layout PDFs',
      lead: 'Downloadable floor plans and layout brochures for this project.',
      documents: props.floorPlanPdfs,
    })
  }
  if (props.documents?.length) {
    list.push({
      id: 'documents',
      title: 'Other documents',
      lead: 'Additional project documents.',
      documents: props.documents,
    })
  }
  return list
})
</script>
