<template>
  <div
    v-if="hasMultipleLocales"
    class="kardosh-header__lang"
    role="group"
    :aria-label="t('footer.language')"
  >
    <button
      v-for="loc in locales"
      :key="loc.id"
      type="button"
      class="kardosh-header__lang-btn"
      :class="{ 'kardosh-header__lang-btn--active': locale === loc.id }"
      :aria-pressed="locale === loc.id"
      :aria-label="loc.label"
      @click="selectLocale(loc.id)"
    >
      {{ loc.short }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import { useT } from '@/composables/useT'

const t = useT()
const { locale, locales, setLocale } = useLanguage()
const router = useRouter()
const route = useRoute()

const hasMultipleLocales = computed(() => locales.length > 1)

function selectLocale(id) {
  if (id === locale.value) return
  setLocale(id, { router, route })
}
</script>
