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
            <span class="hero-search-mode">Off-plan</span>
            <span class="hero-search-head__hint">New projects across UAE</span>
          </div>

          <div
            class="hero-search-grid hero-search-grid--luxury"
            :class="{ 'hero-search-grid--listing': isListing }"
          >
            <div class="hero-search-field-cell hero-search-field-cell--location">
              <label :class="fieldLabelClass">Location or project</label>
              <div class="hero-search-control hero-search-field-wrap">
                <Search class="hero-search-field__icon" :class="fieldIconClass" :size="18" aria-hidden="true" />
                <input
                  v-model="keyword"
                  type="search"
                  :class="fieldInputClass"
                  :placeholder="SEARCH_PLACEHOLDER"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">Developer</label>
              <div class="hero-search-control">
                <v-select
                  v-model="developer"
                  :class="fieldVselectClass"
                  :options="DEVELOPER_FILTER_OPTIONS"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="FILTER_PLACEHOLDERS.developer"
                  :clearable="true"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">Bedrooms</label>
              <div class="hero-search-control">
                <v-select
                  v-model="bedrooms"
                  :class="fieldVselectClass"
                  :options="BEDROOM_OPTIONS"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="FILTER_PLACEHOLDERS.bedrooms"
                  :clearable="true"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">Property type</label>
              <div class="hero-search-control">
                <v-select
                  v-model="propertyType"
                  :class="fieldVselectClass"
                  :options="typeOptions"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="FILTER_PLACEHOLDERS.propertyType"
                  :clearable="true"
                />
              </div>
            </div>

            <div class="hero-search-field-cell">
              <label :class="fieldLabelClass">Budget</label>
              <div class="hero-search-control">
                <v-select
                  v-model="budgetRange"
                  :class="fieldVselectClass"
                  :options="currentBudgetOptions"
                  :reduce="(item) => item.value"
                  label="label"
                  append-to-body
                  :calculate-position="compactDropdownPosition"
                  :placeholder="FILTER_PLACEHOLDERS.budget"
                  :clearable="true"
                />
              </div>
            </div>

            <div v-if="!isListing" class="hero-search-actions">
              <button type="submit" :class="submitButtonClass">
                <span class="hero-search-submit__long">Search properties</span>
                <span class="hero-search-submit__short">Search</span>
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
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search } from 'lucide-vue-next'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
  SEARCH_PLACEHOLDER,
  BUDGET_RANGE_OPTIONS,
  RENT_BUDGET_RANGE_OPTIONS,
  parseBudgetRange,
  budgetRangeFromQuery,
} from '@/config/uae'
import { DEVELOPER_FILTER_OPTIONS, BEDROOM_OPTIONS } from '@/config/marketing'

/** Shown when nothing is selected — not “Any …” as fake values */
const FILTER_PLACEHOLDERS = {
  developer: 'Developer',
  bedrooms: 'Bedrooms',
  propertyType: 'Property type',
  budget: 'Budget',
}

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

const tabs = [
  { id: 'off-plan', label: 'Buy / Off-Plan', path: '/off-plan' },
  { id: 'rent', label: 'Rent', path: '/rent' },
  { id: 'sell', label: 'Sell', path: '/sell' },
]

const displayTabs = computed(() => {
  if (isHero.value) {
    return [{ id: 'off-plan', label: 'Off-plan', path: '/off-plan' }]
  }
  return tabs
})

const mode = ref(props.initialMode)
const keyword = ref('')
const propertyType = ref(null)
const developer = ref(null)
const bedrooms = ref(null)
const budgetRange = ref(null)

const typeOptions = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'office', label: 'Commercial' },
]

const currentBudgetOptions = computed(() =>
  isHero.value || mode.value !== 'rent' ? BUDGET_RANGE_OPTIONS : RENT_BUDGET_RANGE_OPTIONS
)

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
  if (!isHero.value && q.mode && tabs.some((t) => t.id === q.mode)) {
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
    : tabs.find((t) => t.id === mode.value) || tabs[0]
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
  if (route.path === path && queryMatchesRoute(query)) return

  router.push({ path, query })
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
