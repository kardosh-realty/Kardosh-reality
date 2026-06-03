<template>
  <Navbar nav-class="navbar-white" />
  <PageHero
    title="Explore Dubai Communities"
    subtitle="Discover off-plan projects across Dubai's most sought-after communities."
    :image="PAGE_HERO_IMAGES.communities"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="communities-stats listings-search-glass kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none m-0"
      >
        <li v-for="stat in PAGE_STATS" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold tabular-nums">{{ stat.value }}</p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Community grid -->
  <section class="lg:py-20 py-14" aria-labelledby="communities-grid-heading">
    <div class="container-fluid">
      <div class="communities-browse">
        <h2
          id="communities-grid-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight"
        >
          Find your next UAE address
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Filter by emirate and open a community guide to see matching off plan projects — from Business Bay and
          Downtown to Dubai Hills, Palm Jumeirah, JVC, and Dubai Creek Harbour.
        </p>
      </div>

      <div
        class="communities-filters"
        role="tablist"
        aria-label="Filter by emirate"
      >
        <button
          v-for="tab in COMMUNITY_EMIRATES"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeEmirate === tab.id"
          :class="[
            'communities-filter-pill',
            activeEmirate === tab.id && 'communities-filter-pill--active',
          ]"
          @click="activeEmirate = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="communities-grid mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <CommunityCard
          v-for="c in filteredCommunities"
          :key="c.slug"
          :community="c"
        />
      </div>

      <p
        v-if="!filteredCommunities.length"
        class="text-center text-slate-400 py-12"
      >
        No communities in this emirate yet.
      </p>
    </div>
  </section>

  <!-- By emirate -->
  <section class="communities-emirates lg:py-24 py-16" aria-labelledby="emirates-heading">
    <div class="container-fluid">
      <div class="communities-emirates__intro">
        <h2
          id="emirates-heading"
          class="communities-emirates__title"
        >
          One country, multiple investment corridors
        </h2>
        <p class="communities-emirates__lead">
          Kardosh Realty covers the UAE — not Dubai alone. Each emirate offers distinct price points, lifestyles, and developer pipelines.
        </p>
      </div>

      <div class="emirates-overview-grid">
        <article
          v-for="em in EMIRATE_OVERVIEWS"
          :key="em.id"
          class="emirate-overview-card emirate-overview-card--luxury listings-search-glass group flex flex-col"
        >
          <div class="emirate-overview-card__content relative z-[1] flex flex-1 flex-col min-w-0">
            <span class="emirate-overview-card__badge">UAE · {{ em.name }}</span>
            <h3 class="emirate-overview-card__name">{{ em.name }}</h3>
            <p class="emirate-overview-card__tagline">{{ em.tagline }}</p>
            <ul class="emirate-overview-card__highlights list-none p-0 m-0">
              <li
                v-for="(h, i) in em.highlights"
                :key="i"
                class="emirate-overview-card__chip"
              >
                {{ h }}
              </li>
            </ul>
            <div class="emirate-overview-card__footer">
              <div>
                <p class="kardosh-property-card__price-label">Off-plan</p>
                <p class="kardosh-property-card__price-value">{{ em.name }}</p>
              </div>
              <button
                type="button"
                class="kardosh-property-card__cta"
                :aria-label="`View ${em.name} communities`"
                @click="activeEmirate = em.id; scrollToGrid()"
              >
                <span class="kardosh-property-card__cta-text">View</span>
                <span class="kardosh-property-card__cta-icon" aria-hidden="true">
                  <ArrowRight class="size-5" />
                </span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Why explore -->
  <section class="lg:py-20 py-14" aria-labelledby="why-communities-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Why area-first search</p>
          <h2
            id="why-communities-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Invest with local context, not just project names
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Community pages group live off-plan stock by lifestyle, commute, and emirate — so you compare like with like before you enquire.
          </p>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <div
            v-for="item in VALUE_POINTS"
            :key="item.title"
            class="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 bg-white dark:bg-slate-900"
          >
            <component :is="item.icon" class="size-6 text-primary mb-3" aria-hidden="true" />
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA — blur vignette (ui-layouts) over UAE hero image -->
  <section class="communities-cta pb-20 lg:pb-24">
    <div class="container-fluid">
      <BlurVignette
        root-class="communities-cta__vignette w-full min-h-[20rem] md:min-h-[22rem] aspect-auto"
        radius="1.5rem"
        inset="10px"
        transition-length="100px"
        blur="15px"
      >
        <img
          :src="PAGE_HERO_IMAGES.communities"
          alt="UAE skyline and communities"
          class="absolute inset-0 z-0 h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/25"
          aria-hidden="true"
        />
        <BlurVignetteArticle />
        <div class="communities-cta__content relative z-10 flex min-h-[20rem] md:min-h-[22rem] flex-col items-center justify-center px-8 py-10 text-center text-white md:px-12 md:py-14">
          <h2 class="text-2xl font-semibold md:text-3xl">Ready to browse UAE off-plan?</h2>
          <p class="mt-3 max-w-2xl leading-relaxed text-white/85">
            Search the full catalogue or speak with our Dubai team about a specific emirate or community.
          </p>
          <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
            <RouterLink
              to="/off-plan"
              class="communities-cta__btn-primary btn inline-flex items-center justify-center rounded-lg bg-white px-8 font-semibold hover:bg-slate-100"
            >
              View all off-plan
            </RouterLink>
            <RouterLink
              to="/contact"
              class="btn inline-flex items-center justify-center rounded-lg border border-white/40 px-8 text-white hover:bg-white/10"
            >
              Contact advisory
            </RouterLink>
          </div>
        </div>
      </BlurVignette>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowRight, Building2, MapPin, TrendingUp, Shield } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import CommunityCard from '@/component/kardosh/CommunityCard.vue'
import BlurVignette from '@/component/ui/BlurVignette.vue'
import BlurVignetteArticle from '@/component/ui/BlurVignetteArticle.vue'
import {
  UAE_COMMUNITIES,
  COMMUNITY_EMIRATES,
  EMIRATE_OVERVIEWS,
  communitiesByEmirate,
} from '@/config/communities'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { loadVisibility, isCommunityHidden } from '@/services/visibility'

const route = useRoute()
const activeEmirate = ref('all')
const visibilityReady = ref(false)

const VALID_EMIRATES = new Set(COMMUNITY_EMIRATES.map((e) => e.id))

onMounted(async () => {
  const q = route.query.emirate?.toString()
  if (q && VALID_EMIRATES.has(q)) activeEmirate.value = q
  await loadVisibility()
  visibilityReady.value = true
})

watch(
  () => route.query.emirate,
  (q) => {
    if (q && VALID_EMIRATES.has(String(q))) activeEmirate.value = String(q)
  }
)

const PAGE_STATS = [
  { value: '7', label: 'Emirates covered' },
  { value: String(UAE_COMMUNITIES.length), label: 'Featured communities' },
  { value: '1,500+', label: 'Off-plan projects (UAE)' },
  { value: 'AED', label: 'Transparent pricing' },
]

const VALUE_POINTS = [
  {
    icon: MapPin,
    title: 'Emirate-level clarity',
    text: 'See which projects align with Dubai, Abu Dhabi, Sharjah, Ajman, or RAK before you dive into brochures.',
  },
  {
    icon: TrendingUp,
    title: 'Live catalogue',
    text: 'Community pages pull matching stock from our live catalogue so listings stay current as developers launch.',
  },
  {
    icon: Building2,
    title: 'Developer diversity',
    text: 'From Emaar and Aldar to regional specialists — compare pipelines across the UAE in one place.',
  },
  {
    icon: Shield,
    title: 'Licensed advisory',
    text: 'Kardosh Realty guides international buyers through AED pricing, payment plans, and reservation steps.',
  },
]

const filteredCommunities = computed(() => {
  void visibilityReady.value
  return communitiesByEmirate(activeEmirate.value).filter((c) => !isCommunityHidden(c.slug))
})

function scrollToGrid() {
  document.getElementById('communities-grid-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
