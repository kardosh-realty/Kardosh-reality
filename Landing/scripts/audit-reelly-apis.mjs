/**
 * Smoke-test Reelly proxy endpoints used by the Landing app.
 * Usage: npm run dev (separate terminal), then: node scripts/audit-reelly-apis.mjs
 */
const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:5173/api/reelly'
const DEFAULT_QS =
  'language=en-us&preferred_currency=AED&preferred_area_unit=m2'

const endpoints = [
  { name: 'projects (UAE list)', path: '/projects', qs: `${DEFAULT_QS}&country=United+Arab+Emirates&limit=5&offset=0` },
  { name: 'projects markers', path: '/projects/markers', qs: `${DEFAULT_QS}&country=United+Arab+Emirates&limit=5&offset=0` },
  { name: 'developers logos', path: '/developers/logos', qs: DEFAULT_QS },
]

async function fetchJson(label, url) {
  const start = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 120_000)
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    const ms = Date.now() - start
    let body
    try {
      body = await res.json()
    } catch {
      body = null
    }
    const list = body?.results ?? body?.data ?? (Array.isArray(body) ? body : null)
    const count = Array.isArray(list) ? list.length : body?.count ?? (body?.id ? 1 : null)
    return {
      label,
      ok: res.ok,
      status: res.status,
      ms,
      count,
      error: res.ok ? null : body?.message || body?.error || res.statusText,
    }
  } catch (e) {
    return {
      label,
      ok: false,
      status: e.name === 'AbortError' ? 408 : 0,
      ms: Date.now() - start,
      count: null,
      error: e.message,
    }
  } finally {
    clearTimeout(timer)
  }
}

async function main() {
  console.log(`Auditing Reelly proxy at ${BASE}\n`)

  const results = []
  for (const ep of endpoints) {
    const url = `${BASE}${ep.path}?${ep.qs}`
    results.push(await fetchJson(ep.name, url))
  }

  const projectsOk = results[0]?.ok && (results[0]?.count ?? 0) > 0
  let projectId = null
  let developerId = null

  if (projectsOk) {
    const listUrl = `${BASE}/projects?${DEFAULT_QS}&country=United+Arab+Emirates&limit=1&offset=0`
    const res = await fetch(listUrl, { headers: { Accept: 'application/json' } })
    const data = await res.json()
    const first = data?.results?.[0] ?? data?.data?.[0]
    projectId = first?.id
    developerId = first?.developer_id ?? first?.developer?.id

    if (projectId && !developerId) {
      const detailRes = await fetch(`${BASE}/projects/${projectId}?${DEFAULT_QS}`, {
        headers: { Accept: 'application/json' },
      })
      if (detailRes.ok) {
        const detail = await detailRes.json()
        developerId =
          detail?.developer_id ??
          detail?.developer?.id ??
          detail?.developer_data?.id ??
          null
      }
    }
  }

  if (projectId) {
    results.push(
      await fetchJson(
        `project detail #${projectId}`,
        `${BASE}/projects/${projectId}?${DEFAULT_QS}`
      )
    )
    results.push(
      await fetchJson(
        `project units #${projectId}`,
        `${BASE}/projects/${projectId}/units?${DEFAULT_QS}&limit=5&offset=0`
      )
    )
  } else {
    results.push({
      label: 'project detail (skipped)',
      ok: false,
      status: 0,
      ms: 0,
      count: null,
      error: 'No project id from list',
    })
  }

  if (developerId) {
    results.push(
      await fetchJson(
        `developer #${developerId}`,
        `${BASE}/developers/${developerId}?${DEFAULT_QS}`
      )
    )
  } else {
    results.push({
      label: 'developer detail (skipped)',
      ok: false,
      status: 0,
      ms: 0,
      count: null,
      error: 'No developer id on sample project',
    })
  }

  const critical = ['projects (UAE list)', 'projects markers', 'project detail']
  const soft = ['developers logos', 'project units']

  const failed = results.filter((r) => !r.ok)
  const hardFailed = failed.filter((r) => critical.some((c) => r.label.startsWith(c)))
  const softFailed = failed.filter((r) => soft.some((s) => r.label.startsWith(s)))

  for (const r of results) {
    const isSoft = soft.some((s) => r.label.startsWith(s))
    const icon = r.ok ? 'OK' : isSoft ? 'SLOW' : 'FAIL'
    const extra = r.count != null ? ` (${r.count} items)` : ''
    console.log(
      `[${icon}] ${r.label} — ${r.status || '—'} in ${(r.ms / 1000).toFixed(1)}s${extra}${r.error ? ` — ${r.error}` : ''}`
    )
  }

  console.log('')
  if (softFailed.length) {
    console.log(
      `${softFailed.length} slow/optional endpoint(s) timed out (logos/units). UI degrades gracefully; retry or use cache.`
    )
  }
  if (hardFailed.length) {
    console.log(`${hardFailed.length} critical check(s) failed.`)
    process.exit(1)
  }
  console.log('Critical Reelly API checks passed.')
}

main()
