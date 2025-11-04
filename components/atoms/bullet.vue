<script lang="ts" setup>
import type { CompanyColors } from '~/types';
import { computed } from '#imports';

  type Props = {
    color?: CompanyColors
    ping?: boolean
  }

  const props: Props = withDefaults(defineProps<Props>(), {
    color: 'GREY',
    ping: false
  })

  const colorClass = computed(() => {
    switch (props.color) {
      case 'BLUE':
        return 'bg-sky-300'
      case 'GREEN':
        return 'bg-emerald-300'
      case 'PURPLE':
        return 'bg-indigo-500'
      case 'GREY':
      default:
        return 'bg-gray-300'
    }
  })

  const borderColorClass = computed(() => {
    switch (props.color) {
      case 'BLUE':
        return 'border-2 border-sky-200 '
      case 'GREEN':
        return 'border-2 border-emerald-200 '
      case 'PURPLE':
        return 'border-2 border-indigo-400 '
      case 'GREY':
      default:
        return 'border-2 border-gray-200 '
    }
  })

</script>

<template>
    <span class="relative flex items-center" :class="{'h-3 w-3': !props.ping, 'h-2 w-2': props.ping}">
        <span
            v-if="props.ping"
            class="absolute inline-flex h-full w-full rounded-full  opacity-75"
            :class="{'animate-ping': props.ping, [colorClass]:true}"
        ></span>
        <span
            class="relative inline-flex box-content rounded-full h-2 w-2 "
            :class="{[colorClass]:true, [borderColorClass]:!props.ping}"
        ></span>


    </span>
</template>
