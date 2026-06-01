<template>
  <div
    class="rounded-xl bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 overflow-hidden border border-slate-100 dark:border-slate-800"
    aria-hidden="true"
  >
    <SkeletonBlock class="w-full aspect-[16/10] rounded-none" />
    <div class="p-6 space-y-4">
      <div class="flex justify-between gap-3">
        <SkeletonBlock class="h-4 w-24" />
        <SkeletonBlock class="h-4 w-20" />
      </div>
      <SkeletonBlock class="h-6 w-[90%]" />
      <SkeletonBlock class="h-4 w-full" />
      <SkeletonBlock class="h-4 w-4/5" />
      <SkeletonBlock class="h-5 w-24 mt-1" />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
</script>
