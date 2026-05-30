<template>
  <component
    :is="linkComponent"
    v-bind="linkProps"
    :class="['kardosh-slide-btn slide-anime group', { 'kardosh-slide-btn--fluid': fluid }]"
  >
    <span class="kardosh-slide-btn__label">{{ label }}</span>
    <span class="kardosh-slide-btn__arrow" aria-hidden="true">
      <ArrowRight class="size-5 shrink-0" />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  label: { type: String, default: 'View all off-plan' },
  to: { type: [String, Object], default: '/off-plan' },
  fluid: { type: Boolean, default: false },
})

const linkComponent = computed(() => (props.to ? RouterLink : 'button'))
const linkProps = computed(() => (props.to ? { to: props.to } : { type: 'button' }))
</script>
