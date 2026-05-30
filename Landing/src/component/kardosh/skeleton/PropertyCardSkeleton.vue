<template>
  <div
    class="rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800 h-full flex flex-col"
    aria-hidden="true"
  >
    <SkeletonBlock class="w-full h-56 rounded-none" />
    <div class="p-5 flex flex-col flex-1 gap-3">
      <SkeletonBlock class="h-5 w-[92%]" />
      <SkeletonBlock class="h-4 w-1/2" />
      <div class="py-4 border-y border-slate-100 dark:border-slate-800 flex gap-3">
        <SkeletonBlock class="h-5 w-20 shrink-0" />
        <div class="flex gap-2 flex-1">
          <SkeletonBlock class="h-6 w-16 rounded-full" />
          <SkeletonBlock class="h-6 w-16 rounded-full" />
        </div>
      </div>
      <div class="pt-1 mt-auto space-y-2">
        <SkeletonBlock class="h-3 w-12" />
        <SkeletonBlock class="h-6 w-28" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
</script>
