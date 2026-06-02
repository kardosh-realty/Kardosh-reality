/**
 * Compress large marketing images for PageSpeed (hero LCP, home sections).
 * Run before `vite build` — overwrites 001.webp in place when smaller.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function optimizeWebp(inFile, outFile, { maxWidth = 1920, quality = 72, replace = false } = {}) {
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

async function main() {
  await optimizeWebp('src/assets/images/bg/001.webp', 'src/assets/images/bg/001-hero.webp', {
    maxWidth: 1600,
    quality: 70,
  })

  await optimizeWebp(
    'src/assets/images/Why invest in Dubai.jpg',
    'src/assets/images/why-invest-dubai.webp',
    { maxWidth: 1600, quality: 78 }
  )
}

main().catch((e) => {
  console.error('[optimize-images] failed:', e)
  process.exit(1)
})
