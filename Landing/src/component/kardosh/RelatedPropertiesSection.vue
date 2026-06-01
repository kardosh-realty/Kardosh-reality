<template>
  <section
    v-if="showSection"
    class="related-properties bg-white dark:bg-slate-950"
  >
    <div class="container-fluid py-12 md:py-16">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 class="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
            {{ heading }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
            {{ subheading }}
          </p>
        </div>
        <RouterLink
          v-if="developerLink"
          :to="developerLink"
          class="text-sm font-semibold text-primary hover:underline shrink-0"
        >
          View all from {{ developer }}
        </RouterLink>
        <RouterLink
          v-else
          to="/off-plan"
          class="text-sm font-semibold text-primary hover:underline shrink-0"
        >
          Browse all off-plan
        </RouterLink>
      </div>

      <ListingGridSkeleton v-if="loading" :count="4" />
      <div
        v-else
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
      >
        <PropertyListingCard
          v-for="item in items"
          :key="`${item.source || 'listing'}-${item.id}`"
          :item="item"
          variant="luxury"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { getRelatedListings, loadDeveloperLogos } from '@/composables/useReelly'
import { developerDetailPath } from '@/utils/seoRoutes'

const props = defineProps({
  propertyId: { type: [String, Number], required: true },
  developer: { type: String, default: '' },
  location: { type: [String, Object], default: null },
})

const items = ref([])
const matchType = ref('explore')
const loading = ref(true)

const showSection = computed(() => loading.value || items.value.length > 0)

const developerLink = computed(() => {
  if (matchType.value !== 'developer' || !props.developer) return null
  return developerDetailPath({ name: props.developer })
})

const heading = computed(() => {
  if (matchType.value === 'developer' && props.developer) {
    return `More from ${props.developer}`
  }
  if (matchType.value === 'area') {
    return 'Nearby off-plan projects'
  }
  return 'You may also like'
})

const subheading = computed(() => {
  if (matchType.value === 'developer') {
    return 'Other developments by the same developer in the UAE.'
  }
  if (matchType.value === 'area') {
    return 'Other projects in the same area.'
  }
  return 'Explore more off-plan on Kardosh Realty.'
})

async function loadRelated() {
  loading.value = true
  void loadDeveloperLogos()
  const result = await getRelatedListings({
    currentId: props.propertyId,
    developer: props.developer,
    location: props.location,
    limit: 4,
  })
  items.value = result.items
  matchType.value = result.matchType
  loading.value = false
}

watch(
  () => [props.propertyId, props.developer],
  () => loadRelated(),
  { immediate: true }
)
</script>
