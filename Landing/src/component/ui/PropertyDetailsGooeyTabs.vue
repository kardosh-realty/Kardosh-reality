<template>
  <div class="property-gooey-tabs">
    <GooeyFilter :id="filterId" :strength="filterStrength" />

    <div ref="trackRef" class="property-gooey-tabs__track">
      <!-- Gooey layer: sliding pill + panel connector -->
      <div
        class="property-gooey-tabs__morph"
        :style="{ filter: gooeyEnabled ? `url(#${filterId})` : 'none' }"
        aria-hidden="true"
      >
        <div class="property-gooey-tabs__morph-tabs">
          <div
            v-for="tab in tabs"
            :key="`bg-${tab.id}`"
            class="property-gooey-tabs__morph-cell"
          />
        </div>
        <div
          class="property-gooey-tabs__morph-pill"
          :style="pillStyle"
        />
        <div class="property-gooey-tabs__morph-panel" />
      </div>

      <!-- Interactive tab labels -->
      <div class="property-gooey-tabs__labels" role="tablist" :aria-label="ariaLabel">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :ref="(el) => setTabRef(tab.id, el)"
          type="button"
          role="tab"
          class="property-gooey-tabs__tab"
          :class="{ 'property-gooey-tabs__tab--active': modelValue === tab.id }"
          :aria-selected="modelValue === tab.id"
          @click="selectTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="property-gooey-tabs__panel" role="tabpanel">
      <Transition name="property-gooey-panel" mode="out-in">
        <div :key="modelValue" class="property-gooey-tabs__panel-inner">
          <slot :name="modelValue" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from 'vue'
import GooeyFilter from '@/component/ui/GooeyFilter.vue'
import { useScreenSize } from '@/composables/useScreenSize'

const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, required: true },
  ariaLabel: { type: String, default: 'Property detail sections' },
  gooeyEnabled: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue'])

const filterId = 'property-details-gooey-filter'
const screenSize = useScreenSize()
const trackRef = ref(null)
const tabRefs = ref({})
const pillStyle = ref({ opacity: 0 })

const filterStrength = computed(() => (screenSize.lessThan('md') ? 8 : 12))

function setTabRef(id, el) {
  if (el) tabRefs.value[id] = el
  else delete tabRefs.value[id]
}

function selectTab(id) {
  emit('update:modelValue', id)
}

function updatePill() {
  const track = trackRef.value
  const active = tabRefs.value[props.modelValue]
  if (!track || !active) {
    pillStyle.value = { opacity: 0 }
    return
  }

  const trackRect = track.getBoundingClientRect()
  const tabRect = active.getBoundingClientRect()

  pillStyle.value = {
    opacity: 1,
    width: `${tabRect.width}px`,
    transform: `translateX(${tabRect.left - trackRect.left}px)`,
  }
}

let resizeObserver = null

onMounted(async () => {
  await nextTick()
  updatePill()

  if (typeof ResizeObserver !== 'undefined' && trackRef.value) {
    resizeObserver = new ResizeObserver(() => updatePill())
    resizeObserver.observe(trackRef.value)
  }
  window.addEventListener('resize', updatePill, { passive: true })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updatePill)
})

watch(
  () => [props.modelValue, props.tabs],
  async () => {
    await nextTick()
    updatePill()
  },
  { deep: true }
)
</script>
