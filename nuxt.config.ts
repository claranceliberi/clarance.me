// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync } from 'node:fs'

// No page links to the blog posts, so `nuxt generate` cannot find them by crawling.
// List every content/blog/*.md so static builds include them.
const blogRoutes = readdirSync(new URL('./content/blog', import.meta.url))
  .filter((file) => file.endsWith('.md'))
  .map((file) => `/blog/${file.replace(/\.md$/, '')}`)

export default defineNuxtConfig({
  site: {
    url: 'https://www.clarance.me/',
    name: 'Clarance Liberi Ntwari',
    description: 'Welcome to my personal website. I am a software engineer.',
    defaultLocale: 'en',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@unocss/nuxt',
    "@nuxtjs/google-fonts",
    '@nuxtjs/seo',
    'nuxt-gtag'
  ],
  // @nuxtjs/color-mode 4 changed the default class from 'dark-mode' to 'dark',
  // which switches on the unfinished .dark theme. Keep the old class.
  colorMode: {
    classSuffix: '-mode',
  },
  build: {
    transpile: ["shiki"],
  },
  // @nuxtjs/seo 6 turns these on by default. Keep them off so the upgrade does not
  // change what the site serves: no llms.txt / Markdown copies / AI Content-Signal
  // in robots.txt, no skew-protection service worker, no generated OG images
  // (the OG image is set explicitly in app.vue).
  aiReady: false,
  skewProtection: false,
  ogImage: false,
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-JHWPXRB96E'
   },
  tailwindcss: {
    cssPath: '~/assets/styles/_tailwind.scss'
  },

  css:["@/assets/styles/index.scss"],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'vitesse-dark',
        },
      },
    },
    // Node 22's built-in node:sqlite, so no native better-sqlite3 build is needed.
    experimental: {
      sqliteConnector: 'native',
    },
  },
  googleFonts: {
      // Show fallback text while the fonts load. The site has no Korean text,
      // so only the Latin slices are needed (Noto Sans KR ships ~120 Hangul ones).
      display: 'swap',
      subsets: ['latin', 'latin-ext'],
      families: {
        "Kode Mono": true,
        "Noto Sans KR": '100..900'
      }
    },

  nitro: {
    // Write .br and .gz next to each text asset so the static server can serve
    // precompressed files (Caddy has no brotli encoder of its own).
    compressPublicAssets: { brotli: true, gzip: true },
    prerender: {
      routes: blogRoutes,
    },
    // Without an explicit list, TypeScript loads every @types/* package, and
    // @types/parse-path (a stub pulled in by a dependency) has no types to load.
    typescript: {
      tsConfig: { compilerOptions: { types: ['node'] } },
    },
  },

  compatibilityDate: '2024-08-31'
})
