import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { envDir } from '../env-dir.mjs'

/** Inject all VITE_* vars from kardosh/.env (fixes dev when envDir alone does not reach the client). */
function viteClientEnv(env) {
  return Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => key.startsWith('VITE_'))
      .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value ?? '')])
  )
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, '')

  return {
    envDir,
    define: viteClientEnv(env),
    plugins: [vue(), tailwindcss()],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/swiper')) return 'swiper'
            if (id.includes('node_modules/vue-router')) return 'vue-vendor'
            if (id.includes('node_modules/vue/') || id.includes('node_modules/@vue')) return 'vue-vendor'
            if (id.includes('node_modules/vue-select')) return 'vue-select'
            if (id.includes('node_modules/lucide-vue-next')) return 'icons'
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      proxy: {
        // Keeps Reelly API key server-side during local dev
        // @see https://docs.reelly.ai/docs/reelly-api-v20-getting-started
        '/api/reelly': {
          target: 'https://api-reelly.up.railway.app',
          changeOrigin: true,
          timeout: 120_000,
          proxyTimeout: 120_000,
          rewrite: (p) => p.replace(/^\/api\/reelly/, '/api/v2/clients'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.REELLY_API_KEY) {
                proxyReq.setHeader('X-API-Key', env.REELLY_API_KEY)
              }
            })
          },
        },
      },
    },
  }
})
