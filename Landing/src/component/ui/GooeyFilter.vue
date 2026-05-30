<template>
  <svg class="gooey-filter-def" aria-hidden="true" focusable="false">
    <defs>
      <filter :id="id">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="strength" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
</template>

<script setup>
defineProps({
  id: { type: String, default: 'gooey-filter' },
  strength: { type: Number, default: 10 },
})
</script>

<style scoped>
.gooey-filter-def {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
