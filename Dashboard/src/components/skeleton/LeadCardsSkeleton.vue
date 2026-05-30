<template>
  <ul
    class="list-none p-3 m-0 space-y-2"
    aria-busy="true"
    aria-label="Loading inquiries"
  >
    <li
      v-for="i in count"
      :key="i"
      class="rounded-lg border border-gray-100 dark:border-gray-800 p-3 space-y-2"
    >
      <div class="flex justify-between gap-2">
        <SkeletonBlock width="55%" height="1rem" />
        <SkeletonBlock width="3.5rem" height="1.25rem" rounded="sm" />
      </div>
      <SkeletonBlock width="80%" height="0.75rem" />
      <SkeletonBlock width="65%" height="0.75rem" />
    </li>
  </ul>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

defineProps({
  count: { type: Number, default: 6 },
})
</script>
