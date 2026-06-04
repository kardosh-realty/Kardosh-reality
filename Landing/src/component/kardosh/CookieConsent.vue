<template>
  <Teleport to="body">
    <Transition name="cookie-consent">
      <aside
        v-if="showConsentBanner"
        class="cookie-consent"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
      >
        <div class="cookie-consent__inner">
          <div class="cookie-consent__copy">
            <p id="cookie-consent-title" class="cookie-consent__title">{{ t('cookie.title') }}</p>
            <p id="cookie-consent-desc" class="cookie-consent__text">
              {{ t('cookie.body') }}
              <RouterLink to="/cookie-policy" class="cookie-consent__link">{{ t('cookie.cookiePolicy') }}</RouterLink>
              {{ andLabel }}
              <RouterLink to="/privacy" class="cookie-consent__link">{{ t('cookie.privacy') }}</RouterLink>
            </p>
          </div>
          <div class="cookie-consent__actions">
            <button
              type="button"
              class="cookie-consent__btn cookie-consent__btn--primary"
              @click="acceptCookies"
            >
              {{ t('common.acceptAll') }}
            </button>
            <button
              type="button"
              class="cookie-consent__btn cookie-consent__btn--ghost"
              @click="declineCookies"
            >
              {{ t('common.essentialOnly') }}
            </button>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookieConsent } from '@/composables/useCookieConsent'
import { useT } from '@/composables/useT'
import { useMessages } from '@/composables/useMessages'

const t = useT()
const messages = useMessages()
const { showConsentBanner, acceptCookies, declineCookies } = useCookieConsent()

const andLabel = computed(() => messages.value.common?.and ?? 'and')
</script>
