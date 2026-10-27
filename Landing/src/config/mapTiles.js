/**
 * Leaflet basemap.
 * - VITE_MAP_TILE_URL (+ VITE_MAP_TILE_ATTRIBUTION): any custom provider.
 * - VITE_CARTO_API_KEY: CARTO Voyager (English labels). Free key: https://carto.com/basemaps/apikey
 * - Neither: OpenStreetMap standard tiles (local-language labels, Arabic in Dubai).
 */
const OSM_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
const CARTO_ATTRIBUTION = `${OSM_ATTRIBUTION} &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>`

const envUrl = String(import.meta.env.VITE_MAP_TILE_URL || '').trim()
const cartoKey = String(import.meta.env.VITE_CARTO_API_KEY || '').trim()

function resolveTiles() {
  if (envUrl) {
    return { url: envUrl, attribution: OSM_ATTRIBUTION, maxZoom: 20 }
  }
  if (cartoKey) {
    return {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${encodeURIComponent(cartoKey)}`,
      attribution: CARTO_ATTRIBUTION,
      maxZoom: 20,
    }
  }
  return { url: OSM_URL, attribution: OSM_ATTRIBUTION, maxZoom: 19 }
}

const tiles = resolveTiles()

export const MAP_TILES = {
  url: tiles.url,
  attribution: String(import.meta.env.VITE_MAP_TILE_ATTRIBUTION || '').trim() || tiles.attribution,
  maxZoom: Number(import.meta.env.VITE_MAP_TILE_MAX_ZOOM) || tiles.maxZoom,
}
