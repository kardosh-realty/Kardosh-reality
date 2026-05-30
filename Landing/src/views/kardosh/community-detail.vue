<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    v-if="community"
    :title="community.name"
    :subtitle="community.tagline"
    :eyebrow="`${emirateName} · UAE`"
    :image="communityHeroImage(community.slug)"
  />

  <section class="lg:py-16 py-12">
    <div class="container-fluid">
      <p v-if="!community" class="text-center text-slate-400">Community not found.</p>

      <template v-else>
        <article
          class="max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-6 md:p-8 mb-10"
        >
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ community.blurb }}
          </p>
          <ul class="flex flex-wrap gap-2 mt-5 list-none p-0">
            <li
              v-for="(h, i) in community.highlights"
              :key="i"
              class="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              {{ h }}
            </li>
          </ul>
        </article>

        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 class="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
              Off-plan in {{ community.name }}
            </h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {{ matched.length }} project{{ matched.length === 1 ? '' : 's' }} in our UAE catalogue matching this area.
            </p>
          </div>
          <RouterLink
            to="/off-plan"
            class="text-sm font-semibold text-primary hover:underline shrink-0"
          >
            Browse all UAE off-plan →
          </RouterLink>
        </div>

        <ListingGridSkeleton v-if="loading" :count="8" />
        <p v-else-if="!matched.length" class="text-slate-500 dark:text-slate-400 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-8 text-center">
          No active off-plan listings in this area right now.
          <RouterLink to="/off-plan" class="text-primary ms-1 font-medium">Browse the full UAE catalogue</RouterLink>
        </p>

        <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-7">
          <PropertyListingCard
            v-for="item in matched"
            :key="item.id"
            :item="item"
            variant="luxury"
          />
        </div>
      </template>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { computed, ref, onMounted, provide } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import { findCommunity, emirateLabel } from '@/config/communities'
import { useReelly } from '@/composables/useReelly'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { communityHeroImage } from '@/config/dubai-images'
import { loadVisibility, isCommunityHidden } from '@/services/visibility'

const route = useRoute()
const visibilityReady = ref(false)
const community = computed(() => {
  void visibilityReady.value
  const found = findCommunity(route.params.slug)
  if (found && isCommunityHidden(found.slug)) return null
  return found
})
const emirateName = computed(() =>
  community.value ? emirateLabel(community.value.emirate) : 'UAE'
)

provide(
  'breadcrumbLabel',
  computed(() => community.value?.name || 'Community')
)

const { projects, loading, loadProjects } = useReelly()

function locationHaystack(project) {
  const loc = project.location
  const parts = []
  if (typeof loc === 'string') parts.push(loc)
  else if (loc && typeof loc === 'object') {
    parts.push(loc.district, loc.region, loc.city, loc.country)
  }
  return parts.filter(Boolean).join(' ').toLowerCase()
}

const matched = computed(() => {
  if (!community.value) return []
  const terms = [
    ...community.value.searchTerms,
    community.value.name,
    emirateName.value,
  ].map((t) => t.toLowerCase())

  return projects.value.filter((p) => {
    const hay = `${p.name} ${p.title} ${p.developer || ''} ${locationHaystack(p)}`.toLowerCase()
    return terms.some((t) => hay.includes(t))
  })
})

onMounted(async () => {
  await loadVisibility()
  visibilityReady.value = true
  loadProjects()
})
</script>
