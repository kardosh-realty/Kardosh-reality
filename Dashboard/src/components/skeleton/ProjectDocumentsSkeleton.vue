<template>
  <section
    class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 p-5"
    aria-busy="true"
    aria-label="Loading project documents"
  >
    <header class="mb-4 space-y-2">
      <SkeletonBlock width="9.5rem" height="1.125rem" />
      <SkeletonBlock width="min(100%, 28rem)" height="0.875rem" />
    </header>

    <div class="space-y-5">
      <div v-for="(rows, i) in sectionRows" :key="i">
        <SkeletonBlock width="8.5rem" height="0.875rem" class="mb-2" />
        <SkeletonBlock width="min(100%, 22rem)" height="0.75rem" class="mb-3" />

        <div class="space-y-3">
          <div
            v-for="j in rows"
            :key="j"
            class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-800/40"
          >
            <SkeletonBlock width="2.75rem" height="2.75rem" rounded="lg" class="shrink-0" />
            <div class="flex-1 min-w-0 space-y-2">
              <SkeletonBlock width="55%" height="0.875rem" />
              <SkeletonBlock width="38%" height="0.75rem" />
            </div>
            <SkeletonBlock width="8.25rem" height="2.25rem" rounded="md" class="shrink-0" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

/** Mimics brochure (1 row) + floor plans (2 rows) while loading. */
defineProps({
  sectionRows: {
    type: Array,
    default: () => [1, 2],
  },
})
</script>
