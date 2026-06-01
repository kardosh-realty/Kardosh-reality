<template>
  <div class="property-contact-card">
    <header class="property-contact-card__header">
      <p class="property-contact-card__price">
        {{ formatStartingPrice(property) }}
      </p>
    </header>

    <div class="property-contact-card__body">
      <dl v-if="hasSpecs" class="property-contact-card__specs">
        <div v-if="property.completionDate" class="property-contact-card__row">
          <dt>Completion</dt>
          <dd>{{ property.completionDate }}</dd>
        </div>
        <div v-if="property.square" class="property-contact-card__row">
          <dt>Size from</dt>
          <dd>{{ property.areaLabel || formatArea(property.square) }}</dd>
        </div>
      </dl>

      <div class="property-contact-card__agency">
        <div class="property-contact-card__mark-wrap" aria-hidden="true">
          <BrandLogo
            variant="icon"
            size="inline"
            class="property-contact-card__mark"
          />
        </div>
        <div class="property-contact-card__agency-text">
          <p class="property-contact-card__agency-name">{{ BRAND.name }}</p>
          <p class="property-contact-card__agency-tag">UAE property specialists</p>
        </div>
      </div>

      <div class="property-contact-card__actions">
        <RouterLink :to="contactLink" class="property-contact-card__btn property-contact-card__btn--primary">
          <MessageCircle class="property-contact-card__icon" aria-hidden="true" />
          <span>Contact about this property</span>
        </RouterLink>

        <a
          :href="propertyWhatsApp"
          target="_blank"
          rel="noopener"
          class="property-contact-card__btn property-contact-card__btn--whatsapp"
        >
          <MessageCircle class="property-contact-card__icon" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <div class="property-contact-card__btn-row">
          <a :href="CONTACT.phoneTel" class="property-contact-card__btn property-contact-card__btn--outline">
            <Phone class="property-contact-card__icon" aria-hidden="true" />
            <span>Call</span>
          </a>
          <a
            :href="`mailto:${CONTACT.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`"
            class="property-contact-card__btn property-contact-card__btn--outline"
          >
            <Mail class="property-contact-card__icon" aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { BRAND } from '@/config/brand'
import { CONTACT, formatArea, formatStartingPrice } from '@/config/uae'
import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import { WHATSAPP } from '@/config/marketing'
import { MessageCircle, Phone, Mail } from 'lucide-vue-next'

const props = defineProps({
  property: { type: Object, required: true },
})

const hasSpecs = computed(
  () => Boolean(props.property?.completionDate || props.property?.square)
)

const contactLink = computed(() => {
  const title = props.property?.title || props.property?.name || 'Property'
  return {
    path: '/contact',
    hash: '#enquiry',
    query: {
      property: title,
      id: props.property?.id ? String(props.property.id) : undefined,
    },
  }
})

const propertyTitle = computed(
  () => props.property?.title || props.property?.name || 'this property'
)

const mailSubject = computed(() => `Enquiry: ${propertyTitle.value}`)

const mailBody = computed(() => {
  const lines = [
    `Hello ${BRAND.name},`,
    '',
    `I'm interested in ${propertyTitle.value} and would like more details on availability, pricing, and payment plans.`,
  ]
  if (props.property?.developer) lines.push(`Developer: ${props.property.developer}`)
  if (props.property?.id) lines.push(`Reference: ${props.property.id}`)
  lines.push('', 'Thank you.')
  return lines.join('\n')
})

const propertyWhatsApp = computed(() => {
  const title = props.property?.title || props.property?.name || 'a Dubai property'
  return `${WHATSAPP.url}?text=${WHATSAPP.propertyMessage(title)}`
})
</script>

<style scoped>
.property-contact-card {
  --pcc-bg: var(--kardosh-surface, #ffffff);
  --pcc-border: var(--kardosh-border, #e2e8f0);
  --pcc-header-bg: linear-gradient(
    160deg,
    var(--color-primary-dark, #0f172a) 0%,
    var(--color-primary, #1e293b) 55%,
    var(--color-primary-500, #334155) 100%
  );
  --pcc-header-fg: var(--btn-primary-text, #ffffff);
  --pcc-badge-bg: rgb(255 255 255 / 0.12);
  --pcc-badge-fg: var(--btn-primary-text, #ffffff);
  --pcc-body-fg: var(--kardosh-ink, #0f172a);
  --pcc-muted: var(--kardosh-muted, #64748b);
  --pcc-value: var(--kardosh-ink, #0f172a);
  --pcc-divider: var(--kardosh-border, #e2e8f0);
  --pcc-mark-bg: var(--kardosh-logo-surface, var(--kardosh-surface-muted, #f1f5f9));
  --pcc-shadow: 0 16px 48px -20px rgb(15 23 42 / 0.12);
  --pcc-btn-primary-bg: var(--btn-primary-bg, var(--color-primary, #00a63e));
  --pcc-btn-primary-fg: var(--btn-primary-text, #ffffff);
  --pcc-btn-primary-border: var(--btn-primary-hover, var(--color-primary-dark, #008f34));
  --pcc-btn-secondary-bg: var(--kardosh-surface, #ffffff);
  --pcc-btn-secondary-border: var(--kardosh-border, #cbd5e1);
  --pcc-btn-secondary-fg: var(--kardosh-ink, #0f172a);
  --pcc-btn-outline-bg: var(--kardosh-surface, #ffffff);
  --pcc-btn-outline-border: var(--kardosh-border, #e2e8f0);
  --pcc-btn-outline-fg: var(--kardosh-ink, #334155);
  --pcc-whatsapp-border: rgb(37 211 102 / 0.45);
  --pcc-whatsapp-hover-bg: var(--btn-secondary-hover-bg, #f8fafc);

  border-radius: 1rem;
  border: 1px solid var(--pcc-border);
  background: var(--pcc-bg);
  box-shadow: var(--pcc-shadow);
  font-family: inherit;
  overflow: hidden;
}

.dark .property-contact-card {
  --pcc-bg: var(--kardosh-surface, rgb(15 23 42));
  --pcc-border: var(--kardosh-border, rgb(51 65 85));
  --pcc-header-bg: linear-gradient(
    160deg,
    var(--color-primary-dark, rgb(30 41 59)) 0%,
    var(--color-primary, rgb(15 23 42)) 55%,
    var(--kardosh-page, rgb(15 23 42)) 100%
  );
  --pcc-header-fg: var(--btn-primary-text, #ffffff);
  --pcc-body-fg: var(--kardosh-ink, rgb(226 232 240));
  --pcc-muted: var(--kardosh-muted, rgb(148 163 184));
  --pcc-value: var(--kardosh-ink, #ffffff);
  --pcc-divider: var(--kardosh-border, rgb(51 65 85));
  --pcc-mark-bg: var(--kardosh-logo-surface, rgb(30 41 59));
  --pcc-shadow: 0 20px 50px -16px rgb(0 0 0 / 0.45);
  --pcc-btn-primary-bg: var(--btn-primary-bg, #34d399);
  --pcc-btn-primary-fg: var(--btn-primary-text, rgb(15 23 42));
  --pcc-btn-primary-border: var(--btn-primary-hover, #10b981);
  --pcc-btn-secondary-bg: var(--kardosh-surface, rgb(30 41 59));
  --pcc-btn-secondary-fg: var(--kardosh-ink, #ffffff);
  --pcc-btn-outline-bg: var(--kardosh-surface, rgb(30 41 59));
  --pcc-btn-outline-border: var(--kardosh-border, rgb(71 85 105));
  --pcc-btn-outline-fg: var(--kardosh-ink, rgb(226 232 240));
}

.property-contact-card__header {
  position: relative;
  padding: 1.5rem 1.5rem 1.625rem;
  background: var(--pcc-header-bg);
  color: var(--pcc-header-fg);
}

.property-contact-card__badge {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--pcc-badge-fg);
  background: var(--pcc-badge-bg);
  border: 1px solid rgb(255 255 255 / 0.14);
  border-radius: 0.375rem;
}

.dark .property-contact-card__badge {
  color: rgb(15 23 42);
  background: rgb(250 250 250);
  border-color: transparent;
}

.property-contact-card__price {
  margin: 0;
  font-size: clamp(1.375rem, 4vw, 1.875rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--pcc-header-fg);
  word-break: break-word;
}

.property-contact-card__body {
  padding: 1.25rem 1.5rem 1.5rem;
  color: var(--pcc-body-fg);
}

.property-contact-card__specs {
  margin: 0 0 1.25rem;
  padding: 0 0 1.25rem;
  border-bottom: 1px solid var(--pcc-divider);
}

.property-contact-card__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin: 0;
  padding: 0.375rem 0;
  font-size: 1rem;
}

.property-contact-card__row dt {
  margin: 0;
  font-weight: 500;
  color: var(--pcc-muted);
}

.property-contact-card__row dd {
  margin: 0;
  font-weight: 700;
  text-align: end;
  color: var(--pcc-value);
}

.property-contact-card__agency {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--pcc-divider);
}

.property-contact-card__mark-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: var(--pcc-mark-bg);
  border: 1px solid var(--pcc-divider);
}

.property-contact-card__mark {
  max-height: 2rem;
  max-width: 2rem;
}

.property-contact-card__mark-wrap :deep(.kardosh-brand-img) {
  filter: none;
  opacity: 1;
}

.dark .property-contact-card__mark-wrap :deep(.kardosh-brand-img) {
  filter: brightness(0) invert(1);
}

.property-contact-card__agency-text {
  min-width: 0;
}

.property-contact-card__agency-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--pcc-value);
  line-height: 1.2;
}

.property-contact-card__agency-tag {
  margin: 0.25rem 0 0;
  font-size: 0.9375rem;
  color: var(--pcc-muted);
}

.property-contact-card__actions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.property-contact-card__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.75rem 1.125rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  border-radius: 0.625rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.property-contact-card__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.property-contact-card__btn--primary {
  background: var(--pcc-btn-primary-bg);
  border-color: var(--pcc-btn-primary-border);
  color: var(--pcc-btn-primary-fg);
}

.property-contact-card__btn--primary:hover {
  background: var(--btn-primary-hover, var(--color-primary-dark, #008f34));
  border-color: var(--btn-primary-hover, var(--color-primary-dark, #008f34));
  color: var(--btn-primary-text, #ffffff);
  transform: translateY(-1px);
}

.dark .property-contact-card__btn--primary:hover {
  filter: none;
}

.property-contact-card__btn--whatsapp {
  background: var(--pcc-btn-secondary-bg);
  border-color: var(--pcc-whatsapp-border);
  color: var(--pcc-btn-secondary-fg);
}

.property-contact-card__btn--whatsapp:hover {
  background: var(--pcc-whatsapp-hover-bg);
  border-color: rgb(37 211 102 / 0.65);
}

.dark .property-contact-card__btn--whatsapp:hover {
  color: #ffffff;
}

.property-contact-card__btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
}

.property-contact-card__btn--outline {
  background: var(--pcc-btn-outline-bg);
  border-color: var(--pcc-btn-outline-border);
  color: var(--pcc-btn-outline-fg);
}

.property-contact-card__btn--outline:hover {
  border-color: var(--btn-primary-bg, var(--color-primary, #00a63e));
  background: var(--btn-secondary-hover-bg, rgb(240 253 244));
  color: var(--btn-secondary-hover-text, var(--color-primary-dark, #008f34));
}

.dark .property-contact-card__btn--outline:hover {
  border-color: var(--btn-primary-bg, var(--color-primary, #00cc4b));
  background: var(--btn-secondary-hover-bg, rgb(5 46 22 / 0.45));
  color: var(--btn-secondary-hover-text, var(--color-primary-300, #00f55a));
}
</style>
