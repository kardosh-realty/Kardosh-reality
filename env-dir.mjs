import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Shared `.env` lives in the `kardosh/` folder (parent of Dashboard, Landing, Welcome). */
export const envDir = path.dirname(fileURLToPath(import.meta.url))
