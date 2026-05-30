<template>
  <div class="space-y-4" :class="paddingClass" aria-busy="true" aria-label="Loading list">
    <div
      v-for="i in count"
      :key="i"
      class="flex items-center gap-3"
      :class="i > 1 ? 'mt-4' : ''"
    >
      <SkeletonBlock
        :width="avatarSize"
        :height="avatarSize"
        :rounded="avatarRounded"
        class="shrink-0"
      />
      <div class="flex-1 min-w-0 space-y-2">
        <SkeletonBlock width="65%" height="0.875rem" />
        <SkeletonBlock width="45%" height="0.75rem" />
      </div>
      <SkeletonBlock
        v-if="showTrailing"
        width="2.5rem"
        height="0.75rem"
        class="shrink-0"
      />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

defineProps({
  count: { type: Number, default: 5 },
  paddingClass: { type: String, default: 'p-6' },
  avatarSize: { type: String, default: '2.5rem' },
  avatarRounded: { type: String, default: 'md' },
  showTrailing: { type: Boolean, default: false },
})
</script>
