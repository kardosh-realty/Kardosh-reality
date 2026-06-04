<template>
  <li class="inline-block align-middle">
    <div class="footer-lang-dropdown">
      <label :for="selectId" class="sr-only">{{ t('footer.language') }}</label>
      <div class="footer-lang-dropdown__wrap">
        <Languages class="footer-lang-dropdown__icon size-4 shrink-0" aria-hidden="true" />
        <span class="footer-lang-dropdown__label" aria-hidden="true">{{ currentLabel }}</span>
        <ChevronDown class="footer-lang-dropdown__chevron size-4 shrink-0" aria-hidden="true" />
        <select
          :id="selectId"
          class="footer-lang-dropdown__select"
          :value="locale"
          :dir="textDirection"
          :aria-label="`${t('footer.language')}, ${currentLabel}`"
          @change="onChange"
        >
          <option v-for="loc in locales" :key="loc.id" :value="loc.id">
            {{ loc.label }}
          </option>
        </select>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Languages, ChevronDown } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'
import { useT } from '@/composables/useT'

const selectId = 'footer-language-select'
const t = useT()

const { locale, locales, setLocale, textDirection } = useLanguage()
const router = useRouter()
const route = useRoute()

const currentLabel = computed(
  () => locales.find((l) => l.id === locale.value)?.label ?? 'English'
)

function onChange(event) {
  setLocale(event.target.value, { router, route })
}
</script>
