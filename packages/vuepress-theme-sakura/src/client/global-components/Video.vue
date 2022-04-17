<template>
  <div class="h-0 mb-5 overflow-hidden pt-[75%] relative w-full">
    <iframe v-if="srcResult" :src="srcResult" allowfullscreen
            class="border-none h-full left-0 top-0 m-0 absolute w-full" ></iframe>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const {type, id, src, aid, bvid, cid, page} = defineProps<{
  src?: string
  aid?: string
  bvid?: string
  page?: number
  cid?: string
  type: string
  id?: string
}>()
const srcResult = computed(() => {
  if (src) {
    return src;
  }
  switch (type.toLocaleLowerCase()) {
    case 'youtube' :
      return `https://www.youtube.com/embed/${id}`;
    case 'vimeo' :
      return `https://player.vimeo.com/video/${id}`;
    case 'bilibili' :
      return `https://player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&cid=${cid}&page=${page}`;
    default:
      return null;
  }
})
</script>

<style scoped>

</style>