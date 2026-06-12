<template>
  <section class="lg:mt-24 mt-16">
    <div class="container-fluid">
      <div
        class="rounded-2xl px-8 py-12 md:py-16 text-center text-white relative overflow-hidden"
      >
        <ResponsiveCoverImage
          :src="SECTION_IMAGES.cta"
          class="absolute inset-0"
        />
        <div class="absolute inset-0 bg-slate-900/70" />
        <div class="relative z-[1] max-w-2xl mx-auto">
          <h2 class="text-2xl md:text-3xl font-semibold">{{ t('home.cta.heading') }}</h2>
          <p class="text-white/70 mt-3">
            {{ ctaBody }}
          </p>
          <div class="flex flex-wrap justify-center items-center gap-3 mt-8">
            <KardoshSlideButton
              :label="t('home.cta.requestConsultation')"
              to="/contact"
              fluid
            />
            <a
              :href="whatsAppHref"
              target="_blank"
              rel="noopener"
              class="btn border border-white/40 hover:bg-white hover:text-slate-900 text-white rounded-lg px-8 inline-flex items-center gap-2"
            >
              {{ t('home.cta.whatsappUs') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import ResponsiveCoverImage from '@/component/kardosh/ResponsiveCoverImage.vue'
import { whatsAppLink } from '@/composables/useSiteSettings'
import { SECTION_IMAGES } from '@/config/dubai-images'
import { useT } from '@/composables/useT'
import { useMessages } from '@/composables/useMessages'

const t = useT()
const messages = useMessages()

const whatsAppHref = computed(() => whatsAppLink())

const ctaBody = computed(
  () => messages.value.home?.cta?.subheading || messages.value.home?.cta?.body || ''
)
</script>
