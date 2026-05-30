<template>
  <div
    class="mt-6 relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900"
    aria-busy="true"
    aria-label="Loading notifications"
  >
    <ul class="list-none p-0 m-0 divide-y divide-gray-100 dark:divide-gray-800">
      <li v-for="i in count" :key="i" class="p-4 sm:p-5 flex gap-4">
        <SkeletonBlock width="2.5rem" height="2.5rem" rounded="md" class="shrink-0" />
        <div class="flex-1 min-w-0 space-y-2">
          <SkeletonBlock width="70%" height="0.875rem" />
          <SkeletonBlock width="100%" height="0.75rem" />
          <SkeletonBlock width="40%" height="0.625rem" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

defineProps({
  count: { type: Number, default: 6 },
})
</script>
