// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync } from 'node:fs'

// No page links to the blog posts, so `nuxt generate` cannot find them by crawling.
// List every content/blog/*.md so static builds include them.
const blogRoutes = readdirSync(new URL('./content/blog', import.meta.url))
  .filter((file) => file.endsWith('.md'))
  .map((file) => `/blog/${file.replace(/\.md$/, '')}`)

export default defineNuxtConfig({
  site: {
    url: 'https://clarance.me/',
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
    "@nuxt/image",
    '@nuxtjs/seo',
    'nuxt-gtag'
  ],
  build: {
    transpile: ["shiki"],
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-JHWPXRB96E'
   },
  tailwindcss: {
    cssPath: '~/assets/styles/_tailwind.scss'
  },

  css:["@/assets/styles/index.scss"],

  content: {
    highlight:{

      theme:'vitesse-dark'
    }
  },
  googleFonts: {
      prefetch:true,
      preconnect:true,
      preload:true,
      families: {
        "Kode Mono": true,
        "Noto Sans KR": '100..900'
      }
    },

  nitro: {
    prerender: {
      routes: blogRoutes,
    },
  },

  compatibilityDate: '2024-08-31'
})
