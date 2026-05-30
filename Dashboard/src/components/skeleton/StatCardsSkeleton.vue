<template>
  <div
    class="grid gap-6"
    :class="gridClass"
    aria-busy="true"
    aria-label="Loading statistics"
  >
    <div
      v-for="i in count"
      :key="i"
      class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div class="p-5 flex items-center justify-between gap-4">
        <div class="flex-1 space-y-2.5 min-w-0">
          <SkeletonBlock width="55%" height="0.875rem" />
          <SkeletonBlock width="38%" height="2rem" />
        </div>
        <SkeletonBlock width="3rem" height="3rem" rounded="md" class="shrink-0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

defineProps({
  count: { type: Number, default: 5 },
  gridClass: {
    type: String,
    default: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-6',
  },
})
</script>
