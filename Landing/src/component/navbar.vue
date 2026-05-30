<template>
  <KardoshHeader :hero-light="useNavLight" />
</template>

<script setup>
import { computed } from 'vue'
import KardoshHeader from '@/component/ui/KardoshHeader.vue'

const props = defineProps({
  navClass: { type: String, default: '' },
  topnavClass: { type: String, default: '' },
  tagLine: { type: Boolean, default: false },
})

/** Transparent header over dark hero (legacy `navbar-white` prop) */
const useNavLight = computed(
  () => Boolean(props.navClass) && props.navClass !== ''
)
</script>
