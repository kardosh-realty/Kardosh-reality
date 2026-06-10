<template>
  <Navbar v-if="!isEmbed" />
  <KardoshBreadcrumbs v-if="!isEmbed" />

  <section class="property-detail-page relative md:pb-24 pb-16">
    <div class="container-fluid">
      <PropertyGallerySkeleton v-if="loading" class="mt-4" />
      <PropertyGallery
        v-else
        class="mt-4"
        :items="galleryItems"
        :fallback-url="fallbackImage"
      />
    </div>

    <div class="container-fluid md:mt-10 mt-8">
      <PropertyDetailContentSkeleton v-if="loading" />

      <div v-else-if="property" class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
        <div class="min-w-0" :class="isEmbed ? 'xl:col-span-12' : 'xl:col-span-8'">
          <!-- Description card -->
          <article class="property-detail-card">
            <header class="property-detail-header">
              <h1>
                {{ property.title || property.name }}
              </h1>
              <p v-if="locationLabel" class="property-detail-location">
                <MapPin class="size-4 shrink-0" aria-hidden="true" />
                {{ locationLabel }}
              </p>

              <ul class="property-detail-meta">
                <li
                  v-if="property.square"
                  class="property-detail-meta__chip"
                >
                  <Maximize class="size-4" aria-hidden="true" />
                  {{ property.areaLabel || formatArea(property.square) }}
                </li>
                <li
                  v-if="property.saleStatus"
                  class="property-detail-meta__chip capitalize"
                >
                  {{ property.saleStatus }}
                </li>
                <li
                  v-if="property.constructionStatus"
                  class="property-detail-meta__chip capitalize"
                >
                  {{ property.constructionStatus }}
                </li>
              </ul>
            </header>

            <div class="property-detail-body">
              <!-- Developer + amenities -->
              <div
                v-if="property.developer || property.amenities?.length"
                class="property-detail-section"
              >
                <div v-if="property.developer" class="property-detail-developer">
                  <span class="property-detail-developer__icon" aria-hidden="true">
                    <Building2 class="size-6" />
                  </span>
                  <div class="min-w-0">
                    <p class="property-detail-developer__label">Developer</p>
                    <p class="property-detail-developer__name">
                      <RouterLink
                        v-if="developerLink"
                        :to="developerLink"
                        class="truncate block"
                      >
                        {{ property.developer }}
                      </RouterLink>
                      <span v-else>{{ property.developer }}</span>
                    </p>
                  </div>
                </div>

                <PropertyAmenityGrid
                  v-if="property.amenities?.length"
                  :class="property.developer ? 'mt-6' : ''"
                  :amenities="property.amenities"
                />
              </div>

              <!-- Overview as FAQ -->
              <PropertyOverviewFaq
                v-if="overviewFaqItems.length"
                :items="overviewFaqItems"
              />
            </div>
          </article>

          <PropertyProjectStatus
            class="property-detail-status"
            :sale-status="property.saleStatus"
            :construction-status="property.constructionStatus"
            :completion-date="property.completionDate"
            :units-count="property.unitsCount"
            :available-unit-types="property.availableUnitTypes"
          />

          <!-- Details tabs -->
          <section class="property-details-section" aria-label="Property details">
            <header class="property-details-section__head">
              <h2 class="property-details-section__title">Property details</h2>
            </header>

            <PropertyDetailsGooeyTabs
              v-model="activeTab"
              :tabs="visibleTabs"
            >
              <template #units>
                <PropertyFloorPlanGroups
                  v-if="floorPlanGroups.length || property.projectFloorPlanImages?.length"
                  :groups="floorPlanGroups"
                  :project-plans="property.projectFloorPlanImages || []"
                  @open-plan="openPlanLightbox"
                />

                <div
                  v-if="property.floorPlanPdfs?.length"
                  class="property-details-panel__divider"
                >
                  <h3 class="property-details-panel__subhead">Building & layout PDFs</h3>
                  <p class="property-details-panel__sublead">
                    Downloadable floor plans and layout brochures for this project.
                  </p>
                  <PropertyDocumentList
                    :documents="property.floorPlanPdfs"
                    :allow-download="false"
                  />
                </div>

                <p
                  v-if="!hasUnitsTabContent"
                  class="property-details-panel__empty"
                >
                  No unit configurations listed for this project.
                </p>
              </template>

              <template #brochure>
                <p class="property-details-panel__lead">
                  Official marketing brochure with project highlights, visuals, and key information.
                </p>
                <PropertyDocumentList
                  :documents="property.marketingBrochure ? [property.marketingBrochure] : []"
                  empty-text="No marketing brochure available for this project."
                  :allow-download="false"
                />
              </template>

              <template #payment>
                <p class="property-details-panel__lead">
                  Official developer payment structure for this project. Percentages show the split before and after handover where applicable.
                </p>
                <PropertyPaymentPlans :plans="property.paymentPlans" />
              </template>

              <template #documents>
                <p class="property-details-panel__lead">
                  Additional project documents (excluding marketing brochure and floor plan PDFs).
                </p>
                <PropertyDocumentList
                  :documents="property.documents || []"
                  empty-text="No additional documents for this project."
                  :allow-download="false"
                />
              </template>

              <template #buildings>
                <PropertyBuildings
                  v-if="property.buildings?.length"
                  :buildings="property.buildings"
                />
                <p v-else class="property-details-panel__empty">
                  No buildings listed for this project.
                </p>
              </template>
            </PropertyDetailsGooeyTabs>

            <PropertyLocationSection
              class="property-details-section__location"
              :location="property.location"
              :location-label="locationLabel"
              :latitude="property.latitude"
              :longitude="property.longitude"
              :project-title="property.title || property.name"
            />
          </section>
        </div>

        <aside v-if="!isEmbed" class="xl:col-span-4 mt-8 xl:mt-0 min-w-0">
          <div
            class="xl:sticky xl:top-28 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto xl:overscroll-contain pb-2"
          >
            <PropertyEnquiryCard :property="property" />
          </div>
        </aside>
      </div>
    </div>

    <RelatedPropertiesSection
      v-if="property && !isEmbed"
      :property-id="property.id"
      :developer="property.developer || ''"
      :location="property.location"
    />

    <VueEasyLightbox :visible="planLightboxOpen" :imgs="planLightboxUrls" :index="planLightboxIndex" @hide="planLightboxOpen = false" />
  </section>

  <Footer v-if="!isEmbed" />
  <Switcher v-if="!isEmbed" />
</template>

<script setup>
import { ref, computed, watch, onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { truncateDescription } from '@/config/seo'
import { buildPropertySchema } from '@/config/schema'
import { formatAedInMillions, formatArea } from '@/config/uae'
import { getListingById, fetchProjectUnitsSafe, loadDeveloperLogos } from '@/composables/useReelly'
import { developerDetailPath, projectDetailPath, isNumericRouteParam } from '@/utils/seoRoutes'
import PropertyGallery from '@/component/kardosh/PropertyGallery.vue'
import PropertyGallerySkeleton from '@/component/kardosh/skeleton/PropertyGallerySkeleton.vue'
import PropertyDetailContentSkeleton from '@/component/kardosh/skeleton/PropertyDetailContentSkeleton.vue'
import PropertyAmenityGrid from '@/component/kardosh/PropertyAmenityGrid.vue'
import PropertyEnquiryCard from '@/component/kardosh/PropertyEnquiryCard.vue'
import PropertyOverviewFaq from '@/component/kardosh/PropertyOverviewFaq.vue'
import PropertyFloorPlanGroups from '@/component/kardosh/PropertyFloorPlanGroups.vue'
import PropertyPaymentPlans from '@/component/kardosh/PropertyPaymentPlans.vue'
import PropertyProjectStatus from '@/component/kardosh/PropertyProjectStatus.vue'
import PropertyBuildings from '@/component/kardosh/PropertyBuildings.vue'
import PropertyDetailsGooeyTabs from '@/component/ui/PropertyDetailsGooeyTabs.vue'
import PropertyDocumentList from '@/component/kardosh/PropertyDocumentList.vue'
import PropertyLocationSection from '@/component/kardosh/PropertyLocationSection.vue'
import RelatedPropertiesSection from '@/component/kardosh/RelatedPropertiesSection.vue'
import { groupFloorPlansByBedroom } from '@/utils/groupFloorPlans'
import { parseOverviewToFaq } from '@/utils/parseOverviewFaq'
import Navbar from '@/component/navbar.vue'
import KardoshBreadcrumbs from '@/component/kardosh/KardoshBreadcrumbs.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { Maximize, MapPin, Building2 } from 'lucide-vue-next'

import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'

const route = useRoute()
const router = useRouter()
const property = ref(null)
const loading = ref(true)

// Embedded mode (e.g. inside the admin dashboard preview): hide site chrome
// (navbar, breadcrumbs, footer, switcher) and the related-projects section.
const isEmbed = computed(
  () => route.query.embed === '1' || route.query.embed === 'true'
)

const breadcrumbLabel = computed(
  () => property.value?.title || property.value?.name || 'Property'
)
provide('breadcrumbLabel', breadcrumbLabel)
const activeTab = ref('units')
const liveUnits = ref([])
const unitsRestricted = ref(false)
const unitsMessage = ref('')

const planLightboxOpen = ref(false)
const planLightboxUrls = ref([])
const planLightboxIndex = ref(0)

const allTabs = [
  { id: 'units', label: 'Units & floor plans' },
  { id: 'brochure', label: 'Marketing brochure' },
  { id: 'payment', label: 'Payment plans' },
  { id: 'documents', label: 'Documents' },
  { id: 'buildings', label: 'Buildings' },
]

const galleryItems = computed(() => {
  if (property.value?.gallery?.length) return property.value.gallery
  if (property.value?.images?.length) {
    return property.value.images.map((i) => ({
      url: i.url,
      group: i.group || 'cover',
      label: i.label || i.group || 'Photo',
    }))
  }
  if (property.value?.detail?.length) {
    return property.value.detail.map((url, idx) => ({
      url,
      group: 'cover',
      label: idx === 0 ? 'Cover' : `Photo ${idx + 1}`,
    }))
  }
  return []
})

const fallbackImage = computed(() => property.value?.image || DUBAI_PROPERTY_FALLBACK)

const hasUnitsTabContent = computed(() => {
  if (!property.value) return false
  return (
    floorPlanGroups.value.length > 0 ||
    (property.value.projectFloorPlanImages?.length ?? 0) > 0 ||
    (property.value.floorPlanPdfs?.length ?? 0) > 0 ||
    displayUnits.value.length > 0
  )
})

const visibleTabs = computed(() => {
  if (!property.value) return allTabs
  return allTabs.filter((tab) => {
    if (tab.id === 'brochure') return !!property.value.marketingBrochure
    if (tab.id === 'documents') return (property.value.documents?.length ?? 0) > 0
    if (tab.id === 'buildings') return (property.value.buildings?.length ?? 0) > 0
    if (tab.id === 'payment') return (property.value.paymentPlans?.length ?? 0) > 0
    if (tab.id === 'units') return hasUnitsTabContent.value
    return true
  })
})

const overviewFaqItems = computed(() => {
  if (property.value?.overviewFaq?.length) return property.value.overviewFaq
  if (property.value?.overview) return parseOverviewToFaq(property.value.overview)
  return []
})

const locationLabel = computed(() => {
  const loc = property.value?.location
  if (!loc) return property.value?.name?.includes(',') ? property.value.name.split(',').slice(1).join(',').trim() : null
  if (typeof loc === 'string') return loc
  return [loc.district, loc.region, loc.city, loc.country].filter(Boolean).join(', ') || null
})

useSeo(() => {
  const p = property.value
  const title = p?.title || p?.name || 'Property'
  const loc = locationLabel.value
  const desc =
    (typeof p?.overview === 'string' ? p.overview.slice(0, 300) : null) ||
    p?.description ||
    (loc
      ? `${title} — ${loc}. Off-plan and UAE property details from Kardosh Realty.`
      : `${title} — UAE property details from Kardosh Realty.`)
  const image =
    p?.image ||
    p?.gallery?.[0]?.url ||
    p?.images?.[0]?.url ||
    p?.detail?.[0]
  return {
    title: `${title} | Kardosh Realty`,
    description: truncateDescription(desc),
    path: route.path,
    image,
    ogType: 'article',
    robots: isEmbed.value ? 'noindex, nofollow' : 'index, follow',
    schema: isEmbed.value ? null : buildPropertySchema(p, route.path),
  }
})

const displayUnits = computed(() => {
  if (liveUnits.value.length) {
    return liveUnits.value.map((u, i) => ({
      key: u.id || `live-${i}`,
      title: u.unit_number ? `Unit ${u.unit_number}` : `Unit ${i + 1}`,
      subtitle: [u.bedrooms != null ? `${u.bedrooms} BR` : null, u.unit_type].filter(Boolean).join(' · '),
      priceText: u.price ? formatAedInMillions(Math.round(u.price)) : null,
      fromPriceAed: u.price != null ? Math.round(Number(u.price)) : null,
      toPriceAed: u.price != null ? Math.round(Number(u.price)) : null,
      meta: [
        u.floor != null ? `Floor ${u.floor}` : null,
        u.size ? formatArea(Math.round(u.size)) : null,
        u.status ? u.status.replace(/_/g, ' ') : null,
      ].filter(Boolean),
      floorPlans: u.floorPlans || [],
      bedrooms: u.bedrooms,
      unitType: u.unit_type,
    }))
  }

  const typical = property.value?.typicalUnitsWithPlans || []
  return typical.map((u) => ({
    key: u.id,
    title: `${u.bedrooms ?? '—'} BR · ${u.unitType || 'Unit'}`,
    subtitle:
      u.minSize || u.maxSize
        ? `${u.minSize ? Math.round(u.minSize) : '—'} – ${u.maxSize ? Math.round(u.maxSize) : '—'} sqm`
        : null,
    priceText:
      u.fromPriceAed || u.toPriceAed
        ? `${formatAedInMillions(u.fromPriceAed || 0)}${u.toPriceAed && u.toPriceAed !== u.fromPriceAed ? ` – ${formatAedInMillions(u.toPriceAed)}` : ''}`
        : null,
    fromPriceAed: u.fromPriceAed != null ? Math.round(Number(u.fromPriceAed)) : null,
    toPriceAed: u.toPriceAed != null ? Math.round(Number(u.toPriceAed)) : null,
    meta: [],
    floorPlans: u.floorPlans || [],
    bedrooms: u.bedrooms,
    unitType: u.unitType,
  }))
})

const floorPlanGroups = computed(() => groupFloorPlansByBedroom(displayUnits.value))

watch(visibleTabs, (tabs) => {
  if (!tabs.some((t) => t.id === activeTab.value)) {
    activeTab.value = tabs[0]?.id ?? 'units'
  }
})

const developerLink = computed(() => {
  const name = property.value?.developer
  if (!name) return null
  return developerDetailPath({ name })
})

function openPlanLightbox(plans, index) {
  planLightboxUrls.value = plans.map((p) => p.url)
  planLightboxIndex.value = index
  planLightboxOpen.value = true
}

async function loadProperty(slugParam) {
  loading.value = true
  liveUnits.value = []
  unitsRestricted.value = false
  unitsMessage.value = ''

  try {
    property.value = await getListingById(slugParam)
  } finally {
    loading.value = false
  }

  if (property.value && isNumericRouteParam(slugParam)) {
    const canonical = projectDetailPath(property.value)
    if (route.path !== canonical) {
      router.replace(canonical)
    }
  }

  if (property.value?.source === 'reelly' && property.value.id) {
    const typical = property.value.typicalUnitsWithPlans || []
    fetchProjectUnitsSafe(property.value.id, typical)
      .then((unitsResult) => {
        liveUnits.value = unitsResult.units
        unitsRestricted.value = unitsResult.restricted
        unitsMessage.value = unitsResult.message || ''
      })
      .catch(() => {})
  }
}

onMounted(() => {
  void loadDeveloperLogos()
  void loadProperty(route.params.slug)
})

watch(
  () => route.params.slug,
  (slug) => {
    if (slug) void loadProperty(slug)
  }
)
</script>
