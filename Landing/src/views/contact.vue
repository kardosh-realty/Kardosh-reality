<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    :title="hero.title"
    :subtitle="hero.subtitle"
    :image="PAGE_HERO_IMAGES.contact"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md px-4 py-6 md:px-8"
      >
        <li v-for="stat in contactStats" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Enquiry, visit details & map (single panel) -->
  <HomeGetInTouch :mt="false" page-mode show-map />

  <!-- What to expect -->
  <section class="lg:py-20 py-14" aria-labelledby="expect-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{{ expectationsIntro.eyebrow }}</p>
        <h2
          id="expect-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          {{ expectationsIntro.heading }}
        </h2>
      </div>
      <div class="mt-10 grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
        <article
          v-for="(item, index) in contactExpectations"
          :key="item.title"
          class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center"
        >
          <span
            class="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold tabular-nums"
          >
            {{ index + 1 }}
          </span>
          <h3 class="font-semibold text-slate-900 dark:text-white mt-4">{{ item.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="contact-faq-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center mb-10">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{{ faqIntro.eyebrow }}</p>
        <h2
          id="contact-faq-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          {{ faqIntro.heading }}
        </h2>
      </div>
      <div class="max-w-3xl mx-auto space-y-3">
        <details
          v-for="item in contactFaq"
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
          <p
            class="px-5 pb-5 md:px-6 md:pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4"
          >
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>

  <!-- CTA — blur vignette (matches communities / developers / about) -->
  <section class="contact-cta pb-20 lg:pb-24">
    <div class="container-fluid">
      <BlurVignette
        root-class="contact-cta__vignette w-full min-h-[20rem] md:min-h-[22rem] aspect-auto"
        radius="1.5rem"
        inset="10px"
        transition-length="100px"
        blur="15px"
      >
        <img
          :src="decorativeHeroImage.src"
          :srcset="decorativeHeroImage.srcset || undefined"
          :sizes="decorativeHeroImage.sizes || undefined"
          :alt="t('contact.page.mapAlt')"
          class="absolute inset-0 z-0 h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/25"
          aria-hidden="true"
        />
        <BlurVignetteArticle />
        <div
          class="contact-cta__content relative z-10 flex min-h-[20rem] md:min-h-[22rem] flex-col items-center justify-center px-8 py-10 text-center text-white md:px-12 md:py-14"
        >
          <h2 class="text-2xl font-semibold md:text-3xl">{{ contactCta.heading }}</h2>
          <p class="mt-3 max-w-2xl leading-relaxed text-white/85">
            {{ contactCtaBody }}
          </p>
          <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
            <RouterLink
              to="/off-plan"
              class="contact-cta__btn-primary btn inline-flex items-center justify-center rounded-lg bg-white px-8 font-semibold hover:bg-slate-100"
            >
              {{ contactCta.viewOffPlan }}
            </RouterLink>
            <RouterLink
              to="/why-dubai"
              class="btn inline-flex items-center justify-center rounded-lg border border-white/40 px-8 text-white hover:bg-white/10"
            >
              {{ contactCta.whyDubai }}
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
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import BlurVignette from '@/component/ui/BlurVignette.vue'
import BlurVignetteArticle from '@/component/ui/BlurVignetteArticle.vue'
import HomeGetInTouch from '@/component/kardosh/home/HomeGetInTouch.vue'
import { PAGE_HERO_IMAGES, pageHeroImage } from '@/config/dubai-images'
import { usePageHero } from '@/composables/usePageHero'
import { useMessages } from '@/composables/useMessages'
import { useT } from '@/composables/useT'
import { BRAND } from '@/config/brand'

const t = useT()
const messages = useMessages()
const hero = usePageHero('contact')
const decorativeHeroImage = computed(() => pageHeroImage(PAGE_HERO_IMAGES.contact))

const contact = computed(() => messages.value.contact || {})

const contactStats = computed(() => {
  const stats = contact.value.stats || []
  return stats.map((stat) => ({
    ...stat,
    value: String(stat.value).replace('{license}', BRAND.reraLicense),
  }))
})

const expectationsIntro = computed(() => {
  const e = contact.value.expectations
  if (e?.items) {
    return { eyebrow: e.eyebrow, heading: e.heading }
  }
  return contact.value.page?.expectationsSection || { eyebrow: '', heading: '' }
})

const contactExpectations = computed(() => {
  const e = contact.value.expectations
  if (Array.isArray(e)) return e
  return e?.items || []
})

const faqIntro = computed(() => {
  const f = contact.value.faq
  if (f?.items) {
    return { eyebrow: f.eyebrow, heading: f.heading }
  }
  return contact.value.page?.faqSection || { eyebrow: '', heading: '' }
})

const contactFaq = computed(() => {
  const f = contact.value.faq
  if (Array.isArray(f)) return f
  return f?.items || []
})

const contactCta = computed(() => {
  const c = contact.value.cta || contact.value.page?.cta || {}
  return {
    heading: c.heading || '',
    viewOffPlan: c.viewOffPlan || t('common.viewAllOffPlan'),
    whyDubai: c.whyDubai || '',
  }
})

const contactCtaBody = computed(() => contact.value.cta?.body || contact.value.cta?.lead || '')
</script>
