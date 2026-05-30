<template>
  <div
    class="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
    aria-hidden="true"
  >
    <SkeletonBlock class="size-20 rounded-lg shrink-0" />
    <div class="flex-1 min-w-0 space-y-2 py-1">
      <SkeletonBlock class="h-4 w-[85%]" />
      <SkeletonBlock class="h-3 w-1/2" />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
</script>
