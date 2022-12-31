<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import { useBlogStateHook } from '../store/blog.js'
import BaseLayout from './BaseLayout.vue'
const siteLocaleData = useSiteLocaleData()
const pageData = usePageData()
const blogStateHook = useBlogStateHook()
const text = computed(() => {
  if (blogStateHook.postCount === 0) {
    return '暂无文章。'
  }
  if (blogStateHook.postCount === 1) {
    return '目前共计 1 篇文章。'
  }
  return `目前共计 ${blogStateHook.postCount} 篇文章。`
})
const cheer = computed(() => {
  if (blogStateHook.postCount > 210) {
    return '太棒了'
  }
  if (blogStateHook.postCount > 130) {
    return '非常好'
  }
  if (blogStateHook.postCount > 80) {
    return '很好'
  }
  if (blogStateHook.postCount > 50) {
    return '不错'
  }
  if (blogStateHook.postCount > 30) {
    return '还行'
  }
  return '嗯..'
})
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 itemprop="name headline">归档</h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item header">
          <RouterLink :to="siteLocaleData.base">首页</RouterLink>
          <small>/</small> {{ text }}
          <small class="cheers">{{ cheer }} 继续努力。</small>
        </h2>
        <h3
          v-for="d in pageData.frontmatter.data"
          :key="d.year"
          class="item section"
        >
          <RouterLink :to="`/archives/${d.year}`">{{ d.year }} 年</RouterLink
          ><small>/</small
          ><RouterLink :to="`/archives/${d.year}/${d.month}`"
            >{{ d.month }} 月</RouterLink
          >
          <small>( {{ d.count }} )</small>
        </h3>
      </div>
    </template>
  </BaseLayout>
</template>

<style scoped></style>
