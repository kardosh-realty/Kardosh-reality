<template>
  <div
    :class="[
      isHero ? 'hero-search-bar w-full flex flex-col items-center' : 'property-search-bar property-search-bar--listing w-full',
    ]"
  >
    <div :class="isHero ? 'hero-search-glass w-full' : ''">
    <ul
      v-if="showTabs && displayTabs.length && !isCompact"
      class="property-search-tabs inline-flex flex-wrap justify-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 w-full sm:w-auto list-none"
      role="tablist"
    >
      <li v-for="tab in displayTabs" :key="tab.id" role="presentation" class="min-w-0 flex-1 sm:flex-none">
        <button
          type="button"
          role="tab"
          :aria-selected="mode === tab.id"
          :class="[
            'w-full sm:w-auto px-4 sm:px-5 py-2 text-sm font-medium rounded-md transition',
            mode === tab.id
              ? 'text-white bg-primary'
              : 'text-slate-600 dark:text-slate-300 hover:text-primary',
          ]"
          @click="mode = tab.id"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <div :class="isHero ? 'hero-search-panel w-full' : ''">
      <form
        @submit.prevent="submit"
        :class="['registration-form text-start', isHero ? 'hero-search-form' : 'text-dark']"
      >
        <div
          :class="[
            'hero-search-inner',
            isHero ? 'hero-search-inner--luxury' : 'property-search-inner--listing',
          ]"
        >
          <div v-if="isHero" class="hero-search-head">
            <span class="hero-search-mode">{{ t('search.hero.mode') }}</span>
            <span class="hero-search-head__hint">{{ t('search.hero.hint') }}</span>
          </div>

          <div
            class="hero-search-grid hero-search-grid--luxury"
            :class="{ 'hero-search-grid--listing': isListing }"
          >
            <div class="hero-search-field-cell hero-search-field-cell--location">
              <label :class="fieldLabelClass">{{ t('search.labels.location') }}</label>
              <div class="hero-search-control hero-search-field-wrap">
                <Search class="hero-search-field__icon" :class="fieldIconClass" :size="18" aria-hidden="true" />
                <input
                  v-model="keyword"
                  type="search"
                  :class="fieldInputClass"
                  :placeholder="searchPlaceholder"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">{{ t('search.labels.developer') }}</label>
              <div class="hero-search-control">
                <v-select
                  v-model="developer"
                  :class="fieldVselectClass"
                  :options="developerOptions"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="filterPlaceholders.developer"
                  :clearable="true"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">{{ t('search.labels.bedrooms') }}</label>
              <div class="hero-search-control">
                <v-select
                  v-model="bedrooms"
                  :class="fieldVselectClass"
                  :options="bedroomOptions"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="filterPlaceholders.bedrooms"
                  :clearable="true"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">{{ t('search.labels.propertyType') }}</label>
              <div class="hero-search-control">
                <v-select
                  v-model="propertyType"
                  :class="fieldVselectClass"
                  :options="typeOptions"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="filterPlaceholders.propertyType"
                  :clearable="true"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">{{ t('search.labels.budget') }}</label>
              <div class="hero-search-control">
                <v-select
                  v-model="budgetRange"
                  :class="fieldVselectClass"
                  :options="currentBudgetOptions"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="filterPlaceholders.budget"
                  :clearable="true"
                />
              </div>
            </div>

            <div v-if="!isListing" class="hero-search-actions">
              <button type="submit" :class="submitButtonClass">
                <span class="hero-search-submit__long">{{ t('common.searchProperties') }}</span>
                <span class="hero-search-submit__short">{{ t('common.searchShort') }}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search } from 'lucide-vue-next'
import vSelect from 'vue-select'
import {
  BUDGET_RANGE_OPTIONS,
  RENT_BUDGET_RANGE_OPTIONS,
  parseBudgetRange,
  budgetRangeFromQuery,
} from '@/config/uae'
import { DEVELOPER_FILTER_OPTIONS, BEDROOM_OPTIONS as BEDROOM_OPTIONS_CONFIG } from '@/config/marketing'
import { stripLocaleFromPath } from '@/config/i18n'
import { useLocalizedPath } from '@/composables/useLocalizedPath'
import { useT } from '@/composables/useT'
import { useMessages } from '@/composables/useMessages'

const t = useT()
const messages = useMessages()

const searchPlaceholder = computed(() => t('search.placeholders.search'))

const filterPlaceholders = computed(() => ({
  developer: t('search.placeholders.developer'),
  bedrooms: t('search.placeholders.bedrooms'),
  propertyType: t('search.placeholders.propertyType'),
  budget: t('search.placeholders.budget'),
}))

const props = defineProps({
  showTabs: { type: Boolean, default: true },
  initialMode: { type: String, default: 'off-plan' },
  /** hero = home glass dock; listing = off-plan / rent overlap card */
  variant: { type: String, default: 'listing' },
})

const isHero = computed(() => props.variant === 'hero')
const isListing = computed(() => props.variant === 'listing' || props.variant === 'default')
const isCompact = computed(() => isHero.value || isListing.value)

function compactDropdownPosition(dropdownList, _component, { width, top, left }) {
  dropdownList.classList.add(isHero.value ? 'hero-glass-dropdown' : 'listing-search-dropdown')
  dropdownList.style.position = 'absolute'
  dropdownList.style.zIndex = '10060'
  dropdownList.style.width = typeof width === 'number' ? `${width}px` : String(width)
  dropdownList.style.top = typeof top === 'number' ? `${top}px` : String(top)
  dropdownList.style.left = typeof left === 'number' ? `${left}px` : String(left)
  dropdownList.style.maxHeight = 'min(16rem, 50vh)'
  dropdownList.style.overflowY = 'auto'
}

const fieldLabelClass = computed(() =>
  isHero.value ? 'hero-search-label' : 'hero-search-label hero-search-label--listing'
)
const fieldIconClass = computed(() =>
  isHero.value ? 'text-white/45' : 'text-slate-400'
)
const fieldInputClass = computed(() =>
  isHero.value
    ? 'hero-search-field hero-search-field--input w-full h-full border-0'
    : 'hero-search-field hero-search-field--input hero-search-field--listing w-full h-full border-0'
)
const fieldVselectClass = computed(() =>
  isHero.value
    ? 'custom-vselect hero-search-vselect w-full h-full'
    : 'custom-vselect hero-search-vselect hero-search-vselect--listing w-full h-full'
)
const submitButtonClass = computed(() =>
  isHero.value ? 'hero-search-submit' : 'hero-search-submit hero-search-submit--listing'
)

const router = useRouter()
const route = useRoute()
const { localizedPath } = useLocalizedPath()

const tabs = computed(() => [
  { id: 'off-plan', label: t('search.tabs.buyOffPlan'), path: '/off-plan' },
  { id: 'rent', label: t('search.tabs.rent'), path: '/rent' },
  { id: 'sell', label: t('search.tabs.sell'), path: '/sell' },
])

const displayTabs = computed(() => {
  if (isHero.value) {
    return [{ id: 'off-plan', label: t('search.tabs.offPlan'), path: '/off-plan' }]
  }
  return tabs.value
})

const mode = ref(props.initialMode)
const keyword = ref('')
const propertyType = ref(null)
const developer = ref(null)
const bedrooms = ref(null)
const budgetRange = ref(null)

const typeOptions = computed(() => {
  const types = messages.value.search?.propertyTypes
  if (Array.isArray(types)) return types
  if (types && typeof types === 'object') {
    return Object.entries(types).map(([value, label]) => ({ value, label }))
  }
  return [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'office', label: 'Commercial' },
  ]
})

const bedroomOptions = computed(() => {
  const opts = messages.value.search?.bedroomOptions
  return Array.isArray(opts) && opts.length ? opts : BEDROOM_OPTIONS_CONFIG
})

const developerOptions = computed(() => {
  const opts = messages.value.search?.developerOptions
  return Array.isArray(opts) && opts.length ? opts : DEVELOPER_FILTER_OPTIONS
})

const currentBudgetOptions = computed(() => {
  const ranges = messages.value.search?.budgetRanges
  if (ranges) {
    return mode.value === 'rent' && !isHero.value
      ? ranges.rent || RENT_BUDGET_RANGE_OPTIONS
      : ranges.offPlan || BUDGET_RANGE_OPTIONS
  }
  return isHero.value || mode.value !== 'rent' ? BUDGET_RANGE_OPTIONS : RENT_BUDGET_RANGE_OPTIONS
})

let syncingFromRoute = false
let keywordDebounceId = null

function readQuery() {
  syncingFromRoute = true
  const q = route.query
  keyword.value = (q.q || '').toString()
  propertyType.value = q.type || null
  developer.value = q.developer || null
  bedrooms.value = q.bedrooms || null
  const fromQuery = budgetRangeFromQuery(q.min, q.max)
  budgetRange.value = fromQuery || null
  if (!isHero.value && q.mode && tabs.value.some((tab) => tab.id === q.mode)) {
    mode.value = q.mode.toString()
  }
  nextTick(() => {
    syncingFromRoute = false
  })
}

watch(() => route.query, readQuery, { immediate: true })
watch(() => props.initialMode, (v) => { mode.value = isHero.value ? 'off-plan' : v })
watch(isHero, (hero) => {
  if (hero) mode.value = 'off-plan'
}, { immediate: true })

function buildSearchTarget() {
  const tab = isHero.value
    ? displayTabs.value[0]
    : tabs.value.find((tab) => tab.id === mode.value) || tabs.value[0]
  const query = {}
  if (keyword.value?.trim()) query.q = keyword.value.trim()
  if (propertyType.value) query.type = propertyType.value
  if (developer.value) query.developer = developer.value
  if (bedrooms.value) query.bedrooms = bedrooms.value

  const { min, max } = parseBudgetRange(budgetRange.value)
  if (min) query.min = String(min)
  if (max) query.max = String(max)
  query.mode = tab.id

  const path = tab.id === 'sell' ? '/sell' : tab.path
  return { path, query }
}

function queryMatchesRoute(query) {
  const keys = new Set([...Object.keys(query), ...Object.keys(route.query)])
  for (const key of keys) {
    const next = query[key] == null ? '' : String(query[key])
    const cur = route.query[key] == null ? '' : String(route.query[key])
    if (next !== cur) return false
  }
  return true
}

function submit() {
  if (syncingFromRoute) return

  const { path, query } = buildSearchTarget()
  if (stripLocaleFromPath(route.path) === path && queryMatchesRoute(query)) return

  router.push({ path: localizedPath(path), query })
}

function scheduleAutoSearch() {
  if (!isListing.value || syncingFromRoute) return
  if (keywordDebounceId) clearTimeout(keywordDebounceId)
  keywordDebounceId = setTimeout(() => {
    keywordDebounceId = null
    submit()
  }, 350)
}

watch(keyword, () => {
  if (isListing.value) scheduleAutoSearch()
})

watch([propertyType, developer, bedrooms, budgetRange], () => {
  if (isListing.value) submit()
})

onMounted(() => {
  void import('vue-select/dist/vue-select.css')
})
</script>

<style scoped>
:deep(.hero-search-control .hero-search-vselect) {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.hero-search-control .hero-search-vselect .vs__dropdown-toggle) {
  width: 100%;
}

:deep(.hero-search-control .hero-search-vselect .vs__selected) {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

</style>
