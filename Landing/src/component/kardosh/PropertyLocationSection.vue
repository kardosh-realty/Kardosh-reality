<template>
  <section v-if="showSection" class="property-location" aria-labelledby="property-location-heading">
    <header class="property-location__header">
      <div class="property-location__title-wrap">
        <span class="property-location__icon" aria-hidden="true">
          <MapPin class="size-5" />
        </span>
        <div>
          <h2 id="property-location-heading" class="property-location__title">Location</h2>
          <p v-if="primaryLine" class="property-location__subtitle">{{ primaryLine }}</p>
        </div>
      </div>
      <a
        v-if="mapsExternalUrl"
        :href="mapsExternalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="property-location__maps-link"
      >
        <ExternalLink class="size-4 shrink-0" aria-hidden="true" />
        Open in Google Maps
      </a>
    </header>

    <div class="property-location__grid">
      <div class="property-location__map-wrap">
        <iframe
          v-if="mapEmbedUrl"
          :title="`Map — ${projectTitle || 'Property location'}`"
          :src="mapEmbedUrl"
          class="property-location__map"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
        <div v-else class="property-location__map-fallback">
          <MapPin class="size-10 opacity-40" aria-hidden="true" />
          <p>Map preview unavailable for this project.</p>
        </div>
      </div>

      <aside class="property-location__panel">
        <p class="property-location__panel-label">Address</p>
        <p v-if="primaryLine" class="property-location__address">{{ primaryLine }}</p>
        <p v-else class="property-location__address property-location__address--muted">Location details coming soon</p>

        <ul v-if="locationParts.length" class="property-location__chips">
          <li v-for="(part, i) in locationParts" :key="i">{{ part }}</li>
        </ul>

        <div v-if="hasCoordinates" class="property-location__coords">
          <span class="property-location__panel-label">Coordinates</span>
          <span class="property-location__coord-value">{{ coordLabel }}</span>
        </div>

        <div class="property-location__actions">
          <a
            v-if="directionsUrl"
            :href="directionsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="property-location__btn property-location__btn--primary"
          >
            <Navigation class="size-4 shrink-0" aria-hidden="true" />
            Get directions
          </a>
          <a
            v-if="mapsExternalUrl"
            :href="mapsExternalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="property-location__btn property-location__btn--outline"
          >
            <MapPin class="size-4 shrink-0" aria-hidden="true" />
            View on map
          </a>
        </div>

        <p class="property-location__note">
          Distances and travel times are approximate. Confirm the exact plot with Kardosh Realty before booking.
        </p>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { MapPin, ExternalLink, Navigation } from 'lucide-vue-next'

const props = defineProps({
  location: { type: [Object, String], default: null },
  locationLabel: { type: String, default: '' },
  latitude: { type: [Number, String], default: null },
  longitude: { type: [Number, String], default: null },
  projectTitle: { type: String, default: '' },
})

const lat = computed(() => {
  const n = Number(props.latitude)
  return Number.isFinite(n) ? n : null
})

const lng = computed(() => {
  const n = Number(props.longitude)
  return Number.isFinite(n) ? n : null
})

const hasCoordinates = computed(() => lat.value != null && lng.value != null)

const primaryLine = computed(() => {
  if (props.locationLabel?.trim()) return props.locationLabel.trim()
  if (typeof props.location === 'string' && props.location.trim()) return props.location.trim()
  const loc = props.location
  if (loc && typeof loc === 'object') {
    return [loc.district, loc.region, loc.city, loc.country].filter(Boolean).join(', ')
  }
  return ''
})

const locationParts = computed(() => {
  const loc = props.location
  if (!loc || typeof loc !== 'object') return []
  const parts = []
  if (loc.district) parts.push(loc.district)
  if (loc.region && loc.region !== loc.district) parts.push(loc.region)
  if (loc.city && !parts.includes(loc.city)) parts.push(loc.city)
  if (loc.country && loc.country !== 'UAE' && loc.country !== 'United Arab Emirates') {
    parts.push(loc.country)
  } else if (!parts.length) {
    parts.push('UAE')
  }
  return parts
})

const mapsQuery = computed(() => {
  if (hasCoordinates.value) return `${lat.value},${lng.value}`
  if (primaryLine.value) return primaryLine.value
  return ''
})

const mapEmbedUrl = computed(() => {
  if (!mapsQuery.value) return null
  if (hasCoordinates.value) {
    return `https://maps.google.com/maps?q=${lat.value},${lng.value}&z=15&output=embed`
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery.value)}&z=14&output=embed`
})

const mapsExternalUrl = computed(() => {
  if (!mapsQuery.value) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery.value)}`
})

const directionsUrl = computed(() => {
  if (!mapsQuery.value) return null
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery.value)}`
})

const coordLabel = computed(() => {
  if (!hasCoordinates.value) return ''
  return `${lat.value.toFixed(5)}, ${lng.value.toFixed(5)}`
})

const showSection = computed(
  () => Boolean(primaryLine.value || hasCoordinates.value || mapEmbedUrl.value)
)
</script>

<style scoped>
.property-location__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.property-location__title-wrap {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.property-location__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: var(--color-primary, #1e3a5f);
  color: #fff;
  flex-shrink: 0;
}

.dark .property-location__icon {
  background: var(--color-primary, #7eb3e8);
  color: #fff;
}

.property-location__title {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

.dark .property-location__title {
  color: #f8fafc;
}

.property-location__subtitle {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  color: #64748b;
  line-height: 1.4;
  max-width: 36rem;
}

.dark .property-location__subtitle {
  color: #94a3b8;
}

.property-location__maps-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.property-location__maps-link:hover {
  border-color: var(--color-primary, #1e3a5f);
  background: #f8fafc;
}

.dark .property-location__maps-link {
  color: #f1f5f9;
  border-color: #475569;
  background: #1e293b;
}

.dark .property-location__maps-link:hover {
  border-color: var(--color-primary, #7eb3e8);
}

.property-location__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 4px 24px -8px rgb(15 23 42 / 0.12);
}

.dark .property-location__grid {
  border-color: #334155;
  background: #0f172a;
  box-shadow: 0 4px 24px -8px rgb(0 0 0 / 0.35);
}

@media (min-width: 1024px) {
  .property-location__grid {
    grid-template-columns: 1.65fr 1fr;
  }
}

.property-location__map-wrap {
  position: relative;
  min-height: 16rem;
  background: #f1f5f9;
}

@media (min-width: 768px) {
  .property-location__map-wrap {
    min-height: 22rem;
  }
}

.dark .property-location__map-wrap {
  background: #1e293b;
}

.property-location__map {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 16rem;
  border: 0;
}

@media (min-width: 768px) {
  .property-location__map {
    min-height: 22rem;
  }
}

.property-location__map-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 16rem;
  padding: 2rem;
  text-align: center;
  font-size: 1rem;
  color: #64748b;
}

.property-location__panel {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid #e2e8f0;
}

@media (min-width: 1024px) {
  .property-location__panel {
    border-top: none;
    border-left: 1px solid #e2e8f0;
  }
}

.dark .property-location__panel {
  border-color: #334155;
}

.property-location__panel-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.dark .property-location__panel-label {
  color: #94a3b8;
}

.property-location__address {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.45;
  color: #0f172a;
}

.dark .property-location__address {
  color: #f8fafc;
}

.property-location__address--muted {
  font-weight: 500;
  color: #94a3b8;
}

.property-location__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.property-location__chips li {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background: #f1f5f9;
  color: #334155;
}

.dark .property-location__chips li {
  background: #1e293b;
  color: #e2e8f0;
}

.property-location__coords {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.property-location__coord-value {
  font-size: 0.9375rem;
  font-family: ui-monospace, monospace;
  color: #475569;
}

.dark .property-location__coord-value {
  color: #cbd5e1;
}

.property-location__actions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.25rem;
}

.property-location__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.625rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.property-location__btn--primary {
  background: var(--color-primary, #1e3a5f);
  color: #fff;
  border: 1px solid var(--color-primary, #1e3a5f);
}

.property-location__btn--primary:hover {
  background: var(--color-primary-dark, #152a45);
  border-color: var(--color-primary-dark, #152a45);
}

.dark .property-location__btn--primary {
  background: var(--color-primary, #7eb3e8);
  color: #fff;
  border-color: var(--color-primary, #7eb3e8);
}

.dark .property-location__btn--primary:hover {
  background: var(--color-primary-dark, #5b8ec4);
  border-color: var(--color-primary-dark, #5b8ec4);
}

.property-location__btn--outline {
  background: transparent;
  color: #0f172a;
  border: 1px solid #cbd5e1;
}

.property-location__btn--outline:hover {
  border-color: var(--color-primary, #1e3a5f);
  color: var(--color-primary-dark, #152a45);
}

.dark .property-location__btn--outline {
  color: #f1f5f9;
  border-color: #475569;
}

.dark .property-location__btn--outline:hover {
  border-color: var(--color-primary, #7eb3e8);
  color: var(--color-primary, #7eb3e8);
}

.property-location__note {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #94a3b8;
}

.dark .property-location__note {
  color: #64748b;
}
</style>
