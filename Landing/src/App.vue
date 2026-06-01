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
  <RouterView v-slot="{ Component }">
    <div v-if="Component" class="page-view">
      <component :is="Component" />
    </div>
  </RouterView>
  <WhatsAppFloat v-if="!hideChrome" />
  <ScrollToTop v-if="!hideChrome" />
</template>