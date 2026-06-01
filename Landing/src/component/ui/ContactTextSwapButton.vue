<template>
  <component
    :is="tag"
    v-bind="rootBind"
    :class="[
      'kardosh-contact-swap-btn',
      block && 'kardosh-contact-swap-btn--block',
      attrs.class,
    ]"
  >
    <span class="kardosh-contact-swap-btn__text" aria-hidden="true">
      <span class="kardosh-contact-swap-btn__layer kardosh-contact-swap-btn__layer--default">
        {{ label }}
      </span>
      <span class="kardosh-contact-swap-btn__layer kardosh-contact-swap-btn__layer--hover">
        {{ label }}
      </span>
    </span>
    <span class="sr-only">{{ label }}</span>
  </component>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  to: { type: [String, Object], default: '/contact' },
  href: { type: String, default: '' },
  label: { type: String, default: 'Contact' },
  block: { type: Boolean, default: false },
})

const attrs = useAttrs()

const tag = computed(() => (props.href ? 'a' : RouterLink))

const rootBind = computed(() => {
  const { class: _c, ...rest } = attrs
  if (props.href) {
    return { href: props.href, ...rest }
  }
  return { to: props.to, ...rest }
})
</script>
