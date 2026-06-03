<template>
  <Navbar nav-class="navbar-white" />

  <div class="about-page">
  <PageHero
    title="About Kardosh Realty"
    subtitle="Helping buyers discover off-plan projects in Dubai with confidence."
    :image="PAGE_HERO_IMAGES.about"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="about-stats listings-search-glass kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0"
      >
        <li v-for="stat in ABOUT_STATS" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <InternationalBrokerStrip on-about-page :show-story-link="false" />

  <!-- Story + pillars (reuse About block) -->
  <About />

  <!-- Mission statement -->
  <section
    class="about-page__band py-12 lg:py-14"
    aria-labelledby="mission-heading"
  >
    <div class="container-fluid">
      <article
        class="about-page__mission-card max-w-3xl mx-auto text-center rounded-2xl px-6 py-8 md:px-10 md:py-10"
      >
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
          {{ ABOUT_MISSION.eyebrow }}
        </p>
        <h2
          id="mission-heading"
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          {{ ABOUT_MISSION.title }}
        </h2>
        <p class="about-lead mt-4">
          {{ ABOUT_MISSION.body }}
        </p>
      </article>
    </div>
  </section>

  <!-- What we do -->
  <section class="lg:py-20 py-14" aria-labelledby="services-heading">
    <div class="container-fluid">
      <div class="about-services__intro">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">What we do</p>
        <h2
          id="services-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          One brokerage, full UAE coverage
        </h2>
        <p class="about-lead mt-4">
          From off-plan launches to rentals and resale — explore the tools we built for modern property buyers.
        </p>
      </div>

      <div class="about-services__grid mt-10">
        <article
          v-for="service in ABOUT_SERVICES"
          :key="service.title"
          class="about-service-card community-card--luxury kardosh-property-card--luxury listings-search-glass group flex flex-col"
        >
          <div class="about-service-card__content flex flex-1 flex-col min-w-0">
            <RouterLink :to="service.to" class="about-service-card__title">
              {{ service.title }}
            </RouterLink>
            <p class="about-service-card__desc">{{ service.desc }}</p>
            <div class="community-card__footer">
              <div>
                <p class="kardosh-property-card__price-label">Service</p>
                <p class="kardosh-property-card__price-value">{{ service.title }}</p>
              </div>
              <RouterLink
                :to="service.to"
                class="kardosh-property-card__cta"
                :aria-label="`View ${service.title}`"
              >
                <span class="kardosh-property-card__cta-text">View</span>
                <span class="kardosh-property-card__cta-icon" aria-hidden="true">
                  <ArrowRight class="size-5" />
                </span>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- How we work -->
  <section
    class="about-page__band lg:py-20 py-14"
    aria-labelledby="process-heading"
  >
    <div class="container-fluid">
      <div class="about-process__intro">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">How we work</p>
        <h2
          id="process-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          A clear path from hello to handover
        </h2>
      </div>
      <ol class="about-process__grid mt-12 list-none p-0 m-0">
        <li
          v-for="step in HOW_WE_WORK"
          :key="step.step"
          class="about-process-card listings-search-glass group"
        >
          <span class="about-process-card__step">{{ step.step }}</span>
          <div class="about-process-card__content relative z-[1]">
            <h3 class="about-process-card__title">{{ step.title }}</h3>
            <p class="about-process-card__text">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- Differentiators -->
  <section class="lg:py-20 py-14" aria-labelledby="why-kardosh-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Why Kardosh</p>
          <h2
            id="why-kardosh-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Built for serious UAE property buyers
          </h2>
          <p class="about-lead mt-4">
            We combine live market data with human advisory — so you compare like with like before you commit.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              :href="SOCIAL.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
            >
              <Linkedin class="size-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              :href="SOCIAL.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
            >
              <Instagram class="size-4" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <article
            v-for="item in ABOUT_DIFFERENTIATORS"
            :key="item.title"
            class="about-highlight-card rounded-2xl p-5 md:p-6"
          >
            <CheckCircle2 class="size-5 text-primary mb-3" aria-hidden="true" />
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="text-sm about-lead mt-2">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Animated counters — blur vignette (ui-layouts) -->
  <section class="about-metrics pb-16 md:pb-20" aria-label="Company metrics">
    <div class="container-fluid">
      <BlurVignette
        root-class="about-metrics__vignette w-full min-h-[16rem] md:min-h-[20rem] aspect-auto"
        radius="1.5rem"
        inset="10px"
        transition-length="100px"
        blur="15px"
      >
        <img
          :src="decorativeHeroImage.src"
          :srcset="decorativeHeroImage.srcset || undefined"
          :sizes="decorativeHeroImage.sizes || undefined"
          alt=""
          class="absolute inset-0 z-0 h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          loading="lazy"
          aria-hidden="true"
        />
        <div
          class="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-slate-950/35"
          aria-hidden="true"
        />
        <BlurVignetteArticle />
        <div
          class="about-metrics__content relative z-10 flex min-h-[16rem] md:min-h-[20rem] flex-col items-center justify-center px-6 py-10 md:px-10 md:py-12"
        >
          <ul class="about-metrics__grid list-none p-0 m-0 w-full max-w-4xl">
            <li v-for="(metric, i) in COUNTER_METRICS" :key="metric.label" class="text-center">
              <p class="about-metrics__value tabular-nums">
                {{ Math.floor(animatedCounts[i]) }}{{ metric.suffix }}
              </p>
              <p class="about-metrics__label">{{ metric.label }}</p>
            </li>
          </ul>
        </div>
      </BlurVignette>
    </div>
  </section>

  <!-- Team + testimonials — glossy band -->
  <div class="about-glossy-zone">
    <section class="about-team lg:py-20 py-14" aria-labelledby="team-heading">
      <div class="container-fluid">
        <div class="about-team__intro">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Our team</p>
          <h2
            id="team-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
          >
            Licensed advisors across the UAE
          </h2>
          <p class="about-lead mt-4">
            Specialists in off-plan, leasing, and investment advisory — here to guide every step of your transaction.
          </p>
        </div>

        <div class="about-team-carousel">
          <button
            type="button"
            class="about-team-carousel__nav about-team-carousel__nav--prev"
            aria-label="Previous team member"
          >
            <ChevronLeft class="size-5" aria-hidden="true" />
          </button>

          <Swiper
            :modules="teamSwiperModules"
            :slides-per-view="1.12"
            :space-between="16"
            :slides-per-group="1"
            :breakpoints="teamCarouselBreakpoints"
            :watch-overflow="!teamCarouselLoop"
            :loop="teamCarouselLoop"
            :autoplay="teamCarouselAutoplay"
            :navigation="{
              prevEl: '.about-team-carousel__nav--prev',
              nextEl: '.about-team-carousel__nav--next',
            }"
            class="about-team-carousel__swiper"
          >
            <SwiperSlide v-for="member in teamMembers" :key="member.id || member.name">
              <article
                class="about-team-card listings-search-glass group flex flex-col overflow-hidden"
              >
                <div class="about-team-card__media">
                  <img
                    :src="member.image"
                    :alt="member.name"
                    class="about-team-card__photo"
                    loading="lazy"
                  />
                </div>
                <div class="about-team-card__body">
                  <h3 class="about-team-card__name">{{ member.name }}</h3>
                  <p class="about-team-card__role">{{ member.title }}</p>
                  <div
                    v-if="teamDisplayLinks(member).length"
                    class="about-team-card__socials"
                    :aria-label="`Social links for ${member.name}`"
                  >
                    <a
                      v-for="link in teamDisplayLinks(member)"
                      :key="link.platform + link.url"
                      :href="link.href"
                      :target="link.platform === 'email' || link.platform === 'phone' ? undefined : '_blank'"
                      :rel="link.platform === 'email' || link.platform === 'phone' ? undefined : 'noopener noreferrer'"
                      class="about-team-card__social-link"
                      :aria-label="`${member.name} — ${link.label}`"
                    >
                      <component :is="link.icon" class="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>

          <button
            type="button"
            class="about-team-carousel__nav about-team-carousel__nav--next"
            aria-label="Next team member"
          >
            <ChevronRight class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials (same data as home — 4×2 grid) -->
    <section
      class="about-testimonials lg:py-20 py-14"
      aria-labelledby="testimonials-heading"
    >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Client stories</p>
        <h2
          id="testimonials-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          What our clients say
        </h2>
        <p class="about-lead mt-4">
          Real experiences from buyers and investors who worked with Kardosh Realty in Dubai.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        role="list"
      >
        <article
          v-for="(item, index) in aboutTestimonials"
          :key="`${item.name}-${index}`"
          role="listitem"
          class="about-testimonial-card listings-search-glass flex flex-col h-full"
        >
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-[15px] flex-1">
            {{ item.text }}
          </p>
          <div class="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
            <img
              :src="item.image"
              :alt="item.name"
              width="40"
              height="40"
              class="size-10 rounded-full object-cover shrink-0"
              loading="lazy"
            />
            <div class="min-w-0">
              <p class="font-medium text-slate-900 dark:text-white text-sm leading-snug">
                {{ item.name }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ item.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
    </section>
  </div>

  </div>

  <!-- Contact -->
  <section class="about-contact lg:py-20 py-14">
    <HomeGetInTouch :mt="false" />
  </section>

  <!-- CTA — blur vignette (matches communities / developers) -->
  <section class="about-cta pb-20 lg:pb-24">
    <div class="container-fluid">
      <BlurVignette
        root-class="about-cta__vignette w-full min-h-[20rem] md:min-h-[22rem] aspect-auto"
        radius="1.5rem"
        inset="10px"
        transition-length="100px"
        blur="15px"
      >
        <img
          :src="decorativeHeroImage.src"
          :srcset="decorativeHeroImage.srcset || undefined"
          :sizes="decorativeHeroImage.sizes || undefined"
          alt="UAE property advisory"
          class="absolute inset-0 z-0 h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/25"
          aria-hidden="true"
        />
        <BlurVignetteArticle />
        <div
          class="about-cta__content relative z-10 flex min-h-[20rem] md:min-h-[22rem] flex-col items-center justify-center px-8 py-10 text-center text-white md:px-12 md:py-14"
        >
          <h2 class="text-2xl font-semibold md:text-3xl">Ready to explore the UAE market?</h2>
          <p class="mt-3 max-w-2xl leading-relaxed text-white/85">
            Browse off-plan projects, open the map, or book a call with our Dubai team.
          </p>
          <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
            <RouterLink
              to="/off-plan"
              class="about-cta__btn-primary btn inline-flex items-center justify-center rounded-lg bg-white px-8 font-semibold hover:bg-slate-100"
            >
              View off-plan
            </RouterLink>
            <RouterLink
              to="/contact"
              class="btn inline-flex items-center justify-center rounded-lg border border-white/40 px-8 text-white hover:bg-white/10"
            >
              Contact us
            </RouterLink>
          </div>
        </div>
      </BlurVignette>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-vue-next'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import BlurVignette from '@/component/ui/BlurVignette.vue'
import BlurVignetteArticle from '@/component/ui/BlurVignetteArticle.vue'
import About from '@/component/about.vue'
import InternationalBrokerStrip from '@/component/kardosh/home/InternationalBrokerStrip.vue'
import HomeGetInTouch from '@/component/kardosh/home/HomeGetInTouch.vue'
import { BRAND, SOCIAL } from '@/config/brand'
import { PAGE_HERO_IMAGES, pageHeroImage } from '@/config/dubai-images'
import {
  ABOUT_STATS,
  ABOUT_MISSION,
  ABOUT_SERVICES,
  HOW_WE_WORK,
  COUNTER_METRICS,
  ABOUT_DIFFERENTIATORS,
} from '@/config/about'
import { getAboutPageTestimonials } from '@/config/testimonials'
import { testimonials } from '@/composables/useTestimonials'
import { teamMembers } from '@/composables/useTeam'
import { teamDisplayLinks } from '@/utils/teamLinks'

const aboutTestimonials = computed(() => getAboutPageTestimonials(testimonials.value))
const decorativeHeroImage = computed(() => pageHeroImage(PAGE_HERO_IMAGES.about))

/** Up to 4 visible on xl; loop + autoplay when more members are added */
const TEAM_VISIBLE_XL = 4
const teamSwiperModules = [Navigation, Autoplay]
const teamCarouselBreakpoints = {
  480: { slidesPerView: 1.35, spaceBetween: 18, slidesPerGroup: 1 },
  640: { slidesPerView: 2.1, spaceBetween: 20, slidesPerGroup: 1 },
  1024: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 1 },
  1280: { slidesPerView: TEAM_VISIBLE_XL, spaceBetween: 28, slidesPerGroup: 1 },
}
const teamCarouselLoop = computed(() => teamMembers.value.length > TEAM_VISIBLE_XL)
const teamCarouselAutoplay = computed(() =>
  teamCarouselLoop.value
    ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
    : false,
)

const animatedCounts = ref(COUNTER_METRICS.map(() => 0))

onMounted(() => {
  const duration = 1200
  const ends = COUNTER_METRICS.map((m) => m.target)
  const starts = ends.map(() => 0)
  const increments = ends.map((end, i) => (end - starts[i]) / (duration / 16))
  let current = [...starts]
  const timer = setInterval(() => {
    let done = true
    current = current.map((val, i) => {
      const next = val + increments[i]
      if (next < ends[i]) {
        done = false
        return next
      }
      return ends[i]
    })
    animatedCounts.value = [...current]
    if (done) clearInterval(timer)
  }, 16)
})
</script>
