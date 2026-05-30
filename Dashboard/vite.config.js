import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { envDir } from '../env-dir.mjs'

function viteClientEnv(env) {
  return Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => key.startsWith('VITE_'))
      .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value ?? '')])
  )
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, '')

  return {
    envDir,
    define: viteClientEnv(env),
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5176,
      strictPort: false,
      proxy: {
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
