<template>
  <div
    class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5"
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
