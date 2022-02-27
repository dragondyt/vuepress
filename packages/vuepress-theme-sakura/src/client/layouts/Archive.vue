<template>
  <BaseLayout>
    <template #header>
      <h1>
        归档
      </h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item header">
          <RouterLink to="/">首页</RouterLink>
          <small>/</small> 目前共计
          {{ appStore.allPost.length }}
          篇文章。
          <small class="cheers">非常好 继续努力。</small>
        </h2>
        <h3 class="item section" v-for="archive in archives" :key="`${archive.year}/${archive.month}`">
          <RouterLink :to="`/archives/${archive.year}`">{{ archive.year }} 年</RouterLink>
          <small>/</small>
          <RouterLink
              :to="`/archives/${archive.year}/${archive.month}`">{{ archive.month }} 月
          </RouterLink>
          <small>( {{ archive.count }} )</small></h3>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts" setup>
import Layout from '../components/Layout.vue'
import {usePageData} from "@vuepress/client"
import {useAppStore} from "../store/app";
import dayjs from 'dayjs';
import {Archive} from "../../types";
import BaseLayout from "../components/BaseLayout.vue";

const pageData = usePageData();
const appStore = useAppStore();

const archives: Archive[] = []
let yearMonthMap = new Map<string, Archive>()
appStore.allPost.map(post => {
  if (post.frontmatter.date) {
    console.log(post.frontmatter.date)
    const year = dayjs(post.frontmatter.date).year();
    const month = dayjs(post.frontmatter.date).month() + 1;
    if (yearMonthMap.has(`${year}/${month}`)) {
      let archive = yearMonthMap.get(`${year}/${month}`)!;
      Object.assign(archive, {
        count: archive.count + 1
      })
      yearMonthMap.set(`${year}/${month}`, archive)
    } else {
      yearMonthMap.set(`${year}/${month}`, {
        year: year + '',
        month: month < 10 ? `0${month}` : month + '',
        count: 1
      })
    }
  }
})
yearMonthMap.forEach(archive => {
  archives.push(archive)
})
const tester = appStore.allPost.reduce((prev,cur)=>{
  let key = dayjs(cur.frontmatter.date).year();
  if (!prev[key]) {
    prev[key] = []
  }
  prev[key].push(cur)
  return prev
},{})
const month = tester['2020'].reduce((prev,cur)=>{
  let key = dayjs(cur.frontmatter.date).month();
  let keyStr = key < 10 ? `0${key}` : key + ''
  if (!prev[keyStr]) {
    prev[keyStr] = []
  }
  prev[keyStr].push(cur)
  return prev
},{})
</script>

<style lang="postcss">
.collapse {
  .item {
    position: relative;
    padding: 1.25rem 1.875rem;
    margin: 0;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      transition: all .2s ease-in-out 0s;
      box-sizing: unset;
      top: 1.9rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      border: 0.15rem solid var(--primary-color);
      border-radius: 50%;
      background: var(--grey-1);
    }

    &.section::before {
      width: 0.4rem;
      height: 0.4rem;
      margin-left: 0.1rem;
    }

    &:not(:last-child):not(.title)::after {
      content: "";
      position: absolute;
      top: 1.9rem;
      bottom: -1.9rem;
      left: 0.35rem;
      border-left: 0.2rem solid var(--color-red-a3);
    }

    &.header {
      &::after {
        border-left-style: dashed !important;
      }
    }
  }

  .item.header a, .collapse .item.section a, .collapse .item.title a {
    border-bottom: 0.0625rem dashed var(--grey-4);
  }

  .item.header .cheers {
    display: block;
  }

  small {
    color: var(--grey-4);
    margin: auto 0.3125rem;
  }
}
</style>