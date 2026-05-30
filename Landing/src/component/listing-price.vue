<script setup>
import { computed } from 'vue'
import { formatAed, formatStartingPrice } from '@/config/uae'

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
  return props.item.price ? formatAed(props.item.price) : 'Price on request'
})
</script>

<template>
  <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ display }}</p>
</template>
