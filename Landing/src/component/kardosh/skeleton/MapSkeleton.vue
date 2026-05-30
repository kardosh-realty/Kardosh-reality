<template>
  <div
    class="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900"
    role="status"
    aria-label="Loading map"
  >
    <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
      <SkeletonBlock class="h-10 flex-1 min-w-[12rem] rounded-lg" />
      <SkeletonBlock class="h-10 w-32 rounded-lg" />
    </div>
    <SkeletonBlock class="w-full h-[28rem] md:h-[32rem] rounded-none" />
    <div class="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <SkeletonBlock v-for="n in 6" :key="n" class="h-16 rounded-lg" />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
</script>
