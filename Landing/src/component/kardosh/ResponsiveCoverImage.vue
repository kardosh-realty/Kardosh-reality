<template>
  <picture v-if="resolved.srcset" class="responsive-cover-image" v-bind="$attrs">
    <img
      :src="resolved.src"
      :srcset="resolved.srcset"
      :sizes="resolved.sizes"
      alt=""
      class="responsive-cover-image__img"
      :class="imgClass"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
      aria-hidden="true"
    />
  </picture>
  <img
    v-else-if="resolved.src"
    :src="resolved.src"
    alt=""
    class="responsive-cover-image__img"
    :class="imgClass"
    v-bind="$attrs"
    :loading="loading"
    :fetchpriority="fetchpriority"
    decoding="async"
    aria-hidden="true"
  />
</template>

<script setup>
import { computed } from 'vue'
import { pageHeroImage } from '@/config/dubai-images'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: 'auto' },
})

const resolved = computed(() => pageHeroImage(props.src))
</script>

<style scoped>
.responsive-cover-image,
.responsive-cover-image__img {
  display: block;
  width: 100%;
  height: 100%;
}

.responsive-cover-image__img {
  object-fit: cover;
  object-position: center;
}
</style>
