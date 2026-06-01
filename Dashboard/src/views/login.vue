<template>
  <section
    class="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
    :style="{ backgroundImage: `url(${pageBg})` }"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-slate-950/70"></div>
    <div class="login-card relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl flex bg-white dark:bg-slate-900 shadow-xl">
      <!-- Left side - brand panel -->
      <div
        class="hidden md:block w-1/2 relative overflow-hidden border-r border-gray-100 dark:border-slate-800 bg-cover bg-center"
        :style="{ backgroundImage: `url(${bg})` }"
      >
        <div class="login-brand-gradient absolute inset-0" aria-hidden="true"></div>

        <div class="login-panel-content relative z-10 h-full min-h-[560px] flex flex-col items-center justify-center p-10 text-center">
          <RouterLink to="/" class="mb-6 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-4 shadow-lg shadow-black/20">
            <BrandLogo variant="full" size="auth" />
          </RouterLink>
          <h2 class="text-3xl font-bold mb-3 text-white">{{ BRAND.name }}</h2>
          <p class="text-sm text-white/80 max-w-xs leading-relaxed">
            Sign in to manage listings, inquiries, and off-plan visibility for the public Kardosh Realty website.
          </p>
          <p class="text-xs text-white/60 mt-8">{{ reraLabel }}</p>
        </div>
      </div>

      <!-- Right side - form -->
      <div class="login-form-side w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div class="md:hidden flex justify-center mb-8">
          <RouterLink to="/">
            <BrandLogo variant="full" size="auth" />
          </RouterLink>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold mb-1 text-gray-800 dark:text-white">Welcome back</h1>
        <p class="text-gray-500 dark:text-slate-400 mb-8">Sign in to your admin account</p>

        <form class="space-y-5" @submit.prevent="onSubmit">
          <div
            v-if="errorMsg"
            class="rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-3 text-sm text-red-700 dark:text-red-200"
          >
            {{ errorMsg }}
          </div>

          <div>
            <label for="LoginEmail" class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Email <span class="text-primary">*</span>
            </label>
            <input
              id="LoginEmail"
              v-model.trim="email"
              type="email"
              required
              autocomplete="username"
              placeholder="admin@kardoshrealty.ae"
              class="flex h-11 w-full rounded-md border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label for="LoginPassword" class="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Password <span class="text-primary">*</span>
            </label>
            <div class="relative">
              <input
                id="LoginPassword"
                v-model="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                required
                autocomplete="current-password"
                placeholder="Enter your password"
                class="flex h-11 w-full rounded-md border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 pr-10 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-white"
                :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
                @click="isPasswordVisible = !isPasswordVisible"
              >
                <EyeOff v-if="isPasswordVisible" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>
          </div>

          <div class="pt-1">
            <button
              type="submit"
              :disabled="loading"
              class="login-submit group relative w-full overflow-hidden rounded-lg py-3 text-white font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span class="flex items-center justify-center">
                {{ loading ? 'Signing in…' : 'Sign in' }}
                <ArrowRight v-if="!loading" class="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>

        </form>

        <div class="text-center mt-8">
          <a :href="mainSite" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-primary text-sm">
            View public website <i class="ri-external-link-line" />
          </a>
        </div>

        <p class="text-center text-xs text-slate-400 mt-6">© {{ year }} {{ BRAND.name }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Eye, EyeOff, ArrowRight } from 'lucide-vue-next'

import BrandLogo from '@/components/BrandLogo.vue'
import { BRAND, RERA_LICENSE_LABEL } from '@/config/brand'
import { MAIN_SITE_URL } from '@/config/navigation'
import { useAuth } from '@/composables/useAuth'
import bg from '@/assets/images/bg/001.webp'
import pageBg from '@/assets/images/01.jpg'

const year = new Date().getFullYear()
const reraLabel = RERA_LICENSE_LABEL
const mainSite = MAIN_SITE_URL

const route = useRoute()
const router = useRouter()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
const loading = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  errorMsg.value = ''
  loading.value = true
  try {
    await signIn(email.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.replace(redirect)
  } catch (e) {
    errorMsg.value = e.message || 'Could not sign in.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  animation: login-card-in 0.5s ease both;
}
.login-panel-content,
.login-form-side > * {
  animation: login-fade-up 0.5s ease both;
}
.login-form-side > * {
  animation-delay: 0.15s;
}

@keyframes login-card-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes login-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-card,
  .login-panel-content,
  .login-form-side > * {
    animation: none;
  }
}
</style>
