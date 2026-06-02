<template>
  <article
    class="community-card community-card--luxury group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5"
  >
    <RouterLink
      :to="detailTo"
      class="community-card__media relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 block"
    >
      <img
        :src="image.src"
        :srcset="image.srcset || undefined"
        :sizes="image.sizes || undefined"
        :alt="`${community.name}, UAE`"
        width="960"
        height="600"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
      <span
        class="absolute top-3 inset-s-3 inline-flex px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 text-[10px] font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200"
      >
        {{ emirateName }}
      </span>
    </RouterLink>

    <div class="community-card__body flex flex-1 flex-col p-5 md:p-6 min-w-0">
      <RouterLink
        :to="detailTo"
        class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2"
      >
        {{ community.name }}
      </RouterLink>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
        {{ community.tagline }}
      </p>
      <ul class="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0">
        <li
          v-for="(h, i) in community.highlights.slice(0, 3)"
          :key="i"
          class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          {{ h }}
        </li>
      </ul>

      <div class="community-card__footer">
        <div>
          <p class="kardosh-property-card__price-label">Community</p>
          <p class="kardosh-property-card__price-value">{{ emirateName }}</p>
        </div>
        <RouterLink
          :to="detailTo"
          class="kardosh-property-card__cta"
          :aria-label="`Explore ${community.name}`"
        >
          <span class="kardosh-property-card__cta-text">Explore</span>
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
import { emirateLabel } from '@/config/communities'
import { communityHeroImageResponsive } from '@/config/dubai-images'

const props = defineProps({
  community: { type: Object, required: true },
})

const detailTo = computed(() => `/communities/${props.community.slug}`)
const image = computed(() => communityHeroImageResponsive(props.community.slug))
const emirateName = computed(() => emirateLabel(props.community.emirate))
</script>
