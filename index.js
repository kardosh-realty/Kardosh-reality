/**
 * Hostinger entry — separate app per domain via HOSTINGER_APP.
 * landing   → kardoshrealty.ae
 * dashboard → admin.kardoshrealty.ae
 *
 * Combined single-site (/admin) is server/hostinger-server.mjs — use build:combined only.
 */
console.log('[boot]', {
  app: process.env.HOSTINGER_APP || process.env.KARDOSH_DEPLOY || 'landing',
  cwd: process.cwd(),
  port: process.env.PORT,
})

const app = String(process.env.HOSTINGER_APP || process.env.KARDOSH_DEPLOY || 'landing').toLowerCase()
const isDashboard = app === 'dashboard' || app === 'admin'

const entry = isDashboard
  ? './Dashboard/server/hostinger-server.mjs'
  : './Landing/server/hostinger-server.mjs'

import(entry).catch((err) => {
  console.error('[boot] failed:', err?.stack || err)
  process.exit(1)
})
