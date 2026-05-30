<template>
  <section class="container py-24 text-center">
    <h1 class="text-3xl font-semibold text-slate-900 dark:text-white">Coming soon</h1>
    <p class="mt-4 text-slate-600 dark:text-slate-400">
      The launch page is a separate app in
      <code class="text-sm">Hously_VueJs/Welcome</code>.
      Run <code class="text-sm">npm run dev</code> there, or deploy that folder on Vercel.
    </p>
    <a
      v-if="welcomeUrl"
      :href="welcomeUrl"
      class="btn bg-primary mt-8 inline-block rounded-md px-6 py-2 text-white"
    >
      Open welcome preview
    </a>
  </section>
  <Switcher />
</template>

<script setup>
import Switcher from '@/component/switcher.vue'

const welcomeUrl = import.meta.env.VITE_WELCOME_URL || ''
</script>
