// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: '3D Print Shop Harm',
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        { 'http-equiv': 'Expires', content: '0' }
      ],
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' 
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/logo.png'
        }
      ]
    },
    // Add a unique build ID to force browser to load new assets on each server restart
    buildAssetsDir: `/_nuxt/${new Date().getTime()}/`,
    pageTransition: false,
    layoutTransition: false
  },
  // Import global CSS
  css: [
    '@/assets/css/modern.css'
  ],
  // Disable client-side caching during development
  vite: {
    server: {
      hmr: {
        protocol: 'ws'
      },
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    },
    build: {
      // Ensure unique file hashes
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash]-${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name]-[hash]-${new Date().getTime()}.js`,
          assetFileNames: `assets/[name]-[hash]-${new Date().getTime()}.[ext]`
        }
      }
    }
  },
  // Disable persistent cache
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    storage: {
      fs: {
        driver: 'fs',
        base: './.nuxt/cache'
      }
    },
    devStorage: {
      // Disable persistent caching
      cache: {
        driver: 'memory'
      }
    }
  }
})