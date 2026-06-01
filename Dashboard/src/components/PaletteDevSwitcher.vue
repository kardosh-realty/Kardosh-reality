<script setup>
import { computed } from 'vue'
import { usePalette } from '@/composables/usePalette'

const { paletteId, palettes, paletteIds, setPalette } = usePalette()

const isDev = import.meta.env.DEV

const options = computed(() =>
  paletteIds.map((id) => ({
    id,
    label: palettes[id].label,
    description: palettes[id].description,
    swatches: palettes[id].swatches,
    primary: palettes[id].light?.primary,
  }))
)
</script>

<template>
  <nav
    v-if="isDev"
    class="palette-dev-strip"
    aria-label="Color palette (dev only)"
  >
    <button
      v-for="opt in options"
      :key="opt.id"
      type="button"
      class="palette-dev-strip__box"
      :class="{ 'palette-dev-strip__box--active': paletteId === opt.id }"
      :title="`${opt.label}${opt.description ? ` — ${opt.description}` : ''}`"
      :aria-label="`Use ${opt.label} palette`"
      :aria-pressed="paletteId === opt.id"
      @click="setPalette(opt.id)"
    >
      <span
        v-if="opt.swatches?.length"
        class="palette-dev-strip__preview palette-dev-strip__preview--swatches"
        aria-hidden="true"
      >
        <span
          v-for="(hex, i) in opt.swatches"
          :key="i"
          class="palette-dev-strip__band"
          :style="{ background: hex }"
        />
      </span>
      <span
        v-else
        class="palette-dev-strip__preview palette-dev-strip__preview--solid"
        :style="{ background: opt.primary }"
        aria-hidden="true"
      />
      <span class="sr-only">{{ opt.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.palette-dev-strip {
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.35rem 0.5rem 0.5rem;
  transform: translateY(-50%);
  pointer-events: none;
}

.palette-dev-strip__box {
  pointer-events: auto;
  display: block;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 2px solid rgb(255 255 255 / 0.55);
  border-radius: 0.5rem;
  background: rgb(15 23 42 / 0.35);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.25);
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;
}

.palette-dev-strip__box:hover {
  border-color: rgb(255 255 255 / 0.9);
  transform: scale(1.06);
}

.palette-dev-strip__box--active {
  border-color: #22c55e;
  box-shadow:
    0 0 0 1px #22c55e,
    0 4px 16px rgb(34 197 94 / 0.35);
}

.palette-dev-strip__preview {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: calc(0.5rem - 2px);
  overflow: hidden;
}

.palette-dev-strip__preview--swatches {
  flex-direction: column;
}

.palette-dev-strip__band {
  flex: 1 1 0;
  min-height: 0;
}

.palette-dev-strip__preview--solid {
  display: block;
}

@media (max-width: 767px) {
  .palette-dev-strip {
    top: auto;
    bottom: 6.5rem;
    transform: none;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: min(100vw - 1rem, 18rem);
    left: 0.5rem;
    gap: 0.35rem;
  }

  .palette-dev-strip__box {
    width: 2.25rem;
    height: 2.25rem;
  }
}
</style>
