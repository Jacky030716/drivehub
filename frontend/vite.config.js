import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    target: 'es2015'  // or higher
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})