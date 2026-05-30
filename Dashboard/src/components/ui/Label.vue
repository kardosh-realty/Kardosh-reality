<template>
  <label
    :for="htmlFor"
    :class="
      cn(
        'text-sm font-medium leading-4 text-slate-900 dark:text-slate-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        $attrs.class
      )
    "
  >
    <slot />
  </label>
</template>

<script setup>
import { cn } from '@/lib/utils'

defineProps({
  htmlFor: { type: String, default: undefined },
})

defineOptions({ inheritAttrs: false })
</script>
