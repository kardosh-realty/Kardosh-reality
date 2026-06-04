<template>
  <Navbar nav-class="navbar-white" />
  <PageHero
    :title="hero.title"
    :subtitle="hero.subtitle"
    :image="PAGE_HERO_IMAGES.communities"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="communities-stats listings-search-glass kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none m-0"
      >
        <li v-for="stat in pageStats" :key="stat.label" class="text-center px-2">
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
          {{ gridCopy.heading }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          {{ gridCopy.lead }}
        </p>
      </div>

      <div
        class="communities-filters"
        role="tablist"
        :aria-label="gridCopy.filterAria"
      >
        <button
          v-for="tab in emirateTabs"
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
        {{ gridCopy.empty }}
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
          {{ emiratesCopy.heading }}
        </h2>
        <p class="communities-emirates__lead">
          {{ emiratesCopy.lead }}
        </p>
      </div>

      <div class="emirates-overview-grid">
        <article
          v-for="em in emirateOverviews"
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
                <p class="kardosh-property-card__price-label">{{ t('common.offPlan') }}</p>
                <p class="kardosh-property-card__price-value">{{ em.name }}</p>
              </div>
              <button
                type="button"
                class="kardosh-property-card__cta"
                :aria-label="`View ${em.name} communities`"
                @click="activeEmirate = em.id; scrollToGrid()"
              >
                <span class="kardosh-property-card__cta-text">{{ t('common.view') }}</span>
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
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{{ whyCopy.eyebrow }}</p>
          <h2
            id="why-communities-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            {{ whyCopy.heading }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            {{ whyCopy.lead }}
          </p>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <div
            v-for="item in whyPoints"
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
          :src="decorativeHeroImage.src"
          :srcset="decorativeHeroImage.srcset || undefined"
          :sizes="decorativeHeroImage.sizes || undefined"
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
          <h2 class="text-2xl font-semibold md:text-3xl">{{ communitiesCta.heading }}</h2>
          <p class="mt-3 max-w-2xl leading-relaxed text-white/85">
            {{ communitiesCtaBody }}
          </p>
          <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
            <RouterLink
              to="/off-plan"
              class="communities-cta__btn-primary btn inline-flex items-center justify-center rounded-lg bg-white px-8 font-semibold hover:bg-slate-100"
            >
              {{ communitiesCta.viewAllOffPlan }}
            </RouterLink>
            <RouterLink
              to="/contact"
              class="btn inline-flex items-center justify-center rounded-lg border border-white/40 px-8 text-white hover:bg-white/10"
            >
              {{ communitiesCta.contactAdvisory }}
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
import { PAGE_HERO_IMAGES, pageHeroImage } from '@/config/dubai-images'
import { loadVisibility, isCommunityHidden } from '@/services/visibility'
import { usePageHero } from '@/composables/usePageHero'
import { useMessages } from '@/composables/useMessages'
import { useT } from '@/composables/useT'

const t = useT()
const messages = useMessages()
const hero = usePageHero('communities')
const route = useRoute()
const decorativeHeroImage = computed(() => pageHeroImage(PAGE_HERO_IMAGES.communities))
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

const communitiesMsg = computed(() => messages.value.communities || {})

const pageStats = computed(() => {
  const stats =
    communitiesMsg.value.pageStats ||
    communitiesMsg.value.page?.stats ||
    []
  return stats.map((stat) => ({
    ...stat,
    value: String(stat.value).replace('{count}', String(UAE_COMMUNITIES.length)),
  }))
})

const gridCopy = computed(() => {
  const g = communitiesMsg.value.grid || communitiesMsg.value.page?.grid || {}
  return {
    heading: g.heading || '',
    lead: g.subheading || g.lead || '',
    filterAria: g.filterAria || '',
    empty: g.empty || '',
  }
})

const EMIRATE_TAB_ID_MAP = {
  abuDhabi: 'abu-dhabi',
}

const emirateTabs = computed(() => {
  const filters = communitiesMsg.value.emiratesFilter
  if (Array.isArray(filters) && filters.length) return filters
  const obj = communitiesMsg.value.emirateFilters
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).map(([id, label]) => ({
      id: EMIRATE_TAB_ID_MAP[id] || id,
      label,
    }))
  }
  return COMMUNITY_EMIRATES
})

const emiratesCopy = computed(() => {
  const e = communitiesMsg.value.emirates || communitiesMsg.value.page?.emiratesSection || {}
  return {
    heading: e.heading || '',
    lead: e.subheading || e.lead || '',
  }
})

const emirateOverviews = computed(
  () => communitiesMsg.value.emirateOverviews || EMIRATE_OVERVIEWS
)

const WHY_ICONS = [MapPin, TrendingUp, Building2, Shield]

const whyCopy = computed(() => {
  const w = communitiesMsg.value.whyExplore || communitiesMsg.value.page?.whySection || {}
  return {
    eyebrow: w.eyebrow || '',
    heading: w.heading || '',
    lead: w.subheading || w.lead || '',
  }
})

const whyPoints = computed(() => {
  const section = communitiesMsg.value.page?.whySection
  const list =
    communitiesMsg.value.whyExplore?.valuePoints ||
    section?.points ||
    []
  return list.map((item, i) => ({ ...item, icon: WHY_ICONS[i] || MapPin }))
})

const communitiesCta = computed(() => {
  const c = communitiesMsg.value.cta || communitiesMsg.value.page?.cta || {}
  return {
    heading: c.heading || '',
    viewAllOffPlan: c.viewAllOffPlan || t('common.viewAllOffPlan'),
    contactAdvisory: c.contactAdvisory || t('contact.page.cta.contactUs'),
  }
})

const communitiesCtaBody = computed(() => communitiesMsg.value.cta?.body || communitiesMsg.value.cta?.lead || '')

const filteredCommunities = computed(() => {
  void visibilityReady.value
  return communitiesByEmirate(activeEmirate.value).filter((c) => !isCommunityHidden(c.slug))
})

function scrollToGrid() {
  document.getElementById('communities-grid-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
