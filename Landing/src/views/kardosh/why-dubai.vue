<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    title="Dubai property investment guide"
    subtitle="Best areas to invest in Dubai, off plan investment, golden visa property rules, and high ROI communities — explained by Kardosh Realty."
    :image="PAGE_HERO_IMAGES.whyDubai"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="why-dubai-stats listings-search-glass kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none m-0"
      >
        <li v-for="stat in WHY_DUBAI_STATS" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Intro + visual -->
  <section class="lg:py-20 py-14" aria-labelledby="why-dubai-intro-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div class="lg:col-span-7 relative group">
          <div
            class="relative rounded-2xl overflow-hidden shadow-xl min-h-[280px] lg:min-h-[420px] aspect-[4/3] lg:aspect-auto"
          >
            <img
              :src="SECTION_IMAGES.whyInvest"
              :srcset="WHY_INVEST_SRCSET"
              :sizes="WHY_INVEST_SIZES"
              alt="Dubai skyline along the waterfront"
              width="1600"
              height="1200"
              class="absolute inset-0 w-full h-full object-cover object-[center_40%] transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"
              aria-hidden="true"
            />
            <div class="absolute bottom-0 inset-x-0 p-6 md:p-8">
              <p class="text-white/90 text-sm md:text-base leading-relaxed max-w-xl">
                {{ WHY_DUBAI_INTRO.body }}
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col">
          <div
            class="flex flex-1 flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-8"
          >
            <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Overview</p>
            <h2
              id="why-dubai-intro-heading"
              class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
            >
              {{ WHY_DUBAI_INTRO.title }}
            </h2>
            <ul class="mt-6 space-y-3 flex-1 list-none p-0" role="list">
              <li
                v-for="point in INTRO_POINTS"
                :key="point"
                class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
              >
                <Check class="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
            <div class="why-dubai-intro__cta mt-8">
              <KardoshSlideButton
                label="Browse off-plan"
                to="/off-plan"
                fluid
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Investment advantages -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="advantages-heading"
  >
    <div class="container-fluid">
      <div class="why-dubai-advantages__intro">
        <h2
          id="advantages-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight"
        >
          Six reasons investors choose Dubai
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          From tax treatment to payment flexibility — the UAE remains a leading destination for international property capital.
        </p>
      </div>

      <div class="why-dubai-advantages__grid mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <article
          v-for="(item, i) in INVESTMENT_ADVANTAGES"
          :key="item.title"
          class="why-dubai-advantage-card group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 transition hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md"
        >
          <div class="why-dubai-advantage-card__icon">
            <component :is="ADVANTAGE_ICONS[i]" class="size-5" aria-hidden="true" />
          </div>
          <h3 class="font-semibold text-slate-900 dark:text-white mt-4">{{ item.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Buyer journey -->
  <section class="lg:py-20 py-14" aria-labelledby="journey-heading">
    <div class="container-fluid">
      <div class="why-dubai-journey__intro">
        <h2
          id="journey-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white"
        >
          Your path from enquiry to keys
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          A clear, licensed process — whether you are buying off-plan or ready stock from overseas.
        </p>
      </div>

      <ol class="why-dubai-journey__grid mt-12 list-none p-0 m-0">
        <li
          v-for="step in BUYER_JOURNEY_STEPS"
          :key="step.step"
          class="why-dubai-journey-card listings-search-glass group"
        >
          <span class="why-dubai-journey-card__step">{{ step.step }}</span>
          <div class="why-dubai-journey-card__content relative z-[1]">
            <h3 class="why-dubai-journey-card__title">{{ step.title }}</h3>
            <p class="why-dubai-journey-card__text">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- Golden Visa & residency -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="visa-heading"
  >
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Residency</p>
          <h2
            id="visa-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Property and long-term stay
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Qualifying real estate investments may support UAE residency visas. Rules evolve — we flag thresholds at enquiry and recommend specialist immigration advice for your nationality.
          </p>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-1 gap-4">
          <article
            v-for="item in GOLDEN_VISA_HIGHLIGHTS"
            :key="item.title"
            class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 md:p-6 flex gap-4"
          >
            <Stamp class="size-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Off-plan vs ready -->
  <section class="lg:py-20 py-14" aria-labelledby="compare-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Compare strategies</p>
        <h2
          id="compare-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          Off-plan vs ready property
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Many international buyers blend both — off-plan for growth and payment plans, ready stock for immediate income.
        </p>
      </div>

      <div class="mt-10 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <article
          v-for="col in [OFF_PLAN_VS_READY.offPlan, OFF_PLAN_VS_READY.ready]"
          :key="col.title"
          class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-8"
        >
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ col.title }}</h3>
          <ul class="mt-5 space-y-3 list-none p-0">
            <li
              v-for="(point, i) in col.points"
              :key="i"
              class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
            >
              <Check class="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- RERA safeguards -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="rera-heading"
  >
    <div class="container-fluid">
      <div class="why-dubai-rera__intro">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Regulation</p>
        <h2
          id="rera-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          A regulated market you can verify
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Dubai’s framework is designed to protect off-plan buyers — understand the basics before you sign.
        </p>
      </div>
      <div class="why-dubai-rera__grid mt-10">
        <article
          v-for="item in RERA_SAFEGUARDS"
          :key="item.title"
          class="why-dubai-rera-card listings-search-glass group"
        >
          <div class="why-dubai-rera-card__icon" aria-hidden="true">
            <ShieldCheck class="size-5" />
          </div>
          <h3 class="why-dubai-rera-card__title">{{ item.title }}</h3>
          <p class="why-dubai-rera-card__text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Top districts -->
  <section class="lg:py-20 py-14" aria-labelledby="districts-heading">
    <div class="container-fluid">
      <div class="why-dubai-districts__intro">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Where to buy</p>
        <h2
          id="districts-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          Popular investment corridors
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Explore community pages for live off-plan stock in each area.
        </p>
        <RouterLink to="/communities" class="why-dubai-districts__all-link">
          All UAE communities
          <ArrowRight class="size-4" aria-hidden="true" />
        </RouterLink>
      </div>

      <div class="why-dubai-districts__grid mt-10">
        <article
          v-for="d in TOP_INVESTMENT_DISTRICTS"
          :key="d.slug"
          class="why-dubai-district-card community-card--luxury kardosh-property-card--luxury listings-search-glass group flex flex-col"
        >
          <div class="why-dubai-district-card__content flex flex-1 flex-col min-w-0">
            <RouterLink
              :to="`/communities/${d.slug}`"
              class="why-dubai-district-card__title"
            >
              {{ d.name }}
            </RouterLink>
            <p class="why-dubai-district-card__tagline">{{ d.tagline }}</p>
            <div class="community-card__footer">
              <div>
                <p class="kardosh-property-card__price-label">Community</p>
                <p class="kardosh-property-card__price-value">{{ d.name }}</p>
              </div>
              <RouterLink
                :to="`/communities/${d.slug}`"
                class="kardosh-property-card__cta"
                :aria-label="`Visit ${d.name}`"
              >
                <span class="kardosh-property-card__cta-text">Visit</span>
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

  <!-- FAQ -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="faq-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center mb-10">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">FAQ</p>
        <h2
          id="faq-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          Common investor questions
        </h2>
      </div>

      <div class="max-w-3xl mx-auto space-y-3">
        <details
          v-for="item in WHY_DUBAI_FAQ"
          :key="item.id"
          class="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 font-semibold text-slate-900 dark:text-white marker:content-none [&::-webkit-details-marker]:hidden"
          >
            {{ item.question }}
            <ChevronDown
              class="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p class="px-5 pb-5 md:px-6 md:pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="pb-20 lg:pb-24">
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-primary px-8 py-10 md:px-12 md:py-14 text-center text-white"
      >
        <h2 class="text-2xl md:text-3xl font-semibold">Start your Dubai property journey</h2>
        <p class="text-white/80 mt-3 max-w-2xl mx-auto leading-relaxed">
          Browse live off-plan projects, explore communities, or speak with our Dubai advisory team.
        </p>
        <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
          <RouterLink
            to="/off-plan"
            class="btn bg-white text-primary hover:bg-slate-100 rounded-lg inline-flex items-center justify-center px-8 font-semibold"
          >
            View off-plan catalogue
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn border border-white/40 text-white hover:bg-white/10 rounded-lg inline-flex items-center justify-center px-8"
          >
            Contact advisory
          </RouterLink>
          <RouterLink
            to="/grid-map"
            class="btn border border-white/40 text-white hover:bg-white/10 rounded-lg inline-flex items-center justify-center px-8"
          >
            Explore map
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  Award,
  CalendarClock,
  Check,
  ChevronDown,
  Globe2,
  Percent,
  ShieldCheck,
  Stamp,
  TrendingUp,
} from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import { PAGE_HERO_IMAGES, SECTION_IMAGES, WHY_INVEST_SIZES, WHY_INVEST_SRCSET } from '@/config/dubai-images'
import {
  WHY_DUBAI_STATS,
  WHY_DUBAI_INTRO,
  INVESTMENT_ADVANTAGES,
  BUYER_JOURNEY_STEPS,
  GOLDEN_VISA_HIGHLIGHTS,
  OFF_PLAN_VS_READY,
  RERA_SAFEGUARDS,
  TOP_INVESTMENT_DISTRICTS,
  WHY_DUBAI_FAQ,
} from '@/config/why-dubai'

const INTRO_POINTS = [
  'Freehold ownership for foreigners in designated zones',
  'Live off-plan catalogue with AED pricing via Reelly',
  'Licensed brokerage and developer-backed payment plans',
]

const ADVANTAGE_ICONS = [Percent, TrendingUp, Award, CalendarClock, ShieldCheck, Globe2]
</script>
