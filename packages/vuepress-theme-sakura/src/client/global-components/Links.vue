<template>
  <div class="flex flex-wrap text-[.9rem]">
    <div class="relative inline-flex justify-self-center items-center leading-[1.5] py-2 px-4 m-4 rounded-[.5rem]"
         style="width: calc(50% - 2rem)" v-for="link in links">
      <a target="_blank" :href="link.url" class="block w-16 h-16 bg-contain border-0 flex-shrink-0"
         :style="`background-image: url('${link.image}')`"></a>
      <div class="pl-4">
        <a :href="link.url"
           target="_blank" class="exturl title my-2 mx-0 border-0">{{ link.site }}</a>
        <p class="desc my-2 mx-0 text-[.75em]">{{ link.desc || link.url }}</p></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {file} = defineProps<{
  file: string
}>()
import links from '@temp/links';

console.debug(links)
</script>

<style scoped>

</style>