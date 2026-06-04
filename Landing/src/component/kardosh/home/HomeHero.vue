<template>
  <section class="home-hero">
    <HeroMedia />

    <div class="home-hero__foreground">
      <div class="home-hero__content">
        <div class="container">
          <div class="home-hero__copy">
            <p class="home-hero__eyebrow">
              {{ t('home.hero.eyebrow') }}
            </p>
            <h1 class="home-hero__title">
              <span class="home-hero__title-row home-hero__title-row--lead">
                {{ t('home.hero.titleLead') }}
              </span>
              <span class="home-hero__title-row home-hero__title-row--accent">
                <AnimatedTextCycle
                  :words="heroRotatingWords"
                  :interval="3000"
                  motion="fade"
                  word-class="home-hero__title-accent"
                />
              </span>
              <span class="home-hero__title-row home-hero__title-row--suffix">
                {{ t('home.hero.titleSuffix') }}
              </span>
            </h1>
            <p class="home-hero__lead">
              {{ t('home.hero.lead') }}
            </p>
          </div>
        </div>
      </div>

      <div class="hero-search-card-wrap">
        <PropertySearchBar variant="hero" :show-tabs="true" initial-mode="off-plan" />
      </div>
    </div>
  </section>
</template>

<script setup>
import HeroMedia from '@/component/kardosh/HeroMedia.vue'
import AnimatedTextCycle from '@/components/ui/AnimatedTextCycle.vue'
import PropertySearchBar from '@/component/kardosh/PropertySearchBar.vue'
import { useT } from '@/composables/useT'
import { useMessages } from '@/composables/useMessages'
import { computed } from 'vue'

const t = useT()
const messages = useMessages()
const heroRotatingWords = computed(() => messages.value.home?.hero?.titleWords || [])
</script>
