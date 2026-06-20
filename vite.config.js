import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://api.trubbi.ai').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-site-url',
        transformIndexHtml(html) {
          return html.replaceAll('%VITE_SITE_URL%', siteUrl)
        },
      },
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.trubbi.ai/',
          changeOrigin: true,
        },
      },
    },
  }
})
