/** True in local dev, or when VITE_ENABLE_PALETTE_REVIEW=true on Vercel (client palette review). */
export function isPaletteReviewEnabled() {
  if (import.meta.env.DEV) return true
  const v = String(import.meta.env.VITE_ENABLE_PALETTE_REVIEW || '').toLowerCase()
  return v === 'true' || v === '1' || v === 'yes'
}

export function canPersistPaletteChoice() {
  return isPaletteReviewEnabled()
}
