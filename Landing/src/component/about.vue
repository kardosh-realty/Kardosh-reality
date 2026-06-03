<template>
  <section class="lg:mt-24 mt-16" aria-labelledby="about-kardosh-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div class="lg:col-span-5 relative group order-2 lg:order-1">
          <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[5/4]">
            <img
              :src="aboutImage.src"
              :srcset="aboutImage.srcset || undefined"
              :sizes="aboutImage.sizes || undefined"
              alt="Dubai skyline and luxury residences"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            <div class="absolute bottom-5 inset-s-5 md:bottom-6 md:inset-s-6">
              <span
                class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md"
              >
                <MapPin class="size-3.5 shrink-0" aria-hidden="true" />
                Business Bay · Dubai, UAE
              </span>
            </div>
            <button
              v-if="hasVideo"
              type="button"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-16 md:size-20 items-center justify-center rounded-full bg-white/95 dark:bg-slate-900/95 text-primary shadow-lg transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Play Kardosh Realty video"
              @click="isOpen = true"
            >
              <Play class="size-7 md:size-8 ms-0.5 fill-current" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="about-kardosh__content lg:col-span-7 order-1 lg:order-2 min-w-0">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">About Kardosh Realty</p>
          <h2
            id="about-kardosh-heading"
            class="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-slate-900 dark:text-white mt-3 leading-snug"
          >
            Efficiency. Transparency.
            <span class="text-slate-600 dark:text-slate-300"> Control.</span>
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 max-w-none lg:max-w-2xl leading-relaxed">
            {{ BRAND.tagline }} Browse off-plan and ready properties with transparent AED pricing,
            RERA-aligned workflows, and support from licensed brokers across the Emirates.
          </p>

          <div class="about-pillars-carousel">
            <button
              type="button"
              class="about-pillars-carousel__nav about-pillars-carousel__nav--prev"
              aria-label="Previous pillar"
            >
              <ChevronLeft class="size-4" aria-hidden="true" />
            </button>

            <Swiper
              :modules="swiperModules"
              :slides-per-view="1.15"
              :space-between="16"
              :breakpoints="pillarBreakpoints"
              :navigation="{
                prevEl: '.about-pillars-carousel__nav--prev',
                nextEl: '.about-pillars-carousel__nav--next',
              }"
              class="about-pillars-carousel__swiper"
            >
              <SwiperSlide v-for="pillar in PILLARS" :key="pillar.title">
                <article
                  class="about-pillars-carousel__card rounded-2xl border border-slate-200/80 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 md:p-5 transition duration-300 hover:border-primary/30 hover:shadow-sm dark:hover:border-slate-500"
                >
                  <div
                    class="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-primary"
                  >
                    <component :is="pillar.icon" class="size-5" aria-hidden="true" />
                  </div>
                  <h3 class="font-semibold text-slate-900 dark:text-white mt-3 text-sm md:text-base">
                    {{ pillar.title }}
                  </h3>
                  <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {{ pillar.desc }}
                  </p>
                </article>
              </SwiperSlide>
            </Swiper>

            <button
              type="button"
              class="about-pillars-carousel__nav about-pillars-carousel__nav--next"
              aria-label="Next pillar"
            >
              <ChevronRight class="size-4" aria-hidden="true" />
            </button>
          </div>

          <div class="kardosh-btn-row mt-8">
            <KardoshSlideButton
              v-if="showAboutCta"
              label="About us"
              to="/aboutus"
            />
            <KardoshSlideButton
              v-else
              label="Browse off-plan"
              to="/off-plan"
            />
            <RouterLink
              to="/contact"
              class="btn btn-secondary inline-flex items-center justify-center"
            >
              Contact our team
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen && hasVideo"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        @click.self="isOpen = false"
      >
        <div class="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
          <button
            type="button"
            class="absolute top-3 end-3 z-10 flex size-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            aria-label="Close video"
            @click="isOpen = false"
          >
            <X class="size-5" aria-hidden="true" />
          </button>
          <div class="aspect-video w-full">
            <iframe
              :src="embedUrl"
              title="Kardosh Realty"
              class="size-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronLeft, ChevronRight, Eye, MapPin, Play, SlidersHorizontal, X, Zap } from 'lucide-vue-next'
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { BRAND } from '@/config/brand'
import { HERO_YOUTUBE_ID, heroYouTubeEmbedUrl } from '@/config/marketing'
import { SECTION_IMAGES, pageHeroImage } from '@/config/dubai-images'
const aboutImage = computed(() => pageHeroImage(SECTION_IMAGES.about))

const swiperModules = [Navigation]

const pillarBreakpoints = {
  640: { slidesPerView: 2.15, spaceBetween: 18 },
  1024: { slidesPerView: 3, spaceBetween: 20 },
}

const PILLARS = [
  {
    title: 'Efficiency',
    desc: 'Fast responses and clear steps from enquiry to reservation.',
    icon: Zap,
  },
  {
    title: 'Transparency',
    desc: 'AED pricing, payment plans, and RERA-aligned documentation.',
    icon: Eye,
  },
  {
    title: 'Control',
    desc: 'You decide the pace — we guide, never pressure.',
    icon: SlidersHorizontal,
  },
]

const route = useRoute()
const showAboutCta = computed(() => route.path !== '/aboutus')

const isOpen = ref(false)
const hasVideo = computed(() => Boolean(HERO_YOUTUBE_ID))
const embedUrl = computed(() =>
  HERO_YOUTUBE_ID ? heroYouTubeEmbedUrl(HERO_YOUTUBE_ID, { origin: typeof window !== 'undefined' ? window.location.origin : '' }) : ''
)

watch(isOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>
