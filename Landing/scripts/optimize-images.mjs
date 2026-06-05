/**
 * Compress marketing images for PageSpeed — desktop + mobile WebP variants.
 * Run before `vite build` — outputs alongside sources in assets/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function loadSharp() {
  try {
    const mod = await import('sharp')
    return mod.default
  } catch {
    return null
  }
}

async function optimizeWebp(sharp, inFile, outFile, { maxWidth = 1920, quality = 72, replace = false } = {}) {
  const input = path.join(root, inFile)
  if (!fs.existsSync(input)) {
    console.warn(`[optimize-images] skip missing ${inFile}`)
    return
  }

  const before = fs.statSync(input).size
  const outPath = path.join(root, outFile)
  const tmpPath = `${outPath}.tmp`

  await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(tmpPath)

  const after = fs.statSync(tmpPath).size
  if (replace && outPath === input && after >= before) {
    fs.unlinkSync(tmpPath)
    console.log(`[optimize-images] keep ${inFile} (${Math.round(before / 1024)} KiB)`)
    return
  }

  if (fs.existsSync(outPath)) fs.unlinkSync(outPath)
  fs.copyFileSync(tmpPath, outPath)
  fs.unlinkSync(tmpPath)

  console.log(
    `[optimize-images] ${path.basename(outFile)} ${Math.round(before / 1024)} → ${Math.round(after / 1024)} KiB`
  )
}

const COMMUNITY_JPGS = [
  'business-bay.jpg',
  'downtown-dubai.jpg',
  'dubai-creek-harbour.jpg',
  'dubai-hills.jpg',
  'dubai-marina.jpg',
  'jvc.jpg',
  'palm-jumeirah.jpg',
]

async function main() {
  const sharp = await loadSharp()
  if (!sharp) {
    console.warn('[optimize-images] sharp not available — skipping (using committed WebP assets)')
    return
  }

  await optimizeWebp(sharp, 'src/assets/images/bg/001.webp', 'src/assets/images/bg/001-hero.webp', {
    maxWidth: 1600,
    quality: 70,
  })

  await optimizeWebp(sharp, 'src/assets/images/bg/001-hero.webp', 'src/assets/images/bg/001-hero-mobile.webp', {
    maxWidth: 768,
    quality: 68,
  })

  await optimizeWebp(
    sharp,
    'src/assets/images/Why invest in Dubai.jpg',
    'src/assets/images/why-invest-dubai.webp',
    { maxWidth: 1600, quality: 78 }
  )

  await optimizeWebp(
    sharp,
    'src/assets/images/why-invest-dubai.webp',
    'src/assets/images/why-invest-dubai-mobile.webp',
    { maxWidth: 768, quality: 72 }
  )

  for (const file of COMMUNITY_JPGS) {
    const base = file.replace(/\.jpg$/i, '')
    const src = `src/assets/images/communities/${file}`
    await optimizeWebp(sharp, src, `src/assets/images/communities/${base}-480.webp`, {
      maxWidth: 480,
      quality: 72,
    })
    await optimizeWebp(sharp, src, `src/assets/images/communities/${base}-960.webp`, {
      maxWidth: 960,
      quality: 78,
    })
  }

  const PAGE_HERO_JPGS = ['01', '02', '03', '04']
  for (const id of PAGE_HERO_JPGS) {
    const src = `src/assets/images/bg/${id}.jpg`
    await optimizeWebp(sharp, src, `src/assets/images/bg/${id}-768.webp`, {
      maxWidth: 768,
      quality: 68,
    })
    await optimizeWebp(sharp, src, `src/assets/images/bg/${id}-1280.webp`, {
      maxWidth: 1280,
      quality: 72,
    })
  }

  await optimizeWebp(sharp, 'src/assets/images/about.jpg', 'src/assets/images/about-480.webp', {
    maxWidth: 480,
    quality: 72,
  })
  await optimizeWebp(sharp, 'src/assets/images/about.jpg', 'src/assets/images/about-768.webp', {
    maxWidth: 768,
    quality: 74,
  })
}

main().catch((e) => {
  console.error('[optimize-images] failed:', e)
  process.exit(1)
})
