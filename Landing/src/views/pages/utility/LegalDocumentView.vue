<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    v-if="page"
    :title="page.title"
    :subtitle="page.description"
    :eyebrow="t('legal.eyebrow')"
    :image="heroImage"
    compact
  />

  <section v-if="page" class="relative lg:py-20 py-14">
    <div class="container">
      <div class="md:flex justify-center">
        <article class="md:w-3/4 legal-document prose-policy">
          <header class="legal-document__meta">
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ t('legal.lastUpdated', { date: page.lastUpdated }) }}
            </p>
          </header>

          <div
            v-for="(section, index) in page.sections"
            :key="`${section.heading || 'section'}-${index}`"
            class="legal-document__section"
          >
            <h2 v-if="section.heading" class="legal-document__heading">
              {{ section.heading }}
            </h2>

            <p
              v-for="(paragraph, pIndex) in section.paragraphs"
              :key="`p-${index}-${pIndex}`"
              class="legal-document__paragraph"
            >
              {{ paragraph }}
            </p>

            <ul v-if="section.items?.length" class="legal-document__list">
              <li v-for="(item, itemIndex) in section.items" :key="`li-${index}-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
          </div>

          <section class="legal-document__contact" aria-labelledby="legal-contact-heading">
            <h2 id="legal-contact-heading" class="legal-document__heading">{{ t('legal.contactHeading') }}</h2>
            <p class="legal-document__paragraph">
              {{ t('legal.contactBody', { title: page.title.toLowerCase() }) }}
            </p>
            <ul class="legal-document__contact-list">
              <li>
                <strong>{{ site.companyName }}</strong>
              </li>
              <li>
                <span class="legal-document__contact-label">{{ t('legal.contactLabels.email') }}</span>
                <a :href="`mailto:${site.email}`" class="legal-document__contact-link">{{ site.email }}</a>
              </li>
              <li>
                <span class="legal-document__contact-label">{{ t('legal.contactLabels.phone') }}</span>
                <a :href="phoneHref" class="legal-document__contact-link">{{ site.phone }}</a>
              </li>
              <li>
                <span class="legal-document__contact-label">{{ t('legal.contactLabels.address') }}</span>
                <span>{{ site.address }}</span>
              </li>
            </ul>
          </section>

          <div class="legal-document__actions mt-8">
            <button
              type="button"
              class="btn bg-primary hover:bg-primary-dark text-white rounded-lg"
              @click="printPage"
            >
              {{ t('legal.print') }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { computed } from 'vue'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import { site } from '@/composables/useSiteSettings'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { getLegalPage } from '@/config/legal-content'
import { useT } from '@/composables/useT'

const t = useT()

const props = defineProps({
  legalKey: {
    type: String,
    required: true,
    validator: (value) => ['terms', 'privacy', 'cookie', 'finance'].includes(value),
  },
})

const page = computed(() => getLegalPage(props.legalKey))

const heroImage = computed(() =>
  props.legalKey === 'terms' ? PAGE_HERO_IMAGES.terms : PAGE_HERO_IMAGES.privacy
)

const phoneHref = computed(() => `tel:${String(site.phone || '').replace(/\s/g, '')}`)

function printPage() {
  window.print()
}
</script>

<style scoped>
.legal-document {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: var(--kardosh-surface, #fff);
  box-shadow: 0 1px 3px rgb(15 23 42 / 0.08);
}

.dark .legal-document {
  background: rgb(15 23 42);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
}

.legal-document__meta {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--kardosh-border, #e2e8f0);
}

.legal-document__section + .legal-document__section,
.legal-document__contact {
  margin-top: 2rem;
}

.legal-document__heading {
  margin: 0 0 0.875rem;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--kardosh-ink, #0f172a);
}

.dark .legal-document__heading {
  color: #f8fafc;
}

.legal-document__paragraph {
  margin: 0 0 0.875rem;
  line-height: 1.7;
  color: rgb(100 116 139);
}

.dark .legal-document__paragraph {
  color: rgb(203 213 225);
}

.legal-document__list {
  margin: 0 0 0.875rem;
  padding-left: 1.25rem;
  color: rgb(100 116 139);
  list-style: disc;
}

.dark .legal-document__list {
  color: rgb(203 213 225);
}

.legal-document__list li + li {
  margin-top: 0.375rem;
}

.legal-document__contact-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.legal-document__contact-list li {
  display: grid;
  gap: 0.125rem;
  color: rgb(100 116 139);
}

.dark .legal-document__contact-list li {
  color: rgb(203 213 225);
}

.legal-document__contact-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(148 163 184);
}

.legal-document__contact-link {
  color: var(--color-primary, #1e3a5f);
  text-decoration: none;
}

.legal-document__contact-link:hover {
  text-decoration: underline;
}

.dark .legal-document__contact-link {
  color: #9ecbf0;
}

@media print {
  .legal-document__actions {
    display: none;
  }
}
</style>
