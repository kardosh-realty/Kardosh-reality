import { ref } from 'vue'
import { DEFAULT_PALETTE_ID, getPalette } from '@kardosh/shared/config/colorPalettes'

const LEGACY_STORAGE_KEY = 'kardosh-palette-dev'

/** Bumped whenever CSS palette vars are reapplied (charts, etc.). */
export const paletteRevision = ref(0)

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

  root.dataset.palette = DEFAULT_PALETTE_ID
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
    '--color-primary-200': mode.primary500 ?? mode.primary,
    '--color-primary-100': mode.primary500 ?? mode.primary,
    '--color-primary-50': mode.primary500 ?? mode.primary,
    '--btn-primary-bg': btnBg,
    '--btn-primary-hover': btnBgHover,
    '--btn-primary-text': mode.btnText ?? '#ffffff',
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

  paletteRevision.value += 1
}

function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

export function applyCurrentPalette() {
  if (typeof document === 'undefined') return
  applyPaletteVars(getPalette(DEFAULT_PALETTE_ID), isDarkMode())
}

export function initPalette() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY)
  } catch {
    /* ignore */
  }
  applyCurrentPalette()
}

export function onThemeChanged() {
  applyCurrentPalette()
}
