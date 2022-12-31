<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import { useBlogStateHook } from '../store/blog.js'
import BaseLayout from './BaseLayout.vue'
const siteLocaleData = useSiteLocaleData()
const blogStateHook = useBlogStateHook()
const pageData = usePageData()
</script>

<template>
  <BaseLayout>
    <template #header> <h1 itemprop="name headline">全部分类</h1></template>
    <template #content
      ><div class="collapse wrap">
        <h2 class="item title">
          <RouterLink :to="siteLocaleData.base" data-pjax-state=""
            >首页</RouterLink
          >
          <small>/</small> 目前共计 {{ blogStateHook.categoryCount }} 个分类
        </h2>
        <div v-for="c in pageData.frontmatter.data" :key="c.path">
          <h2 class="item header">
            <RouterLink itemprop="url" :to="c.path" data-pjax-state="">{{
              c.name
            }}</RouterLink
            ><small>( {{ c.count }} )</small>
          </h2>
          <template v-for="s in c.children" :key="s.path">
            <h3 class="item section">
              <RouterLink itemprop="url" :to="s.path">{{ s.name }}</RouterLink
              ><small>( {{ s.count }} )</small>
            </h3>
            <div v-for="t in s.children" :key="t.path" class="item normal">
              <div class="title">
                <RouterLink itemprop="url" :to="t.path">{{ t.name }}</RouterLink
                ><small>( {{ t.count }} )</small>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<style scoped></style>
