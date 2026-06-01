<template>
  <Navbar nav-class="navbar-white" />

  <div class="map-page-view">
  <PageHero
    title="Off-plan map"
    subtitle="Explore UAE off-plan projects on the map. Select a marker or list item for full details."
    :image="PAGE_HERO_IMAGES.map"
    :compact="isMobile"
    :hide-shape="isMobile"
  />

  <section class="map-page" :class="{ 'map-page--mobile': isMobile }">
    <div class="container-fluid map-page__container">
      <div class="map-page__tools listings-search-glass">
        <p class="map-page__count">
          <span class="font-semibold text-slate-900 dark:text-white">{{ filteredMarkers.length }}</span>
          project{{ filteredMarkers.length === 1 ? '' : 's' }}{{ isMobile ? '' : ' on the map' }}
          <span v-if="searchQuery" class="text-slate-500"> · matching “{{ searchQuery }}”</span>
        </p>
        <div class="map-page__tools-actions">
          <label class="map-page__search">
            <Search class="map-page__search-icon" aria-hidden="true" />
            <input
              v-model="searchQuery"
              type="search"
              class="map-page__search-input"
              placeholder="Search by name or area…"
              autocomplete="off"
            />
          </label>
          <RouterLink
            to="/off-plan"
            class="map-page__list-btn btn bg-primary hover:bg-primary-dark border-primary text-white rounded-lg h-11 px-5 text-sm font-semibold whitespace-nowrap inline-flex items-center justify-center"
          >
            <List class="map-page__list-btn-icon size-4 shrink-0" aria-hidden="true" />
            <span class="map-page__list-btn-label">List view</span>
          </RouterLink>
        </div>
      </div>

      <div class="map-page__layout">
        <aside class="map-page__sidebar">
          <p class="map-page__sidebar-head">Projects</p>
          <div class="map-page__list" role="list">
            <div v-if="markersLoading" class="space-y-2" role="status" aria-label="Loading listings">
              <PropertyListItemSkeleton v-for="n in 6" :key="n" />
            </div>
            <p v-else-if="!filteredMarkers.length" class="text-slate-400 text-sm px-2 py-4">
              {{ searchQuery ? 'No projects match your search.' : 'No map markers available.' }}
            </p>
            <template v-else>
              <component
                :is="isMobile ? 'button' : RouterLink"
                v-for="m in filteredMarkers"
                :key="m.id"
                :ref="(el) => setCardRef(m.id, el)"
                :to="isMobile ? undefined : projectDetailPath(m)"
                :type="isMobile ? 'button' : undefined"
                role="listitem"
                class="map-page__card"
                :class="{ 'map-page__card--active': selectedId === m.id }"
                @click="isMobile ? selectMarker(m.id) : undefined"
                @mouseenter="!isMobile && selectMarker(m.id)"
                @focusin="!isMobile && selectMarker(m.id)"
              >
                <ProtectedPropertyImage
                  v-if="m.image"
                  :src="m.image"
                  :alt="markerTitle(m)"
                  wrapper-class="map-page__card-img"
                  img-class="map-page__card-img-el"
                  watermark-size="xs"
                />
                <div v-else class="map-page__card-img map-page__card-img--empty" aria-hidden="true" />
                <div class="map-page__card-body">
                  <h2 class="map-page__card-title">{{ markerTitle(m) }}</h2>
                  <p class="map-page__card-meta">
                    {{ markerLocation(m) }}<span v-if="m.developer"> · {{ m.developer }}</span>
                  </p>
                  <p v-if="markerPrice(m)" class="map-page__card-price">{{ markerPrice(m) }}</p>
                </div>
              </component>
            </template>
          </div>
        </aside>

        <div class="map-page__map">
          <MapSkeleton v-if="markersLoading" class="absolute inset-0 h-full" />
          <ReellyMap
            v-else
            :markers="filteredMarkers"
            :selected-id="selectedId"
            :suppress-preview="isMobile"
            @select="selectMarker"
            @close="selectedId = null"
          />
        </div>

        <!-- Mobile only: detail bar below map (desktop keeps floating map preview) -->
        <div
          v-if="isMobile && selectedMarker"
          class="map-page__dock"
        >
          <ProtectedPropertyImage
            v-if="selectedMarker.image"
            :src="selectedMarker.image"
            :alt="markerTitle(selectedMarker)"
            wrapper-class="map-page__dock-img"
            img-class="map-page__dock-img-el"
            watermark-size="xs"
          />
          <div
            v-else
            class="map-page__dock-img map-page__dock-img--empty"
            aria-hidden="true"
          />
          <div class="map-page__dock-body">
            <p class="map-page__dock-title">{{ markerTitle(selectedMarker) }}</p>
            <p v-if="selectedMarker.developer" class="map-page__dock-meta">
              by {{ selectedMarker.developer }}
            </p>
            <p class="map-page__dock-meta">
              {{ dockSummary(selectedMarker) }}
            </p>
          </div>
          <RouterLink
            :to="projectDetailPath(selectedMarker)"
            class="map-page__dock-cta"
          >
            View
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
  </div>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { Search, List } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import ReellyMap from '@/component/reelly/ReellyMap.vue'
import PropertyListItemSkeleton from '@/component/kardosh/skeleton/PropertyListItemSkeleton.vue'
import MapSkeleton from '@/component/kardosh/skeleton/MapSkeleton.vue'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { formatAedInMillions } from '@/config/uae'
import { useReelly } from '@/composables/useReelly'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { projectDetailPath } from '@/utils/seoRoutes'
import ProtectedPropertyImage from '@/component/kardosh/ProtectedPropertyImage.vue'

const isMobile = useMediaQuery('(max-width: 767px)')

const { markers, markersLoading, loadMarkers } = useReelly()
const selectedId = ref(null)
const searchQuery = ref('')
const cardRefs = ref({})

const filteredMarkers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return markers.value
  return markers.value.filter((m) => {
    const hay = [
      m.name,
      m.developer,
      m.location?.district,
      m.location?.region,
      m.location?.city,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
})

const selectedMarker = computed(() => {
  if (selectedId.value == null) return null
  return (
    filteredMarkers.value.find((m) => String(m.id) === String(selectedId.value)) || null
  )
})

watch(filteredMarkers, (list) => {
  if (!list.length) {
    selectedId.value = null
    return
  }
  if (!list.some((m) => m.id === selectedId.value)) {
    selectedId.value = list[0]?.id ?? null
  }
})

watch(selectedId, async () => {
  if (!isMobile.value) return
  await nextTick()
  const el = cardRefs.value[selectedId.value]
  el?.scrollIntoView?.({ inline: 'center', block: 'nearest', behavior: 'smooth' })
})

function setCardRef(id, el) {
  if (el) cardRefs.value[id] = el
  else delete cardRefs.value[id]
}

function selectMarker(id) {
  selectedId.value = id
}

function markerTitle(m) {
  return m.title || m.name || 'Project'
}

function markerLocation(m) {
  return m.locationLine || m.location?.district || m.location?.region || m.location?.city || 'UAE'
}

function markerPrice(m) {
  if (m.launchPrice) return m.launchPrice
  if (m.minPrice) {
    const compact = formatAedInMillions(Math.round(m.minPrice))
    if (compact) return `From ${compact}`
  }
  return null
}

function dockSummary(m) {
  const parts = []
  if (m.bedroomsLabel) parts.push(m.bedroomsLabel)
  const price = markerPrice(m)
  if (price) parts.push(price)
  if (m.paymentPlanBadge) parts.push(`Plan ${m.paymentPlanBadge}`)
  return parts.join(' · ') || markerLocation(m)
}

onMounted(async () => {
  await loadMarkers()
  if (filteredMarkers.value.length) {
    selectedId.value = filteredMarkers.value[0].id
  }
})
</script>
