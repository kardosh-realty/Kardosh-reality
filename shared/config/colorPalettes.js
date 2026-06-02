/**
 * Kardosh brand colors — navy & steel blue (Palette B, finalized).
 * Shared by Landing + Dashboard. Applied via usePalette on startup.
 */

/**
 * @typedef {Object} PaletteMode
 * @property {string} primary
 * @property {string} primaryDark
 * @property {string} [primary500]
 * @property {string} primaryTint
 * @property {string} primaryBorder
 * @property {string} [page]
 * @property {string} [surface]
 * @property {string} [surfaceMuted]
 * @property {string} [ink]
 * @property {string} [muted]
 * @property {string} [border]
 * @property {string} [headerBg]
 * @property {string} [headerFg]
 * @property {string} [headerFgMuted]
 * @property {string} [logoSurface]
 * @property {string} [btnBg]
 * @property {string} [btnBgHover]
 * @property {string} [btnText]
 * @property {string} [btnShadow]
 * @property {string} [btnSecondaryHoverBg]
 * @property {string} [btnSecondaryHoverText]
 * @property {string} [btnOutlineText]
 * @property {string} [btnHeroBg]
 * @property {string} [btnHeroHover]
 * @property {string} [btnHeroText]
 */

/**
 * @typedef {Object} ColorPalette
 * @property {string} label
 * @property {string} [description]
 * @property {boolean} [logoSafe]
 * @property {string[]} [swatches]
 * @property {PaletteMode} light
 * @property {PaletteMode} dark
 */

/** Navy · steel blue — production brand */
const kardoshBrand = {
  label: 'Kardosh navy',
  description: 'Navy · steel blue',
  logoSafe: true,
  swatches: ['#1e3a5f', '#152a45', '#2a5080', '#7eb3e8', '#f8fafc'],
  light: {
    primary: '#1e3a5f',
    primaryDark: '#152a45',
    primary500: '#2a5080',
    primaryTint: 'rgb(30 58 95 / 0.1)',
    primaryBorder: 'rgb(30 58 95 / 0.22)',
    page: '#f8fafc',
    surface: '#ffffff',
    surfaceMuted: '#f1f5f9',
    ink: '#0f172a',
    muted: '#64748b',
    border: 'rgb(30 58 95 / 0.14)',
    headerBg: 'rgb(255 255 255 / 0.94)',
    headerFg: '#1e3a5f',
    headerFgMuted: '#64748b',
    logoSurface: '#ffffff',
    btnBg: '#1e3a5f',
    btnBgHover: '#152a45',
    btnText: '#ffffff',
    btnShadow: 'rgb(30 58 95 / 0.28)',
    btnSecondaryHoverBg: 'rgb(30 58 95 / 0.08)',
    btnSecondaryHoverText: '#1e3a5f',
    btnOutlineText: '#152a45',
    btnHeroBg: '#1e3a5f',
    btnHeroHover: '#152a45',
    btnHeroText: '#ffffff',
  },
  dark: {
    primary: '#7eb3e8',
    primaryDark: '#5b8ec4',
    primary500: '#9ecbf0',
    primaryTint: 'rgb(126 179 232 / 0.14)',
    primaryBorder: 'rgb(126 179 232 / 0.3)',
    page: '#0f172a',
    surface: '#1e293b',
    surfaceMuted: '#334155',
    ink: '#f8fafc',
    muted: '#94a3b8',
    border: 'rgb(51 65 85)',
    headerBg: 'rgb(15 23 42 / 0.94)',
    headerFg: '#f8fafc',
    headerFgMuted: '#94a3b8',
    btnBg: '#3d6a9e',
    btnBgHover: '#2a5080',
    btnText: '#ffffff',
    btnShadow: 'rgb(0 0 0 / 0.3)',
    btnSecondaryHoverBg: 'rgb(148 163 184 / 0.14)',
    btnSecondaryHoverText: '#cbd5e1',
    btnOutlineText: '#9ecbf0',
    btnHeroBg: '#3d6a9e',
    btnHeroHover: '#2a5080',
    btnHeroText: '#ffffff',
  },
}

export const COLOR_PALETTES = {
  default: kardoshBrand,
}

export const DEFAULT_PALETTE_ID = 'default'

export const PALETTE_IDS = Object.keys(COLOR_PALETTES)

export function getPalette(id) {
  return COLOR_PALETTES[id] ?? COLOR_PALETTES[DEFAULT_PALETTE_ID]
}
