<template>
  <div class="property-gallery">
    <div
      v-if="!items.length"
      class="relative rounded-2xl shadow-md overflow-hidden bg-slate-100 dark:bg-slate-800 h-72 md:h-96"
    >
      <ProtectedPropertyImage
        v-if="fallbackUrl"
        fill
        :src="fallbackUrl"
        alt=""
        watermark-size="lg"
        wrapper-class="absolute inset-0"
      />
      <div v-else class="flex items-center justify-center h-full text-slate-400">No photos available</div>
    </div>

    <template v-else>
      <!-- 1. Main slider -->
      <div class="relative property-gallery-main rounded-2xl overflow-hidden shadow-md">
        <Swiper
          :key="sliderKey"
          :modules="modules"
          :slides-per-view="1"
          :space-between="0"
          :speed="500"
          :loop="filtered.length > 1"
          :autoplay="
            filtered.length > 1
              ? { delay: autoplayMs, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          "
          :navigation="
            filtered.length > 1
              ? { nextEl: '.property-gallery-next', prevEl: '.property-gallery-prev' }
              : false
          "
          :pagination="
            filtered.length > 1
              ? { clickable: true, dynamicBullets: true, el: '.property-gallery-pagination' }
              : false
          "
          class="property-gallery-swiper"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <SwiperSlide v-for="(item, index) in filtered" :key="item.url + '-' + index">
            <div class="relative block w-full h-72 md:h-[28rem] lg:h-[32rem]">
              <ProtectedPropertyImage
                fill
                :src="item.url"
                :alt="item.label"
                watermark-size="lg"
                wrapper-class="absolute inset-0"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <template v-if="filtered.length > 1">
          <button
            type="button"
            class="property-gallery-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 size-10 bg-white/95 dark:bg-slate-800/95 rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition"
            aria-label="Previous"
          >
            <ChevronLeft class="size-6" />
          </button>
          <button
            type="button"
            class="property-gallery-next absolute right-3 top-1/2 -translate-y-1/2 z-10 size-10 bg-white/95 dark:bg-slate-800/95 rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition"
            aria-label="Next"
          >
            <ChevronRight class="size-6" />
          </button>
          <div
            v-if="filtered.length > 1"
            class="property-gallery-pagination absolute bottom-[4.25rem] left-0 right-0 z-10 flex justify-center gap-1"
          />
        </template>

        <span
          v-if="filtered.length > 1"
          class="absolute top-4 end-4 z-10 px-3 py-1.5 text-sm font-medium rounded-md bg-black/50 text-white backdrop-blur-sm pointer-events-none"
        >
          {{ slideDisplay }} / {{ filtered.length }}
        </span>

        <div
          v-if="filtered.length"
          class="property-gallery-main__bottom absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 px-4 pb-4 pt-8 pointer-events-none bg-gradient-to-t from-black/55 via-black/25 to-transparent"
        >
          <span class="property-gallery-slide-label">
            {{ activeSlideLabel }}
          </span>
          <button
            type="button"
            class="property-gallery-view-full pointer-events-auto flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md bg-black/60 text-white backdrop-blur-sm hover:bg-primary transition"
            aria-label="View full size"
            @click="openLightbox(activeIndex)"
          >
            <Maximize2 class="size-4" />
            View full
          </button>
        </div>
      </div>

      <!-- 2. Thumbnails — fixed-height slot so layout never jumps -->
      <div
        v-if="filtered.length"
        class="property-gallery-thumbs-slot"
        :class="{ 'property-gallery-thumbs-slot--single': filtered.length === 1 }"
      >
        <Swiper
          v-if="filtered.length > 1"
          :key="'thumbs-' + sliderKey"
          :slides-per-view="4"
          :space-between="8"
          :breakpoints="{
            640: { slidesPerView: 5 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }"
          class="property-gallery-thumbs"
          @swiper="onThumbsSwiper"
        >
          <SwiperSlide
            v-for="(item, index) in filtered"
            :key="'t-' + item.url + '-' + index"
            class="!w-auto"
          >
            <button
              type="button"
              :class="thumbBtnClass(index)"
              class="property-gallery-thumb-btn"
              :aria-label="`Show ${item.label}`"
              :aria-current="activeIndex === index ? 'true' : undefined"
              @click="goToSlide(index)"
            >
              <ProtectedPropertyImage
                fill
                :src="item.url"
                :alt="item.label"
                watermark-size="thumb"
                wrapper-class="absolute inset-0"
              />
            </button>
          </SwiperSlide>
        </Swiper>

        <button
          v-else
          type="button"
          class="property-gallery-thumb-btn property-gallery-thumb-btn--active"
          aria-current="true"
          @click="goToSlide(0)"
        >
          <ProtectedPropertyImage
            fill
            :src="filtered[0].url"
            :alt="filtered[0].label"
            watermark-size="thumb"
            wrapper-class="absolute inset-0"
          />
        </button>
      </div>

      <!-- 3. Filter pills — centered, fixed row height -->
      <div
        v-if="categories.length > 1"
        class="property-gallery-filters"
        role="tablist"
        aria-label="Photo categories"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          role="tab"
          :aria-selected="activeCategory === cat.id"
          :class="activeCategory === cat.id ? 'property-gallery-filter--active' : 'property-gallery-filter'"
          @click="setCategory(cat.id)"
        >
          {{ cat.label }}
        </button>
      </div>
    </template>

    <VueEasyLightbox
      :visible="lightboxOpen"
      :imgs="lightboxUrls"
      :index="lightboxIndex"
      @hide="lightboxOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import VueEasyLightbox from 'vue-easy-lightbox'
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProtectedPropertyImage from '@/component/kardosh/ProtectedPropertyImage.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  items: { type: Array, default: () => [] },
  fallbackUrl: { type: String, default: '' },
  autoplayMs: { type: Number, default: 5000 },
})

const modules = [Autoplay, Navigation, Pagination]

const activeCategory = ref('all')
const activeIndex = ref(0)
const sliderKey = ref(0)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const mainSwiper = ref(null)

const categories = computed(() => {
  const cats = [
    { id: 'all', label: 'All photos', count: props.items.length },
  ]
  const groups = [...new Set(props.items.map((i) => i.group).filter(Boolean))]
  groups.forEach((g) => {
    const count = props.items.filter((i) => i.group === g).length
    if (count > 0) {
      const sample = props.items.find((i) => i.group === g)
      cats.push({
        id: g,
        label: sample?.label || g,
        count,
      })
    }
  })
  return cats
})

const filtered = computed(() => {
  if (activeCategory.value === 'all') return props.items
  return props.items.filter((i) => i.group === activeCategory.value)
})

const lightboxUrls = computed(() => filtered.value.map((i) => i.url))

const slideDisplay = computed(() => {
  const n = filtered.value.length
  if (!n) return 0
  return (activeIndex.value % n) + 1
})

const activeSlideLabel = computed(() => {
  const item = filtered.value[activeIndex.value]
  return item?.label || 'Photo'
})

function thumbBtnClass(index) {
  return activeIndex.value === index
    ? 'property-gallery-thumb-btn property-gallery-thumb-btn--active'
    : 'property-gallery-thumb-btn'
}

function onSwiper(swiper) {
  mainSwiper.value = swiper
}

function onThumbsSwiper() {
  /* click-to-sync only */
}

function onSlideChange(swiper) {
  activeIndex.value = swiper.realIndex ?? swiper.activeIndex
}

function setCategory(id) {
  activeCategory.value = id
  activeIndex.value = 0
  sliderKey.value += 1
}

function goToSlide(index) {
  activeIndex.value = index
  if (!mainSwiper.value) return
  if (filtered.value.length > 1) {
    mainSwiper.value.slideToLoop?.(index) ?? mainSwiper.value.slideTo(index)
  } else {
    mainSwiper.value.slideTo(0)
  }
}

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

watch(
  () => props.items,
  () => {
    activeCategory.value = 'all'
    activeIndex.value = 0
    sliderKey.value += 1
  }
)

watch(filtered, (list) => {
  if (!list.length && activeCategory.value !== 'all') {
    activeCategory.value = 'all'
    activeIndex.value = 0
    sliderKey.value += 1
  }
})
</script>

<style scoped>
.property-gallery-main :deep(.swiper-slide) {
  height: auto;
}

.property-gallery-main__bottom {
  min-height: 3.5rem;
}

.property-gallery-slide-label {
  display: inline-block;
  max-width: min(100%, 14rem);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  color: #fff;
  background: rgb(0 0 0 / 0.55);
  border-radius: 0.375rem;
  backdrop-filter: blur(4px);
  pointer-events: none;
}

@media (min-width: 640px) {
  .property-gallery-slide-label {
    max-width: min(50%, 20rem);
  }
}

/* Fixed height — prevents page jump when filter has 1 vs many images */
.property-gallery-thumbs-slot {
  margin-top: 0.75rem;
  min-height: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .property-gallery-thumbs-slot {
    min-height: 5.5rem;
    height: 5.5rem;
  }
}

.property-gallery-thumbs-slot--single {
  justify-content: flex-start;
  padding-inline: 0.125rem;
}

.property-gallery-thumbs {
  width: 100%;
  height: 100%;
}

.property-gallery-thumbs :deep(.swiper-slide) {
  width: auto !important;
  height: 100%;
  display: flex;
  align-items: center;
}

.property-gallery-thumb-btn {
  position: relative;
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  overflow: hidden;
  opacity: 0.65;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .property-gallery-thumb-btn {
    width: 5rem;
    height: 5rem;
  }
}

.property-gallery-thumb-btn:hover {
  opacity: 1;
}

.property-gallery-thumb-btn--active {
  opacity: 1;
  box-shadow: 0 0 0 2px #0a0a0a;
  outline: 2px solid #fff;
  outline-offset: 1px;
}

.dark .property-gallery-thumb-btn--active {
  box-shadow: 0 0 0 2px #f8fafc;
  outline-color: #0f172a;
}

.property-gallery-main :deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
}

.property-gallery-main :deep(.swiper-pagination-bullet-active) {
  background: #fff;
  width: 1.25rem;
  border-radius: 4px;
}

/* Filter row — centered on desktop; horizontal swipe on mobile */
.property-gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  min-height: 3rem;
  padding-bottom: 0.25rem;
}

@media (max-width: 991px) {
  .property-gallery-filters {
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0.5rem;
    margin-top: 0.75rem;
    min-height: 2.75rem;
    padding: 0.25rem 0 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
  }

  .property-gallery-filters::-webkit-scrollbar {
    display: none;
  }

  .property-gallery-filter,
  .property-gallery-filter--active {
    flex-shrink: 0;
    scroll-snap-align: start;
    min-height: 2.75rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    white-space: nowrap;
  }
}

.property-gallery-filter,
.property-gallery-filter--active {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1.125rem;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.25;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.property-gallery-filter {
  background: #f1f5f9;
  color: #334155;
}

.property-gallery-filter:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.dark .property-gallery-filter {
  background: #1e293b;
  color: #cbd5e1;
}

.dark .property-gallery-filter:hover {
  background: #334155;
  color: #f8fafc;
}

.property-gallery-filter--active {
  background: #0a0a0a;
  color: #ffffff;
}

.dark .property-gallery-filter--active {
  background: #f8fafc;
  color: #0a0a0a;
}

</style>
