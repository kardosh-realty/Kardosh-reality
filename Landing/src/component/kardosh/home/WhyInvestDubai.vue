<template>
  <section class="why-invest-section lg:mt-24 mt-16 home-section-compact scroll-mt-24" aria-labelledby="why-dubai-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <h2
          id="why-dubai-heading"
          class="kardosh-section-heading text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-slate-900 dark:text-white leading-tight"
        >
          Dubai property investment, made clear
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Off plan investment in Dubai combines tax-efficient ownership, strong yields, and regulated launches —
          Kardosh Realty helps you compare the best areas to invest and upcoming projects before you reserve.
        </p>
      </div>

      <div class="mt-8 lg:mt-16 grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        <div class="lg:col-span-7 relative group">
          <div
            class="why-invest-visual__frame relative rounded-2xl overflow-hidden shadow-xl min-h-[220px] lg:min-h-full lg:aspect-auto aspect-[4/3]"
          >
            <img
              :src="SECTION_IMAGES.whyInvest"
              alt="Dubai skyline along the waterfront"
              class="absolute inset-0 w-full h-full object-cover object-[center_40%] transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10" />
            <div class="absolute top-5 inset-s-5 md:top-6 md:inset-s-6">
              <span
                class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md"
              >
                <Globe2 class="size-3.5 shrink-0" aria-hidden="true" />
                UAE · Off-plan market
              </span>
            </div>
            <!-- Desktop only: stats on image -->
            <div
              class="why-invest-visual__stats why-invest-visual__stats--desktop absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-8 grid grid-cols-3 gap-2 sm:gap-3"
            >
              <div
                v-for="stat in MARKET_STATS"
                :key="stat.label"
                class="rounded-xl border border-white/15 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-md min-w-0"
              >
                <p class="text-base sm:text-lg md:text-xl font-semibold text-white tabular-nums">{{ stat.value }}</p>
                <p class="text-[11px] sm:text-xs text-white/75 mt-0.5 leading-snug">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Mobile: horizontal stat strip (saves vertical space vs stacked pills) -->
          <div class="why-invest-stats-carousel kardosh-mobile-carousel kardosh-mobile-carousel--tight">
            <Swiper
              :slides-per-view="1.12"
              :space-between="12"
              :breakpoints="statBreakpoints"
              class="kardosh-mobile-carousel__swiper"
            >
              <SwiperSlide v-for="stat in MARKET_STATS" :key="`stat-${stat.label}`">
                <div
                  class="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-900 text-white px-4 py-3 min-h-[4.5rem]"
                >
                  <p class="text-lg font-semibold tabular-nums">{{ stat.value }}</p>
                  <p class="text-xs text-white/75 mt-0.5 leading-snug">{{ stat.label }}</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col">
          <div
            class="flex flex-1 flex-col rounded-2xl border border-slate-200/80 dark:border-slate-600 bg-white dark:bg-slate-800 p-5 md:p-8 shadow-sm"
          >
            <h3 class="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-snug">
              Dubai off-plan for international investors
            </h3>
            <p class="text-slate-600 dark:text-slate-300 mt-3 text-sm md:text-base leading-relaxed">
              Curated projects from leading developers, transparent AED pricing, and licensed advisory from
              first enquiry through reservation.
            </p>
            <ul class="mt-5 md:mt-6 space-y-3 flex-1" role="list">
              <li
                v-for="point in VALUE_POINTS"
                :key="point"
                class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
              >
                <span
                  class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Check class="size-3.5 stroke-[2.5]" />
                </span>
                {{ point }}
              </li>
            </ul>
            <div class="kardosh-btn-row mt-6 md:mt-8">
              <RouterLink
                to="/why-dubai"
                class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center justify-center gap-2 px-6"
              >
                Explore why Dubai
                <ArrowRight class="size-4" aria-hidden="true" />
              </RouterLink>
              <RouterLink
                to="/off-plan"
                class="btn btn-secondary inline-flex items-center justify-center"
              >
                View off-plan
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div
        class="why-invest-advantages-grid mt-10 lg:mt-16 grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-slate-100/90 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 lg:gap-6 lg:p-8 dark:border-slate-700 dark:bg-slate-800/80"
      >
        <article
          v-for="(item, i) in INVESTMENT_ADVANTAGES"
          :key="item.title"
          class="why-invest-advantage-card group relative isolate flex min-h-[13.5rem] flex-col gap-4 overflow-hidden rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-[0_20px_48px_rgba(15,23,42,0.18)] dark:border-slate-500 dark:bg-slate-800 dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)] dark:hover:border-slate-400"
        >
          <span
            class="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-primary"
            aria-hidden="true"
          />
          <span
            class="why-invest-advantage-card__index pointer-events-none absolute top-4 end-4 text-4xl font-bold leading-none text-slate-200 dark:text-slate-700"
            aria-hidden="true"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <div
            class="why-invest-advantage-card__icon relative z-1 mt-1 inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md transition duration-300 group-hover:scale-105"
          >
            <component :is="ADVANTAGE_ICONS[i]" class="size-7" aria-hidden="true" />
          </div>
          <h3 class="relative z-1 pe-12 text-lg font-bold leading-snug text-slate-900 dark:text-white">
            {{ item.title }}
          </h3>
          <p class="relative z-1 text-[0.9375rem] leading-relaxed text-slate-600 dark:text-slate-300">
            {{ item.desc }}
          </p>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  Award,
  CalendarClock,
  Check,
  Globe2,
  Percent,
  ShieldCheck,
  TrendingUp,
} from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { INVESTMENT_ADVANTAGES } from '@/config/marketing'
import { SECTION_IMAGES } from '@/config/dubai-images'
import { HOME_STRIP_CAROUSEL, toSwiperBreakpoints } from '@/config/home-carousels'

import 'swiper/css'

const MARKET_STATS = [
  { value: '0%', label: 'Personal income tax on property income' },
  { value: '7–8%', label: 'Typical gross yields in prime districts' },
  { value: 'Golden Visa', label: 'Long-term residency via qualifying investment' },
]

const VALUE_POINTS = [
  'Curated off-plan inventory from established UAE developers',
  'Staged payment plans during construction',
  'RERA-regulated market with licensed broker support',
]

const ADVANTAGE_ICONS = [Percent, TrendingUp, Award, CalendarClock, ShieldCheck, Globe2]

const statBreakpoints = toSwiperBreakpoints(HOME_STRIP_CAROUSEL)
</script>
