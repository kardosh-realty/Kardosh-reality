<template>
  <Navbar nav-class="navbar-white" />

  <section class="not-found-page relative lg:py-24 py-16 min-h-[70vh] flex items-center">
    <div class="container-fluid">
      <div class="not-found-page__card mx-auto max-w-xl text-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-6 py-10 md:px-10 md:py-12">
        <p class="not-found-page__code text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          404
        </p>
        <h1 class="mt-4 text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight">
          Page not found
        </h1>
        <p class="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
          This address is not on the public Kardosh Realty website. The link may be outdated, or you may
          have opened an <strong class="font-medium text-slate-700 dark:text-slate-200">admin</strong> page
          on the marketing site by mistake.
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

        <p v-if="adminDashboardUrl" class="mt-8 text-sm text-slate-500 dark:text-slate-400">
          <template v-if="route.path === '/inquiries'">
            Contact form inquiries are in the admin app.
          </template>
          <template v-else>
            Admin pages (inquiries, settings, reports) are on a separate dashboard.
          </template>
          <a
            :href="route.path === '/inquiries' && adminInquiriesUrl ? adminInquiriesUrl : adminDashboardUrl"
            class="text-primary font-semibold hover:underline ms-1"
          >Open dashboard</a>
        </p>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import { dashboardUrl } from '@/config/dashboard'

const route = useRoute()

const adminDashboardUrl = computed(() => dashboardUrl('/login'))
const adminInquiriesUrl = computed(() => dashboardUrl('/inquiries'))
</script>
