import path from 'node:path'

/** Resolve a URL path segment under baseDir without path traversal or absolute join bugs. */
export function resolveStaticPath(baseDir, urlPath) {
  const decoded = decodeURIComponent(String(urlPath || ''))
  const relative = decoded.replace(/^[/\\]+/, '')
  const normalized = path.normalize(relative).replace(/^(\.\.[/\\])+/, '')
  const resolved = path.resolve(baseDir, normalized || '.')
  const baseResolved = path.resolve(baseDir)

  if (resolved !== baseResolved && !resolved.startsWith(`${baseResolved}${path.sep}`)) {
    return null
  }

  return resolved
}
