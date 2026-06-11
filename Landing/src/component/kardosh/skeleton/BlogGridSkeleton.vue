<template>
  <div
    class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6"
    role="status"
    aria-label="Loading blog posts"
  >
    <BlogCardSkeleton v-for="n in count" :key="n" />
  </div>
</template>

<script setup>
import BlogCardSkeleton from './BlogCardSkeleton.vue'

defineProps({
  count: { type: Number, default: 6 },
})
</script>
