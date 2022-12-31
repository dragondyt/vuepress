<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import Pagination from '../components/paginator/Pagination.vue'
import BaseLayout from './BaseLayout.vue'
import CategoryItem from './CategoryItem.js'
const pageData = usePageData()
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 itemprop="name headline">
        分类于"{{ pageData.frontmatter.name }}"的文章
      </h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item header">
          <RouterLink to="/categories" data-pjax-state="">全部</RouterLink>
          <small>/</small> {{ pageData.frontmatter.name }} <small>分类</small>
        </h2>
        <CategoryItem
          :posts="pageData.frontmatter.posts"
          :name="pageData.frontmatter.name"
        />
      </div>
      <Pagination :data="pageData.frontmatter" />
    </template>
  </BaseLayout>
</template>

<style scoped></style>
