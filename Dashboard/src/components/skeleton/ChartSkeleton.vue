<template>
  <div
    class="px-4 pb-6 flex flex-col justify-end gap-3"
    :style="{ height: `${height}px` }"
    aria-busy="true"
    aria-label="Loading chart"
  >
    <div class="flex items-end justify-between gap-2 h-full pt-4">
      <SkeletonBlock
        v-for="i in bars"
        :key="i"
        :width="barWidth"
        :height="barHeights[i - 1]"
        rounded="sm"
        class="flex-1 max-w-12"
      />
    </div>
    <div class="flex justify-between gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
      <SkeletonBlock
        v-for="i in bars"
        :key="`l-${i}`"
        width="2.5rem"
        height="0.625rem"
        rounded="sm"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

const props = defineProps({
  height: { type: Number, default: 360 },
  bars: { type: Number, default: 8 },
})

const barWidth = '100%'

const barHeights = computed(() => {
  const presets = ['45%', '72%', '58%', '88%', '52%', '68%', '40%', '76%', '62%', '48%']
  return Array.from({ length: props.bars }, (_, i) => presets[i % presets.length])
})
</script>
