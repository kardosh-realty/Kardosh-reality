<template>
  <section
    class="property-detail-status"
    aria-labelledby="project-status-heading"
  >
    <h3 id="project-status-heading">
      {{ t('reelly.projectStatus.heading') }}
    </h3>
    <p class="property-detail-status__lead">
      {{ t('reelly.projectStatus.lead') }}
    </p>

    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
      <div v-for="item in items" :key="item.label">
        <dt class="property-detail-developer__label">{{ item.label }}</dt>
        <dd class="property-detail-status__value capitalize">{{ item.value }}</dd>
      </div>
    </dl>

    <p v-if="unitTypes.length" class="property-detail-status__types">
      <strong>{{ t('reelly.projectStatus.unitTypes') }}</strong>
      {{ unitTypes.join(', ') }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useT } from '@/composables/useT'
import { localizeStatusValue, localizeUnitType } from '@/services/reelly/localizeCatalog'
import { getLocaleId } from '@/composables/useLanguage'

const t = useT()

const props = defineProps({
  saleStatus: { type: String, default: '' },
  constructionStatus: { type: String, default: '' },
  completionDate: { type: String, default: '' },
  unitsCount: { type: Number, default: null },
  availableUnitTypes: { type: Array, default: () => [] },
})

function formatStatus(value, kind) {
  if (!value) return '—'
  return localizeStatusValue(value, getLocaleId(), kind)
}

const items = computed(() => {
  const rows = [
    {
      label: t('reelly.projectStatus.saleStatus'),
      value: formatStatus(props.saleStatus, 'sale'),
    },
    {
      label: t('reelly.projectStatus.construction'),
      value: formatStatus(props.constructionStatus, 'construction'),
    },
    {
      label: t('reelly.projectStatus.completion'),
      value: props.completionDate || '—',
    },
  ]
  if (props.unitsCount != null && props.unitsCount > 0) {
    rows.push({
      label: t('reelly.projectStatus.unitsInCatalogue'),
      value: t('reelly.projectStatus.unitsListed', { count: props.unitsCount }),
    })
  }
  return rows
})

const unitTypes = computed(() =>
  (props.availableUnitTypes || [])
    .map((entry) => {
      const raw = typeof entry === 'string' ? entry : entry?.name || entry?.label
      return raw ? localizeUnitType(raw, getLocaleId()) : null
    })
    .filter(Boolean)
)
</script>
