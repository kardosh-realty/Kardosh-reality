/**
 * Brand color palettes (shared: Landing + Dashboard).
 * Edit hex values here — dev switcher, ?palette=slug, or VITE_ENABLE_PALETTE_REVIEW on Vercel.
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
 * @property {boolean} [logoSafe] Keep black logo visible (no invert; light logo areas)
 * @property {string[]} [swatches]
 * @property {PaletteMode} light
 * @property {PaletteMode} dark
 */

/** Current Kardosh green — baseline */
const defaultGreen = {
  label: 'Kardosh green',
  description: 'Current brand',
  light: {
    primary: '#00a63e',
    primaryDark: '#008f34',
    primary500: '#00cc4b',
    primaryTint: 'rgb(0 166 62 / 0.08)',
    primaryBorder: 'rgb(0 166 62 / 0.2)',
  },
  dark: {
    primary: '#00cc4b',
    primaryDark: '#00a63e',
    primary500: '#33ff7e',
    primaryTint: 'rgb(0 204 75 / 0.12)',
    primaryBorder: 'rgb(0 204 75 / 0.28)',
    btnBg: '#00cc4b',
    btnBgHover: '#00a63e',
    btnText: '#ffffff',
    btnShadow: 'rgb(0 204 75 / 0.28)',
  },
}

/** Replace these slots with your test palettes */
/** Sage & teal — Eggshell, Tea green, Muted / Tropical / Jungle teal */
const sageTeal = {
  label: 'Sage & teal',
  description: 'Eggshell · Tea green · Teals',
  logoSafe: true,
  swatches: ['#FAF3DD', '#C8D5B9', '#8FC0A9', '#68B0AB', '#4A7C59'],
  light: {
    primary: '#4A7C59',
    primaryDark: '#3a6348',
    primary500: '#68B0AB',
    primaryTint: 'rgb(200 213 185 / 0.55)',
    primaryBorder: 'rgb(74 124 89 / 0.22)',
    page: '#FAF3DD',
    surface: '#ffffff',
    surfaceMuted: '#C8D5B9',
    ink: '#1e3329',
    muted: '#4a6b5c',
    border: 'rgb(74 124 89 / 0.16)',
    headerBg: 'rgb(250 243 221 / 0.96)',
    headerFg: '#1e3329',
    headerFgMuted: '#4a6b5c',
    logoSurface: '#FAF3DD',
    btnBg: '#4A7C59',
    btnBgHover: '#3a6348',
    btnText: '#FAF3DD',
    btnShadow: 'rgb(74 124 89 / 0.28)',
    btnSecondaryHoverBg: '#C8D5B9',
    btnSecondaryHoverText: '#1e3329',
    btnOutlineText: '#3a6348',
    btnHeroBg: '#4A7C59',
    btnHeroHover: '#3a6348',
    btnHeroText: '#FAF3DD',
  },
  dark: {
    primary: '#8FC0A9',
    primaryDark: '#68B0AB',
    primary500: '#9fd4be',
    primaryTint: 'rgb(143 192 169 / 0.18)',
    primaryBorder: 'rgb(143 192 169 / 0.28)',
    page: '#1e3329',
    surface: '#243d32',
    surfaceMuted: '#2d4a3d',
    ink: '#f0f7f2',
    muted: '#a8c4b5',
    border: 'rgb(143 192 169 / 0.2)',
    headerBg: 'rgb(250 243 221 / 0.96)',
    headerFg: '#1e3329',
    headerFgMuted: '#4a6b5c',
    logoSurface: '#FAF3DD',
    btnBg: '#68B0AB',
    btnBgHover: '#4A7C59',
    btnText: '#FAF3DD',
    btnShadow: 'rgb(0 0 0 / 0.25)',
    btnSecondaryHoverBg: 'rgb(143 192 169 / 0.22)',
    btnSecondaryHoverText: '#e8f4ec',
    btnOutlineText: '#9fd4be',
    btnHeroBg: '#68B0AB',
    btnHeroHover: '#4A7C59',
    btnHeroText: '#FAF3DD',
  },
}

/** Test palette — sky cyan #76BED0 */
const sky76bed0 = {
  label: 'Sky #76BED0',
  description: 'Test · sky cyan',
  logoSafe: true,
  swatches: ['#f0f9fc', '#9ad4e3', '#76BED0', '#4d9fb5', '#0c2a33'],
  light: {
    primary: '#76BED0',
    primaryDark: '#4d9fb5',
    primary500: '#9ad4e3',
    primaryTint: 'rgb(118 190 208 / 0.22)',
    primaryBorder: 'rgb(118 190 208 / 0.38)',
    page: '#f0f9fc',
    surface: '#ffffff',
    surfaceMuted: '#e3f4f8',
    ink: '#0c2a33',
    muted: '#4a6b78',
    border: 'rgb(118 190 208 / 0.28)',
    headerBg: 'rgb(255 255 255 / 0.94)',
    headerFg: '#0c2a33',
    headerFgMuted: '#4a6b78',
    logoSurface: '#ffffff',
    btnBg: '#4d9fb5',
    btnBgHover: '#3d8fa3',
    btnText: '#ffffff',
    btnShadow: 'rgb(77 163 184 / 0.35)',
    btnSecondaryHoverBg: 'rgb(118 190 208 / 0.18)',
    btnSecondaryHoverText: '#0c2a33',
    btnOutlineText: '#3d8fa3',
    btnHeroBg: '#4d9fb5',
    btnHeroHover: '#3d8fa3',
    btnHeroText: '#ffffff',
  },
  dark: {
    primary: '#9ad4e3',
    primaryDark: '#76BED0',
    primary500: '#b8e4ef',
    primaryTint: 'rgb(118 190 208 / 0.14)',
    primaryBorder: 'rgb(154 212 227 / 0.32)',
    page: '#0a1f28',
    surface: '#12303d',
    surfaceMuted: '#1a3f4d',
    ink: '#e8f6fa',
    muted: '#94b8c4',
    border: 'rgb(118 190 208 / 0.22)',
    headerBg: 'rgb(255 255 255 / 0.94)',
    headerFg: '#0c2a33',
    headerFgMuted: '#4a6b78',
    logoSurface: '#ffffff',
    btnBg: '#76BED0',
    btnBgHover: '#4d9fb5',
    btnText: '#0c2a33',
    btnShadow: 'rgb(0 0 0 / 0.28)',
    btnSecondaryHoverBg: 'rgb(118 190 208 / 0.12)',
    btnSecondaryHoverText: '#9ad4e3',
    btnOutlineText: '#9ad4e3',
    btnHeroBg: '#76BED0',
    btnHeroHover: '#4d9fb5',
    btnHeroText: '#0c2a33',
  },
}

/** Test palette — slate blue #6A8EAE */
const slate6a8eae = {
  label: 'Slate #6A8EAE',
  description: 'Test · steel blue',
  logoSafe: true,
  swatches: ['#f4f7fa', '#8aa8c4', '#6A8EAE', '#547a96', '#1a2d3d'],
  light: {
    primary: '#6A8EAE',
    primaryDark: '#547a96',
    primary500: '#8aa8c4',
    primaryTint: 'rgb(106 142 174 / 0.2)',
    primaryBorder: 'rgb(106 142 174 / 0.34)',
    page: '#f4f7fa',
    surface: '#ffffff',
    surfaceMuted: '#e8eef4',
    ink: '#1a2d3d',
    muted: '#5a6d7d',
    border: 'rgb(106 142 174 / 0.26)',
    headerBg: 'rgb(255 255 255 / 0.94)',
    headerFg: '#1a2d3d',
    headerFgMuted: '#5a6d7d',
    logoSurface: '#ffffff',
    btnBg: '#547a96',
    btnBgHover: '#4a6f87',
    btnText: '#ffffff',
    btnShadow: 'rgb(84 122 150 / 0.32)',
    btnSecondaryHoverBg: 'rgb(106 142 174 / 0.16)',
    btnSecondaryHoverText: '#1a2d3d',
    btnOutlineText: '#4a6f87',
    btnHeroBg: '#547a96',
    btnHeroHover: '#4a6f87',
    btnHeroText: '#ffffff',
  },
  dark: {
    primary: '#8aa8c4',
    primaryDark: '#6A8EAE',
    primary500: '#a3bdd4',
    primaryTint: 'rgb(106 142 174 / 0.14)',
    primaryBorder: 'rgb(138 168 196 / 0.3)',
    page: '#141f2a',
    surface: '#1c2a38',
    surfaceMuted: '#243545',
    ink: '#eef3f7',
    muted: '#9aafc0',
    border: 'rgb(106 142 174 / 0.22)',
    headerBg: 'rgb(255 255 255 / 0.94)',
    headerFg: '#1a2d3d',
    headerFgMuted: '#5a6d7d',
    logoSurface: '#ffffff',
    btnBg: '#6A8EAE',
    btnBgHover: '#547a96',
    btnText: '#ffffff',
    btnShadow: 'rgb(0 0 0 / 0.28)',
    btnSecondaryHoverBg: 'rgb(106 142 174 / 0.12)',
    btnSecondaryHoverText: '#a3bdd4',
    btnOutlineText: '#a3bdd4',
    btnHeroBg: '#6A8EAE',
    btnHeroHover: '#547a96',
    btnHeroText: '#ffffff',
  },
}

/** Sky Surge — Black · sky blue · soft linen · khaki · dim gray */
const skySurge = {
  label: 'Sky Surge',
  description: 'Black · sky blue · soft linen',
  logoSafe: true,
  swatches: ['#07020D', '#5DB7DE', '#F1E9DB', '#A39B8B', '#716A5C'],
  light: {
    primary: '#5DB7DE',
    primaryDark: '#3d9ec8',
    primary500: '#7ec8eb',
    primaryTint: 'rgb(93 183 222 / 0.22)',
    primaryBorder: 'rgb(93 183 222 / 0.38)',
    page: '#F1E9DB',
    surface: '#ffffff',
    surfaceMuted: '#e8e0d4',
    ink: '#07020D',
    muted: '#716A5C',
    border: 'rgb(113 106 92 / 0.22)',
    headerBg: 'rgb(241 233 219 / 0.96)',
    headerFg: '#07020D',
    headerFgMuted: '#716A5C',
    logoSurface: '#F1E9DB',
    btnBg: '#3d9ec8',
    btnBgHover: '#2f8ab5',
    btnText: '#ffffff',
    btnShadow: 'rgb(61 158 200 / 0.32)',
    btnSecondaryHoverBg: 'rgb(163 155 139 / 0.28)',
    btnSecondaryHoverText: '#07020D',
    btnOutlineText: '#2f8ab5',
    btnHeroBg: '#3d9ec8',
    btnHeroHover: '#2f8ab5',
    btnHeroText: '#ffffff',
  },
  dark: {
    primary: '#5DB7DE',
    primaryDark: '#4a9bc4',
    primary500: '#7ec8eb',
    primaryTint: 'rgb(93 183 222 / 0.14)',
    primaryBorder: 'rgb(93 183 222 / 0.3)',
    page: '#07020D',
    surface: '#120e18',
    surfaceMuted: '#1c1724',
    ink: '#F1E9DB',
    muted: '#A39B8B',
    border: 'rgb(113 106 92 / 0.32)',
    headerBg: 'rgb(7 2 13 / 0.94)',
    headerFg: '#F1E9DB',
    headerFgMuted: '#A39B8B',
    logoSurface: '#F1E9DB',
    btnBg: '#5DB7DE',
    btnBgHover: '#4a9bc4',
    btnText: '#07020D',
    btnShadow: 'rgb(0 0 0 / 0.35)',
    btnSecondaryHoverBg: 'rgb(93 183 222 / 0.12)',
    btnSecondaryHoverText: '#7ec8eb',
    btnOutlineText: '#7ec8eb',
    btnHeroBg: '#5DB7DE',
    btnHeroHover: '#4a9bc4',
    btnHeroText: '#07020D',
  },
}

/** Palette B — navy (light) · steel blue accents (dark) */
const paletteB = {
  label: 'Palette B',
  description: 'Navy · steel blue',
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
  default: defaultGreen,

  'sage-teal': sageTeal,

  'palette-b': paletteB,

  'sky-76bed0': sky76bed0,

  'slate-6a8eae': slate6a8eae,

  'sky-surge': skySurge,

  /** Slot A — e.g. deep teal + gold accent */
  'palette-a': {
    label: 'Palette A',
    description: 'Edit in colorPalettes.js',
    light: {
      primary: '#0d6e5b',
      primaryDark: '#084a3f',
      primary500: '#14a38a',
      primaryTint: 'rgb(13 110 91 / 0.1)',
      primaryBorder: 'rgb(13 110 91 / 0.22)',
    },
    dark: {
      primary: '#2dd4bf',
      primaryDark: '#14a38a',
      primary500: '#5eead4',
      primaryTint: 'rgb(45 212 191 / 0.12)',
      primaryBorder: 'rgb(45 212 191 / 0.28)',
    },
  },

  /** Slot C — e.g. warm bronze luxury */
  'palette-c': {
    label: 'Palette C',
    description: 'Edit in colorPalettes.js',
    light: {
      primary: '#9a6b3f',
      primaryDark: '#7a5230',
      primary500: '#b88452',
      primaryTint: 'rgb(154 107 63 / 0.1)',
      primaryBorder: 'rgb(154 107 63 / 0.22)',
    },
    dark: {
      primary: '#d4a574',
      primaryDark: '#b88452',
      primary500: '#e8c9a0',
      primaryTint: 'rgb(212 165 116 / 0.12)',
      primaryBorder: 'rgb(212 165 116 / 0.28)',
    },
  },
}

export const DEFAULT_PALETTE_ID = 'default'

export const PALETTE_IDS = Object.keys(COLOR_PALETTES)

export function getPalette(id) {
  return COLOR_PALETTES[id] ?? COLOR_PALETTES[DEFAULT_PALETTE_ID]
}
