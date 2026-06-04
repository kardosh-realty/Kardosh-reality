<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    :title="hero.title"
    :subtitle="hero.subtitle"
    :image="PAGE_HERO_IMAGES.developers"
  />

  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="developers-stats listings-search-glass kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none m-0"
      >
        <li v-for="stat in pageStats" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="lg:py-20 py-14" aria-labelledby="developers-grid-heading">
    <div class="container-fluid">
      <div class="developers-directory">
        <h2
          id="developers-grid-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight"
        >
          {{ directoryCopy.heading }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          {{ directoryCopy.lead }}
        </p>
      </div>

      <div class="developers-search-panel listings-search-glass">
        <label class="developers-search">
          <span class="sr-only">{{ directoryCopy.searchAria }}</span>
          <Search
            class="developers-search__icon absolute start-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none"
            aria-hidden="true"
          />
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="directoryCopy.searchPlaceholder"
            class="developers-search__input"
            autocomplete="off"
          />
        </label>
      </div>

      <p
        v-if="error"
        class="text-center text-amber-700 dark:text-amber-200 py-8 mt-10 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40"
        role="alert"
      >
        {{ error }} — {{ directoryApiError }}
      </p>

      <DeveloperGridSkeleton
        v-else-if="loading"
        :count="8"
        grid-class="developers-grid mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
      />
      <p
        v-else-if="!filteredDevelopers.length"
        class="text-center text-slate-400 py-12 mt-10 rounded-xl border border-dashed border-slate-200 dark:border-slate-700"
      >
        {{ searchQuery ? directoryCopy.noMatch : directoryCopy.empty }}
      </p>

      <div
        v-else
        class="developers-grid mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
      >
        <DeveloperCard
          v-for="dev in filteredDevelopers"
          :key="dev.id"
          :developer="dev"
        />
      </div>
    </div>
  </section>

  <section
    v-if="featuredDevelopers.length && !loading"
    class="developers-leaderboard lg:py-20 py-14"
    aria-labelledby="featured-developers-heading"
  >
    <div class="container-fluid">
      <div class="developers-leaderboard__intro">
        <h2
          id="featured-developers-heading"
          class="developers-leaderboard__title"
        >
          {{ leaderboardCopy.heading }}
        </h2>
        <p class="developers-leaderboard__lead">
          {{ leaderboardCopy.lead }}
        </p>
      </div>

      <ol class="developers-leaderboard__grid list-none p-0 m-0">
        <li
          v-for="(dev, index) in featuredDevelopers"
          :key="dev.id || dev.name"
        >
          <RouterLink
            :to="developerProfileRoute(dev)"
            class="developers-leaderboard-card listings-search-glass group"
            :aria-label="`Rank ${index + 1}: ${dev.name}, ${dev.projectCount} projects`"
          >
            <span
              class="developers-leaderboard-card__rank"
              :class="index === 0 && 'developers-leaderboard-card__rank--first'"
            >
              {{ index + 1 }}
            </span>
            <div class="developers-leaderboard-card__logo">
              <img
                v-if="dev.logo?.url"
                :src="dev.logo.url"
                :alt="dev.name"
                class="max-h-full max-w-full object-contain p-2"
                loading="lazy"
              />
              <span v-else class="developers-leaderboard-card__initial">
                {{ dev.name?.charAt(0) }}
              </span>
            </div>
            <h3 class="developers-leaderboard-card__name">{{ dev.name }}</h3>
            <p class="developers-leaderboard-card__meta">
              {{ activeProjectsLabel(dev.projectCount) }}
            </p>
            <span class="developers-leaderboard-card__cta">
              {{ leaderboardCopy.viewProfile }}
              <ArrowRight class="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>

  <section class="lg:py-20 py-14" aria-labelledby="why-developers-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{{ whyCopy.eyebrow }}</p>
          <h2
            id="why-developers-heading"
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
            v-for="item in valuePoints"
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

  <!-- CTA — blur vignette over UAE developers hero image -->
  <section class="developers-cta pb-20 lg:pb-24">
    <div class="container-fluid">
      <BlurVignette
        root-class="developers-cta__vignette w-full min-h-[20rem] md:min-h-[22rem] aspect-auto"
        radius="1.5rem"
        inset="10px"
        transition-length="100px"
        blur="15px"
      >
        <img
          :src="decorativeHeroImage.src"
          :srcset="decorativeHeroImage.srcset || undefined"
          :sizes="decorativeHeroImage.sizes || undefined"
          alt="UAE property developers"
          class="absolute inset-0 z-0 h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/25"
          aria-hidden="true"
        />
        <BlurVignetteArticle />
        <div class="developers-cta__content relative z-10 flex min-h-[20rem] md:min-h-[22rem] flex-col items-center justify-center px-8 py-10 text-center text-white md:px-12 md:py-14">
          <h2 class="text-2xl font-semibold md:text-3xl">{{ developersCta.heading }}</h2>
          <p class="mt-3 max-w-2xl leading-relaxed text-white/85">
            {{ developersCtaBody }}
          </p>
          <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
            <RouterLink
              to="/off-plan"
              class="developers-cta__btn-primary btn inline-flex items-center justify-center rounded-lg bg-white px-8 font-semibold hover:bg-slate-100"
            >
              {{ developersCta.viewCatalogue }}
            </RouterLink>
            <RouterLink
              to="/contact"
              class="btn inline-flex items-center justify-center rounded-lg border border-white/40 px-8 text-white hover:bg-white/10"
            >
              {{ developersCta.contactAdvisory }}
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
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Building2, Handshake, MapPin, Shield, Search } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import DeveloperCard from '@/component/kardosh/DeveloperCard.vue'
import BlurVignette from '@/component/ui/BlurVignette.vue'
import BlurVignetteArticle from '@/component/ui/BlurVignetteArticle.vue'
import DeveloperGridSkeleton from '@/component/kardosh/skeleton/DeveloperGridSkeleton.vue'
import { PAGE_HERO_IMAGES, pageHeroImage } from '@/config/dubai-images'
import { useReelly } from '@/composables/useReelly'
import { developerProfileRoute } from '@/utils/mapDeveloper'
import { usePageHero } from '@/composables/usePageHero'
import { useMessages } from '@/composables/useMessages'
import { useT } from '@/composables/useT'

const t = useT()
const messages = useMessages()
const hero = usePageHero('developers')
const { uaeDevelopers, loading, error, loadProjects, loadDeveloperLogos } = useReelly()
const decorativeHeroImage = computed(() => pageHeroImage(PAGE_HERO_IMAGES.developers))
const searchQuery = ref('')

const filteredDevelopers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return uaeDevelopers.value
  return uaeDevelopers.value.filter((d) => d.name?.toLowerCase().includes(q))
})

const featuredDevelopers = computed(() => uaeDevelopers.value.slice(0, 4))

const devMsg = computed(() => messages.value.developers || {})

const directoryCopy = computed(() => {
  const d = devMsg.value.grid || devMsg.value.page?.directory || {}
  return {
    heading: d.heading || '',
    lead: d.subheading || d.lead || '',
    searchPlaceholder: d.searchPlaceholder || '',
    searchAria: d.searchAria || '',
    noMatch: d.noMatch || '',
    empty: d.empty || '',
  }
})

const directoryApiError = computed(() => t('developers.page.directory.apiError'))

const statLabels = computed(() => devMsg.value.pageStats || devMsg.value.page?.stats || {})

const pageStats = computed(() => [
  {
    value: String(uaeDevelopers.value.length || '—'),
    label: statLabels.value.developersInCatalogue || statLabels.value.developers || '',
  },
  {
    value: String(
      uaeDevelopers.value.reduce((n, d) => n + (d.projectCount || 0), 0) || '—'
    ),
    label: statLabels.value.activeProjects || statLabels.value.projects || '',
  },
  { value: '7', label: statLabels.value.emiratesCovered || statLabels.value.emirates || '' },
  { value: 'AED', label: statLabels.value.liveStartingPrices || statLabels.value.pricing || '' },
])

const leaderboardCopy = computed(() => {
  const l = devMsg.value.featured || devMsg.value.page?.leaderboard || {}
  return {
    heading: l.heading || '',
    lead: l.subheading || l.lead || '',
    viewProfile: l.viewProfile || t('common.view'),
  }
})

function activeProjectsLabel(count) {
  const n = Number(count) || 0
  const pageLb = devMsg.value.page?.leaderboard
  if (pageLb?.activeProjects) {
    return n === 1
      ? t('developers.page.leaderboard.activeProjects', { count: n })
      : t('developers.page.leaderboard.activeProjectsPlural', { count: n })
  }
  const key = n === 1 ? 'activeProject' : 'activeProjects'
  const fb = devMsg.value.featured?.[key]
  if (fb) return fb.replace('{count}', String(n))
  return `${n} active project${n === 1 ? '' : 's'}`
}

const developersCta = computed(() => {
  const c = devMsg.value.cta || devMsg.value.page?.cta || {}
  return {
    heading: c.heading || '',
    viewCatalogue: c.viewCatalogue || c.viewOffPlan || t('common.viewAllOffPlan'),
    contactAdvisory: c.contactAdvisory || '',
  }
})

const developersCtaBody = computed(() => devMsg.value.cta?.body || devMsg.value.cta?.lead || '')

const DEV_WHY_ICONS = [Building2, Handshake, MapPin, Shield]

const whyCopy = computed(() => {
  const w = devMsg.value.whyProfiles || devMsg.value.page?.whySection || {}
  return {
    eyebrow: w.eyebrow || '',
    heading: w.heading || '',
    lead: w.subheading || w.lead || '',
  }
})

const valuePoints = computed(() => {
  const list = devMsg.value.whyProfiles?.valuePoints || devMsg.value.page?.whySection?.points || []
  return list.map((item, i) => ({ ...item, icon: DEV_WHY_ICONS[i] || Building2 }))
})

onMounted(async () => {
  await loadProjects()
  void loadDeveloperLogos()
})
</script>
