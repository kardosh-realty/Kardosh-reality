<template>
  <header
    id="topnav"
    :class="
      cn(
        'kardosh-header sticky top-0 z-[999] mx-auto w-full border-b border-transparent transition-all duration-300 ease-out',
        open && 'kardosh-header--menu-open',
        {
          'kardosh-header--floating': scrolled && !open,
          'kardosh-header--sheet-open': open,
          'kardosh-header--hero': heroLight && !scrolled && !open,
        }
      )
    "
  >
    <nav
      :class="
        cn(
          'kardosh-header__nav flex h-[3.75rem] w-full max-w-[90rem] mx-auto items-center justify-between gap-4 px-4 lg:h-16 lg:px-8 lg:transition-all lg:ease-out',
          isCenteredNav && 'kardosh-header__nav--centered',
          isFloating && 'kardosh-header__nav--floating'
        )
      "
    >
      <RouterLink
        to="/"
        class="kardosh-header__logo shrink-0"
        @click="closeMenu"
      >
        <BrandLogo
          variant="full"
          size="nav"
          :invert-on-dark="useLightLogo"
        />
      </RouterLink>

      <div class="kardosh-header__desktop hidden items-center min-w-0 gap-1 lg:gap-1.5">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="cn('kardosh-header__link', isActive(item) && 'kardosh-header__link--active')"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="kardosh-header__actions flex shrink-0 items-center gap-2">
        <HeaderThemeButton class="kardosh-header__theme-desktop" />

        <ContactTextSwapButton
          to="/contact"
          class="kardosh-header__enquire"
          @click="closeMenu"
        />

        <button
          type="button"
          class="kardosh-header__menu-btn"
          :aria-expanded="open"
          aria-controls="kardosh-mobile-nav"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <MenuToggleIcon :open="open" class="kardosh-header__menu-icon" :duration="300" />
        </button>
      </div>
    </nav>

    <Teleport to="body">
      <Transition name="kardosh-mobile-nav">
        <div
          v-if="open"
          id="kardosh-mobile-nav"
          class="kardosh-header__mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <button
            type="button"
            class="kardosh-header__mobile-backdrop"
            aria-label="Close menu"
            tabindex="-1"
            @click="closeMenu"
          />
          <aside class="kardosh-header__mobile-panel">
            <div class="kardosh-header__mobile-scroll">
              <p class="kardosh-header__mobile-label">Explore</p>
              <nav class="kardosh-header__mobile-nav" aria-label="Site">
                <RouterLink
                  v-for="item in navItems"
                  :key="item.path"
                  :to="item.path"
                  :class="cn('kardosh-header__mobile-link', isActive(item) && 'kardosh-header__mobile-link--active')"
                  @click="closeMenu"
                >
                  <span class="kardosh-header__mobile-link-text">{{ item.label }}</span>
                  <ChevronRight class="kardosh-header__mobile-link-chevron" aria-hidden="true" />
                </RouterLink>
              </nav>
            </div>

            <div class="kardosh-header__mobile-footer">
              <button
                type="button"
                class="kardosh-header__mobile-theme"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleTheme"
              >
                <span class="kardosh-header__mobile-theme-icon" aria-hidden="true">
                  <Sun v-if="isDark" class="size-5" />
                  <Moon v-else class="size-5" />
                </span>
                <span class="kardosh-header__mobile-theme-copy">
                  <span class="kardosh-header__mobile-theme-title">
                    {{ isDark ? 'Light mode' : 'Dark mode' }}
                  </span>
                  <span class="kardosh-header__mobile-theme-hint">Tap to switch appearance</span>
                </span>
                <ChevronRight class="kardosh-header__mobile-theme-chevron size-5 shrink-0" aria-hidden="true" />
              </button>

              <ContactTextSwapButton
                to="/contact"
                block
                class="kardosh-header__mobile-contact"
                @click="closeMenu"
              />
            </div>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { cn } from '@/lib/utils'
import { useScroll } from '@/composables/useScroll'
import { useTheme } from '@/composables/useTheme'
import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import HeaderThemeButton from '@/component/kardosh/HeaderThemeButton.vue'
import MenuToggleIcon from '@/component/ui/MenuToggleIcon.vue'
import ContactTextSwapButton from '@/component/ui/ContactTextSwapButton.vue'
import { ChevronRight, Moon, Sun } from 'lucide-vue-next'

const props = defineProps({
  /** Transparent bar over dark hero (legacy `navbar-white`) */
  heroLight: { type: Boolean, default: false },
})

const navItems = [
  { path: '/', label: 'Home', exact: true },
  { path: '/aboutus', label: 'About' },
  { path: '/grid-map', label: 'Map' },
  { path: '/off-plan', label: 'Off-Plan' },
  { path: '/communities', label: 'Communities' },
  { path: '/developers', label: 'Developers' },
  { path: '/why-dubai', label: 'Why Dubai' },
]

const open = ref(false)
const scrolled = useScroll(10)
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const isFloating = computed(() => scrolled.value && !open.value)

/** Logo left · links center · Contact right (hero + scrolled pill) */
const isCenteredNav = computed(
  () => (props.heroLight && !scrolled.value && !open.value) || isFloating.value
)

/** White logo only on transparent hero — not on white mobile bar / open menu */
const useLightLogo = computed(
  () => props.heroLight && !scrolled.value && !open.value
)

function isActive(item) {
  const path = route.path
  if (item.exact) return path === '/'
  if (item.path === '/developers') return path.startsWith('/developer')
  if (item.path === '/off-plan') {
    return path === '/off-plan' || path === '/grid' || path.startsWith('/property-detail')
  }
  if (item.path === '/grid-map') return path === '/grid-map'
  if (item.path === '/communities') return path.startsWith('/communities')
  return path === item.path || path.startsWith(item.path + '/')
}

function closeMenu() {
  open.value = false
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

watch(
  () => route.path,
  () => {
    closeMenu()
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
