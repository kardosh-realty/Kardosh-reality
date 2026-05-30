<template>
  <div class="property-detail-content-skeleton" role="status" aria-label="Loading property details">
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
      <div class="xl:col-span-8 space-y-6">
        <div class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5">
          <SkeletonBlock class="h-6 w-24 rounded-full" />
          <SkeletonBlock class="h-9 w-[85%]" />
          <SkeletonBlock class="h-5 w-2/3" />
          <div class="flex flex-wrap gap-2 pt-2">
            <SkeletonBlock v-for="n in 4" :key="n" class="h-8 w-28 rounded-lg" />
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
          <SkeletonBlock class="h-6 w-40" />
          <SkeletonBlock v-for="n in 3" :key="n" class="h-14 w-full rounded-xl" />
        </div>
      </div>
      <div class="xl:col-span-4">
        <div class="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <SkeletonBlock class="h-40 w-full rounded-none" />
          <div class="p-7 space-y-4 bg-white dark:bg-slate-900">
            <SkeletonBlock v-for="n in 4" :key="n" class="h-5 w-full" />
            <SkeletonBlock class="h-12 w-full rounded-xl mt-2" />
            <SkeletonBlock class="h-12 w-full rounded-xl" />
            <div class="grid grid-cols-2 gap-3">
              <SkeletonBlock class="h-12 rounded-xl" />
              <SkeletonBlock class="h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
</script>
