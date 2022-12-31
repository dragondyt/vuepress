<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import dayjs from 'dayjs'
import BaseLayout from '../../client/layouts/BaseLayout.vue'
import Pagination from '../components/paginator/Pagination.vue'

const pageData = usePageData()
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 itemprop="name headline">
        包含标签"{{ pageData.frontmatter.name }}"的文章
      </h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item header">
          <RouterLink to="/tags">全部</RouterLink>
          <small>/</small> {{ pageData.frontmatter.name }}
          <small>标签</small>
        </h2>
        <article
          v-for="post in pageData.frontmatter.posts"
          :key="post.path"
          class="item normal"
          itemscope=""
          itemtype="http://schema.org/Article"
        >
          <div class="meta">
            <time
              itemprop="dateCreated"
              :content="post.date"
              :datetime="post.date"
              >{{ dayjs(post.date).format('MM-DD') + ' ' }}
            </time>
            <span>
              <RouterLink
                v-if="post.category"
                :to="post.category.path"
                itemprop="url"
                >{{ post.category.name }}</RouterLink
              >
            </span>
          </div>
          <div class="title">
            <RouterLink :to="post.path" itemprop="url"
              ><span itemprop="name">{{ post.title }}</span></RouterLink
            >
          </div>
        </article>
      </div>
      <Pagination :data="pageData.frontmatter"></Pagination>
    </template>
  </BaseLayout>
</template>

<style scoped></style>
