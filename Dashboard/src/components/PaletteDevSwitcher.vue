<script setup>
import { computed } from 'vue'
import { usePalette } from '@/composables/usePalette'
import { isPaletteReviewEnabled } from '@kardosh/shared/config/paletteReview'

const { paletteId, palettes, paletteIds, setPalette } = usePalette()

const showSwitcher = isPaletteReviewEnabled()
const reviewMode = !import.meta.env.DEV && showSwitcher

const options = computed(() =>
  paletteIds.map((id) => ({
    id,
    label: palettes[id].label,
    description: palettes[id].description,
    swatches: palettes[id].swatches,
    primary: palettes[id].light?.primary,
  }))
)

const activeLabel = computed(() => palettes[paletteId.value]?.label || 'Default')
</script>

<template>
  <aside
    v-if="showSwitcher"
    class="palette-picker"
    :class="{ 'palette-picker--review': reviewMode }"
    aria-label="Brand colour palettes"
  >
    <header v-if="reviewMode" class="palette-picker__header">
      <p class="palette-picker__eyebrow">Brand preview</p>
      <h2 class="palette-picker__title">Choose a palette</h2>
      <p class="palette-picker__hint">
        Preview dashboard colours. Your choice is saved in this browser.
      </p>
    </header>

    <nav class="palette-picker__list">
      <button
        v-for="opt in options"
        :key="opt.id"
        type="button"
        class="palette-picker__item"
        :class="{ 'palette-picker__item--active': paletteId === opt.id }"
        :title="`${opt.label}${opt.description ? ` — ${opt.description}` : ''}`"
        :aria-label="`Preview ${opt.label} palette`"
        :aria-pressed="paletteId === opt.id"
        @click="setPalette(opt.id)"
      >
        <span
          v-if="opt.swatches?.length"
          class="palette-picker__swatch palette-picker__swatch--bands"
          aria-hidden="true"
        >
          <span
            v-for="(hex, i) in opt.swatches"
            :key="i"
            class="palette-picker__band"
            :style="{ background: hex }"
          />
        </span>
        <span
          v-else
          class="palette-picker__swatch palette-picker__swatch--solid"
          :style="{ background: opt.primary }"
          aria-hidden="true"
        />
        <span v-if="reviewMode" class="palette-picker__meta">
          <span class="palette-picker__label">{{ opt.label }}</span>
          <span v-if="opt.description" class="palette-picker__desc">{{ opt.description }}</span>
        </span>
        <span v-else class="sr-only">{{ opt.label }}</span>
      </button>
    </nav>

    <p v-if="reviewMode" class="palette-picker__current">
      Selected: <strong>{{ activeLabel }}</strong>
    </p>
  </aside>
</template>

<style scoped>
.palette-picker {
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 10000;
  transform: translateY(-50%);
  pointer-events: none;
}

.palette-picker--review {
  top: 5.5rem;
  bottom: 5.5rem;
  transform: none;
  display: flex;
  flex-direction: column;
  width: min(15rem, calc(100vw - 1rem));
  max-height: calc(100vh - 11rem);
  padding: 0.75rem;
  border-radius: 0 0.75rem 0.75rem 0;
  background: rgb(255 255 255 / 0.97);
  border: 1px solid rgb(226 232 240);
  border-left: none;
  box-shadow: 4px 0 24px rgb(15 23 42 / 0.12);
  pointer-events: auto;
  overflow: hidden;
}

:global(.dark) .palette-picker--review {
  background: rgb(15 23 42 / 0.97);
  border-color: rgb(51 65 85);
}

.palette-picker__header {
  flex-shrink: 0;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid rgb(226 232 240);
  margin-bottom: 0.5rem;
}

.palette-picker__eyebrow {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary, #00a63e);
}

.palette-picker__title {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(15 23 42);
}

.palette-picker__hint {
  margin-top: 0.35rem;
  font-size: 0.7rem;
  line-height: 1.45;
  color: rgb(100 116 139);
}

.palette-picker__list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  pointer-events: none;
}

.palette-picker--review .palette-picker__list {
  pointer-events: auto;
}

.palette-picker__item {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 2.75rem;
  padding: 0;
  border: 2px solid rgb(255 255 255 / 0.55);
  border-radius: 0.5rem;
  background: rgb(15 23 42 / 0.35);
  cursor: pointer;
}

.palette-picker--review .palette-picker__item {
  width: 100%;
  padding: 0.45rem 0.5rem;
  border-color: rgb(226 232 240);
  background: rgb(248 250 252);
}

.palette-picker__item--active {
  border-color: var(--color-primary, #00a63e);
  box-shadow: 0 0 0 1px var(--color-primary, #00a63e);
}

.palette-picker__swatch {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.35rem;
  overflow: hidden;
}

.palette-picker__swatch--bands {
  display: flex;
  flex-direction: column;
}

.palette-picker__band {
  flex: 1 1 0;
}

.palette-picker__meta {
  min-width: 0;
  text-align: left;
}

.palette-picker__label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
}

.palette-picker__desc {
  display: block;
  font-size: 0.65rem;
  color: rgb(100 116 139);
}

.palette-picker__current {
  flex-shrink: 0;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgb(226 232 240);
  font-size: 0.7rem;
  color: rgb(100 116 139);
}
</style>
