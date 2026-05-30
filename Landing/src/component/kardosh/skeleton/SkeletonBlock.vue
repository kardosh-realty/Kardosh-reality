<template>
  <div
    :class="[
      'skeleton-block rounded-md bg-slate-200/80 dark:bg-slate-700/60',
      props.class,
    ]"
    :style="style"
    aria-hidden="true"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  class: { type: String, default: '' },
  width: { type: String, default: '' },
  height: { type: String, default: '' },
})

const style = computed(() => {
  const s = {}
  if (props.width) s.width = props.width
  if (props.height) s.height = props.height
  return Object.keys(s).length ? s : undefined
})
</script>

<style scoped>
.skeleton-block {
  position: relative;
  overflow: hidden;
}

.skeleton-block::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.35),
    transparent
  );
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

.dark .skeleton-block::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
