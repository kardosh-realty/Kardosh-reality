/** Normalize Reelly responses (paginated object vs plain array). */
export function normalizeList(data) {
  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data }
  }
  return {
    count: data?.count ?? data?.results?.length ?? 0,
    next: data?.next ?? null,
    previous: data?.previous ?? null,
    results: data?.results ?? [],
  }
}
