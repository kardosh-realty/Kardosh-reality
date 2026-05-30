<template>
  <div class="whatsapp-float" aria-label="Contact us on WhatsApp">
    <a
      v-if="showCall"
      :href="callHref"
      class="whatsapp-float__call"
      aria-label="Call us"
    >
      <Phone class="size-5" aria-hidden="true" />
    </a>

    <a
      :href="waLink"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-float__main group"
      aria-label="Chat on WhatsApp"
    >
      <span class="whatsapp-float__icon-wrap" aria-hidden="true">
        <MessageCircle class="whatsapp-float__icon" :stroke-width="2" />
      </span>
      <span class="whatsapp-float__label">Chat on WhatsApp</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MessageCircle, Phone } from 'lucide-vue-next'
import { WHATSAPP } from '@/config/marketing'
import { site, whatsappHref } from '@/composables/useSiteSettings'

const props = defineProps({
  showCall: { type: Boolean, default: true },
  message: { type: String, default: '' },
})

const route = useRoute()

const callHref = computed(() => `tel:${String(site.phone).replace(/\s/g, '')}`)

const waLink = computed(() => {
  const base = whatsappHref.value
  if (props.message) return `${base}?text=${encodeURIComponent(props.message)}`
  if (route.name === 'property-detail' && route.params.id) {
    return `${base}?text=${WHATSAPP.propertyMessage('Property #' + route.params.id)}`
  }
  return `${base}?text=${WHATSAPP.defaultMessage}`
})
</script>
