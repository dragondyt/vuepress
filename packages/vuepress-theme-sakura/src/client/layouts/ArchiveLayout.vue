<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import moment from 'moment'
import Pagination from '../components/common/Pagination.vue'
import SakuraLayout from '../components/SakuraLayout.vue'

const pageData = usePageData()
const siteLocaleData = useSiteLocaleData()
</script>

<template>
  <SakuraLayout>
    <template #header>
      <h1>{{ pageData.frontmatter.subtitle }}</h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2>
          <template v-if="pageData.frontmatter.month">
            <RouterLink to="/archives">全部</RouterLink>
            <small>/</small>
            <RouterLink :to="`/archives/${pageData.frontmatter.year}`"
              >{{ pageData.frontmatter.year }} 年
            </RouterLink>
            <small>/</small> {{ pageData.frontmatter.month }} 月<small
              >归档</small
            >
          </template>
          <template v-else-if="pageData.frontmatter.year">
            <RouterLink to="/archives">全部</RouterLink>
            <small>/</small>
            {{ pageData.frontmatter.year }} 年 <small>归档</small>
          </template>
          <template v-else>
            <RouterLink :to="siteLocaleData.base">首页</RouterLink>
            <small>/</small>
          </template>
        </h2>
        <template
          v-for="post in pageData.frontmatter.pagination.data"
          :key="post.path"
        >
          <h3 v-if="!pageData.frontmatter.month">
            <RouterLink
              :to="`/archives/${pageData.frontmatter.year}/${pageData.frontmatter.month}`"
              >{{
                moment(post.date).month() + 1 < 10
                  ? '0' + moment(post.date).month() + 1
                  : moment(post.date).month() + 1
              }}
              月</RouterLink
            >
          </h3>
          <article v-else :key="post.path">
            <div class="meta">
              <time>
                {{ moment(post.date).format('MM-DD') }}
              </time>
              <span><a href="#">目录</a></span>
            </div>

            <div class="title"></div>
          </article>
        </template>
      </div>
      <Pagination :pagination="pageData.frontmatter.pagination"></Pagination>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
