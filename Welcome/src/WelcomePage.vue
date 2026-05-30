<template>
  <section class="welcome-page">
    <HeroMedia hide-poster />
    <div class="welcome-page__veil" aria-hidden="true" />

    <div class="welcome-page__content">
      <header class="welcome-page__brand">
        <a :href="mainSiteUrl" class="welcome-page__logo-link">
          <BrandLogo
            variant="full"
            size="footer"
            invert-on-dark
            class="welcome-page__logo"
          />
        </a>
        <p class="welcome-page__eyebrow">United Arab Emirates</p>
      </header>

      <main class="welcome-page__main">
        <div class="welcome-page__card">
          <h1 class="welcome-page__headline">
            {{ headline }}
          </h1>
          <p class="welcome-page__tagline">
            {{ tagline }}
          </p>

          <div v-if="!launched" class="welcome-page__countdown" aria-label="Launch countdown">
            <div class="welcome-page__countdown-panel">
              <ul class="welcome-page__countdown-row">
                <li class="welcome-page__count-unit">
                  <span class="welcome-page__count-value">{{ pad(days) }}</span>
                  <span class="welcome-page__count-label">Days</span>
                </li>
                <li class="welcome-page__count-unit">
                  <span class="welcome-page__count-value">{{ pad(hours) }}</span>
                  <span class="welcome-page__count-label">Hours</span>
                </li>
                <li class="welcome-page__count-unit">
                  <span class="welcome-page__count-value">{{ pad(minutes) }}</span>
                  <span class="welcome-page__count-label">Mins</span>
                </li>
                <li class="welcome-page__count-unit">
                  <span class="welcome-page__count-value">{{ pad(seconds) }}</span>
                  <span class="welcome-page__count-label">Secs</span>
                </li>
              </ul>
            </div>
          </div>

          <p v-else class="welcome-page__live">
            We are live — explore the site now.
          </p>

          <form class="welcome-page__subscribe" @submit.prevent="onSubscribe">
            <label class="sr-only" for="welcome-subscribe-email">Email address</label>
            <input
              id="welcome-subscribe-email"
              v-model="subscribeEmail"
              type="email"
              name="email"
              autocomplete="email"
              required
              placeholder="Enter your email"
              class="welcome-page__subscribe-input"
              :disabled="subscribing"
            />
            <button
              type="submit"
              class="welcome-page__subscribe-btn"
              :disabled="subscribing"
            >
              {{ subscribing ? 'Sending…' : 'Notify me' }}
            </button>
          </form>
          <p v-if="subscribeSuccess" class="welcome-page__subscribe-msg welcome-page__subscribe-msg--ok" role="status">
            {{ subscribeSuccess }}
          </p>
          <p v-else-if="subscribeError" class="welcome-page__subscribe-msg welcome-page__subscribe-msg--err" role="alert">
            {{ subscribeError }}
          </p>
        </div>
      </main>

      <footer class="welcome-page__footer">
        <div class="welcome-page__social" aria-label="Social media">
          <a
            :href="SOCIAL.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="welcome-page__social-btn"
            aria-label="Kardosh Realty on LinkedIn"
          >
            <Linkedin class="size-5" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            :href="SOCIAL.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="welcome-page__social-btn"
            aria-label="Kardosh Realty on Instagram"
          >
            <Instagram class="size-5" aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </div>
        <p class="welcome-page__copy">
          © {{ year }} {{ BRAND.name }}. UAE property specialists.
        </p>
        <p class="welcome-page__credit">
          Design &amp; Develop by
          <a
            href="https://logixcontact.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="welcome-page__credit-link"
          >Logix Contact</a>.
        </p>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Linkedin, Instagram } from 'lucide-vue-next'
import BrandLogo from '@/components/BrandLogo.vue'
import HeroMedia from '@/components/HeroMedia.vue'
import { BRAND, SOCIAL } from '@/config/brand'
import { submitWelcomeSubscribe } from '@/services/welcomeSubscribe'

const headline = import.meta.env.VITE_WELCOME_HEADLINE || 'We are coming soon'
const tagline =
  import.meta.env.VITE_WELCOME_TAGLINE ||
  'Your trusted platform for UAE off-plan and luxury property — launching shortly.'

const LAUNCH_DAYS = 40
const launchDeadline = import.meta.env.VITE_LAUNCH_DEADLINE
  ? new Date(import.meta.env.VITE_LAUNCH_DEADLINE).getTime()
  : Date.now() + LAUNCH_DAYS * 24 * 60 * 60 * 1000

const mainSiteUrl = import.meta.env.VITE_MAIN_SITE_URL || 'http://localhost:5173'

const subscribeEmail = ref('')
const subscribing = ref(false)
const subscribeSuccess = ref('')
const subscribeError = ref('')

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const launched = ref(false)

const year = new Date().getFullYear()

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

async function onSubscribe() {
  subscribeError.value = ''
  subscribeSuccess.value = ''
  subscribing.value = true
  try {
    await submitWelcomeSubscribe(subscribeEmail.value)
    subscribeSuccess.value = 'Thank you — we will notify you when we launch.'
    subscribeEmail.value = ''
  } catch (e) {
    subscribeError.value = e.message || 'Could not subscribe. Please try again.'
  } finally {
    subscribing.value = false
  }
}

function tick() {
  const remaining = launchDeadline - Date.now()
  if (remaining <= 0) {
    launched.value = true
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }
  launched.value = false
  days.value = Math.floor(remaining / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((remaining / (1000 * 60 * 60)) % 24)
  minutes.value = Math.floor((remaining / (1000 * 60)) % 60)
  seconds.value = Math.floor((remaining / 1000) % 60)
}

let interval = null

onMounted(() => {
  tick()
  interval = setInterval(tick, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.welcome-page {
  --welcome-font-display: 'Cormorant Garamond', 'Times New Roman', serif;
  --welcome-font-body: 'Montserrat', system-ui, sans-serif;
  --welcome-glass-fill: rgb(255 255 255 / 0.32);
  --welcome-glass-fill-soft: rgb(255 255 255 / 0.26);
  --welcome-glass-border: rgb(255 255 255 / 0.28);
  --welcome-safe-top: env(safe-area-inset-top, 0px);
  --welcome-safe-bottom: env(safe-area-inset-bottom, 0px);
  --welcome-safe-x: max(0.75rem, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px));
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100dvh;
  height: 100svh;
  max-height: 100dvh;
  max-height: 100svh;
  min-height: 100dvh;
  min-height: 100svh;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
  padding:
    calc(0.5rem + var(--welcome-safe-top))
    var(--welcome-safe-x)
    calc(0.5rem + var(--welcome-safe-bottom));
  color: #ffffff;
  font-family: var(--welcome-font-body);
}

.welcome-page .hero-media {
  z-index: 0;
}

.welcome-page__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgb(15 23 42 / 0.42) 0%,
    rgb(15 23 42 / 0.18) 32%,
    transparent 52%
  );
}

.welcome-page__content {
  position: relative;
  z-index: 3;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  max-width: 52rem;
  height: 100%;
  min-height: 0;
  max-height: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.35rem, 1.5dvh, 1rem);
  overflow: hidden;
  padding: 0;
}

.welcome-page__brand {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  text-align: center;
}

.welcome-page__logo-link {
  display: inline-block;
  line-height: 0;
}

.welcome-page__logo :deep(.kardosh-brand-img) {
  max-height: 3.25rem;
  width: auto;
}

@media (min-width: 640px) {
  .welcome-page__logo :deep(.kardosh-brand-img) {
    max-height: 3.75rem;
  }
}

.welcome-page__eyebrow {
  margin: 0;
  font-family: var(--welcome-font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.7);
}

.welcome-page__main {
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.welcome-page__card {
  width: 100%;
  padding: 1.75rem 1.25rem 1.5rem;
  text-align: center;
  background: linear-gradient(
    160deg,
    rgb(255 255 255 / 0.36) 0%,
    var(--welcome-glass-fill) 50%,
    rgb(255 255 255 / 0.3) 100%
  );
  border: 1px solid var(--welcome-glass-border);
  border-radius: 1.25rem;
  backdrop-filter: blur(32px) saturate(165%);
  -webkit-backdrop-filter: blur(32px) saturate(165%);
  box-shadow:
    0 24px 64px rgb(0 0 0 / 0.3),
    inset 0 1px 0 rgb(255 255 255 / 0.28);
  isolation: isolate;
}

@supports not (backdrop-filter: blur(1px)) {
  .welcome-page__card {
    background: rgb(255 255 255 / 0.38);
  }
}

/* Mobile: min full viewport; scroll when card + footer need more space */
@media (max-width: 639px) {
  .welcome-page {
    height: auto;
    max-height: none;
    min-height: 100dvh;
    min-height: 100svh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    align-items: flex-start;
  }

  .welcome-page .hero-media,
  .welcome-page__veil {
    position: fixed;
    inset: 0;
  }

  .welcome-page__content {
    height: auto;
    max-height: none;
    min-height: 100dvh;
    min-height: 100svh;
    overflow: visible;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.5rem 0 calc(1.25rem + var(--welcome-safe-bottom));
  }

  .welcome-page__main {
    flex: 0 0 auto;
    min-height: 0;
    overflow: visible;
    width: 100%;
  }

  .welcome-page__logo :deep(.kardosh-brand-img) {
    max-height: clamp(2rem, 7dvh, 2.75rem);
  }

  .welcome-page__eyebrow {
    font-size: 0.625rem;
    letter-spacing: 0.22em;
  }

  .welcome-page__card {
    width: min(100%, 19rem);
    max-height: none;
    margin-inline: auto;
    padding: clamp(0.65rem, 2dvh, 1rem) clamp(0.75rem, 3vw, 1rem);
    border-radius: 1rem;
    overflow: visible;
  }

  .welcome-page__headline {
    font-size: clamp(1.5rem, 5.5dvh, 2rem);
    line-height: 1.08;
  }

  .welcome-page__tagline {
    margin-top: 0.35rem;
    font-size: clamp(0.75rem, 2dvh, 0.875rem);
    line-height: 1.45;
  }

  .welcome-page__countdown {
    margin-top: clamp(0.5rem, 1.5dvh, 0.85rem);
  }

  .welcome-page__subscribe {
    flex-direction: column;
    max-width: none;
    margin-top: clamp(0.5rem, 1.5dvh, 0.75rem);
    gap: 0.4rem;
  }

  .welcome-page__subscribe-input,
  .welcome-page__subscribe-btn {
    min-height: clamp(2.25rem, 7dvh, 2.5rem);
    font-size: 0.8125rem;
  }

  .welcome-page__subscribe-btn {
    font-size: 0.6875rem;
  }

  .welcome-page__subscribe-msg {
    margin-top: 0.35rem;
    font-size: 0.6875rem;
    line-height: 1.35;
  }

  .welcome-page__footer {
    flex-shrink: 0;
    gap: 0.4rem;
    padding-bottom: 0.5rem;
    margin-top: 0.25rem;
  }

  .welcome-page__social-btn {
    min-height: 2.125rem;
    padding: 0 0.75rem;
    font-size: 0.6875rem;
  }

  .welcome-page__copy,
  .welcome-page__credit {
    font-size: 0.625rem;
    line-height: 1.35;
  }

  .welcome-page__credit {
    margin-top: 0.15rem;
  }
}

@media (min-width: 640px) {
  .welcome-page__card {
    padding: 2rem 1.75rem 1.75rem;
  }
}

.welcome-page__headline {
  margin: 0;
  font-family: var(--welcome-font-display);
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: 0.02em;
  text-wrap: balance;
}

.welcome-page__tagline {
  margin: 1rem auto 0;
  max-width: 32rem;
  font-family: var(--welcome-font-body);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 300;
  line-height: 1.75;
  letter-spacing: 0.02em;
  color: rgb(255 255 255 / 0.82);
}

/* Countdown — panel wrapper; circles on desktop, grid cells on mobile */
.welcome-page__countdown {
  margin-top: 2rem;
  width: 100%;
  overflow: hidden;
}

.welcome-page__countdown-panel {
  width: 100%;
}

.welcome-page__countdown-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  gap: clamp(0.625rem, 2.5vw, 1.5rem);
  margin: 0 auto;
  padding: 0;
  list-style: none;
  width: 100%;
  max-width: 100%;
}

.welcome-page__count-unit {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: clamp(5.5rem, 18vw, 8.125rem);
  aspect-ratio: 1;
  padding: 1rem 0.5rem 0.85rem;
  text-align: center;
  background: var(--welcome-glass-fill-soft);
  border: 1px solid var(--welcome-glass-border);
  border-radius: 9999px;
  box-shadow:
    0 8px 28px rgb(0 0 0 / 0.28),
    inset 0 1px 0 rgb(255 255 255 / 0.12);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
}

@supports not (backdrop-filter: blur(1px)) {
  .welcome-page__count-unit {
    background: rgb(255 255 255 / 0.3);
  }
}

/* Mobile countdown — must come after desktop flex rules (cascade fix) */
@media (max-width: 639px) {
  .welcome-page__countdown {
    width: 100%;
    overflow: hidden;
  }

  .welcome-page__countdown-panel {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    background: rgb(255 255 255 / 0.1);
    border: 1px solid rgb(255 255 255 / 0.18);
    border-radius: 0.875rem;
    backdrop-filter: blur(14px) saturate(150%);
    -webkit-backdrop-filter: blur(14px) saturate(150%);
  }

  .welcome-page__countdown-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    flex-wrap: unset;
    justify-content: unset;
    align-items: unset;
    gap: 0.5rem;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  .welcome-page__count-unit {
    flex-shrink: unset;
    justify-self: center;
    width: 5.25rem;
    height: 5.25rem;
    max-width: 5.25rem;
    aspect-ratio: 1;
    gap: 0.25rem;
    padding: 0.55rem 0.35rem 0.45rem;
    border-radius: 9999px;
    background: var(--welcome-glass-fill-soft);
    border: 1px solid var(--welcome-glass-border);
    box-shadow:
      0 4px 16px rgb(0 0 0 / 0.2),
      inset 0 1px 0 rgb(255 255 255 / 0.1);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
  }

  .welcome-page__count-value {
    font-size: 1.375rem;
  }

  .welcome-page__count-label {
    font-size: 0.5625rem;
    letter-spacing: 0.1em;
  }
}

.welcome-page__count-value {
  display: block;
  font-family: var(--welcome-font-display);
  font-size: clamp(1.625rem, 7vw, 2.5rem);
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
}

.welcome-page__count-label {
  display: block;
  font-family: var(--welcome-font-body);
  font-size: clamp(0.6875rem, 1.8vw, 0.875rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.78);
}

.welcome-page__live {
  margin: 1.5rem 0 0;
  font-family: var(--welcome-font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(110 231 183);
}

.welcome-page__subscribe {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 28rem;
  margin-inline: auto;
}

@media (min-width: 480px) {
  .welcome-page__subscribe {
    flex-direction: row;
    align-items: stretch;
    max-width: none;
  }
}

.welcome-page__subscribe-input {
  flex: 1;
  min-width: 0;
  min-height: 3rem;
  padding: 0 1rem;
  font-family: var(--welcome-font-body);
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: #ffffff;
  background: rgb(255 255 255 / 0.2);
  border: 1px solid rgb(255 255 255 / 0.26);
  border-radius: 9999px;
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.welcome-page__subscribe-input::placeholder {
  color: rgb(255 255 255 / 0.45);
}

.welcome-page__subscribe-input:focus {
  border-color: rgb(255 255 255 / 0.45);
  background: rgb(255 255 255 / 0.28);
}

.welcome-page__subscribe-btn {
  flex-shrink: 0;
  min-height: 3rem;
  padding: 0 1.5rem;
  font-family: var(--welcome-font-body);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(15 23 42);
  background: #ffffff;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.welcome-page__subscribe-btn:hover:not(:disabled) {
  background: rgb(241 245 249);
}

.welcome-page__subscribe-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

.welcome-page__subscribe-msg {
  margin: 0.75rem 0 0;
  font-family: var(--welcome-font-body);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.welcome-page__subscribe-msg--ok {
  color: rgb(110 231 183);
}

.welcome-page__subscribe-msg--err {
  color: rgb(252 165 165);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.welcome-page__footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.welcome-page__social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.625rem;
}

.welcome-page__social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0 1rem;
  font-family: var(--welcome-font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.9);
  text-decoration: none;
  background: rgb(255 255 255 / 0.18);
  border: 1px solid var(--welcome-glass-border);
  border-radius: 9999px;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.welcome-page__social-btn:hover {
  color: #ffffff;
  background: rgb(255 255 255 / 0.26);
  border-color: rgb(255 255 255 / 0.36);
}

.welcome-page__copy {
  margin: 0;
  font-family: var(--welcome-font-body);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  line-height: 1.5;
  color: rgb(148 163 184);
  text-align: center;
}

.welcome-page__credit {
  margin: 0.35rem 0 0;
  font-family: var(--welcome-font-body);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  line-height: 1.5;
  color: rgb(148 163 184);
  text-align: center;
}

.welcome-page__credit-link {
  color: rgb(203 213 225);
  text-decoration: none;
  transition: color 0.2s ease;
}

.welcome-page__credit-link:hover {
  color: #ffffff;
}

</style>
