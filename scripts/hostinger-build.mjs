/**
 * Hostinger runs `npm run build` only — use HOSTINGER_APP to pick the app.
 * landing  → kardoshrealty.ae
 * dashboard → admin.kardoshrealty.ae
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const app = String(process.argv[2] || process.env.HOSTINGER_APP || process.env.KARDOSH_DEPLOY || 'landing').toLowerCase()

function run(cmd, args) {
  console.log(`[hostinger-build] ${app}: ${cmd} ${args.join(' ')}`)
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(`[hostinger-build] HOSTINGER_APP=${app}`)

if (app === 'dashboard' || app === 'admin') {
  run('npm', ['install', '--prefix', 'Dashboard'])
  run('npm', ['run', 'build', '--prefix', 'Dashboard'])
  run('node', ['scripts/copy-dashboard-dist.mjs'])
} else if (app === 'landing' || app === 'public') {
  run('npm', ['install', '--prefix', 'Landing'])
  run('npm', ['run', 'build', '--prefix', 'Landing'])
  run('node', ['scripts/copy-landing-dist.mjs'])
} else if (app === 'combined') {
  run('npm', ['install', '--prefix', 'Landing'])
  run('npm', ['install', '--prefix', 'Dashboard'])
  run('npm', ['run', 'build', '--prefix', 'Landing'])
  run('npm', ['run', 'build:hostinger', '--prefix', 'Dashboard'])
  run('node', ['scripts/compose-dist.mjs'])
} else {
  console.error(`[hostinger-build] Unknown HOSTINGER_APP="${app}" (use landing or dashboard)`)
  process.exit(1)
}

console.log(`[hostinger-build] done (${app})`)
