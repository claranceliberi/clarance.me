<script lang="ts" setup>
import { experiences, books } from '@/data/index';

  const age = computed(() => {
      const birthDate = new Date(2003, 0, 10)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--
      }
      return age
  })

  const currentBook = computed(() => {
      return books.find(book => book.status == 'READING')
  })

</script>

<template>
    <NuxtLayout>
        <article class="relative selection:bg-grey-grey60 selection:text-white">
            <div class="min-h-[100%] w-56 rectangle absolute left z-0"></div>
            <div class="min-h-[100%] w-56 rectangle absolute right z-0"></div>

            <div class="flex justify-center pb-14">
                <div class="z-10 w-full max-w-[90%] md:max-w-[75%] ">
                    <div class="flex flex-col items-center py-20">
                        <div class="flex items-center space-x-4">
                            <AtomsIconButton icon="spaces" />
                            <span class="kode-mono-font text-lg text-zinc-700">About me</span>
                        </div>
                        <p class="text-2xl font-medium max-w-120 mt-10 text-center text-zinc-700">
                            A curious engineer, currently building the distributed cloud platform Africa doesn't have but desperately needs.
                        </p>
                    </div>

                    <div class="grid grid-cols-11 grid-rows- md:grid-rows-2 gap-8 md:gap-5">
                        <div
                            class="col-span-11 md:col-span-5 row-start-5 md:row-start-1 bg-white card bg-custom-gradient"
                        >
                            <AtomsIconButton icon="smile" />

                            <h2 class="card__title">Clarance Liberi<span class="text-grey-grey30">ste</span> Ntwari</h2>

                            <ul class="list-disc ml-8 md:text-sm space-y-2 text-zinc-500 font-light">
                                <li>{{ age }} years old</li>
                                <li>Rwanda 🇷🇼</li>
                                <li>Software Engineer</li>
                            </ul>
                        </div>
                        <div
                            class="col-span-11 md:col-span-5 row-start-6  md:row-start-2 bg-white bg-custom-gradient card"
                        >
                            <p class="text-zinc-500 font-light xl:text-md">
                                I fix things that piss me off. Usually that's slow software, broken infrastructure, or problems everyone says "can't be solved."
                                <br />
Africa-based engineering teams are stuck choosing between expensive, unreliable national cloud providers (who promise 98% SLA - the lowest in the world - then don't even meet it) or dealing with terrible latency to US servers. People have just accepted this is how it is.
I'm building <a href="https://cloud.strettch.com" target="_blank" rel="noopener noreferrer">strettch cloud</a>, to fix it.
                            </p>
                        </div>
                        <div
                            class="col-span-11 md:col-span-6 row-start-1 row-span-4 md:row-span-2 bg-grey-grey5 rounded-2xl p-2 border-2 shadow-2xl"
                        >
                            <img
                                src="https://res.cloudinary.com/dawr8i20o/image/upload/c_scale,f_webp,w_910/v1725092932/claranceliberi.me/Liberi_profile_pic_2_-min_rxo6gw.webp"
                                alt="clarance liberi profile picture"
                                class="object-cover w-full h-full rounded-xl"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-y-8 md:gap-5 pt-10">
                        <div class="col-span-2 bg-grey-grey10 card shadow-xl">
                        <AtomsIconButton icon="briefcase" />

                            <h2 class="card__title">Past Experience</h2>

                            <p class="pb-8 text-zinc-500 font-light ">A journey through code, creativity, and curiosity</p>

                            <ul class="list-none text-sm space-y-2 text-zinc-500 font-light">
                                <li v-for="{company, startDate, endDate, color} in experiences" class="flex items-center space-x-3 py-2">
                                 <AtomsBullet :ping="!endDate" :color="color" />  <div class="flex flex-1 justify-between">  <span class="font-semibold">{{ company }}</span> <span>{{ endDate ? `${startDate} - ${endDate}` : "Current" }}</span> </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="currentBook" class="card bg-grey-grey10">
                            <AtomsIconButton icon="book" />

                            <h2 class="card__title">Currently Reading</h2>

                            <p class="text-zinc-500 font-light ">{{ currentBook.title }}</p>

                            <h5 class="pb-3 text-zinc-500 font-medium ">By {{ currentBook.author }}</h5>

                            <NuxtImg :src="currentBook.cover" :alt="`${currentBook.title} book cover`" class="m-auto object-cover rounded-md border" :style="{width:'180px',height:'204px'}" />

                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center pb-10">
                <AtomsFooter />
            </div>
        </article>
    </NuxtLayout>
</template>

<style lang="scss">
/* https://kovart.github.io/dashed-border-generator/ */
.rectangle {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23e8e9ec' stroke-width='3' stroke-dasharray='9%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 16px;

    &.left {
        left: 7%;
    }

    &.right {
        right: 7%;
    }
}

.bg-custom-gradient {
  background-image: linear-gradient(to top right, var(--grey-grey10), var(--grey-grey20));
}
.card{
    @apply border-2 rounded-3xl p-6;

    &__title{
        @apply text-lg font-semibold text-zinc-700 py-4;
    }
}


</style>
