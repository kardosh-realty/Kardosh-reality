<template>
  <div :class="className" class="testimonials-column h-full min-h-0 w-full min-w-0 flex-1">
    <div
      class="testimonials-column__track flex flex-col gap-5 pb-5 bg-white dark:bg-slate-900"
      :style="{ animationDuration: `${duration}s` }"
    >
      <template v-for="copy in 2" :key="copy">
        <article
          v-for="(item, i) in testimonials"
          :key="`${copy}-${i}`"
          class="p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg shadow-primary/10 w-full max-w-none shrink-0"
        >
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">{{ item.text }}</p>
          <div class="flex items-center gap-3 mt-5">
            <img
              :src="item.image"
              :alt="item.name"
              width="40"
              height="40"
              class="size-10 rounded-full object-cover shrink-0"
              loading="lazy"
            />
            <div class="flex flex-col min-w-0">
              <p class="font-medium tracking-tight leading-5 text-slate-900 dark:text-white">
                {{ item.name }}
              </p>
              <p class="text-sm leading-5 text-slate-500 dark:text-slate-400 tracking-tight">
                {{ item.role }}
              </p>
            </div>
          </div>
        </article>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  testimonials: { type: Array, required: true },
  className: { type: String, default: '' },
  duration: { type: Number, default: 10 },
})
</script>
