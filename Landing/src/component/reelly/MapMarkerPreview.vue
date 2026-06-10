<template>
  <article
    v-if="displayMarker"
    class="map-marker-preview"
    :class="previewClasses"
    role="dialog"
    aria-label="Project preview"
    @click.stop
  >
    <div class="map-marker-preview__media" :class="{ 'map-marker-preview__media--compact': mobileSheet }">
      <RouterLink :to="detailTo" class="map-marker-preview__media-link">
        <img
          :src="activeImage"
          :alt="displayMarker.title"
          class="map-marker-preview__img"
          loading="lazy"
          @error="imageFailed = true"
        />
      </RouterLink>
      <div class="map-marker-preview__shade" aria-hidden="true" />

      <div class="map-marker-preview__badges">
        <span class="map-marker-preview__badge map-marker-preview__badge--brand">Off-plan</span>
        <span
          v-if="displayMarker.completionDate"
          class="map-marker-preview__badge map-marker-preview__badge--dark"
        >
          {{ displayMarker.completionDate }}
        </span>
      </div>

      <button
        type="button"
        class="map-marker-preview__close"
        aria-label="Close preview"
        @click="$emit('close')"
      >
        <X class="size-4" stroke-width="2.25" aria-hidden="true" />
      </button>

      <div
        v-if="imageCount > 1"
        class="map-marker-preview__dots"
        role="tablist"
        aria-label="Project images"
      >
        <button
          v-for="(_, i) in imageCount"
          :key="i"
          type="button"
          role="tab"
          class="map-marker-preview__dot"
          :class="{ 'map-marker-preview__dot--active': i === imageIndex }"
          :aria-selected="i === imageIndex"
          :aria-label="`Image ${i + 1} of ${imageCount}`"
          @click="imageIndex = i"
        />
      </div>
    </div>

    <div class="map-marker-preview__body" :class="{ 'map-marker-preview__body--compact': mobileSheet }">
      <header class="map-marker-preview__head">
        <RouterLink :to="detailTo" class="map-marker-preview__title">
          {{ displayMarker.title }}
        </RouterLink>
        <p v-if="displayMarker.developer" class="map-marker-preview__developer">
          by <span>{{ displayMarker.developer }}</span>
        </p>
      </header>

      <ul v-if="detailRows.length && !mobileSheet" class="map-marker-preview__facts">
        <li v-for="row in detailRows" :key="row.label">
          <span class="map-marker-preview__fact-label">{{ row.label }}</span>
          <span class="map-marker-preview__fact-value">{{ row.value }}</span>
        </li>
      </ul>

      <p v-else-if="mobileSheet && detailSummary" class="map-marker-preview__summary">
        {{ detailSummary }}
      </p>

      <span
        v-if="displayMarker.paymentPlanBadge && !mobileSheet"
        class="map-marker-preview__plan"
      >
        Payment plan {{ displayMarker.paymentPlanBadge }}
      </span>

      <p
        v-if="displayMarker.locationLine && !mobileSheet"
        class="map-marker-preview__location"
      >
        <MapPin class="map-marker-preview__pin" aria-hidden="true" />
        <span>{{ displayMarker.locationLine }}</span>
      </p>

      <RouterLink :to="detailTo" class="map-marker-preview__cta">
        View project
        <ArrowRight class="size-4" aria-hidden="true" />
      </RouterLink>
    </div>

    <span
      v-if="!mobileSheet && placement !== 'sheet'"
      class="map-marker-preview__pointer"
      aria-hidden="true"
    />
  </article>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, MapPin, X } from 'lucide-vue-next'
import { fetchFullProject } from '@/composables/useReelly'
import { enrichMapMarker } from '@/services/reelly/mapMarker'
import { projectDetailPath } from '@/utils/seoRoutes'
import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'
import { MAP_MARKER_IMAGE_WIDTH, proxyReellyImageUrl } from '@/services/reelly/imageProxy'

const props = defineProps({
  marker: { type: Object, default: null },
  placement: { type: String, default: 'above' },
  mobileSheet: { type: Boolean, default: false },
})

const previewClasses = computed(() => {
  if (props.mobileSheet || props.placement === 'sheet') {
    return ['map-marker-preview--sheet']
  }
  return props.placement === 'below'
    ? ['map-marker-preview--below']
    : ['map-marker-preview--above']
})

defineEmits(['close'])

const imageIndex = ref(0)
const detailMarker = ref(null)
const imageFailed = ref(false)

watch(
  () => [props.marker?.id, imageIndex.value],
  () => {
    imageFailed.value = false
  }
)

const displayMarker = computed(() => detailMarker.value || props.marker)

const imageCount = computed(() => displayMarker.value?.images?.length || 0)

const activeImage = computed(() => {
  if (imageFailed.value) return DUBAI_PROPERTY_FALLBACK
  const raw = displayMarker.value?.images?.[imageIndex.value] || displayMarker.value?.image
  return proxyReellyImageUrl(raw, { width: MAP_MARKER_IMAGE_WIDTH }) || DUBAI_PROPERTY_FALLBACK
})

const detailTo = computed(() =>
  displayMarker.value ? projectDetailPath(displayMarker.value) : '/off-plan'
)

const detailRows = computed(() => {
  const m = displayMarker.value
  if (!m) return []
  const rows = []
  if (m.bedroomsLabel) rows.push({ label: 'Bedrooms', value: m.bedroomsLabel })
  if (m.launchPrice || m.priceLabel) {
    rows.push({
      label: 'Launch price',
      value: m.launchPrice || m.priceLabel,
    })
  }
  return rows
})

const detailSummary = computed(() => {
  const parts = detailRows.value.map((r) => r.value).filter(Boolean)
  if (displayMarker.value?.paymentPlanBadge) {
    parts.push(`Plan ${displayMarker.value.paymentPlanBadge}`)
  }
  return parts.join(' · ') || displayMarker.value?.locationLine || ''
})

watch(
  () => props.marker?.id,
  async (id) => {
    imageIndex.value = 0
    detailMarker.value = null
    if (!id || !props.marker) return
    const m = props.marker
    if (m.paymentPlanBadge && m.bedroomsLabel) return
    try {
      const full = await fetchFullProject(id)
      const raw = full._raw || {}
      detailMarker.value = enrichMapMarker({
        ...raw,
        id: full.id,
        name: full.title,
        min_price: full.minPrice,
        cover_image: { url: full.image },
        completion_date: full.completionDate,
        developer: full.developer,
        location: full.location || raw.location,
      })
    } catch {
      /* keep list/marker data */
    }
  },
  { immediate: true }
)
</script>

<style src="@/assets/css/custom/components/_map-marker-preview.css"></style>
