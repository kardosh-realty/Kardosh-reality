<template>
  <div class="space-y-5" aria-busy="true" aria-label="Loading breakdown">
    <div v-for="i in count" :key="i" :class="i > 1 ? 'mt-5' : ''">
      <div class="flex justify-between mb-2">
        <SkeletonBlock width="35%" height="0.875rem" />
        <SkeletonBlock width="18%" height="0.875rem" />
      </div>
      <SkeletonBlock width="100%" height="0.375rem" rounded="full" />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

defineProps({
  count: { type: Number, default: 4 },
})
</script>
