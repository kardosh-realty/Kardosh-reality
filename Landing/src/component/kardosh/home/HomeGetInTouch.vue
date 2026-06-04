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
            <span class="about-kardosh__headline-word">{{ formCopy.headingQuestion }}</span>
            <span
              v-if="!pageMode"
              class="about-kardosh__headline-word text-slate-600 dark:text-slate-300"
            >
              {{ formCopy.headingAction }}
            </span>
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed mx-auto">
            {{ formCopy.lead }}
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
                {{ formCopy.linkedIn }}
              </a>
              <a
                :href="SOCIAL.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
              >
                <Instagram class="size-4" aria-hidden="true" />
                {{ formCopy.instagram }}
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
                {{ pageMode ? formCopy.formTitleFull : formCopy.formTitleQuick }}
              </h3>
              <p v-if="!pageMode" class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {{ formCopy.preferFullForm }}
                <RouterLink to="/contact" class="text-primary hover:underline">{{ formCopy.contactPageLink }}</RouterLink>
              </p>
              <p v-else class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {{ formCopy.fieldsNote }}
              </p>

              <form class="mt-6" @submit.prevent="onSubmit">
                <div
                  v-if="regardingProperty"
                  class="mb-4 flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3.5 py-2.5"
                >
                  <span class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 min-w-0">
                    <Building2 class="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span class="min-w-0">
                      {{ formCopy.enquiryAbout }}
                      <span class="font-semibold text-slate-900 dark:text-white">{{ regardingProperty }}</span>
                    </span>
                  </span>
                  <button
                    type="button"
                    class="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    :aria-label="formCopy.clearProperty"
                    @click="clearRegarding"
                  >
                    <X class="size-4" aria-hidden="true" />
                  </button>
                </div>

                <p v-if="formError" class="text-red-600 dark:text-red-400 text-sm mb-4">{{ formError }}</p>
                <p v-if="formSuccess" class="text-slate-700 dark:text-slate-200 text-sm mb-4">{{ formSuccess }}</p>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label :for="`${fieldPrefix}-name`" class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formCopy.labels.name }}</label>
                    <input
                      :id="`${fieldPrefix}-name`"
                      v-model="form.name"
                      type="text"
                      required
                      autocomplete="name"
                      class="kardosh-form-control form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full placeholder:text-slate-400 dark:placeholder:text-slate-400"
                      :placeholder="formCopy.placeholders.name"
                    />
                  </div>
                  <div>
                    <label :for="`${fieldPrefix}-email`" class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formCopy.labels.email }}</label>
                    <input
                      :id="`${fieldPrefix}-email`"
                      v-model="form.email"
                      type="email"
                      autocomplete="email"
                      class="kardosh-form-control form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full placeholder:text-slate-400 dark:placeholder:text-slate-400"
                      :placeholder="formCopy.placeholders.email"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label :for="`${fieldPrefix}-phone`" class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formCopy.labels.phone }}</label>
                    <PhoneInput
                      :id="`${fieldPrefix}-phone`"
                      v-model="form.phone"
                      :placeholder="formCopy.placeholders.phone"
                      default-country="AE"
                      :invalid="!!phoneError"
                      class="w-full"
                    />
                    <p v-if="phoneError" class="text-red-600 dark:text-red-400 text-sm mt-1">{{ phoneError }}</p>
                  </div>
                  <div>
                    <label :for="`${fieldPrefix}-type`" class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formCopy.labels.interestedIn }}</label>
                    <select
                      :id="`${fieldPrefix}-type`"
                      v-model="form.listingType"
                      class="kardosh-form-control form-select form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full"
                    >
                      <option value="sale">{{ formCopy.listingTypes.sale }}</option>
                      <option value="rent">{{ formCopy.listingTypes.rent }}</option>
                      <option value="sell">{{ formCopy.listingTypes.sell }}</option>
                    </select>
                  </div>
                </div>

                <div class="mt-4">
                  <label :for="`${fieldPrefix}-message`" class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ formCopy.labels.message }}</label>
                  <textarea
                    :id="`${fieldPrefix}-message`"
                    v-model="form.message"
                    rows="4"
                    class="kardosh-form-control form-input border border-slate-200! dark:border-slate-600! mt-1.5 w-full textarea placeholder:text-slate-400 dark:placeholder:text-slate-400"
                    :placeholder="formCopy.placeholders.message"
                  />
                </div>

                <div class="kardosh-btn-row mt-6">
                  <StatusButton
                    type="submit"
                    :status="submitStatus"
                    :labels="formCopy.submit"
                  />
                  <a
                    :href="enquiryWhatsAppLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle class="size-4" aria-hidden="true" />
                    {{ formCopy.whatsapp }}
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
            :title="formCopy.mapTitle"
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
import { Building2, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Shield, X } from 'lucide-vue-next'
import StatusButton from '@/components/ui/StatusButton.vue'
import { BRAND, RERA_LICENSE_LABEL, SOCIAL } from '@/config/brand'
import { CONTACT, GOOGLE_MAP_EMBED, GOOGLE_MAPS_DIRECTIONS } from '@/config/uae'
import { whatsAppLink, WHATSAPP } from '@/config/marketing'
import { submitLead } from '@/services/leads'
import PhoneInput from '@/components/ui/PhoneInput.vue'
import { validatePhone } from '@/utils/validatePhone'
import { useMessages } from '@/composables/useMessages'
import { useT } from '@/composables/useT'

const t = useT()
const messages = useMessages()

const formCopy = computed(() => {
  const raw = messages.value.form?.getInTouch ?? messages.value.form ?? {}
  return {
    headingQuestion: raw.headingQuestion,
    headingAction: raw.headingAction ?? raw.headingTouch,
    lead: raw.lead ?? raw.subheading,
    formTitleQuick: raw.formTitleQuick ?? raw.sendQuickEnquiry,
    formTitleFull: raw.formTitleFull ?? raw.sendEnquiry,
    preferFullForm: raw.preferFullForm,
    contactPageLink: raw.contactPageLink ?? raw.contactPage,
    fieldsNote: raw.fieldsNote ?? raw.optionalFieldsNote,
    enquiryAbout: raw.enquiryAbout,
    clearProperty: raw.clearProperty,
    labels: raw.labels ?? {
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      interestedIn: raw.interestedIn,
      message: raw.message,
    },
    placeholders: raw.placeholders ?? {
      name: raw.namePlaceholder,
      email: raw.emailPlaceholder,
      phone: raw.phonePlaceholder,
      message: raw.messagePlaceholder,
    },
    submit: raw.submit ?? {
      idle: raw.sendMessage,
      loading: raw.sending,
      success: raw.sent,
    },
    whatsapp: raw.whatsapp,
    channels: raw.channels ?? {
      phone: raw.channels?.phone,
      email: raw.channels?.email,
      whatsapp: raw.channels?.whatsapp,
      whatsappValue: raw.channels?.whatsappValue,
      office: raw.channels?.office,
      rera: raw.channels?.rera,
    },
    hints: raw.hints ?? {
      emailReply: raw.channels?.emailHint,
      whatsappFast: raw.channels?.whatsappHint,
      reraAgency: raw.channels?.reraHint,
    },
    linkedIn: raw.linkedIn ?? raw.linkedin,
    instagram: raw.instagram,
    defaultMessage: raw.defaultMessage ?? raw.regardingTemplate,
    successWithProperty: raw.successWithProperty ?? raw.successRegarding,
    success: raw.success ?? raw.successDefault,
    devMode: raw.devMode ?? raw.successDev,
    error: raw.error ?? raw.errorSend,
    listingTypes: raw.listingTypes ?? {
      sale: t('search.listingInterest.sale'),
      rent: t('search.listingInterest.rent'),
      sell: t('search.listingInterest.sell'),
    },
    mapTitle: raw.mapTitle,
  }
})

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

const submitStatus = ref('idle')
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
    const template =
      messages.value.form?.getInTouch?.defaultMessage ||
      messages.value.form?.regardingTemplate ||
      "I'm interested in {property}. Please share availability, pricing, and payment plans."
    form.value.message = template.replace('{property}', title)
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

const contactChannels = computed(() => {
  const ch = formCopy.value.channels || {}
  const hints = formCopy.value.hints || {}
  return [
    {
      label: ch.phone || 'Phone',
      value: CONTACT.phone,
      href: CONTACT.phoneTel,
      hint: CONTACT.hours,
      icon: Phone,
      external: true,
    },
    {
      label: ch.email || 'Email',
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
      hint: hints.emailReply,
      icon: Mail,
      external: true,
    },
    {
      label: ch.whatsapp || 'WhatsApp',
      value: ch.whatsappValue || 'Chat with our team',
      href: whatsAppLink(),
      hint: hints.whatsappFast,
      icon: MessageCircle,
      external: true,
    },
    {
      label: ch.office || 'Office',
      value: CONTACT.addressShort,
      href: props.pageMode ? GOOGLE_MAPS_DIRECTIONS : '/contact',
      hint: CONTACT.address,
      icon: MapPin,
      external: props.pageMode,
    },
    {
      label: ch.rera || 'RERA',
      value: RERA_LICENSE_LABEL,
      href: props.pageMode ? undefined : '/contact',
      hint: hints.reraAgency,
      icon: Shield,
      external: false,
    },
  ]
})

async function onSubmit() {
  formError.value = ''
  formSuccess.value = ''
  phoneError.value = ''

  const phoneCheck = validatePhone(form.value.phone)
  if (!phoneCheck.valid) {
    phoneError.value = phoneCheck.message
    return
  }

  submitStatus.value = 'loading'
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
        ? (formCopy.value.successWithProperty || '').replace('{property}', regardingProperty.value)
        : formCopy.value.success
      form.value = { name: '', email: '', phone: '', message: '', listingType: 'sale' }
      phoneError.value = ''
      clearRegarding()
      submitStatus.value = 'success'
      window.setTimeout(() => {
        submitStatus.value = 'idle'
      }, 2000)
    } else if (result.dev) {
      formSuccess.value = formCopy.value.devMode
      submitStatus.value = 'success'
      window.setTimeout(() => {
        submitStatus.value = 'idle'
      }, 2000)
    } else {
      submitStatus.value = 'idle'
    }
  } catch (e) {
    formError.value = e.message || formCopy.value.error
    submitStatus.value = 'idle'
  }
}
</script>
