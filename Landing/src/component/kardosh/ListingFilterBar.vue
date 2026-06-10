<template>
  <div
    v-if="options.length"
    class="listing-filter-bar flex flex-wrap items-center gap-2 mb-8"
    role="group"
    :aria-label="t('listings.filters.label')"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="listing-filter-bar__chip"
      :class="{ 'listing-filter-bar__chip--active': active === opt.value }"
      @click="setFilter(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useT } from '@/composables/useT'

const props = defineProps({
  mode: { type: String, default: 'off-plan' },
})

const route = useRoute()
const router = useRouter()
const t = useT()

const options = computed(() => {
  if (props.mode !== 'off-plan') return []
  return [
    { value: '', label: t('listings.filters.all') },
    { value: 'featured', label: t('listings.filters.featured') },
    { value: 'new', label: t('listings.filters.new') },
    { value: 'old', label: t('listings.filters.old') },
    { value: 'no-availability', label: t('listings.filters.noAvailability') },
  ]
})

const active = computed(() => String(route.query.status || ''))

function setFilter(value) {
  const query = { ...route.query }
  if (value) query.status = value
  else delete query.status
  router.replace({ query })
}
</script>

<style scoped>
.listing-filter-bar__chip {
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--kardosh-border, #e2e8f0);
  background: #fff;
  color: #475569;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.listing-filter-bar__chip:hover {
  border-color: var(--color-primary, #0a0a0a);
  color: var(--color-primary, #0a0a0a);
}

.listing-filter-bar__chip--active {
  background: var(--color-primary, #0a0a0a);
  border-color: var(--color-primary, #0a0a0a);
  color: #fff;
}

.dark .listing-filter-bar__chip {
  background: rgb(15 23 42);
  border-color: rgb(51 65 85);
  color: rgb(203 213 225);
}

.dark .listing-filter-bar__chip--active {
  background: var(--kardosh-paper, #fafafa);
  border-color: var(--kardosh-paper, #fafafa);
  color: var(--kardosh-ink, #0a0a0a);
}
</style>
