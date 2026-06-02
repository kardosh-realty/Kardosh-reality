<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import Sidebar from './components/sidebar.vue'
import TopHeader from './components/top-header.vue'
import ToastContainer from './components/ToastContainer.vue'
import { initAuth } from '@/composables/useAuth'

initAuth()

const route = useRoute()

const toggle = ref(false)

const authPages = [
  '/login',
  '/signup',
  '/signup-success',
  '/reset-password',
  '/lock-screen',
  '/comingsoon',
  '/maintenance',
  '/error',
  '/thankyou'
]

const isAuthPage = computed(() => {
  return authPages.includes(route.path)
})
</script>

<template>
  <template v-if="isAuthPage">

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

  </template>

  <template v-else>

    <div :class="toggle ? 'page-wrapper' : 'toggled page-wrapper'">

      <Sidebar />

      <main class="page-content bg-gray-50 dark:bg-slate-800">

        <TopHeader :toggle="toggle" :setToggle="(value) => toggle = value" />

          <RouterView v-slot="{ Component }">
            <Transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>

      </main>
    </div>

  </template>

  <ToastContainer />
</template>

<style>
/* Smooth route/tab transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}
</style>