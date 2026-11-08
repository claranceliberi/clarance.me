<template>
    <article class="mb-4 cursor-pointer flex items-center space-x-5 border-l-4 border-transparent hover:border-color-secondary pl-2">
        <div>
            <span> {{day}} {{month}} </span>
        </div>
        <div>
            <a :href="props.blog.path" class="flex items-center">
            <h2 class="font-bold text-lg"> {{props.blog.title}} </h2> 
            <span class="inline-block w-1 h-1 rounded-full bg-color mx-4 opacity-40"></span>
            <span class="text-color-sec"> {{props.blog.duration}} min </span>
        </a>
        <p class="flex items-center">
            <span class="text-color-sec"> {{props.blog.description}} </span>    
        </p>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { BlogInformation } from '~~/types';


type blog = {
    blog: BlogInformation
}

const props = defineProps<blog>()

const day = computed(() => new Date(props.blog.date).toLocaleString('en-us',{day:'2-digit'}))
const month = computed(() => new Date(props.blog.date).toLocaleString('en-us',{month:'short'}))

</script>

<style scoped>

</style>