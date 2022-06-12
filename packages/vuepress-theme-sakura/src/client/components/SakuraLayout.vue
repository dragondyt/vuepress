<script lang="ts" setup>
import {usePageData, useSiteLocaleData} from '@vuepress/client'
import {onMounted, onUnmounted, ref} from 'vue'
import {useThemeLocaleData} from "../composables";
import Comment from "../components/comment/Index.vue";
import randomPosts from '@temp/randomPosts'
import Search from "./search/Search.vue";

const isAffix = ref(false)
const headerHeight = ref(0)
const headerRef = ref<HTMLDivElement>()
const wavesRef = ref<HTMLDivElement>()
const searchRef = ref<typeof Search | null>(null)
const siteLocaleData = useSiteLocaleData()
const themeLocaleData = useThemeLocaleData();
const pageData = usePageData();

function scrollHandle(e: any): void {
  isAffix.value =
    window.scrollY > headerHeight.value && document.body.offsetWidth > 991
}

function resizeHandle(e?: any): void {
  // @ts-ignore
  const headerHightInner = headerRef.value.getBoundingClientRect().height
  headerHeight.value =
    // @ts-ignore
    headerHightInner + wavesRef.value.getBoundingClientRect().height
}

function showSearch() {
  searchRef.value?.showSearch()
}

onMounted(() => {
  resizeHandle()
  window.addEventListener('scroll', scrollHandle)
  window.addEventListener('resize', resizeHandle)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})
</script>

<template>
  <header ref="headerRef" class="my-0 mx-auto relative w-full h-[50vh]">
    <div class="mx-auto my-0 w-full">
      <div
        class="flex flex-col justify-center items-center fixed pt-12 px-20 pb-0 text-center w-full h-[50vh] min-h-[10rem]"
        :class="[isAffix ? 'z-[-1]' : '']"
      >
        <div class="flex flex-col justify-center items-center">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" rel="start">
              <p
                v-if="siteLocaleData.alternate"
                class="text-[3.5em] leading-[1.2]"
              >
                {{ siteLocaleData.alternate }}
              </p>
              <h1 class="my-2.5 mx-0 text-[2.5em] tracking-[0.125rem]">
                {{ siteLocaleData.title }}
              </h1>
            </RouterLink>
            <p
              v-if="siteLocaleData.description"
              class="flex text-[0.875em] m-0"
            >
              = {{ siteLocaleData.description }} =
            </p>
          </slot>
        </div>
      </div>
    </div>
    <nav class="fixed z-[9] w-full h-[3.125rem]">
      <div class="w-[72.5rem] h-full flex flex-nowrap my-0 mx-auto">
        <ul class="w-full py-2.5 px-0 m-0">
          <li class="inline-block relative py-0 px-2.5 tracking-[0.0625rem] text-center">
            <RouterLink :to="siteLocaleData.base" rel="start">{{
                siteLocaleData.alternate || siteLocaleData.title
              }}
            </RouterLink>
          </li>
          <li class="inline-block relative py-0 px-2.5 tracking-[0.0625rem] text-center" v-if="themeLocaleData.navbar"
              v-for="nav in themeLocaleData.navbar" :key="nav.name">
            <RouterLink :to="nav.path|| pageData.path ">
              <i :class="`ic i-${nav.icon}`"></i>
              {{ nav.name }}
            </RouterLink>
          </li>
        </ul>
        <ul class="inline-flex items-center justify-center">
          <li class="my-2.5 mx-2 cursor-pointer"><i class="ic i-sun text-[1.125em]"></i></li>
          <li class="my-2.5 mx-2 cursor-pointer" @click="showSearch"><i class="ic i-search"></i></li>
        </ul>
      </div>
    </nav>
  </header>
  <div ref="wavesRef">
    <div
      class="w-full h-[15vh] mb-[-0.6875rem] min-h-[3.125rem] max-h-[9.375rem] relative"
    ></div>
  </div>
  <main style="background: linear-gradient(to top,var(--body-bg-shadow) 0,var(--grey-1) 20%) no-repeat bottom;">
    <div class="w-[72.5rem] items-start flex justify-between my-0 mx-auto">
      <div class="min-h-[37.5rem]"
           style="width: calc(100% - 15.75rem);    background: linear-gradient(to top,var(--grey-0) 0,var(--grey-1) 20%) no-repeat top;box-shadow: 0 1.25rem 1rem 0.3125rem var(--body-bg-shadow);">
        <slot name="content"/>
      </div>
      <div class="static w-[15rem] top-0 bottom-0">
        <slot name="sidebar" v-bind="{ isAffix }"/>
      </div>
    </div>
  </main>
  <footer class="text-[0.875em]">
    <div class="w-[72.5rem] my-0 mx-auto relative pr-[16.25rem]">
      <div class="flex z-[1] justify-around">
        <div class="p-4" style="width: calc(50% - 2rem)">
          <h2>随机文章</h2>
          <ul style="counter-reset: counter">
            <li
              v-for="post in randomPosts"
              :key="post.path"
              class="py-2 pl-8 pr-0 relative"
            >
              <div
                class="m-0 flex max-h-[1.2rem] text-ellipsis overflow-hidden whitespace-nowrap text-[.8125em] items-center flex-wrap"
              >
                <template v-for="(c, index) in post.categories" :key="c.path">
                  <RouterLink :to="`/categories/${c.path}`">{{
                      c.name
                    }}</RouterLink>
                  <i
                    v-if="index !== post.categories.length - 1"
                    class="ic i-angle-right"
                  ></i>
                </template>
              </div>
              <span
                class="block text-ellipsis overflow-hidden whitespace-nowrap max-h-[2rem]"
              >
                <RouterLink :to="post.path">{{ post.title }}</RouterLink>
              </span>
            </li>
          </ul>
        </div>
        <Comment />
      </div>
      <div class="w-full text-center mt-8">
        <div>© 2010 – <span>2022</span> <span><i
          class="ic i-sakura rotate"></i> </span><span>Ruri Shimotsuki @ Yume Shoka</span>
        </div>
        <div>
          <span>
            <i class="ic i-chart-area"></i> </span>
          <span title="站点总字数">1.8m 字</span>
          <span>|</span>
          <span><i class="ic i-coffee"></i> </span>
          <span title="站点阅读时长">27:33</span>
        </div>
        <div class="inline-block mb-[.625rem]">
          基于Vuepress 2 & Theme.Sakura
        </div>
      </div>
    </div>
  </footer>
  <Search ref="searchRef"/>
</template>

<style scoped></style>
