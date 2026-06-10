/** Shared Reelly offset/limit pagination for projects, markers, developers, etc. */

export const REELLY_PAGE_SIZE = 100
export const REELLY_MAX_PAGES = 50

/**
 * Walk paginated Reelly list endpoints until the batch is empty or shorter than page size.
 * @param {(params: { limit: string, offset: string }) => Promise<{ results?: unknown[], count?: number }>} fetchPage
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchAllPaginated(fetchPage, {
  pageSize = REELLY_PAGE_SIZE,
  maxPages = REELLY_MAX_PAGES,
  pageDelayMs = 0,
} = {}) {
  const all = []
  let offset = 0
  let totalCount = null

  for (let page = 0; page < maxPages; page++) {
    if (pageDelayMs > 0 && page > 0) await sleep(pageDelayMs)
    const data = await fetchPage({
      limit: String(pageSize),
      offset: String(offset),
    })
    const batch = data?.results ?? []
    if (totalCount == null && typeof data?.count === 'number') {
      totalCount = data.count
    }
    if (!batch.length) break
    all.push(...batch)
    if (batch.length < pageSize) break
    if (totalCount != null && all.length >= totalCount) break
    offset += pageSize
  }

  return { count: totalCount ?? all.length, results: all }
}

/**
 * Fetch page 0 first, then remaining pages in concurrent batches (faster for large catalogues).
 * @param {(params: { limit: string, offset: string }) => Promise<{ results?: unknown[], count?: number }>} fetchPage
 */
export async function fetchAllPaginatedConcurrent(fetchPage, {
  pageSize = REELLY_PAGE_SIZE,
  maxPages = REELLY_MAX_PAGES,
  concurrency = 3,
} = {}) {
  const first = await fetchPage({ limit: String(pageSize), offset: '0' })
  const firstBatch = first?.results ?? []
  let totalCount = typeof first?.count === 'number' ? first.count : null

  if (!firstBatch.length || firstBatch.length < pageSize) {
    return { count: totalCount ?? firstBatch.length, results: firstBatch }
  }

  const all = [...firstBatch]
  const totalPages =
    totalCount != null
      ? Math.min(maxPages, Math.ceil(totalCount / pageSize))
      : maxPages

  const offsets = []
  for (let page = 1; page < totalPages; page++) {
    offsets.push(page * pageSize)
  }

  for (let i = 0; i < offsets.length; i += concurrency) {
    const chunk = offsets.slice(i, i + concurrency)
    const pages = await Promise.all(
      chunk.map(async (offset) => {
        const data = await fetchPage({ limit: String(pageSize), offset: String(offset) })
        return data?.results ?? []
      })
    )
    for (const batch of pages) {
      if (!batch.length) return { count: totalCount ?? all.length, results: all }
      all.push(...batch)
      if (batch.length < pageSize) return { count: totalCount ?? all.length, results: all }
      if (totalCount != null && all.length >= totalCount) {
        return { count: totalCount, results: all }
      }
    }
  }

  return { count: totalCount ?? all.length, results: all }
}
