<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import SakuraLayout from '../components/SakuraLayout.vue'

const pageData = usePageData()
const siteLocaleData = useSiteLocaleData()
</script>

<template>
  <SakuraLayout>
    <template #header>
      <h1 class="text-[1.5em] tracking-[0.125rem]">
        {{ pageData.frontmatter.subtitle }}
      </h1>
    </template>
    <template #content>
      <div class="mb-6 p-2 relative" style="animation: slideUpBigIn 0.5s">
        <h2 class="relative py-6 px-[1.875rem] m-0">
          <RouterLink
            :to="siteLocaleData.base"
            style="border-bottom: 0.0625rem dashed var(--grey-4)"
            >首页
          </RouterLink>
          <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
            >/</small
          >
          {{ pageData.frontmatter.tag }}
          <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
            >标签</small
          >
        </h2>
        <article
          v-for="post in pageData.frontmatter.pagination.data"
          :key="post.path"
          class="flex flex-wrap items-center py-2.5 px-[1.875rem] relative m-0"
        >
          <div class="text-[.75em] mr-2.5 inline">
            <time style="color: var(--grey-4)">2020-06-13 </time>
            <span
              ><a href="/categories/computer-science/java/course-2/"
                >面向对象程序设计 - Java 语言 - 浙江大学 - 翁恺</a
              ></span
            >
          </div>
          <div class="inline">
            <RouterLink :to="post.path" style="color: var(--primary-color)"
              ><span itemprop="name">{{ post.title }}</span></RouterLink
            >
          </div>
        </article>
      </div>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
