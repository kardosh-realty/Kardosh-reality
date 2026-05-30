<template>
  <svg
    :stroke-width="strokeWidth"
    :fill="fill"
    :stroke="stroke"
    viewBox="0 0 32 32"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="cn('menu-toggle-icon transition-transform ease-in-out', open && '-rotate-45', iconClass)"
    :style="{ transitionDuration: `${duration}ms` }"
    aria-hidden="true"
  >
    <path
      :class="cn('transition-all ease-in-out', openPathClass)"
      :style="{ transitionDuration: `${duration}ms` }"
      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
    />
    <path d="M7 16 27 16" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  open: { type: Boolean, default: false },
  duration: { type: Number, default: 500 },
  fill: { type: String, default: 'none' },
  stroke: { type: String, default: 'currentColor' },
  strokeWidth: { type: Number, default: 2.5 },
  class: { type: String, default: '' },
})

const iconClass = computed(() => props.class)
const openPathClass = computed(() =>
  props.open
    ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]'
    : '[stroke-dasharray:12_63]'
)
</script>
