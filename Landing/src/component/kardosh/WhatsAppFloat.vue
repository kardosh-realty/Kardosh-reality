<template>
  <div class="wa-float">
    <Transition name="wa-float-launcher">
      <button
        v-if="!isOpen"
        type="button"
        class="wa-float__launcher"
        aria-label="Open contact options"
        :aria-expanded="false"
        @click="openDock"
      >
        <span class="wa-float__launcher-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </span>
        <span class="wa-float__launcher-label">Need help?</span>
      </button>
    </Transition>

    <Transition name="wa-float-panel">
      <div
        v-if="isOpen"
        class="wa-float__dock"
        role="dialog"
        aria-label="Contact Kardosh Realty"
        :aria-expanded="true"
      >
        <div class="wa-float__header">
          <span class="wa-float__status" aria-hidden="true">
            <span class="wa-float__status-dot" />
          </span>
          <div class="wa-float__header-text">
            <p class="wa-float__title">Need help?</p>
            <p class="wa-float__subtitle">We reply on WhatsApp</p>
          </div>
          <button
            type="button"
            class="wa-float__close"
            aria-label="Close contact panel"
            @click="closeDock"
          >
            <X class="wa-float__close-icon" aria-hidden="true" />
          </button>
        </div>

        <div class="wa-float__actions">
          <a
            :href="waLink"
            target="_blank"
            rel="noopener noreferrer"
            class="wa-float__btn wa-float__btn--whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <svg class="wa-float__btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg>
            <span class="wa-float__btn-label">WhatsApp</span>
          </a>

          <a
            v-if="showCall"
            :href="callHref"
            class="wa-float__btn wa-float__btn--call"
            aria-label="Call us"
          >
            <Phone class="wa-float__btn-icon" aria-hidden="true" />
            <span class="wa-float__btn-label">Call</span>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Phone, X } from 'lucide-vue-next'
import { site, whatsAppLink, propertyWhatsAppLink } from '@/composables/useSiteSettings'

const STORAGE_KEY = 'kardosh-contact-dock'

const props = defineProps({
  showCall: { type: Boolean, default: true },
  message: { type: String, default: '' },
})

const route = useRoute()
const isOpen = ref(false)

function syncDockClass(open) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('has-contact-dock-open', open)
}

onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'open') isOpen.value = true
  } catch {
    /* private mode */
  }
  syncDockClass(isOpen.value)
})

function openDock() {
  isOpen.value = true
  syncDockClass(true)
  try {
    localStorage.setItem(STORAGE_KEY, 'open')
  } catch {
    /* ignore */
  }
}

function closeDock() {
  isOpen.value = false
  syncDockClass(false)
  try {
    localStorage.setItem(STORAGE_KEY, 'closed')
  } catch {
    /* ignore */
  }
}

const callHref = computed(() => `tel:${String(site.phone).replace(/\s/g, '')}`)

const waLink = computed(() => {
  if (props.message) return whatsAppLink(props.message)
  if (route.name === 'property-detail' && route.params.slug) {
    return propertyWhatsAppLink(String(route.params.slug))
  }
  return whatsAppLink()
})
</script>
