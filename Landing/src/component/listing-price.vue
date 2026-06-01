<script setup>
import { computed } from 'vue'
import { formatAed, formatAedInMillions, formatStartingPrice } from '@/config/uae'

const props = defineProps({
  item: { type: Object, required: true },
  /** Property cards: show starting price only */
  startingOnly: { type: Boolean, default: false },
})

const display = computed(() => {
  if (props.startingOnly) return formatStartingPrice(props.item)
  if (props.item.priceLabel) return props.item.priceLabel
  if (props.item.listingType === 'rent') {
    return props.item.price ? `${formatAed(props.item.price)}/year` : 'Price on request'
  }
  const compact = formatAedInMillions(props.item.price)
  return compact || 'Price on request'
})
</script>

<template>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ display }}</p>
</template>
