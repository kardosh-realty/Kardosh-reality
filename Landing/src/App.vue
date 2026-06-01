<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useRouteSeo } from '@/composables/useSeo'
import ScrollToTop from './component/scroll-to-top.vue'
import WhatsAppFloat from './component/kardosh/WhatsAppFloat.vue'
import AnalyticsScripts from './component/kardosh/AnalyticsScripts.vue'
import PaletteDevSwitcher from './component/kardosh/PaletteDevSwitcher.vue'

const route = useRoute()
useRouteSeo()

// Hide floating widgets on embed previews and standalone flows (e.g. customer review link).
const hideChrome = computed(
  () =>
    route.query.embed === '1' ||
    route.query.embed === 'true' ||
    route.name === 'share-review'
)

/** Skip route crossfade on embed / standalone flows (avoids layout flash). */
const pageTransitionEnabled = computed(() => !hideChrome.value)

const pageTransitionName = computed(() =>
  pageTransitionEnabled.value ? 'page-cross' : undefined
)
</script>

<template>
  <AnalyticsScripts />
  <div class="page-transition-root">
    <RouterView v-slot="{ Component, route: activeRoute }">
      <!-- Single root wrapper required — route SFCs use fragments (Navbar + sections). -->
      <Transition :name="pageTransitionName">
        <div
          v-if="Component"
          :key="activeRoute.fullPath"
          class="page-view"
        >
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </div>
  <WhatsAppFloat v-if="!hideChrome" />
  <ScrollToTop v-if="!hideChrome" />
  <PaletteDevSwitcher />
</template>