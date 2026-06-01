<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import ScrollToTop from './component/scroll-to-top.vue'
import WhatsAppFloat from './component/kardosh/WhatsAppFloat.vue'
import AnalyticsScripts from './component/kardosh/AnalyticsScripts.vue'

const route = useRoute()

// Hide floating widgets on embed previews and standalone flows (e.g. customer review link).
const hideChrome = computed(
  () =>
    route.query.embed === '1' ||
    route.query.embed === 'true' ||
    route.name === 'share-review'
)
</script>

<template>
  <AnalyticsScripts />
  <RouterView v-slot="{ Component, route }">
    <Transition name="page-cross" mode="out-in">
      <!-- Use route name so /developer/damac → /developer/12-damac redirects do not remount and blank the transition -->
      <div v-if="Component" :key="route.name || route.path" class="page-view">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
  <WhatsAppFloat v-if="!hideChrome" />
  <ScrollToTop v-if="!hideChrome" />
</template>