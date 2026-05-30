<template>
  <section
    class="intl-strip"
    :class="{ 'intl-strip--about-page': onAboutPage }"
    aria-labelledby="intl-strip-heading"
  >
    <div class="container-fluid">
      <div class="intl-strip__panel">
        <img
          class="intl-strip__bg"
          :src="image"
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
        <div class="intl-strip__overlay" aria-hidden="true" />

        <div class="intl-strip__content">
          <div class="intl-strip__intro">
            <p class="intl-strip__eyebrow">
              <Globe2 class="size-3.5 shrink-0" aria-hidden="true" />
              {{ copy.eyebrow }}
            </p>
            <h2 id="intl-strip-heading" class="intl-strip__title">
              <span>{{ copy.headline }}</span>
              <span class="intl-strip__title-accent">{{ copy.headlineAccent }}</span>
            </h2>
            <p class="intl-strip__body">{{ copy.body }}</p>

            <div class="intl-strip__founder">
              <span class="intl-strip__avatar" aria-hidden="true">AK</span>
              <div>
                <p class="intl-strip__founder-name">{{ copy.ownerName }}</p>
                <p class="intl-strip__founder-role">{{ copy.ownerRole }}</p>
              </div>
            </div>

            <div v-if="showCta" class="intl-strip__cta">
              <KardoshSlideButton label="Speak with Allan" to="/contact" />
              <RouterLink
                v-if="showStoryLink"
                to="/aboutus"
                class="intl-strip__about-link"
              >
                Our story
                <ArrowRight class="size-4" aria-hidden="true" />
              </RouterLink>
            </div>
          </div>

          <div class="intl-strip__markets" aria-label="Office regions">
            <article class="intl-strip__market intl-strip__market--florida">
              <div class="intl-strip__market-top">
                <Building2 class="intl-strip__market-icon size-5" aria-hidden="true" />
                <p class="intl-strip__market-region">{{ copy.florida.region }}</p>
              </div>
              <p class="intl-strip__market-stat">{{ copy.florida.stat }}</p>
              <p class="intl-strip__market-label">{{ copy.florida.label }}</p>
            </article>

            <div class="intl-strip__connector" aria-hidden="true">
              <span class="intl-strip__connector-line" />
              <span class="intl-strip__connector-dot">
                <Globe2 class="size-4" />
              </span>
              <span class="intl-strip__connector-line" />
            </div>

            <article class="intl-strip__market intl-strip__market--dubai">
              <div class="intl-strip__market-top">
                <MapPin class="intl-strip__market-icon size-5" aria-hidden="true" />
                <p class="intl-strip__market-region">{{ copy.dubai.region }}</p>
              </div>
              <p class="intl-strip__market-stat">{{ copy.dubai.stat }}</p>
              <p class="intl-strip__market-label">{{ copy.dubai.label }}</p>
            </article>

            <p class="intl-strip__rera">
              <Shield class="size-4 shrink-0" aria-hidden="true" />
              {{ reraLabel }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight, Building2, Globe2, MapPin, Shield } from 'lucide-vue-next'
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import { RERA_LICENSE_LABEL } from '@/config/brand'
import { INTERNATIONAL_BROKER_STRIP } from '@/config/company'
import { SECTION_IMAGES } from '@/config/dubai-images'
import heroMarina from '@/assets/images/bg/02.jpg'

defineProps({
  /** On /aboutus — tighter spacing, hide “Our story” link */
  onAboutPage: { type: Boolean, default: false },
  showCta: { type: Boolean, default: true },
  showStoryLink: { type: Boolean, default: true },
})

const copy = INTERNATIONAL_BROKER_STRIP
const reraLabel = RERA_LICENSE_LABEL
const image = SECTION_IMAGES.whyInvest || heroMarina
</script>
