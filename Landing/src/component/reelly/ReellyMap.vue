<template>
  <div ref="wrapEl" class="reelly-map-wrap w-full h-full min-h-0 md:min-h-[480px]">
    <div
      ref="mapEl"
      class="reelly-map-canvas w-full h-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800"
    ></div>

    <MapMarkerPreview
      v-if="!suppressPreview && selectedMarker && anchor"
      :marker="selectedMarker"
      :placement="anchor.placement"
      :style="previewStyle"
      @close="emit('close')"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapMarkerPreview from '@/component/reelly/MapMarkerPreview.vue'
const props = defineProps({
  markers: { type: Array, default: () => [] },
  selectedId: { type: [Number, String], default: null },
  /** Mobile: preview lives in page dock, not on the map */
  suppressPreview: { type: Boolean, default: false },
})

const emit = defineEmits(['select', 'close'])

const wrapEl = ref(null)
const mapEl = ref(null)
const anchor = ref(null)

let markerById = new Map()
let map = null
let layerGroup = null
let resizeObserver = null

function cardMetrics() {
  if (props.suppressPreview) {
    return { halfWidth: 0, estHeight: 0, sheet: true }
  }
  const w = typeof window !== 'undefined' ? window.innerWidth : 1280
  const narrow = w < 480
  const tablet = w < 768
  return {
    halfWidth: narrow ? 120 : tablet ? 132 : 148,
    estHeight: narrow ? 300 : tablet ? 340 : 380,
    sheet: false,
  }
}
const CARD_GAP = 14
const EDGE_PAD = 20
const PIN_TIP_GAP = 10
const PIN_ICON_HEIGHT = 41

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const selectedMarker = computed(() => {
  if (props.selectedId == null) return null
  return (
    props.markers.find((m) => String(m.id) === String(props.selectedId)) || null
  )
})

const previewStyle = computed(() => {
  if (!anchor.value) return {}
  return {
    left: `${anchor.value.x}px`,
    top: `${anchor.value.y}px`,
  }
})

function mapOffsets() {
  const wrap = wrapEl.value
  const mapNode = mapEl.value
  if (!wrap || !mapNode) return { offsetX: 0, offsetY: 0 }
  const wrapRect = wrap.getBoundingClientRect()
  const mapRect = mapNode.getBoundingClientRect()
  return {
    offsetX: mapRect.left - wrapRect.left,
    offsetY: mapRect.top - wrapRect.top,
  }
}

function choosePlacement(tipY, wrapH) {
  const { estHeight } = cardMetrics()
  const aboveTop = tipY - estHeight - CARD_GAP - PIN_TIP_GAP
  const belowBottom =
    tipY + CARD_GAP + estHeight + PIN_TIP_GAP + PIN_ICON_HEIGHT

  const fitsAbove = aboveTop >= EDGE_PAD
  const fitsBelow = belowBottom <= wrapH - EDGE_PAD

  if (fitsAbove && !fitsBelow) return 'above'
  if (fitsBelow && !fitsAbove) return 'below'
  if (fitsAbove && fitsBelow) {
    return tipY < wrapH * 0.42 ? 'below' : 'above'
  }
  return 'above'
}

function getPreviewBounds({ x, y, placement }, wrapW, wrapH) {
  const { halfWidth, estHeight } = cardMetrics()
  if (placement === 'below') {
    return {
      left: x - halfWidth,
      right: x + halfWidth,
      top: y + CARD_GAP + PIN_TIP_GAP,
      bottom: y + CARD_GAP + estHeight + PIN_TIP_GAP,
    }
  }
  return {
    left: x - halfWidth,
    right: x + halfWidth,
    top: y - estHeight - CARD_GAP - PIN_TIP_GAP,
    bottom: y + PIN_TIP_GAP,
  }
}

function fitPreviewInView() {
  if (props.suppressPreview) return false
  if (!map || !wrapEl.value || !anchor.value) return false

  const wrap = wrapEl.value
  const w = wrap.clientWidth
  const h = wrap.clientHeight
  const bounds = getPreviewBounds(anchor.value, w, h)

  let panX = 0
  let panY = 0

  if (bounds.left < EDGE_PAD) panX = bounds.left - EDGE_PAD
  else if (bounds.right > w - EDGE_PAD) panX = bounds.right - (w - EDGE_PAD)

  if (bounds.top < EDGE_PAD) panY = bounds.top - EDGE_PAD
  else if (bounds.bottom > h - EDGE_PAD) panY = bounds.bottom - (h - EDGE_PAD)

  if (panX === 0 && panY === 0) return false

  map.panBy([panX, panY], { animate: true, duration: 0.4 })
  return true
}

function updateAnchor() {
  if (props.suppressPreview) {
    anchor.value = null
    return
  }
  if (!map || !mapEl.value || !wrapEl.value || props.selectedId == null) {
    anchor.value = null
    return
  }

  const m = selectedMarker.value
  if (!m?.latitude || !m?.longitude) {
    anchor.value = null
    return
  }

  const point = map.latLngToContainerPoint([m.latitude, m.longitude])
  const wrap = wrapEl.value
  const { offsetX, offsetY } = mapOffsets()

  const { halfWidth } = cardMetrics()
  const x = Math.max(
    halfWidth + EDGE_PAD,
    Math.min(wrap.clientWidth - halfWidth - EDGE_PAD, point.x + offsetX)
  )

  const tipY = point.y + offsetY
  const placement = choosePlacement(tipY, wrap.clientHeight)
  const y = Math.max(EDGE_PAD, Math.min(wrap.clientHeight - EDGE_PAD, tipY))

  anchor.value = { x, y, placement }
}

function afterFocusMove() {
  updateAnchor()
  if (fitPreviewInView()) {
    map.once('moveend', () => {
      updateAnchor()
      fitPreviewInView()
    })
  }
}

function focusMarker(id, { animate = true } = {}) {
  if (!map || id == null) return
  const m = props.markers.find((x) => String(x.id) === String(id))
  if (!m?.latitude || !m?.longitude) return

  const latlng = L.latLng(m.latitude, m.longitude)
  const zoom = Math.max(map.getZoom(), 12)
  const metrics = cardMetrics()
  const offsetY = metrics.sheet
    ? 0
    : Math.round(metrics.estHeight * 0.38 + PIN_TIP_GAP)
  const targetPoint = map.project(latlng, zoom).subtract([0, offsetY])
  const targetLatLng = map.unproject(targetPoint, zoom)

  if (animate) {
    map.flyTo(targetLatLng, zoom, { duration: 0.55 })
    map.once('moveend', afterFocusMove)
  } else {
    map.setView(targetLatLng, zoom, { animate: false })
    afterFocusMove()
  }
}

function renderMarkers() {
  if (!map || !layerGroup) return
  layerGroup.clearLayers()
  markerById = new Map()

  const bounds = []
  props.markers.forEach((m) => {
    if (!m.latitude || !m.longitude) return
    const marker = L.marker([m.latitude, m.longitude], { icon: defaultIcon })
    marker.on('click', () => emit('select', m.id))
    layerGroup.addLayer(marker)
    markerById.set(m.id, marker)
    bounds.push([m.latitude, m.longitude])
  })

  if (bounds.length && props.selectedId == null) {
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 })
    map.once('moveend', updateAnchor)
  } else if (!bounds.length) {
    map.setView([25.2048, 55.2708], 10)
  }

  updateAnchor()
}

onMounted(() => {
  map = L.map(mapEl.value, { scrollWheelZoom: true }).setView([25.2048, 55.2708], 10)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map)

  layerGroup = L.layerGroup().addTo(map)
  map.on('move zoom zoomend moveend', updateAnchor)

  if (typeof ResizeObserver !== 'undefined' && wrapEl.value) {
    resizeObserver = new ResizeObserver(() => {
      updateAnchor()
      map?.invalidateSize()
    })
    resizeObserver.observe(wrapEl.value)
  }

  nextTick(() => map?.invalidateSize())

  renderMarkers()
  if (props.selectedId != null) {
    nextTick(() => focusMarker(props.selectedId, { animate: false }))
  }
})

watch(() => props.markers, () => {
  renderMarkers()
  if (props.selectedId != null) nextTick(updateAnchor)
})

watch(
  () => props.suppressPreview,
  () => {
    updateAnchor()
    if (props.selectedId != null) {
      nextTick(() => focusMarker(props.selectedId, { animate: false }))
    }
  }
)

watch(
  () => props.selectedId,
  (id, prev) => {
    if (id == null) {
      anchor.value = null
      return
    }
    if (String(id) !== String(prev)) {
      focusMarker(id)
    } else {
      updateAnchor()
    }
  }
)

onUnmounted(() => {
  resizeObserver?.disconnect()
  map?.off('move zoom zoomend moveend', updateAnchor)
  map?.remove()
  map = null
})
</script>

<style scoped>
.reelly-map-wrap {
  position: relative;
  isolation: isolate;
  width: 100%;
  height: 100%;
  min-height: inherit;
}

.reelly-map-canvas {
  position: relative;
  z-index: 0;
}

.reelly-map-canvas :deep(.leaflet-container) {
  font: inherit;
}

</style>
