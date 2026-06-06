/**
 * Copy Dashboard/dist -> repo-root dist for Hostinger (expects output at ./dist).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'Dashboard', 'dist')
const dest = path.join(root, 'dist')

if (!fs.existsSync(src)) {
  console.error('[copy-dashboard-dist] Missing Dashboard/dist - Vite build did not run?')
  process.exit(1)
}

fs.rmSync(dest, { recursive: true, force: true })
fs.cpSync(src, dest, { recursive: true })
console.log(`[copy-dashboard-dist] Copied Dashboard/dist -> dist (${fs.readdirSync(dest).length} entries)`)
