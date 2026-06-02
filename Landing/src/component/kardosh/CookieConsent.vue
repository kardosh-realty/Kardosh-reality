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
            <p id="cookie-consent-title" class="cookie-consent__title">Cookies & privacy</p>
            <p id="cookie-consent-desc" class="cookie-consent__text">
              We use essential cookies to run the site and optional analytics cookies to understand
              how visitors use Kardosh Realty. You can accept all cookies or continue with essential
              cookies only.
              <RouterLink to="/privacy" class="cookie-consent__link">Privacy policy</RouterLink>
            </p>
          </div>
          <div class="cookie-consent__actions">
            <button
              type="button"
              class="cookie-consent__btn cookie-consent__btn--primary"
              @click="acceptCookies"
            >
              Accept all
            </button>
            <button
              type="button"
              class="cookie-consent__btn cookie-consent__btn--ghost"
              @click="declineCookies"
            >
              Essential only
            </button>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { showConsentBanner, acceptCookies, declineCookies } = useCookieConsent()
</script>
