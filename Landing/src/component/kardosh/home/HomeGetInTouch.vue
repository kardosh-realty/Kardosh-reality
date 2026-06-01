<template>
  <section
    id="enquiry"
    class="relative scroll-mt-24"
    :class="[
      mt ? 'lg:mt-24 mt-16' : 'mt-0',
      pageMode ? 'contact-page-enquiry lg:py-20 py-14' : '',
    ]"
    aria-labelledby="get-in-touch-heading"
  >
    <div class="container-fluid">
      <div
        :class="[
          'rounded-3xl border p-6 md:p-10 lg:p-12',
          pageMode
            ? 'contact-enquiry-panel border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
            : 'get-in-touch-panel border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40',
        ]"
      >
        <div class="max-w-3xl mx-auto text-center">
          <h2
            id="get-in-touch-heading"
            class="about-kardosh__headline justify-center text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight"
          >
            <span class="about-kardosh__headline-word">Have a question?</span>
            <span
              v-if="!pageMode"
              class="about-kardosh__headline-word text-slate-600 dark:text-slate-300"
            >
              Get in touch.
            </span>
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed mx-auto">
            Speak with our Dubai team about off plan projects, buy off plan property, rentals, or selling your home.
            We typically respond within one business day.
          </p>
        </div>

        <div
          :class="[
            'mt-10 lg:mt-12 grid lg:grid-cols-12 items-start',
            pageMode ? 'contact-enquiry__grid gap-10 lg:gap-12 xl:gap-16' : 'gap-8 lg:gap-10',
          ]"
        >
          <div class="lg:col-span-4 flex flex-col gap-5 order-2 lg:order-1 min-w-0">
            <ul class="space-y-3 xl:space-y-4 list-none p-0 m-0" role="list">
            <li v-for="channel in contactChannels" :key="channel.label">
              <component
                :is="channel.external ? 'a' : 'RouterLink'"
                :href="channel.external ? channel.href : undefined"
                :to="!channel.external ? channel.href : undefined"
                :target="channel.external ? '_blank' : undefined"
                :rel="channel.external ? 'noopener noreferrer' : undefined"
                class="group flex items-start gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-600 bg-white dark:bg-slate-800 p-3.5 md:p-4 transition duration-300 hover:border-primary/35 hover:shadow-sm dark:hover:border-slate-500"
              >
                <span
                  class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:group-hover:text-slate-900"
                >
                  <component :is="channel.icon" class="size-4" aria-hidden="true" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm font-semibold text-slate-900 dark:text-white">{{ channel.label }}</span>
                  <span class="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{{ channel.value }}</span>
                  <span v-if="channel.hint" class="block text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">{{ channel.hint }}</span>
                </span>
              </component>
            </li>
            </ul>

            <div v-if="pageMode" class="contact-enquiry__social flex flex-wrap gap-3">
              <a
                :href="SOCIAL.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
              >
                <Linkedin class="size-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                :href="SOCIAL.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
              >
                <Instagram class="size-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>

          <div
            class="lg:col-span-8 min-w-0 order-1 lg:order-2"
            :class="pageMode ? 'contact-enquiry__form-col' : ''"
          >
            <div
              :class="[
                'rounded-2xl border p-6 md:p-8 h-full',
                pageMode
                  ? 'contact-enquiry__form border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80'
                  : 'border-slate-200/80 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm',
              ]"
            >
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                {{ pageMode ? 'Send your enquiry' : 'Send a quick enquiry' }}
              </h3>
              <p v-if="!pageMode" class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Prefer the full form?
                <RouterLink to="/contact" class="text-primary hover:underline">Contact page</RouterLink>
              </p>
              <p v-else class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                All fields are optional except name. We store enquiries securely when Supabase is connected.
              </p>

              <form class="mt-6" @submit.prevent="onSubmit">
                <div
                  v-if="regardingProperty"
                  class="mb-4 flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3.5 py-2.5"
                >
                  <span class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 min-w-0">
                    <Building2 class="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span class="min-w-0">
                      Enquiry about
                      <span class="font-semibold text-slate-900 dark:text-white">{{ regardingProperty }}</span>
                    </span>
                  </span>
                  <button
                    type="button"
                    class="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Clear property"
                    @click="clearRegarding"
                  >
                    <X class="size-4" aria-hidden="true" />
                  </button>
                </div>

                <p v-if="formError" class="text-red-600 dark:text-red-400 text-sm mb-4">{{ formError }}</p>
                <p v-if="formSuccess" class="text-slate-700 dark:text-slate-200 text-sm mb-4">{{ formSuccess }}</p>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label :for="`${fieldPrefix}-name`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <input
                      :id="`${fieldPrefix}-name`"
                      v-model="form.name"
                      type="text"
                      required
                      autocomplete="name"
                      class="kardosh-form-control form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full placeholder:text-slate-400 dark:placeholder:text-slate-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label :for="`${fieldPrefix}-email`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input
                      :id="`${fieldPrefix}-email`"
                      v-model="form.email"
                      type="email"
                      autocomplete="email"
                      class="kardosh-form-control form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full placeholder:text-slate-400 dark:placeholder:text-slate-400"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label :for="`${fieldPrefix}-phone`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                    <PhoneInput
                      :id="`${fieldPrefix}-phone`"
                      v-model="form.phone"
                      placeholder="Enter phone number"
                      default-country="AE"
                      :invalid="!!phoneError"
                      class="w-full"
                    />
                    <p v-if="phoneError" class="text-red-600 dark:text-red-400 text-sm mt-1">{{ phoneError }}</p>
                  </div>
                  <div>
                    <label :for="`${fieldPrefix}-type`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Interested in</label>
                    <select
                      :id="`${fieldPrefix}-type`"
                      v-model="form.listingType"
                      class="kardosh-form-control form-select form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full"
                    >
                      <option value="sale">Buy / Off-plan</option>
                      <option value="rent">Rent</option>
                      <option value="sell">Sell my property</option>
                    </select>
                  </div>
                </div>

                <div class="mt-4">
                  <label :for="`${fieldPrefix}-message`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                  <textarea
                    :id="`${fieldPrefix}-message`"
                    v-model="form.message"
                    rows="4"
                    class="kardosh-form-control form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full textarea placeholder:text-slate-400 dark:placeholder:text-slate-400"
                    placeholder="Tell us about your budget, community, or timeline…"
                  />
                </div>

                <div class="kardosh-btn-row mt-6">
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center justify-center gap-2 px-6"
                  >
                    {{ submitting ? 'Sending…' : 'Send message' }}
                    <Send v-if="!submitting" class="size-4" aria-hidden="true" />
                  </button>
                  <a
                    :href="enquiryWhatsAppLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle class="size-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          v-if="pageMode && showMap"
          class="contact-enquiry__map mt-10 lg:mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 min-h-[280px] md:min-h-[360px] lg:min-h-[420px]"
        >
          <iframe
            title="Kardosh Realty office — Business Bay, Dubai"
            :src="GOOGLE_MAP_EMBED"
            class="w-full h-full min-h-[280px] md:min-h-[360px] lg:min-h-[420px] border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Building2, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Shield, X } from 'lucide-vue-next'
import { BRAND, RERA_LICENSE_LABEL, SOCIAL } from '@/config/brand'
import { CONTACT, GOOGLE_MAP_EMBED, GOOGLE_MAPS_DIRECTIONS } from '@/config/uae'
import { whatsAppLink, WHATSAPP } from '@/config/marketing'
import { submitLead } from '@/services/leads'
import PhoneInput from '@/components/ui/PhoneInput.vue'
import { validatePhone } from '@/utils/validatePhone'

const props = defineProps({
  mt: { type: Boolean, default: true },
  /** Full contact page: hide link to /contact and use distinct field ids */
  pageMode: { type: Boolean, default: false },
  /** Embed office map below enquiry grid (contact page) */
  showMap: { type: Boolean, default: false },
})

const fieldPrefix = computed(() => (props.pageMode ? 'contact' : 'home-contact'))

const route = useRoute()

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  listingType: 'sale',
})

const submitting = ref(false)
const formError = ref('')
const formSuccess = ref('')
const phoneError = ref('')

// Property context passed via ?property=<title>&id=<id> (e.g. from a project page).
const regardingProperty = ref('')
const regardingId = ref('')

function applyPropertyFromRoute() {
  const title = typeof route.query.property === 'string' ? route.query.property : ''
  const id = typeof route.query.id === 'string' ? route.query.id : ''
  regardingProperty.value = title
  regardingId.value = id
  if (title && !form.value.message.trim()) {
    form.value.message = `I'm interested in ${title}. Please share availability, pricing, and payment plans.`
  }
}

watch(
  () => [route.query.property, route.query.id],
  applyPropertyFromRoute,
  { immediate: true }
)

watch(
  () => form.value.phone,
  () => {
    if (phoneError.value) phoneError.value = ''
  }
)

function clearRegarding() {
  regardingProperty.value = ''
  regardingId.value = ''
}

const enquiryWhatsAppLink = computed(() =>
  regardingProperty.value
    ? `${WHATSAPP.url}?text=${WHATSAPP.propertyMessage(regardingProperty.value)}`
    : whatsAppLink()
)

const contactChannels = computed(() => [
  {
    label: 'Phone',
    value: CONTACT.phone,
    href: CONTACT.phoneTel,
    hint: CONTACT.hours,
    icon: Phone,
    external: true,
  },
  {
    label: 'Email',
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    hint: 'We reply within 24 hours',
    icon: Mail,
    external: true,
  },
  {
    label: 'WhatsApp',
    value: 'Chat with our team',
    href: whatsAppLink(),
    hint: 'Fastest for international clients',
    icon: MessageCircle,
    external: true,
  },
  {
    label: 'Office',
    value: CONTACT.addressShort,
    href: props.pageMode ? GOOGLE_MAPS_DIRECTIONS : '/contact',
    hint: CONTACT.address,
    icon: MapPin,
    external: props.pageMode,
  },
  {
    label: 'RERA',
    value: RERA_LICENSE_LABEL,
    href: props.pageMode ? undefined : '/contact',
    hint: 'Dubai Real Estate Regulatory Agency',
    icon: Shield,
    external: false,
  },
])

async function onSubmit() {
  formError.value = ''
  formSuccess.value = ''
  phoneError.value = ''

  const phoneCheck = validatePhone(form.value.phone)
  if (!phoneCheck.valid) {
    phoneError.value = phoneCheck.message
    return
  }

  submitting.value = true
  try {
    const result = await submitLead({
      name: form.value.name,
      email: form.value.email,
      phone: phoneCheck.value || form.value.phone,
      message: form.value.message,
      listingType: form.value.listingType,
      projectId: regardingId.value || undefined,
      projectName: regardingProperty.value || undefined,
      source: regardingProperty.value ? 'property_page' : props.pageMode ? 'contact_page' : 'home_form',
    })
    if (result.stored) {
      formSuccess.value = regardingProperty.value
        ? `Thank you — Kardosh Realty will contact you about ${regardingProperty.value} shortly.`
        : 'Thank you — Kardosh Realty will contact you shortly.'
      form.value = { name: '', email: '', phone: '', message: '', listingType: 'sale' }
      phoneError.value = ''
      clearRegarding()
    } else if (result.dev) {
      formSuccess.value = 'Message received (dev mode). Connect Supabase to store leads.'
    }
  } catch (e) {
    formError.value = e.message || 'Could not send message. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
