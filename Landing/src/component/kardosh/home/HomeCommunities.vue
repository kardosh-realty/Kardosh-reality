<template>
  <section
    class="home-communities lg:mt-24 mt-16 home-section-compact scroll-mt-24"
    aria-labelledby="home-communities-heading"
  >
    <div class="container-fluid">
      <div class="home-communities__intro max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{{ t('home.communities.eyebrow') }}</p>
        <h2
          id="home-communities-heading"
          class="kardosh-section-heading text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          {{ t('home.communities.heading') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          {{ t('home.communities.subheading') }}
        </p>
      </div>

      <ul
        class="home-communities__grid mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 list-none m-0 p-0"
        role="list"
      >
        <li
          v-for="(community, index) in featuredCommunities"
          :key="community.slug"
          class="home-communities__item min-w-0"
          :style="{ '--stagger': `${index * 50}ms` }"
        >
          <CommunityCard :community="community" />
        </li>
      </ul>

      <div class="home-communities__footer mt-10 lg:mt-12 flex justify-center">
        <KardoshSlideButton :label="viewAllLabel" to="/communities" fluid />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { findCommunity } from '@/config/communities'
import CommunityCard from '@/component/kardosh/CommunityCard.vue'
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import { useT } from '@/composables/useT'
import { useMessages } from '@/composables/useMessages'

const t = useT()
const messages = useMessages()

const viewAllLabel = computed(
  () =>
    messages.value.home?.communities?.viewAllCommunities ||
    messages.value.home?.communities?.viewAll ||
    t('common.explore')
)

/** Homepage featured corridors — matches top area-based search intent */
const FEATURED_SLUGS = [
  'dubai-hills',
  'business-bay',
  'downtown-dubai',
  'palm-jumeirah',
  'dubai-creek-harbour',
  'jvc',
]

const featuredCommunities = computed(() =>
  FEATURED_SLUGS.map((slug) => findCommunity(slug)).filter(Boolean)
)
</script>
