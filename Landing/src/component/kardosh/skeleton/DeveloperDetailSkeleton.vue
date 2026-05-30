<template>
  <div role="status" aria-label="Loading developer profile">
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
      <SkeletonBlock v-for="n in 3" :key="n" class="h-16 rounded-xl" />
    </div>
    <div class="grid lg:grid-cols-12 gap-8">
      <div class="lg:col-span-4">
        <SkeletonBlock class="w-full aspect-square max-h-80 rounded-2xl" />
        <SkeletonBlock class="h-7 w-3/4 mx-auto mt-5" />
        <SkeletonBlock class="h-4 w-40 mx-auto mt-3" />
      </div>
      <div class="lg:col-span-8 space-y-6">
        <SkeletonBlock class="h-48 w-full rounded-2xl" />
        <SkeletonBlock class="h-40 w-full rounded-2xl" />
      </div>
    </div>
    <div class="mt-16">
      <SkeletonBlock class="h-7 w-56 mb-6" />
      <ListingGridSkeleton :count="4" />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'
import ListingGridSkeleton from './ListingGridSkeleton.vue'
</script>
