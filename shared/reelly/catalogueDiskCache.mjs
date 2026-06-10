import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const REELLY_DISK_CACHE_DIR = path.join(ROOT, '.cache', 'reelly')

function diskPath(key) {
  const safe = key.replace(/[^a-zA-Z0-9._-]/g, '_')
  return path.join(REELLY_DISK_CACHE_DIR, `${safe}.json`)
}

/** @returns {{ savedAt: number, payload: object, age: number } | null} */
export function readDiskCatalogue(key) {
  try {
    const p = diskPath(key)
    if (!fs.existsSync(p)) return null
    const parsed = JSON.parse(fs.readFileSync(p, 'utf8'))
    if (!parsed?.savedAt || parsed.payload == null) return null
    return {
      savedAt: parsed.savedAt,
      payload: parsed.payload,
      age: Date.now() - parsed.savedAt,
    }
  } catch {
    return null
  }
}

export function writeDiskCatalogue(key, payload) {
  try {
    fs.mkdirSync(REELLY_DISK_CACHE_DIR, { recursive: true })
    fs.writeFileSync(
      diskPath(key),
      JSON.stringify({ savedAt: Date.now(), payload }),
      'utf8'
    )
  } catch (err) {
    console.warn('[reelly] disk cache write failed:', err?.message || err)
  }
}
