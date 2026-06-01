<template>
  <section class="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
    <div class="max-w-md w-full text-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm px-6 py-10">
      <RouterLink to="/" class="inline-flex justify-center mb-6">
        <BrandLogo variant="icon" size="lg" />
      </RouterLink>
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary">404</p>
      <h1 class="mt-4 text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p class="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        This page does not exist in the Kardosh admin dashboard. Check the URL or return to the overview.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <RouterLink
          to="/"
          class="btn bg-primary hover:bg-primary-dark border-primary text-white rounded-md px-6"
        >
          Dashboard home
        </RouterLink>
        <RouterLink
          to="/inquiries"
          class="btn border border-slate-200 dark:border-slate-600 rounded-md px-6 text-slate-700 dark:text-slate-200"
        >
          Inquiries
        </RouterLink>
      </div>
      <p v-if="publicSiteUrl" class="mt-8 text-xs text-slate-400">
        Public website:
        <a :href="publicSiteUrl" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
          {{ publicSiteUrl }}
        </a>
      </p>
    </div>
  </section>
</template>

<script setup>
import BrandLogo from '@/components/BrandLogo.vue'
import { BRAND } from '@/config/brand'

const publicSiteUrl = import.meta.env.VITE_MAIN_SITE_URL || ''
</script>
