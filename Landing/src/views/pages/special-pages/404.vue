<template>
  <Navbar />

  <section class="not-found-page relative lg:py-24 py-16 min-h-[70vh] flex items-center bg-white dark:bg-slate-900">
    <div class="container-fluid">
      <div class="not-found-page__card mx-auto max-w-xl text-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-6 py-10 md:px-10 md:py-12">
        <p class="not-found-page__code text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          404
        </p>
        <h1 class="mt-4 text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight">
          Page not found
        </h1>
        <p class="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
          The page you are looking for does not exist or may have moved. Try one of the links below or
          return to the homepage.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <RouterLink
            to="/"
            class="btn bg-primary hover:bg-primary-dark border-primary text-white rounded-lg px-6"
          >
            Back to home
          </RouterLink>
          <RouterLink
            to="/off-plan"
            class="btn border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-6 hover:border-primary hover:text-primary"
          >
            Browse off-plan
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-6 hover:border-primary hover:text-primary"
          >
            Contact us
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
</script>
