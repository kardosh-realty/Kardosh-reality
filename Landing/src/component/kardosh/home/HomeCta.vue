<template>
  <section class="lg:mt-24 mt-16">
    <div class="container-fluid">
      <div
        class="rounded-2xl px-8 py-12 md:py-16 text-center text-white relative overflow-hidden bg-no-repeat bg-center bg-cover"
        :style="{ backgroundImage: `url(${SECTION_IMAGES.cta})` }"
      >
        <div class="absolute inset-0 bg-slate-900/70" />
        <div class="relative z-[1] max-w-2xl mx-auto">
          <h2 class="text-2xl md:text-3xl font-semibold">Ready to buy off plan property in Dubai?</h2>
          <p class="text-white/70 mt-3">
            Speak with Kardosh Realty about the best off plan projects in Dubai — payment plans, new launches, and investor guidance.
          </p>
          <div class="flex flex-wrap justify-center items-center gap-3 mt-8">
            <KardoshSlideButton
              label="Request a consultation"
              to="/contact"
              fluid
            />
            <a
              :href="whatsAppLink()"
              target="_blank"
              rel="noopener"
              class="btn border border-white/40 hover:bg-white hover:text-slate-900 text-white rounded-lg px-8 inline-flex items-center gap-2"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import KardoshSlideButton from '@/components/ui/KardoshSlideButton.vue'
import { whatsAppLink } from '@/config/marketing'
import { SECTION_IMAGES } from '@/config/dubai-images'
</script>
