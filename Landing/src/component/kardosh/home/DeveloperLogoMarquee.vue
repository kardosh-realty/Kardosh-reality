<template>
  <section
    v-if="showSection"
    ref="sectionRoot"
    class="developer-logo-marquee home-section-compact lg:mt-20 mt-14"
    aria-label="UAE property developers"
  >
    <p
      class="developer-logo-marquee__eyebrow container-fluid text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-6"
    >
      Trusted UAE developers
    </p>

    <div
      class="developer-logo-marquee__panel relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden py-10 md:py-14"
    >
      <Marquee class="developer-logo-marquee__marquee [--gap:3rem]" :pause-on-hover="true" :repeat="2">
        <RouterLink
          v-for="(dev, i) in marqueeItems"
          :key="`dev-${dev.id || dev.name}-${i}`"
          :to="developerProfileRoute(dev)"
          class="developer-logo-marquee__logo-link shrink-0"
          :title="dev.name"
        >
          <img
            v-if="dev.logo?.url"
            :src="dev.logo.url"
            :alt="`${dev.name} logo`"
            class="developer-logo-marquee__logo-img"
            loading="lazy"
            width="120"
            height="48"
          />
          <span v-else class="developer-logo-marquee__initial">{{ dev.name?.charAt(0) }}</span>
        </RouterLink>
      </Marquee>

      <div
        class="developer-logo-marquee__fade developer-logo-marquee__fade--start pointer-events-none absolute inset-y-0 start-0 w-1/4 md:w-1/3 bg-gradient-to-r from-white dark:from-slate-900"
        aria-hidden="true"
      />
      <div
        class="developer-logo-marquee__fade developer-logo-marquee__fade--end pointer-events-none absolute inset-y-0 end-0 w-1/4 md:w-1/3 bg-gradient-to-l from-white dark:from-slate-900"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Marquee from '@/components/ui/Marquee.vue'
import { useReelly } from '@/composables/useReelly'
import { useDeferredCatalogLoad } from '@/composables/useDeferredCatalogLoad'
import { developerProfileRoute } from '@/utils/mapDeveloper'

const { uaeDevelopers, loadProjects, loadDeveloperLogos } = useReelly()

const marqueeItems = computed(() => {
  const withLogo = uaeDevelopers.value.filter((d) => d.logo?.url)
  const rest = uaeDevelopers.value.filter((d) => !d.logo?.url)
  const merged = [...withLogo, ...rest].slice(0, 18)
  if (merged.length >= 6) return merged
  if (merged.length > 0) {
    const out = []
    while (out.length < 8) out.push(...merged)
    return out.slice(0, 8)
  }
  return []
})

const showSection = computed(() => marqueeItems.value.length > 0)

const { root: sectionRoot } = useDeferredCatalogLoad(async () => {
  await loadProjects()
  void loadDeveloperLogos()
})
</script>
