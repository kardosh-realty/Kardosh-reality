import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { envDir } from '../env-dir.mjs'
import { imageProxyDevPlugin } from './server/imageProxyDevPlugin.mjs'
import { reellyCatalogueDevPlugin } from '../shared/reelly/reellyCatalogueDevPlugin.mjs'

/** Preconnect to Supabase + Reelly image CDN for faster LCP / API. */
function preconnectPlugin(env) {
  return {
    name: 'kardosh-preconnect',
    transformIndexHtml(html) {
      const hints = []
      const supabase = env.VITE_SUPABASE_URL
      if (supabase) {
        try {
          hints.push(`<link rel="preconnect" href="${new URL(supabase).origin}" crossorigin />`)
        } catch {
          /* ignore invalid url */
        }
      }
      hints.push('<link rel="preconnect" href="https://player.vimeo.com" crossorigin />')
      hints.push('<link rel="dns-prefetch" href="https://player.vimeo.com" />')
      hints.push('<link rel="dns-prefetch" href="https://storage.googleapis.com" />')
      if (!hints.length) return html
      return html.replace('</head>', `    ${hints.join('\n    ')}\n  </head>`)
    },
  }
}

/**
 * Preload the hero poster (the LCP element) using its hashed build URL so the
 * browser fetches it during HTML parse — before the SPA bundle boots.
 */
function heroPreloadPlugin() {
  return {
    name: 'kardosh-hero-preload',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const find = (re) => Object.keys(ctx.bundle).find((f) => re.test(f))
        const desktop = find(/001-hero-(?!mobile)[\w-]+\.webp$/)
        const mobile = find(/001-hero-mobile-[\w-]+\.webp$/)
        const primary = desktop || mobile
        if (!primary) return html
        const srcset = [
          desktop && `/${desktop} 1600w`,
          mobile && `/${mobile} 768w`,
        ]
          .filter(Boolean)
          .join(', ')
        const tag =
          `<link rel="preload" as="image" href="/${primary}" ` +
          `imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high" />`
        return html.replace('</head>', `    ${tag}\n  </head>`)
      },
    },
  }
}

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
    plugins: [vue(), tailwindcss(), preconnectPlugin(env), heroPreloadPlugin(), imageProxyDevPlugin(), reellyCatalogueDevPlugin({ envDir })],
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
            if (id.includes('node_modules/@supabase')) return 'supabase'
            if (id.includes('node_modules/vue-select')) return 'vue-select'
            if (id.includes('node_modules/lucide-vue-next')) return 'icons'
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@kardosh/shared': path.resolve(__dirname, '../shared'),
        'vue-router': path.resolve(__dirname, './src/lib/vue-router.js'),
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
