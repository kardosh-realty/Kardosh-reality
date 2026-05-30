<template>
  <div class="property-gallery-skeleton" role="status" aria-label="Loading gallery">
    <SkeletonBlock class="w-full h-72 md:h-[28rem] lg:h-[32rem] rounded-2xl" />
    <div class="flex gap-2 mt-3 overflow-hidden">
      <SkeletonBlock
        v-for="n in thumbCount"
        :key="n"
        class="size-16 md:size-20 rounded-lg shrink-0"
      />
    </div>
    <div class="flex flex-wrap justify-center gap-2 mt-4">
      <SkeletonBlock
        v-for="n in 5"
        :key="'p-' + n"
        class="h-8 w-24 rounded-full"
      />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'

defineProps({
  thumbCount: { type: Number, default: 8 },
})
</script>
