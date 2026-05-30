<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    :title="heroTitle"
    :subtitle="heroSubtitle"
    :image="listingsHeroImage"
  />

  <section class="relative listings-page-section lg:py-16 py-12">
    <div class="container-fluid">
      <div class="listings-search-overlap listings-search-glass -mt-20 relative z-10 mb-10">
        <PropertySearchBar variant="listing" :show-tabs="false" :initial-mode="mode" />
      </div>

      <p v-if="error" class="text-center text-red-600 dark:text-red-400 py-4 text-sm">
        {{ error }}
      </p>

      <ListingGridSkeleton v-if="loading" :count="12" />

      <p
        v-else-if="filtered.length === 0"
        class="text-center text-slate-500 dark:text-slate-400 py-12"
      >
        No properties match your search. Try different filters.
      </p>

      <Pagination
        v-else
        :items-per-page="12"
        :items="filtered"
        :card-variant="mode === 'off-plan' ? 'luxury' : 'default'"
        grid-class="listings-property-grid grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-7"
      />
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import PropertySearchBar from '@/component/kardosh/PropertySearchBar.vue'
import Pagination from '@/component/pagination.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { useReelly } from '@/composables/useReelly'
import { projectMatchesBedroomFilter } from '@/services/reelly/mapProject'

const props = defineProps({
  mode: { type: String, required: true }, // off-plan | rent
})

const route = useRoute()
const { projects, rentListings, loading, error, loadProjects } = useReelly()

const listingsHeroImage = computed(() =>
  props.mode === 'rent' ? PAGE_HERO_IMAGES.rent : PAGE_HERO_IMAGES.offPlan
)

const heroTitle = computed(() =>
  props.mode === 'rent' ? 'Properties for rent' : 'Off-plan & ready to buy'
)
const heroSubtitle = computed(() =>
  props.mode === 'rent'
    ? 'Annual rent listings across the UAE on Kardosh Realty.'
    : 'New developments from leading UAE developers via Reelly.'
)

const sourceList = computed(() =>
  props.mode === 'rent' ? rentListings.value : projects.value
)

function matchesPropertyType(item, type) {
  const t = type.toLowerCase()
  const haystack = `${item.title || ''} ${item.name || ''}`.toLowerCase()
  const units = item._raw?.typical_units || []
  const unitTypes = units.map((u) => (u.unit_type || u.type || '').toLowerCase()).join(' ')

  if (t === 'apartment') {
    return /apartment|residence|flat|studio|tower/i.test(haystack + unitTypes)
  }
  if (t === 'villa') return /villa|mansion/i.test(haystack + unitTypes)
  if (t === 'townhouse') return /townhouse|town house|town-home/i.test(haystack + unitTypes)
  if (t === 'penthouse') return /penthouse/i.test(haystack + unitTypes)
  if (t === 'office') return /office|commercial|retail/i.test(haystack + unitTypes)
  return haystack.includes(t) || unitTypes.includes(t)
}

const filtered = computed(() => {
  let list = [...sourceList.value]
  const q = (route.query.q || '').toString().toLowerCase()
  const min = route.query.min ? Number(route.query.min) : null
  const max = route.query.max ? Number(route.query.max) : null
  const developer = (route.query.developer || '').toString()
  const bedrooms = (route.query.bedrooms || '').toString()
  const type = (route.query.type || '').toString()

  if (q) {
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.developer?.toLowerCase().includes(q)
    )
  }
  if (min) list = list.filter((p) => (p.price || 0) >= min)
  if (max) list = list.filter((p) => (p.price || 0) <= max)
  if (developer) {
    list = list.filter((p) => p.developer?.toLowerCase().includes(developer.toLowerCase()))
  }
  if (bedrooms) {
    list = list.filter((p) => projectMatchesBedroomFilter(p, bedrooms))
  }
  if (type) {
    list = list.filter((p) => matchesPropertyType(p, type))
  }

  return list
})

onMounted(() => loadProjects())
</script>
