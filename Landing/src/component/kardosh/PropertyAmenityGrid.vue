<template>
  <div
    v-if="amenities?.length"
    class="property-amenity-grid"
    :class="{ 'property-amenity-grid--open': isOpen }"
  >
    <button
      type="button"
      class="property-amenity-grid__trigger"
      :aria-expanded="isOpen"
      aria-controls="property-amenity-grid-panel"
      @click="isOpen = !isOpen"
    >
      <span class="property-amenity-grid__trigger-text">
        <span class="property-amenity-grid__title">Amenities &amp; features</span>
        <span class="property-amenity-grid__count">{{ amenities.length }} total</span>
      </span>
      <ChevronDown
        class="property-amenity-grid__chevron size-5 shrink-0"
        aria-hidden="true"
      />
    </button>

    <h6 class="property-amenity-grid__title property-amenity-grid__title--desktop">
      Amenities &amp; features
    </h6>

    <div
      id="property-amenity-grid-panel"
      class="property-amenity-grid__panel"
      :class="{ 'property-amenity-grid__panel--open': isOpen }"
    >
      <div class="property-amenity-grid__panel-inner">
        <ul class="property-amenity-grid__list list-none p-0 m-0">
          <li
            v-for="(name, i) in amenities"
            :key="i"
            class="property-amenity-grid__card"
          >
            <span class="property-amenity-grid__icon" aria-hidden="true">
              <component :is="iconFor(name)" class="size-[1.125rem]" />
            </span>
            <span class="property-amenity-grid__label">{{ name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Check,
  Waves,
  Dumbbell,
  Car,
  Trees,
  ConciergeBell,
  Sofa,
  Clapperboard,
  Cigarette,
  CarFront,
  Smartphone,
  Sparkles,
  ChevronDown,
} from 'lucide-vue-next'

defineProps({
  amenities: { type: Array, default: () => [] },
})

/** Collapsed by default on mobile to shorten the property detail page. */
const isOpen = ref(false)

const ICON_RULES = [
  { test: /pool|swim|infinity/i, icon: Waves },
  { test: /gym|fitness|yoga/i, icon: Dumbbell },
  { test: /parking|car\b|chauffeur/i, icon: CarFront },
  { test: /park|garden|green|beach/i, icon: Trees },
  { test: /security|concierge|guard/i, icon: ConciergeBell },
  { test: /wifi|internet|app/i, icon: Smartphone },
  { test: /spa|wellness|luxury/i, icon: Sparkles },
  { test: /lounge|residents/i, icon: Sofa },
  { test: /screen|cinema|theatre|theater/i, icon: Clapperboard },
  { test: /cigar/i, icon: Cigarette },
  { test: /valet|parking/i, icon: Car },
]

function iconFor(name) {
  const n = String(name)
  for (const { test, icon } of ICON_RULES) {
    if (test.test(n)) return icon
  }
  return Check
}
</script>
