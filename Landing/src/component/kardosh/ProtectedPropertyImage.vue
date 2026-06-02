<template>
  <div
    class="protected-property-image"
    :class="[
      fill ? 'protected-property-image--fill' : '',
      wrapperClass,
    ]"
    @contextmenu.prevent
  >
    <img
      :src="src"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      :sizes="sizes"
      :loading="loading"
      draggable="false"
      @dragstart.prevent
    />
    <PropertyImageWatermark :size="watermarkSize" />
  </div>
</template>

<script setup>
import PropertyImageWatermark from '@/component/kardosh/PropertyImageWatermark.vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
  loading: { type: String, default: 'lazy' },
  width: { type: [Number, String], default: 651 },
  height: { type: [Number, String], default: 394 },
  sizes: { type: String, default: '(max-width: 1024px) 90vw, 400px' },
  watermarkSize: { type: String, default: 'md' },
  /** Image fills the wrapper (absolute inset-0 cover) */
  fill: { type: Boolean, default: false },
})
</script>
