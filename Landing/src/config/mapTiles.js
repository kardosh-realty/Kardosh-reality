/**
 * Leaflet basemap. Defaults to OpenStreetMap (no key).
 * Set VITE_MAP_TILE_URL / VITE_MAP_TILE_ATTRIBUTION to use a keyed provider
 * (e.g. MapTiler, Stadia) — CARTO basemaps now require an API key.
 */
const OSM_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'

const envUrl = String(import.meta.env.VITE_MAP_TILE_URL || '').trim()

export const MAP_TILES = {
  url: envUrl || OSM_URL,
  attribution: String(import.meta.env.VITE_MAP_TILE_ATTRIBUTION || '').trim() || OSM_ATTRIBUTION,
  maxZoom: Number(import.meta.env.VITE_MAP_TILE_MAX_ZOOM) || (envUrl ? 20 : 19),
}
