<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'

const siteLocaleData = useSiteLocaleData()
const props = defineProps<{
  post: any
}>()
</script>

<template>
  <div class="my-5 mx-0 inline-flex flex-wrap items-center text-[0.8125em]">
    <i class="ic i-home my-0 ml-0 mr-[0.3125rem]"></i>
    <span class="whitespace-pre"
      ><RouterLink :to="siteLocaleData.base">首页</RouterLink></span
    >
  </div>
</template>

<style scoped></style>
