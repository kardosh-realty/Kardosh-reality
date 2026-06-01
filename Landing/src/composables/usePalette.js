import { ref, readonly } from 'vue'
import {
  COLOR_PALETTES,
  DEFAULT_PALETTE_ID,
  PALETTE_IDS,
  getPalette,
} from '@kardosh/shared/config/colorPalettes'
import { canPersistPaletteChoice, isPaletteReviewEnabled } from '@kardosh/shared/config/paletteReview'

const STORAGE_KEY = 'kardosh-palette-dev'

/** Dev-only: apply this palette on first visit when nothing is stored (?palette= still wins). */
const DEV_PREVIEW_PALETTE_ID = 'palette-b'

const SURFACE_VAR_MAP = [
  ['page', '--kardosh-page'],
  ['surface', '--kardosh-surface'],
  ['surfaceMuted', '--kardosh-surface-muted'],
  ['ink', '--kardosh-ink'],
  ['muted', '--kardosh-muted'],
  ['border', '--kardosh-border'],
  ['headerBg', '--kardosh-header-bg'],
  ['headerFg', '--kardosh-header-fg'],
  ['headerFgMuted', '--kardosh-header-fg-muted'],
  ['logoSurface', '--kardosh-logo-surface'],
]

const currentPaletteId = ref(DEFAULT_PALETTE_ID)

function parsePrimaryRgb(hex) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n) || full.length < 6) return null
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  }
}

function applyPaletteVars(palette, dark) {
  const root = document.documentElement
  const mode = dark ? palette.dark : palette.light

  root.dataset.palette = currentPaletteId.value
  if (palette.logoSafe) {
    root.dataset.logoSafe = 'true'
  } else {
    delete root.dataset.logoSafe
  }

  const btnBg = mode.btnBg ?? mode.primary
  const btnBgHover = mode.btnBgHover ?? mode.primaryDark

  const vars = {
    '--color-primary': mode.primary,
    '--color-primary-dark': mode.primaryDark,
    '--color-primary-500': mode.primary500 ?? mode.primary,
    '--color-primary-400': mode.primary500 ?? mode.primary,
    '--color-primary-300': mode.primary500 ?? mode.primary,
    '--kardosh-primary-tint': mode.primaryTint,
    '--kardosh-primary-border': mode.primaryBorder,
    '--btn-primary-bg': btnBg,
    '--btn-primary-hover': btnBgHover,
    '--btn-primary-text': mode.btnText ?? '#ffffff',
    '--btn-hero-bg': mode.btnHeroBg ?? btnBg,
    '--btn-hero-hover': mode.btnHeroHover ?? btnBgHover,
    '--btn-hero-text': mode.btnHeroText ?? mode.btnText ?? '#ffffff',
    '--btn-hero-border': btnBgHover,
  }

  if (mode.btnShadow) {
    vars['--btn-primary-shadow'] = mode.btnShadow
  } else {
    const rgb = parsePrimaryRgb(mode.primary)
    vars['--btn-primary-shadow'] = rgb
      ? `rgb(${rgb.r} ${rgb.g} ${rgb.b} / 0.22)`
      : 'rgb(0 0 0 / 0.12)'
  }

  const rgb = parsePrimaryRgb(mode.primary)
  if (rgb) {
    vars['--kardosh-primary-rgb'] = `${rgb.r} ${rgb.g} ${rgb.b}`
  }

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }

  for (const [prop, cssVar] of SURFACE_VAR_MAP) {
    if (mode[prop]) {
      root.style.setProperty(cssVar, mode[prop])
    } else {
      root.style.removeProperty(cssVar)
    }
  }

  /* Light mode: keep page/canvas white — palette tints apply to accents only */
  if (!dark) {
    root.style.setProperty('--kardosh-page', '#ffffff')
    root.style.setProperty('--kardosh-surface', '#ffffff')
    root.style.setProperty('--kardosh-surface-muted', '#f8fafc')
    root.style.setProperty('--kardosh-header-bg', 'rgb(255 255 255 / 0.94)')
    root.style.setProperty('--kardosh-logo-surface', '#ffffff')
  }

  root.style.setProperty(
    '--btn-secondary-hover-bg',
    mode.btnSecondaryHoverBg ?? mode.primaryTint
  )
  root.style.setProperty(
    '--btn-secondary-hover-text',
    mode.btnSecondaryHoverText ?? mode.primaryDark
  )
  root.style.setProperty('--btn-outline-text', mode.btnOutlineText ?? mode.primaryDark)
}

function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

export function applyCurrentPalette() {
  if (typeof document === 'undefined') return
  applyPaletteVars(getPalette(currentPaletteId.value), isDarkMode())
}

export function initPalette() {
  if (typeof window === 'undefined') return

  const fromUrl = new URLSearchParams(window.location.search).get('palette')
  const stored = localStorage.getItem(STORAGE_KEY)
  const devDefault =
    import.meta.env.DEV &&
    DEV_PREVIEW_PALETTE_ID in COLOR_PALETTES &&
    DEV_PREVIEW_PALETTE_ID

  const id =
    (fromUrl && COLOR_PALETTES[fromUrl] && fromUrl) ||
    (stored && COLOR_PALETTES[stored] && stored) ||
    devDefault ||
    DEFAULT_PALETTE_ID

  currentPaletteId.value = id
  applyCurrentPalette()

  if (canPersistPaletteChoice() && fromUrl && COLOR_PALETTES[fromUrl]) {
    localStorage.setItem(STORAGE_KEY, fromUrl)
  }
}

function syncPaletteQuery(id) {
  if (!isPaletteReviewEnabled() || typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('palette', id)
  window.history.replaceState({}, '', url)
}

export function setPalette(id) {
  if (!COLOR_PALETTES[id]) return
  currentPaletteId.value = id
  if (canPersistPaletteChoice()) {
    localStorage.setItem(STORAGE_KEY, id)
    syncPaletteQuery(id)
  }
  applyCurrentPalette()
}

/** Call when light/dark theme toggles so primary shades match mode */
export function onThemeChanged() {
  applyCurrentPalette()
}

export function usePalette() {
  return {
    paletteId: readonly(currentPaletteId),
    palettes: COLOR_PALETTES,
    paletteIds: PALETTE_IDS,
    setPalette,
    applyCurrentPalette,
  }
}
