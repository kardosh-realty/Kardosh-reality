<template>
  <section
    class="page-hero relative table w-full bg-no-repeat bg-center bg-cover"
    :class="[
      compact ? 'page-hero--compact' : 'page-hero--default',
      { 'bg-slate-900': !image },
    ]"
    :style="image ? { backgroundImage: `url(${image})` } : undefined"
  >
    <div
      class="absolute inset-0"
      :class="image ? 'bg-slate-900/75' : 'bg-gradient-to-br from-slate-900 via-slate-900 to-primary/30'"
    />
    <div class="container relative text-center z-[1]">
      <KardoshBreadcrumbs variant="hero" />
      <p v-if="eyebrow" class="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
        {{ eyebrow }}
      </p>
      <h1 class="font-semibold text-white page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="text-white/70 mt-3 max-w-2xl mx-auto page-hero__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </section>
  <div v-if="!hideShape" class="relative">
    <div class="shape overflow-hidden z-1 text-white dark:text-slate-900 -mt-px">
      <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto block">
        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import KardoshBreadcrumbs from '@/component/kardosh/KardoshBreadcrumbs.vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  image: { type: String, default: '' },
  /** Shorter hero (map, dense pages) */
  compact: { type: Boolean, default: false },
  /** Skip wave divider (map page) */
  hideShape: { type: Boolean, default: false },
})
</script>

<style scoped>
.page-hero--default {
  padding-top: calc(5rem + 1.5rem);
  padding-bottom: 4.5rem;
}

@media (min-width: 1024px) {
  .page-hero--default {
    padding-top: calc(5.25rem + 2rem);
    padding-bottom: 5.5rem;
  }
}

.page-hero--compact {
  padding-top: calc(5rem + 0.75rem);
  padding-bottom: 1.25rem;
}

@media (max-width: 639px) {
  .page-hero--compact {
    padding-top: calc(4.5rem + 0.5rem);
    padding-bottom: 0.875rem;
  }
}

.page-hero__title {
  font-size: 1.5rem;
  line-height: 1.25;
}

@media (min-width: 768px) {
  .page-hero__title {
    font-size: 1.875rem;
  }
}

.page-hero--default .page-hero__title {
  font-size: 1.875rem;
}

@media (min-width: 768px) {
  .page-hero--default .page-hero__title {
    font-size: 2.25rem;
  }
}

.page-hero__subtitle {
  font-size: 0.9375rem;
}

.page-hero--default .page-hero__subtitle {
  font-size: 1.125rem;
}
</style>
