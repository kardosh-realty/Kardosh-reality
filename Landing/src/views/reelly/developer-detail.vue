<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    v-if="developer"
    :title="developer.name"
    :subtitle="heroSubtitle"
    eyebrow="Developer profile"
    :image="PAGE_HERO_IMAGES.developerDetail"
  />
  <PageHero
    v-else
    title="Developer"
    eyebrow="Loading"
    :image="PAGE_HERO_IMAGES.developerDetail"
  />

  <section
    v-if="developer && !loading"
    class="relative z-10 -mt-8 lg:-mt-10"
  >
    <div class="container-fluid">
      <ul
        class="kardosh-profile-stats kardosh-profile-stats--cols-3 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md px-4 py-6 md:px-8"
      >
        <li v-for="stat in profileStats" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="relative lg:py-16 py-12">
    <div class="container-fluid">
      <DeveloperDetailSkeleton v-if="loading" />
      <p v-else-if="error" class="text-red-600 text-center py-12">{{ error }}</p>

      <template v-else-if="developer">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <aside class="lg:col-span-4">
            <div
              class="developer-profile__logo-wrap rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 text-center lg:sticky lg:top-24"
            >
              <div
                class="mx-auto size-28 md:size-32 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="developer.logo?.url"
                  :src="developer.logo.url"
                  :alt="developer.name"
                  class="max-w-full max-h-full object-contain p-3"
                />
                <span
                  v-else
                  class="text-4xl font-semibold text-primary"
                >{{ developer.name?.charAt(0) }}</span>
              </div>
              <h2 class="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mt-5">
                {{ developer.name }}
              </h2>

              <div class="mt-5 flex flex-col gap-2">
                <a
                  v-if="developer.website"
                  :href="developer.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <Globe class="size-4 shrink-0" aria-hidden="true" />
                  Official website
                  <ExternalLink class="size-3.5 opacity-60" aria-hidden="true" />
                </a>
              </div>

              <ul
                v-if="developer.regions?.length"
                class="mt-6 flex flex-wrap justify-center gap-1.5 list-none p-0"
              >
                <li
                  v-for="(r, i) in developer.regions"
                  :key="i"
                  class="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  {{ r }}
                </li>
              </ul>

              <ul
                v-if="developer.socialLinks?.length"
                class="mt-6 flex flex-wrap justify-center gap-2 list-none p-0"
              >
                <li
                  v-for="(link, i) in developer.socialLinks"
                  :key="i"
                >
                  <a
                    :href="socialUrl(link)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors"
                  >
                    {{ socialLabel(link) }}
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div class="lg:col-span-8 space-y-10">
            <article
              v-if="developer.description"
              class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-6 md:p-8"
            >
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">About</h3>
              <p
                class="developer-profile__desc text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                :class="{ 'line-clamp-6': !descriptionExpanded }"
              >
                {{ developer.description }}
              </p>
              <button
                v-if="developer.description.length > 400"
                type="button"
                class="mt-4 text-sm font-semibold text-primary hover:underline"
                @click="descriptionExpanded = !descriptionExpanded"
              >
                {{ descriptionExpanded ? 'Show less' : 'Read full profile' }}
              </button>
            </article>

            <DeveloperOffices :offices="developer.offices" />
          </div>
        </div>

        <div class="mt-16 lg:mt-20">
          <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h3 class="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
                Off-plan projects in UAE
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {{ displayProjects.length }} project{{ displayProjects.length === 1 ? '' : 's' }}
                from {{ developer.name }}
              </p>
            </div>
            <RouterLink
              to="/off-plan"
              class="text-sm font-semibold text-primary hover:underline shrink-0"
            >
              Browse all UAE off-plan →
            </RouterLink>
          </div>

          <ListingGridSkeleton v-if="!displayProjects.length && projectsLoading" :count="4" />
          <p
            v-else-if="!displayProjects.length"
            class="text-slate-500 dark:text-slate-400 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-8 text-center"
          >
            No active projects listed for this developer right now.
          </p>
          <div
            v-else
            class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-7"
          >
            <PropertyListingCard
              v-for="item in displayProjects"
              :key="item.id"
              :item="item"
              variant="luxury"
            />
          </div>
        </div>
      </template>

      <div
        v-else
        class="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700"
      >
        <p class="text-slate-600 dark:text-slate-300">Developer profile could not be loaded.</p>
        <RouterLink to="/developers" class="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
          ← Back to developers
        </RouterLink>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Globe, ExternalLink } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import DeveloperDetailSkeleton from '@/component/kardosh/skeleton/DeveloperDetailSkeleton.vue'
import DeveloperOffices from '@/component/kardosh/DeveloperOffices.vue'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { fetchDeveloperDetail, useReelly } from '@/composables/useReelly'
import { developerDetailPath } from '@/utils/seoRoutes'

const route = useRoute()
const router = useRouter()
const developer = ref(null)
const loading = ref(true)
const projectsLoading = ref(false)
const error = ref(null)
const descriptionExpanded = ref(false)

const { projects, loadProjects } = useReelly()

provide(
  'breadcrumbLabel',
  computed(() => developer.value?.name || 'Developer')
)

const heroSubtitle = computed(() => {
  if (!developer.value) return ''
  const parts = []
  if (developer.value.projectCount) {
    parts.push(
      `${developer.value.projectCount} active UAE project${developer.value.projectCount === 1 ? '' : 's'}`
    )
  }
  if (developer.value.regions?.length) {
    parts.push(`Active in ${developer.value.regions.slice(0, 3).join(', ')}`)
  }
  return parts.length ? parts.join(' · ') : 'Developer profile and UAE off-plan projects'
})

const profileStats = computed(() => {
  const d = developer.value
  if (!d) return []
  return [
    { value: String(d.projectCount || displayProjects.value.length || 0), label: 'Active projects' },
    { value: String(d.regions?.length || 0), label: 'Regions' },
    { value: String(d.officeCount || 0), label: 'Offices' },
  ]
})

/** Prefer API project list; merge with live catalogue for enriched cards */
const displayProjects = computed(() => {
  const d = developer.value
  if (!d) return []

  const byId = new Map()
  for (const p of d.projects || []) {
    byId.set(p.id, p)
  }
  for (const p of projects.value) {
    if (p.developer !== d.name) continue
    const existing = byId.get(p.id)
    if (existing) {
      byId.set(p.id, { ...existing, ...p, title: p.title || existing.title })
    } else {
      byId.set(p.id, p)
    }
  }
  return [...byId.values()].sort((a, b) => (b.price || 0) - (a.price || 0))
})

function socialUrl(link) {
  if (typeof link === 'string') return link
  return link?.url || link?.link || '#'
}

function socialLabel(link) {
  if (typeof link === 'string') return 'Link'
  return link?.platform || link?.type || link?.name || 'Social'
}

async function loadDeveloper(slugParam) {
  loading.value = true
  error.value = null
  developer.value = null
  try {
    developer.value = await fetchDeveloperDetail(slugParam)
    if (developer.value?.id) {
      const canonical = developerDetailPath(developer.value)
      if (route.path !== canonical) {
        router.replace(canonical)
      }
    }
  } catch (e) {
    error.value = e?.message || 'Developer not found'
    developer.value = null
  } finally {
    loading.value = false
  }

  projectsLoading.value = true
  try {
    await loadProjects()
  } finally {
    projectsLoading.value = false
  }
}

onMounted(() => {
  void loadDeveloper(route.params.idSlug)
})

watch(
  () => route.params.idSlug,
  (idSlug) => {
    if (idSlug) void loadDeveloper(idSlug)
  }
)
</script>
