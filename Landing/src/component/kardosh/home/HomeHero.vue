<template>
  <section class="home-hero">
    <HeroMedia />

    <div class="home-hero__foreground">
      <div class="home-hero__content">
        <div class="container">
          <div class="home-hero__copy">
            <p class="home-hero__eyebrow">
              {{ BRAND.name }} · United Arab Emirates
            </p>
            <h1 class="home-hero__title">
              <span class="home-hero__title-row home-hero__title-row--lead">
                Discover exceptional
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
                across the UAE
              </span>
            </h1>
            <p class="home-hero__lead">
              Browse Dubai off plan projects and buy off plan property with confidence —
              new launch and upcoming projects across the UAE, plus ready homes for rent and sale.
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
import { BRAND } from '@/config/brand'
import HeroMedia from '@/component/kardosh/HeroMedia.vue'
import AnimatedTextCycle from '@/components/ui/AnimatedTextCycle.vue'
import PropertySearchBar from '@/component/kardosh/PropertySearchBar.vue'

const heroRotatingWords = ['properties', 'villas', 'apartments']
</script>
