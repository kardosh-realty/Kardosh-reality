<template>
  <section
    class="property-detail-status"
    aria-labelledby="project-status-heading"
  >
    <h3 id="project-status-heading">
      Project availability
    </h3>
    <p class="property-detail-status__lead">
      Live catalogue data from Reelly. Individual sale or transaction history is not exposed in the API.
    </p>

    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
      <div v-for="item in items" :key="item.label">
        <dt class="property-detail-developer__label">{{ item.label }}</dt>
        <dd class="property-detail-status__value capitalize">{{ item.value }}</dd>
      </div>
    </dl>

    <p v-if="unitTypes.length" class="property-detail-status__types">
      <strong>Unit types:</strong>
      {{ unitTypes.join(', ') }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  saleStatus: { type: String, default: '' },
  constructionStatus: { type: String, default: '' },
  completionDate: { type: String, default: '' },
  unitsCount: { type: Number, default: null },
  availableUnitTypes: { type: Array, default: () => [] },
})

function formatStatus(value) {
  if (!value) return '—'
  return String(value).replace(/_/g, ' ')
}

const items = computed(() => {
  const rows = [
    { label: 'Sale status', value: formatStatus(props.saleStatus) },
    { label: 'Construction', value: formatStatus(props.constructionStatus) },
    { label: 'Completion', value: props.completionDate || '—' },
  ]
  if (props.unitsCount != null && props.unitsCount > 0) {
    rows.push({
      label: 'Units in catalogue',
      value: `${props.unitsCount} listed`,
    })
  }
  return rows
})

const unitTypes = computed(() =>
  (props.availableUnitTypes || [])
    .map((t) => (typeof t === 'string' ? t : t?.name || t?.label))
    .filter(Boolean)
)
</script>
