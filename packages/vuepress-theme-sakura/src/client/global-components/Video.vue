<template>
  <div class="h-0 mb-5 overflow-hidden pt-[75%] relative w-full">
    <iframe v-if="src" :src="src" allowfullscreen class="border-none h-full left-0 top-0 m-0 absolute w-full"></iframe>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const {type, id} = defineProps<{
  type: string
  id: string
}>()
const src = computed(() => {
  switch (type.toLocaleLowerCase()) {
    case 'youtube' :
      return `https://www.youtube.com/embed/${id}`;
    case 'vimeo' :
      return `https://player.vimeo.com/video/${id}`;
    default:
      return null;
  }
})
</script>

<style scoped>

</style>