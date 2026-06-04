<template>
  <VueRouterLink v-bind="linkBind">
    <slot />
  </VueRouterLink>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink as VueRouterLink, useRoute } from '@/lib/vue-router-core.js'
import { localizeRouteTo } from '@/composables/useLocalizedPath'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  to: { type: [String, Object], required: true },
  replace: { type: Boolean, default: false },
  custom: { type: Boolean, default: false },
  activeClass: { type: String, default: undefined },
  exactActiveClass: { type: String, default: undefined },
  ariaCurrentValue: { type: String, default: undefined },
})

const attrs = useAttrs()
const route = useRoute()

const resolvedTo = computed(() => localizeRouteTo(props.to, route))

const linkBind = computed(() => ({
  ...attrs,
  replace: props.replace,
  custom: props.custom,
  activeClass: props.activeClass,
  exactActiveClass: props.exactActiveClass,
  ariaCurrentValue: props.ariaCurrentValue,
  to: resolvedTo.value,
}))
</script>
