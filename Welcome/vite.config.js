import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { envDir } from '../env-dir.mjs'

export default defineConfig(({ mode }) => {
  loadEnv(mode, envDir, '')

  return {
    envDir,
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      host: true,
      port: Number(process.env.WELCOME_PORT || process.env.PORT) || 5180,
      strictPort: false,
      open: true,
    },
    preview: {
      host: true,
      port: Number(process.env.WELCOME_PORT || process.env.PORT) || 4180,
    },
  }
})
