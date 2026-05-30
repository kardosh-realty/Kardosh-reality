<template>
  <div
    :class="gridClass"
    class="listing-grid-skeleton"
    role="status"
    aria-label="Loading listings"
  >
    <PropertyCardSkeleton v-for="n in count" :key="n" />
  </div>
</template>

<script setup>
import PropertyCardSkeleton from './PropertyCardSkeleton.vue'

defineProps({
  count: { type: Number, default: 8 },
  gridClass: {
    type: String,
    default: 'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6',
  },
})
</script>
