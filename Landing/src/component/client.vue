<template>
  <HomeTestimonials :mt="mt" />
</template>

<script setup>
import HomeTestimonials from '@/component/kardosh/home/HomeTestimonials.vue'

defineProps({
  mt: {
    type: Boolean,
    default: true,
  },
})
</script>
