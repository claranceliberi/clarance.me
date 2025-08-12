<script lang="ts" setup>
const icons = {
    spaces: 'i-tabler-spaces',
    smile: 'i-tabler-mood-smile',
    book: 'i-tabler-book',
    briefcase: 'i-tabler-briefcase',
    football: 'i-tabler-ball-football',
    chef: 'i-tabler-chef-hat',
    bike: 'i-tabler-bike',
    swimming: 'i-tabler-swimming',
    barbell: 'i-tabler-barbell',
    mail: 'i-tabler-mail',
    github: 'i-tabler-brand-github',
    x: 'i-tabler-brand-x',
}

type IconProps = {
    icon: keyof typeof icons
}

const props = defineProps<IconProps>()
</script>
<template>
    <div
        class="border-[1.5px] border-grey-grey40 w-fit rounded-xl p-2 text-gray-400 shadow-xl shadow-grey-grey20 gradient-to-tr"
    >
        <div :class="`text-2xl ${icons[$props.icon]}`"></div>
    </div>
</template>
<style lang="scss">
.gradient-to-tr {
    background: linear-gradient(to top right, var(--grey-grey30), var(--grey-grey20) 25% 75%, var(--grey-grey30));
}
</style>
