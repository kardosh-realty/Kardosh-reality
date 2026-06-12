/**
 * Hostinger entry — separate app per domain via HOSTINGER_APP.
 * landing   → kardoshrealty.ae      (Landing/server)
 * dashboard → admin.kardoshrealty.ae (Dashboard/server)
 *
 * Do NOT load server/hostinger-server.mjs here — that is the combined /admin site.
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

await import(entry)
