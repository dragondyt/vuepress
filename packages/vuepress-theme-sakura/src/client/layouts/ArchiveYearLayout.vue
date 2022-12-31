<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import dayjs from 'dayjs'
import BaseLayout from './BaseLayout.vue'
const pageData = usePageData()
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 itemprop="name headline">
        发表于"{{ pageData.frontmatter.year }}年"的文章
      </h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item header">
          <RouterLink to="/archives">全部</RouterLink> <small>/</small>
          {{ pageData.frontmatter.year }} 年
          <small>归档</small>
        </h2>
        <template v-for="d in pageData.frontmatter.data" :key="d.month">
          <h3 class="item section">
            <RouterLink
              :to="`/archives/${pageData.frontmatter.year}/${d.month}`"
              >{{ d.month }} 月</RouterLink
            >
          </h3>
          <article
            v-for="post in d.posts"
            :key="post.path"
            class="item normal"
            itemscope=""
            itemtype="http://schema.org/Article"
          >
            <div class="meta">
              <time
                itemprop="dateCreated"
                :content="pageData.frontmatter.date"
                :datetime="pageData.frontmatter.date"
                >{{ dayjs(post.frontmatter.date).format('MM-DD') + ' ' }}
              </time>
              <span
                ><RouterLink
                  v-if="post.categories[post.categories.length - 1]"
                  :to="post.categories[post.categories.length - 1].path"
                  >{{
                    post.categories[post.categories.length - 1].name
                  }}</RouterLink
                ></span
              >
            </div>
            <div class="title">
              <RouterLink :to="post.path" itemprop="url"
                ><span itemprop="name">{{
                  post.title || '未命名'
                }}</span></RouterLink
              >
            </div>
          </article>
        </template>
      </div>
    </template>
  </BaseLayout>
</template>

<style scoped></style>
