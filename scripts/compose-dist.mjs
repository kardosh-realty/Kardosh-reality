/**
 * Compose one Hostinger output folder:
 * - Landing/dist -> dist/
 * - Dashboard/dist -> dist/admin/
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const landingDist = path.join(root, 'Landing', 'dist')
const dashboardDist = path.join(root, 'Dashboard', 'dist')
const outputDist = path.join(root, 'dist')
const adminDist = path.join(outputDist, 'admin')

for (const dir of [landingDist, dashboardDist]) {
  if (!fs.existsSync(dir)) {
    console.error(`[compose-dist] Missing ${path.relative(root, dir)} - build both apps first.`)
    process.exit(1)
  }
}

fs.rmSync(outputDist, { recursive: true, force: true })
fs.cpSync(landingDist, outputDist, { recursive: true })
fs.rmSync(adminDist, { recursive: true, force: true })
fs.cpSync(dashboardDist, adminDist, { recursive: true })

console.log(`[compose-dist] Landing -> dist (${fs.readdirSync(outputDist).length} entries)`)
console.log(`[compose-dist] Dashboard -> dist/admin (${fs.readdirSync(adminDist).length} entries)`)
