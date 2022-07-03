<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import Pagination from '../components/common/Pagination.vue'
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
            to="/categories"
            style="border-bottom: 0.0625rem dashed var(--grey-4)"
            >全部分类
          </RouterLink>
          <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
            >/</small
          >
          {{ pageData.frontmatter.category }}
          <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
            >标签</small
          >
        </h2>
        <template
          v-for="(post, index) in pageData.frontmatter.pagination.data"
          :key="post.path"
        >
          <h3 v-if="index === 0" class="item section">
            <a href="/categories/trading-view/price-action/" data-pjax-state=""
              >价格行为</a
            >
            <small>/ </small
            ><a
              href="/categories/trading-view/price-action/harmonic-pattern/"
              data-pjax-state=""
              >谐波形态</a
            >
            <small>( 8 )</small>
          </h3>
          <article></article>
        </template>
      </div>
      <Pagination :pagination="pageData.frontmatter.pagination"></Pagination>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
