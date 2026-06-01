<template>
  <div class="blog-detail-skeleton space-y-8" role="status" aria-label="Loading article">
    <ul class="list-none flex flex-wrap gap-4 p-0 m-0">
      <li><SkeletonBlock class="h-4 w-32" /></li>
      <li><SkeletonBlock class="h-4 w-28" /></li>
      <li><SkeletonBlock class="h-4 w-24" /></li>
    </ul>

    <SkeletonBlock class="w-full h-[280px] md:h-[420px] rounded-xl" />

    <div class="space-y-3">
      <SkeletonBlock class="h-4 w-full" />
      <SkeletonBlock class="h-4 w-full" />
      <SkeletonBlock class="h-4 w-[95%]" />
      <SkeletonBlock class="h-4 w-full" />
      <SkeletonBlock class="h-4 w-[88%]" />
      <SkeletonBlock class="h-4 w-full" />
      <SkeletonBlock class="h-4 w-2/3" />
    </div>

    <SkeletonBlock class="h-5 w-28 mt-4" />
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
</script>
