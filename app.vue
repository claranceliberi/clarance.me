<script lang="ts" setup>

import { useHead, useSeoMeta } from '#app'
import { onMounted, onBeforeUnmount } from 'vue'

const { $mixpanel } = useNuxtApp()

const scrollThresholds = [25, 50, 75, 100]
const firedThresholds = new Set<number>()

function handleScroll() {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - doc.clientHeight
  if (scrollable <= 0) return
  const pct = Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100)
  for (const t of scrollThresholds) {
    if (pct >= t && !firedThresholds.has(t)) {
      firedThresholds.add(t)
      $mixpanel.track('scroll_depth_reached', { depth_percentage: t })
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

useSeoMeta({
  ogImage: 'https://res.cloudinary.com/dawr8i20o/image/upload/c_scale,f_webp,w_910/v1725092932/claranceliberi.me/Liberi_profile_pic_2_-min_rxo6gw.webp',
  twitterTitle: 'Clarance Liberi',
  twitterDescription: 'Welcome to my personal website. I am a software engineer. ',
  twitterImage: 'https://res.cloudinary.com/dawr8i20o/image/upload/c_scale,f_webp,w_910/v1725092932/claranceliberi.me/Liberi_profile_pic_2_-min_rxo6gw.webp',
})

useHead({
  // The card type was always left empty (no valid card). An empty entry here keeps
  // @nuxtjs/seo from filling in summary_large_image; useSeoMeta's type rejects ''.
  meta: [{ name: 'twitter:card', content: '' }],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
</script>
<template>
  <div style="height:100vh">
    <NuxtPage />
  </div>
</template>
