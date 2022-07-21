<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'

const siteLocaleData = useSiteLocaleData()
const props = defineProps<{
  post: any
}>()
const currentStyle = {
  'background-color': 'var(--color-red-a1)',
  'border-radius': '0.625rem',
  'padding': '0 0.625rem',
  'transition': 'all .2s ease-in-out 0s',
}
</script>

<template>
  <div class="my-5 mx-0 inline-flex flex-wrap items-center text-[0.8125em]">
    <i
      class="ic i-home my-0 ml-0 mr-[0.3125rem]"
      style="color: var(--grey-4)"
    ></i>
    <span class="whitespace-pre"
      ><RouterLink :to="siteLocaleData.base">首页</RouterLink></span
    >
    <template
      v-for="(cat, index) in post.frontmatter.categories"
      :key="cat.slug"
    >
      <i
        class="ic i-angle-right my-0 mx-[0.125rem]"
        style="color: var(--grey-4)"
      ></i>
      <span
        class="whitespace-pre"
        :style="
          index === post.frontmatter.categories.length - 1 ? currentStyle : {}
        "
      >
        <RouterLink
          :style="
            index === post.frontmatter.categories.length - 1
              ? { color: 'var(--primary-color)' }
              : {}
          "
          :to="`/categories/${cat.slug}`"
          >{{ cat.name }}</RouterLink
        >
      </span>
    </template>
  </div>
</template>

<style scoped></style>
