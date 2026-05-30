<template>
  <svg
    ref="svgRef"
    width="100%"
    height="100%"
    viewBox="0 0 600 100"
    xmlns="http://www.w3.org/2000/svg"
    class="select-none uppercase cursor-pointer"
    :class="className"
    @mouseenter="hovered = true"
    @mouseleave="onLeave"
    @mousemove="onMouseMove"
  >
    <defs>
      <linearGradient :id="`${uid}-textGradient`" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
        <template v-if="hovered">
          <stop offset="0%" stop-color="#fafafa" />
          <stop offset="25%" stop-color="#d4d4d4" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="75%" stop-color="#a3a3a3" />
          <stop offset="100%" stop-color="#e5e5e5" />
        </template>
      </linearGradient>

      <radialGradient
        :id="`${uid}-revealMask`"
        gradientUnits="userSpaceOnUse"
        :cx="maskPosition.cx"
        :cy="maskPosition.cy"
        r="25%"
      >
        <stop offset="0%" stop-color="white" />
        <stop offset="100%" stop-color="black" />
      </radialGradient>

      <mask :id="`${uid}-textMask`">
        <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${uid}-revealMask)`" />
      </mask>
    </defs>

    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="middle"
      stroke-width="0.35"
      class="fill-transparent font-bold footer-text-hover__ghost"
      :style="{ opacity: hovered ? 0.7 : 0, fontSize: '4.5rem' }"
    >
      {{ text }}
    </text>

    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="middle"
      stroke-width="0.35"
      class="fill-transparent font-bold footer-text-hover__draw"
      :style="{ fontSize: '4.5rem' }"
    >
      {{ text }}
    </text>

    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="middle"
      :stroke="`url(#${uid}-textGradient)`"
      stroke-width="0.35"
      :mask="`url(#${uid}-textMask)`"
      class="fill-transparent font-bold"
      :style="{ fontSize: '4.5rem' }"
    >
      {{ text }}
    </text>
  </svg>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  text: { type: String, required: true },
  duration: { type: Number, default: 0 },
  className: { type: String, default: '' },
})

const uid = `th-${Math.random().toString(36).slice(2, 9)}`
const svgRef = ref(null)
const hovered = ref(false)
const maskPosition = ref({ cx: '50%', cy: '50%' })

function onMouseMove(e) {
  if (!svgRef.value) return
  const rect = svgRef.value.getBoundingClientRect()
  maskPosition.value = {
    cx: `${((e.clientX - rect.left) / rect.width) * 100}%`,
    cy: `${((e.clientY - rect.top) / rect.height) * 100}%`,
  }
}

function onLeave() {
  hovered.value = false
  maskPosition.value = { cx: '50%', cy: '50%' }
}
</script>
