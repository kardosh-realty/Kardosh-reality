<template>
  <span
    class="skeleton-block inline-block animate-pulse bg-slate-200/90 dark:bg-slate-700/80"
    :class="[roundedClass, props.class]"
    :style="blockStyle"
    aria-hidden="true"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  rounded: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(v),
  },
  class: { type: String, default: '' },
})

const roundedClass = computed(() => {
  const map = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }
  return map[props.rounded] || 'rounded-md'
})

const blockStyle = computed(() => ({
  width: props.width,
  height: props.height,
  minHeight: props.height,
}))
</script>
