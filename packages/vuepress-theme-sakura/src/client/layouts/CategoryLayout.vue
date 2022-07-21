<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import SakuraLayout from '../components/SakuraLayout.vue'
const pageData = usePageData()
const siteLocaleData = useSiteLocaleData()
</script>

<template>
  <SakuraLayout>
    <template #header>
      <h1 class="text-[1.5em] tracking-[0.125rem]">{{ pageData.title }}</h1>
    </template>
    <template #content>
      <div class="relative mb-6 p-2" style="animation: slideUpBigIn 0.5s">
        <h2 class="relative m-0 py-6 px-[1.875rem]">
          <RouterLink
            :to="siteLocaleData.base"
            style="border-bottom: 0.0625rem dashed var(--grey-4)"
            >首页</RouterLink
          >
          <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
            >/</small
          >
          {{ `目前共计 ${pageData.frontmatter.length} 个分类` }}
        </h2>
        <div
          v-for="category in pageData.frontmatter.categories"
          :key="category.path"
        >
          <h2 class="relative m-0 py-5 px-[1.875rem]">
            <RouterLink :to="category.path">{{ category.name }}</RouterLink>
            <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
              >({{ category.length }})</small
            >
          </h2>
          <div
            v-for="(sub, index) in category.children"
            :key="sub.path"
            class="relative m-0 py-5 px-[1.875rem]"
            :class="{
              'flex': index % 2 !== 0,
              'flex-wrap': index % 2 !== 0,
              'items-center': index % 2 !== 0,
              'py-2.5': index % 2 !== 0,
            }"
          >
            <template v-if="index % 2 !== 0">
              <div class="inline">
                <RouterLink :to="sub.path" style="color: var(--primary-color)">
                  {{ sub.name }}
                </RouterLink>
                <small
                  class="my-auto mx-[0.3125rem]"
                  style="color: var(--grey-4)"
                  >({{ sub.length }})</small
                >
              </div>
            </template>
            <RouterLink
              v-else
              :to="sub.path"
              style="border-bottom: 0.0625rem dashed var(--grey-4)"
            >
              {{ sub.name }}
              <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
                >({{ sub.length }})</small
              >
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
