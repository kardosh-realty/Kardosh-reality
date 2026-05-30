<template>
  <article
    class="developer-card community-card--luxury group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5"
  >
    <RouterLink
      :to="profileTo"
      class="developer-card__head flex items-center gap-4 p-5 md:p-6 border-b border-slate-100 dark:border-slate-800"
    >
      <div
        class="developer-card__logo shrink-0 size-16 md:size-[4.5rem] rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden"
      >
        <img
          v-if="developer.logo?.url"
          :src="developer.logo.url"
          :alt="developer.name"
          class="max-w-full max-h-full object-contain p-2"
          loading="lazy"
        />
        <span
          v-else
          class="text-2xl font-semibold text-primary"
        >{{ developer.name?.charAt(0) }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">
          {{ developer.name }}
        </h3>
        <p
          v-if="developer.projectCount"
          class="text-sm text-slate-500 dark:text-slate-400 mt-0.5"
        >
          {{ developer.projectCount }} active UAE project{{ developer.projectCount === 1 ? '' : 's' }}
        </p>
      </div>
    </RouterLink>

    <div class="developer-card__body flex flex-1 flex-col p-5 md:p-6 pt-4 min-w-0">
      <p
        v-if="developer.descriptionExcerpt"
        class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2"
      >
        {{ developer.descriptionExcerpt }}
      </p>
      <div class="community-card__footer developer-card__footer">
        <div>
          <p class="kardosh-property-card__price-label">Projects</p>
          <p class="kardosh-property-card__price-value">
            {{ projectCountLabel }}
          </p>
        </div>
        <RouterLink
          :to="profileTo"
          class="kardosh-property-card__cta"
          :aria-label="`View ${developer.name} profile`"
        >
          <span class="kardosh-property-card__cta-text">View</span>
          <span class="kardosh-property-card__cta-icon" aria-hidden="true">
            <ArrowRight class="size-5" />
          </span>
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { developerProfileRoute } from '@/utils/mapDeveloper'

const props = defineProps({
  developer: { type: Object, required: true },
})

const profileTo = computed(() => developerProfileRoute(props.developer))

const projectCountLabel = computed(() => {
  const n = props.developer.projectCount
  if (!n) return 'UAE catalogue'
  return `${n} active`
})
</script>
