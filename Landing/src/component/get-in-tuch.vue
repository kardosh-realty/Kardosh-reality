<template>
  <HomeGetInTouch :mt="mt" />
</template>

<script setup>
import HomeGetInTouch from '@/component/kardosh/home/HomeGetInTouch.vue'

defineProps({
  mt: {
    type: Boolean,
    default: true,
  },
})
</script>
