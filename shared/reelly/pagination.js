/** Shared Reelly offset/limit pagination for projects, markers, developers, etc. */

export const REELLY_PAGE_SIZE = 100
export const REELLY_MAX_PAGES = 50

/**
 * Walk paginated Reelly list endpoints until the batch is empty or shorter than page size.
 * @param {(params: { limit: string, offset: string }) => Promise<{ results?: unknown[], count?: number }>} fetchPage
 */
export async function fetchAllPaginated(fetchPage, {
  pageSize = REELLY_PAGE_SIZE,
  maxPages = REELLY_MAX_PAGES,
} = {}) {
  const all = []
  let offset = 0
  let totalCount = null

  for (let page = 0; page < maxPages; page++) {
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
