<template>
  <footer class="kardosh-hover-footer relative h-fit rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-24 mb-6 text-white">
    <FooterBackgroundGradient />

    <div class="container-fluid max-w-7xl p-8 md:p-12 lg:p-14 relative z-20">
      <div class="kardosh-hover-footer__top pb-10">
        <div class="kardosh-hover-footer__brand">
          <RouterLink to="/" class="kardosh-hover-footer__logo-link focus:outline-none">
            <BrandLogo variant="full" size="footer" invert-on-dark />
          </RouterLink>
          <p class="kardosh-hover-footer__tagline text-sm leading-relaxed text-white">
            {{ site.tagline }}
          </p>
        </div>

        <div class="kardosh-hover-footer__menus">
          <div
            v-for="section in footerLinks"
            :key="section.id"
            class="kardosh-hover-footer__menu-col kardosh-footer-accordion__section"
          >
            <button
              type="button"
              class="kardosh-footer-accordion__trigger md:hidden"
              :aria-expanded="isOpen(section.id)"
              :aria-controls="`footer-panel-${section.id}`"
              @click="toggleSection(section.id)"
            >
              <span class="text-white text-lg font-semibold">{{ section.title }}</span>
              <ChevronDown
                class="kardosh-footer-accordion__chevron size-5 shrink-0 text-white"
                :class="{ 'kardosh-footer-accordion__chevron--open': isOpen(section.id) }"
                aria-hidden="true"
              />
            </button>
            <h4 class="kardosh-footer-accordion__title hidden md:block text-white text-lg font-semibold mb-5">
              {{ section.title }}
            </h4>
            <div
              :id="`footer-panel-${section.id}`"
              class="kardosh-footer-accordion__panel"
              :class="{ 'kardosh-footer-accordion__panel--open': isOpen(section.id) }"
            >
              <ul class="space-y-3 text-sm">
                <li v-for="link in section.links" :key="link.label" class="relative">
                  <RouterLink
                    :to="link.to"
                    class="kardosh-hover-footer__link"
                  >
                    {{ link.label }}
                  </RouterLink>
                  <span
                    v-if="link.pulse"
                    class="absolute top-1 -end-3 size-2 rounded-full bg-white animate-pulse"
                    aria-hidden="true"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div class="kardosh-hover-footer__menu-col kardosh-footer-accordion__section">
            <button
              type="button"
              class="kardosh-footer-accordion__trigger md:hidden"
              :aria-expanded="isOpen('contact')"
              aria-controls="footer-panel-contact"
              @click="toggleSection('contact')"
            >
              <span class="text-white text-lg font-semibold">Contact us</span>
              <ChevronDown
                class="kardosh-footer-accordion__chevron size-5 shrink-0 text-white"
                :class="{ 'kardosh-footer-accordion__chevron--open': isOpen('contact') }"
                aria-hidden="true"
              />
            </button>
            <h4 class="kardosh-footer-accordion__title hidden md:block text-white text-lg font-semibold mb-5">
              Contact us
            </h4>
            <div
              id="footer-panel-contact"
              class="kardosh-footer-accordion__panel"
              :class="{ 'kardosh-footer-accordion__panel--open': isOpen('contact') }"
            >
              <ul class="space-y-4 text-sm">
                <li v-for="(item, i) in contactInfo" :key="i" class="flex items-start gap-3">
                  <component :is="item.icon" class="size-[18px] shrink-0 text-white mt-0.5" aria-hidden="true" />
                  <a
                    v-if="item.href"
                    :href="item.href"
                    :target="item.external ? '_blank' : undefined"
                    :rel="item.external ? 'noopener noreferrer' : undefined"
                    class="kardosh-hover-footer__link"
                  >
                    {{ item.text }}
                  </a>
                  <span v-else class="text-white">{{ item.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr class="border-t border-white/20 my-8" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-white footer-social-row">
          <FooterLanguageSwitcher />
          <a
            v-for="social in socialLinks"
            :key="social.platform + social.url"
            :href="social.url"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center size-9 rounded-md border border-white/30 text-white transition-colors"
          >
            <component :is="social.icon" class="size-4" />
          </a>
        </div>

        <p class="text-center md:text-end text-white">
          <span class="block sm:inline">{{ reraLabel }}</span>
          <span class="hidden sm:inline mx-2" aria-hidden="true">·</span>
          <span class="block sm:inline">© {{ year }} {{ site.companyName }}.</span>
          <a
            href="https://logixcontact.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-[#9ecbf0] transition-colors"
          >Developed by Logix Contact</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronDown, Mail, MapPin, MessageCircle, Phone, Shield } from 'lucide-vue-next'
import { site, reraLabel, whatsappHref, socialLinks } from '@/composables/useSiteSettings'
import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import FooterLanguageSwitcher from '@/component/kardosh/FooterLanguageSwitcher.vue'
import FooterBackgroundGradient from '@/component/ui/FooterBackgroundGradient.vue'

const year = new Date().getFullYear()

const openSections = reactive({
  explore: false,
  helpful: false,
  contact: false,
})

function isOpen(id) {
  return Boolean(openSections[id])
}

function toggleSection(id) {
  openSections[id] = !openSections[id]
}

const footerLinks = [
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { label: 'Off-plan', to: '/off-plan' },
      { label: 'Communities', to: '/communities' },
      { label: 'Developers', to: '/developers' },
      { label: 'Why Dubai', to: '/why-dubai' },
      { label: 'About us', to: '/aboutus' },
    ],
  },
  {
    id: 'helpful',
    title: 'Helpful links',
    links: [
      { label: 'Blog', to: '/blogs' },
      { label: 'Contact', to: '/contact', pulse: true },
      { label: 'Map view', to: '/grid-map' },
      { label: 'Terms of service', to: '/terms' },
      { label: 'Privacy policy', to: '/privacy' },
    ],
  },
]

const contactInfo = computed(() => [
  {
    icon: Mail,
    text: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    text: site.phone,
    href: `tel:${String(site.phone).replace(/\s/g, '')}`,
  },
  {
    icon: MapPin,
    text: site.addressShort,
    href: undefined,
  },
  {
    icon: Shield,
    text: reraLabel.value,
    href: undefined,
  },
  {
    icon: MessageCircle,
    text: 'WhatsApp',
    href: whatsappHref.value,
    external: true,
  },
])
</script>
