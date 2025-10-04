// https://nuxt.com/docs/api/configuration/nuxt-config
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

  compatibilityDate: '2024-08-31'
})
