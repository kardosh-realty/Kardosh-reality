<template>
  <article
    v-if="variant === 'luxury'"
    class="kardosh-property-card kardosh-property-card--luxury group"
  >
    <div class="kardosh-property-card__media">
      <RouterLink
        :to="detailTo"
        class="kardosh-property-card__media-link block h-full w-full"
      >
        <ProtectedPropertyImage
          fill
          :src="item.image"
          :alt="item.name"
          img-class="kardosh-property-card__img"
          watermark-size="md"
          wrapper-class="h-full w-full"
        />
      </RouterLink>
      <span
        v-if="item.listingType === 'rent'"
        class="kardosh-property-card__type kardosh-property-card__type--rent"
      >{{ t('listingCard.rent') }}</span>
      <span
        v-if="badgeLabel"
        class="kardosh-property-card__badge"
      >{{ badgeLabel }}</span>
    </div>

    <div class="kardosh-property-card__body">
      <p v-if="item.developer" class="kardosh-property-card__developer">
        {{ item.developer }}
      </p>

      <RouterLink
        :to="detailTo"
        class="kardosh-property-card__title line-clamp-2"
      >
        {{ item.name }}
      </RouterLink>

      <div
        v-if="item.square || displayAmenities.length || extraAmenityCount > 0"
        class="kardosh-property-card__meta"
      >
        <span
          v-if="item.square"
          class="kardosh-property-card__chip kardosh-property-card__chip--area"
        >
          <Maximize class="kardosh-property-card__chip-icon" aria-hidden="true" />
          {{ item.areaLabel || formatArea(item.square) }}
        </span>
        <ul
          v-if="displayAmenities.length || extraAmenityCount > 0"
          class="kardosh-property-card__amenity-pills"
        >
          <li
            v-for="(a, i) in displayAmenities"
            :key="i"
          >
            <span
              class="kardosh-property-card__chip kardosh-property-card__chip--amenity"
              :title="a"
            >{{ a }}</span>
          </li>
          <li v-if="extraAmenityCount > 0">
            <span class="kardosh-property-card__chip kardosh-property-card__chip--more">
              +{{ extraAmenityCount }}
            </span>
          </li>
        </ul>
      </div>

      <div class="kardosh-property-card__footer">
        <div>
          <p class="kardosh-property-card__price-label">{{ priceEyebrow }}</p>
          <p class="kardosh-property-card__price-value">{{ luxuryPrice }}</p>
        </div>
        <RouterLink
          :to="detailTo"
          class="kardosh-property-card__cta"
          :aria-label="t('listingCard.visitAria', { name: item.name })"
        >
          <span class="kardosh-property-card__cta-text">{{ t('listingCard.visit') }}</span>
          <span class="kardosh-property-card__cta-icon" aria-hidden="true">
            <ArrowRight class="size-5" />
          </span>
        </RouterLink>
      </div>
    </div>
  </article>

  <div
    v-else
    class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 overflow-hidden ease-in-out duration-500 h-full flex flex-col"
  >
    <div class="relative">
      <RouterLink :to="detailTo">
        <ProtectedPropertyImage
          :src="item.image"
          :alt="item.name"
          img-class="w-full h-56 object-cover"
          watermark-size="md"
        />
      </RouterLink>
      <div
        v-if="item.listingType === 'rent'"
        class="absolute top-4 inset-s-4 flex flex-wrap gap-2 max-w-[calc(100%-2rem)]"
      >
        <span
          class="text-xs uppercase tracking-wide bg-slate-800 text-white dark:bg-slate-700 px-2 py-1 rounded font-medium"
        >{{ t('listingCard.rent') }}</span>
      </div>
      <span
        v-if="badgeLabel"
        class="absolute top-4 end-4 text-[10px] uppercase tracking-wide bg-white/95 dark:bg-slate-900/95 text-primary border border-primary/20 px-2 py-1 rounded font-semibold shadow-sm"
      >
        {{ badgeLabel }}
      </span>
    </div>

    <div class="p-5 flex flex-col flex-1">
      <div class="pb-4">
        <RouterLink
          :to="detailTo"
          class="text-base lg:text-lg hover:text-primary font-medium ease-in-out duration-500 line-clamp-2"
        >{{ item.name }}</RouterLink>
        <p v-if="item.developer" class="text-sm text-slate-400 mt-1 truncate">{{ item.developer }}</p>
      </div>

      <div
        v-if="item.square || displayAmenities.length || extraAmenityCount > 0"
        class="py-4 border-y border-slate-100 dark:border-gray-800 kardosh-property-card__meta kardosh-property-card__meta--default"
      >
        <span
          v-if="item.square"
          class="kardosh-property-card__chip kardosh-property-card__chip--area"
        >
          <Maximize class="kardosh-property-card__chip-icon" aria-hidden="true" />
          {{ item.areaLabel || formatArea(item.square) }}
        </span>
        <ul
          v-if="displayAmenities.length || extraAmenityCount > 0"
          class="kardosh-property-card__amenity-pills"
        >
          <li
            v-for="(a, i) in displayAmenities"
            :key="i"
          >
            <span
              class="kardosh-property-card__chip kardosh-property-card__chip--amenity"
              :title="a"
            >{{ a }}</span>
          </li>
          <li v-if="extraAmenityCount > 0">
            <span class="kardosh-property-card__chip kardosh-property-card__chip--more">
              +{{ extraAmenityCount }}
            </span>
          </li>
        </ul>
      </div>

      <div class="pt-4 mt-auto">
        <ListingPrice :item="item" starting-only />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatArea, formatStartingPrice } from '@/config/uae'
import ListingPrice from '@/component/listing-price.vue'
import ProtectedPropertyImage from '@/component/kardosh/ProtectedPropertyImage.vue'
import { ArrowRight, Maximize } from 'lucide-vue-next'
import { projectDetailPath } from '@/utils/seoRoutes'
import { useT } from '@/composables/useT'

const t = useT()

const BADGE_I18N = {
  highDemand: 'common.highDemand',
  sellingFast: 'common.sellingFast',
  popular: 'common.popular',
}

const props = defineProps({
  item: { type: Object, required: true },
  maxAmenities: { type: Number, default: 2 },
  /** Badge id (`highDemand`) or legacy English label */
  badge: { type: String, default: '' },
  /** default | luxury (home page grids) */
  variant: { type: String, default: 'default' },
})

const detailTo = computed(() => projectDetailPath(props.item))

const amenityList = computed(() => props.item.amenities || [])

const displayAmenities = computed(() => amenityList.value.slice(0, props.maxAmenities))

const extraAmenityCount = computed(() => {
  const total = amenityList.value.length
  return Math.max(0, total - props.maxAmenities)
})

const badgeLabel = computed(() => {
  if (!props.badge) return ''
  const key = BADGE_I18N[props.badge]
  if (key) return t(key)
  const legacy = {
    'High demand': 'common.highDemand',
    'Selling fast': 'common.sellingFast',
    Popular: 'common.popular',
  }
  return legacy[props.badge] ? t(legacy[props.badge]) : props.badge
})

const luxuryPrice = computed(() => {
  const full = formatStartingPrice(props.item)
  if (full.startsWith('From ')) return full.slice(5)
  return full
})

const priceEyebrow = computed(() => {
  if (props.item.listingType === 'rent') return t('listingCard.annualRent')
  const full = formatStartingPrice(props.item)
  return full.startsWith('From ') ? t('listingCard.startingFrom') : t('listingCard.price')
})
</script>
