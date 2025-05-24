// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: '3D Print Shop Harm - Professioneller 3D-Druck Service in Eutin',
      htmlAttrs: {
        lang: 'de-DE'
      },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: '3D Print Shop Harm in Eutin - Ihr Experte für professionellen 3D-Druck, Prototyping, FDM & Resin-Druck. Hochwertige 3D-Drucklösungen für Privat und Gewerbe.' },
        { name: 'keywords', content: '3D Druck, 3D Printing, Eutin, Prototyping, FDM Druck, Resin Druck, 3D Modellierung, 3D Print Shop, Lasse Harm, Schleswig-Holstein' },
        { name: 'author', content: 'Lasse Harm - 3D Print Shop Harm' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://3dps.space/' },
        { property: 'og:title', content: '3D Print Shop Harm - Professioneller 3D-Druck Service in Eutin' },
        { property: 'og:description', content: 'Ihr Experte für professionellen 3D-Druck in Eutin. FDM & Resin-Druck, Prototyping, 3D-Modellierung. Hochwertige Lösungen für Ihre Projekte.' },
        { property: 'og:image', content: 'https://3dps.space/logo.png' },
        { property: 'og:locale', content: 'de_DE' },
        { property: 'og:site_name', content: '3D Print Shop Harm' },
        
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://3dps.space/' },
        { property: 'twitter:title', content: '3D Print Shop Harm - Professioneller 3D-Druck Service' },
        { property: 'twitter:description', content: 'Professioneller 3D-Druck Service in Eutin. FDM & Resin-Druck, Prototyping, 3D-Modellierung.' },
        { property: 'twitter:image', content: 'https://3dps.space/logo.png' },
        
        // Business Information
        { name: 'geo.region', content: 'DE-SH' },
        { name: 'geo.placename', content: 'Eutin' },
        { name: 'geo.position', content: '54.1539146;10.6172643' },
        { name: 'ICBM', content: '54.1539146, 10.6172643' },
        
        // Cache Control (for development)
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
        },
        {
          rel: 'apple-touch-icon',
          href: '/logo.png'
        },
        {
          rel: 'canonical',
          href: 'https://3dps.space/'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "3D Print Shop Harm",
            "image": "https://3dps.space/logo.png",
            "url": "https://3dps.space",
            "telephone": "+49",
            "email": "service@3dps.space",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Krete 8",
              "addressLocality": "Eutin",
              "postalCode": "23701",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 54.1539146,
              "longitude": 10.6172643
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.instagram.com/3d.print.shop.harm",
              "https://www.facebook.com/profile.php?id=61551244577763",
              "https://www.etsy.com/de-en/shop/3DPrintShopHarm"
            ],
            "priceRange": "€€",
            "servesCuisine": "3D-Druck Service",
            "taxID": "DE 351 241 205"
          })
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