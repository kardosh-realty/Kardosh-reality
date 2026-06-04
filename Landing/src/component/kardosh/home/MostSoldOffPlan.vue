<template>
  <section
    ref="sectionRoot"
    class="lg:mt-24 mt-16 home-section-compact scroll-mt-24"
    aria-labelledby="most-sold-off-plan-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <h2
          id="most-sold-off-plan-heading"
          class="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-slate-900 dark:text-white leading-tight"
        >
          {{ t('home.mostSold.heading') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          {{ t('home.mostSold.subheading') }}
        </p>
      </div>

      <div v-if="loading" class="investor-favourites-carousel__loading" aria-busy="true">
        <PropertyCardSkeleton v-for="n in VISIBLE_COUNT" :key="n" />
      </div>

      <p
        v-else-if="error"
        class="text-center text-slate-600 dark:text-slate-300 text-sm mt-10"
      >
        {{ error }}
      </p>

      <p
        v-else-if="!displayed.length"
        class="text-center text-slate-500 dark:text-slate-400 mt-10 py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700"
      >
        {{ t('home.mostSold.empty') }}
      </p>

      <div v-else class="investor-favourites-carousel">
        <button
          type="button"
          class="investor-favourites-carousel__nav investor-favourites-carousel__nav--prev"
          :aria-label="t('home.mostSold.prevAria')"
        >
          <ChevronLeft class="size-5" aria-hidden="true" />
        </button>

        <Swiper
          :modules="modules"
          :slides-per-view="1.12"
          :space-between="16"
          :slides-per-group="1"
          :breakpoints="carouselBreakpoints"
          :watch-overflow="false"
          :loop="loopEnabled"
          :autoplay="autoplayOptions"
          :navigation="{
            prevEl: '.investor-favourites-carousel__nav--prev',
            nextEl: '.investor-favourites-carousel__nav--next',
          }"
          class="investor-favourites-carousel__swiper"
        >
          <SwiperSlide v-for="(item, index) in displayed" :key="`most-sold-${item.id}-${index}`">
            <PropertyListingCard
              :item="item"
              :badge="demandBadge(item)"
              variant="luxury"
            />
          </SwiperSlide>
        </Swiper>

        <button
          type="button"
          class="investor-favourites-carousel__nav investor-favourites-carousel__nav--next"
          :aria-label="t('home.mostSold.nextAria')"
        >
          <ChevronRight class="size-5" aria-hidden="true" />
        </button>
      </div>

      <div v-if="!loading && displayed.length" class="investor-favourites-carousel__footer">
        <KardoshSlideButton to="/off-plan" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useDeferredCatalogLoad } from '@/composables/useDeferredCatalogLoad'
import { RouterLink } from 'vue-router'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import { useReelly } from '@/composables/useReelly'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import PropertyCardSkeleton from '@/component/kardosh/skeleton/PropertyCardSkeleton.vue'
import { demandBadge, pickMostSoldOffPlan } from '@/utils/offPlanRanking'
import { useT } from '@/composables/useT'

const t = useT()

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

/** 8 slides total; 4 visible per row on xl — slide to reveal 5–8 */
const SLIDE_COUNT = 8
const VISIBLE_COUNT = 4

const AUTOPLAY_MS = 1000

const modules = [Navigation, Autoplay]

const carouselBreakpoints = {
  480: { slidesPerView: 1.35, spaceBetween: 18, slidesPerGroup: 1 },
  640: { slidesPerView: 2.1, spaceBetween: 20, slidesPerGroup: 1 },
  1024: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 1 },
  1280: { slidesPerView: VISIBLE_COUNT, spaceBetween: 28, slidesPerGroup: 1 },
}

const { loading, error, projects, loadProjects } = useReelly()

const displayed = computed(() =>
  pickMostSoldOffPlan(projects.value, { limit: SLIDE_COUNT })
)

const loopEnabled = computed(() => displayed.value.length > 1)

const autoplayOptions = computed(() => {
  if (!displayed.value.length || displayed.value.length < 2) return false
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }
  return {
    delay: AUTOPLAY_MS,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }
})

const { root: sectionRoot } = useDeferredCatalogLoad(() => loadProjects())
</script>
