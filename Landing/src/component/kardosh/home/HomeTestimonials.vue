<template>
  <section
    class="relative bg-white dark:bg-slate-900"
    :class="mt ? 'lg:mt-24 mt-16' : 'mt-0'"
    aria-labelledby="testimonials-heading"
  >
    <div class="testimonials-section__inner z-10 relative w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
      <div
        class="flex flex-col items-center justify-center max-w-3xl mx-auto text-center testimonials-header"
        :class="{ 'is-visible': headerVisible }"
      >
        <h2
          id="testimonials-heading"
          class="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          {{ t('home.testimonials.heading') }}
        </h2>
        <p class="text-center mt-5 text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {{ t('home.testimonials.subheading') }}
        </p>
      </div>

      <div
        class="testimonials-columns grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full mt-10 lg:mt-12 max-h-[920px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
      >
        <TestimonialsColumn
          v-for="(col, index) in columns"
          :key="index"
          :testimonials="col"
          :duration="columnDurations[index]"
          :class-name="columnClass(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TestimonialsColumn from '@/component/ui/TestimonialsColumn.vue'
import { splitTestimonialsIntoColumns } from '@/config/testimonials'
import { testimonials } from '@/composables/useTestimonials'
import { useT } from '@/composables/useT'

defineProps({
  mt: { type: Boolean, default: true },
})

const t = useT()
const headerVisible = ref(false)

const columns = computed(() => splitTestimonialsIntoColumns(testimonials.value))

const columnDurations = [15, 19, 17, 21]

/** Progressive reveal: 1 → 2 → 4 columns */
function columnClass(index) {
  if (index === 0) return ''
  if (index === 1) return 'hidden sm:block'
  if (index === 2) return 'hidden md:block'
  return 'hidden lg:block'
}

onMounted(() => {
  requestAnimationFrame(() => {
    headerVisible.value = true
  })
})
</script>

<style scoped>
.testimonials-header {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}

.testimonials-header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-header {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
