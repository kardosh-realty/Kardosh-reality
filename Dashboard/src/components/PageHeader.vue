<template>
  <div>
    <h5 class="text-lg font-semibold">{{ title }}</h5>
    <p v-if="crumb" class="text-slate-400 text-sm mt-1">{{ crumb }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  crumb: { type: String, default: '' },
})
</script>
