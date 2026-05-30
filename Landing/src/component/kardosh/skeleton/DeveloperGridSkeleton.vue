<template>
  <div
    :class="gridClass"
    role="status"
    aria-label="Loading developers"
  >
    <div
      v-for="n in count"
      :key="n"
      :class="[
        'rounded-xl bg-white dark:bg-slate-900 shadow-sm text-center border border-slate-100 dark:border-slate-800',
        compact ? 'p-4 flex flex-col items-center' : 'p-8',
      ]"
    >
      <SkeletonBlock
        :class="compact ? 'size-14 rounded-lg shrink-0' : 'size-24 mx-auto rounded-lg'"
      />
      <SkeletonBlock :class="[compact ? 'h-3 w-20 mt-3' : 'h-5 w-32 mx-auto mt-5']" />
      <SkeletonBlock v-if="!compact" class="h-4 w-20 mx-auto mt-2" />
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from './SkeletonBlock.vue'

defineProps({
  count: { type: Number, default: 8 },
  compact: { type: Boolean, default: false },
  gridClass: {
    type: String,
    default: 'grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6',
  },
})
</script>
