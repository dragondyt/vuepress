<script lang="ts" setup>
import randomPosts from '@temp/randomPosts'
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import { onMounted, onUnmounted, ref } from 'vue'
import Comment from '../components/comment/Index.vue'
import { useThemeLocaleData } from '../composables'
import Search from './search/Search.vue'
import {transition} from "../utils/animation";

const isAffix = ref(false)
const headerHeight = ref(0)
const headerRef = ref<HTMLDivElement>()
const wavesRef = ref<HTMLDivElement>()
const sideBarRef = ref<HTMLDivElement>()
const searchRef = ref<typeof Search | null>(null)
const siteLocaleData = useSiteLocaleData()
const themeLocaleData = useThemeLocaleData()
const pageData = usePageData()

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

function showSearch(): void {
  searchRef.value?.showSearch()
}

function sideBarToggleHandle(): void {
  const sideBar = sideBarRef.value
  if (!sideBar) {
    return
  }
  if (sideBar.classList.contains('on')) {
    sideBar.classList.remove('on')
    transition(sideBar, 'slideRightOut')
  } else {
    transition(sideBar, 'slideRightIn', function () {
      sideBar.classList.add('on')
    })
  }
}

onMounted(() => {
  document.body.classList.add('loaded')
  resizeHandle()
  window.addEventListener('scroll', scrollHandle)
  window.addEventListener('resize', resizeHandle)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
  window.removeEventListener('resize', resizeHandle)
})
</script>

<template>
  <header
    ref="headerRef"
    class="relative my-0 mx-auto h-[50vh] w-full"
    style="
      text-shadow: 0 0.2rem 0.3rem rgb(0 0 0 / 50%);
      color: var(--header-text-color);
    "
  >
    <div class="mx-auto my-0 w-full">
      <div
        :class="[isAffix ? 'z-[-1]' : '']"
        class="fixed flex h-[50vh] min-h-[10rem] w-full flex-col items-center justify-center px-2 pt-12 pb-0 text-center"
      >
        <div class="flex flex-col items-center justify-center">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" rel="start">
              <p
                v-if="siteLocaleData.alternate"
                class="text-[2.5em] leading-[1.2]"
                style=""
              >
                {{ siteLocaleData.alternate }}
              </p>
              <h1 class="title my-2.5 mx-0 text-[1.5em] tracking-[0.125rem]">
                {{ siteLocaleData.title }}
              </h1>
            </RouterLink>
            <p v-if="siteLocaleData.description" class="m-0 flex text-[.75em]">
              = {{ siteLocaleData.description }} =
            </p>
          </slot>
        </div>
      </div>
      <nav
        class="fixed z-[9] h-[3.125rem] w-full"
        style="transition: all 0.2s ease-in-out 0s"
      >
        <div
          class="my-0 mx-auto flex h-full w-[72.5rem] flex-nowrap"
          style="width: calc(100% - 0.625rem)"
        >
          <div
            class="flex cursor-pointer flex-col items-center justify-center leading-[0]"
          >
            <div
              class="w-[1.375rem] p-5"
              style="box-sizing: unset"
              @click="sideBarToggleHandle"
            >
              <span
                v-for="i in 3"
                :key="i"
                class="relative left-0 top-0 inline-block h-[0.125rem] w-full rounded-[0.0625rem] align-top"
                :class="{ 'mt-[0.1875rem]': i > 0 }"
                style="
                  background: var(--header-text-color);
                  transition: all 0.4s;
                  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);
                "
              ></span>
            </div>
          </div>
          <ul class="m-0 w-full py-2.5 px-0">
            <li
              class="relative block py-0 px-2.5 text-center tracking-[.0625rem]"
            >
              <RouterLink :to="siteLocaleData.base" rel="start"
                >{{ siteLocaleData.alternate || siteLocaleData.title }}
              </RouterLink>
            </li>
            <template v-if="themeLocaleData.navbar">
              <li
                v-for="nav in themeLocaleData.navbar"
                :key="nav.name"
                class="relative hidden py-0 px-2.5 text-center tracking-[.0625rem]"
              >
                <RouterLink :to="nav.path || pageData.path">
                  <i :class="`ic i-${nav.icon}`"></i>
                  {{ nav.name }}
                </RouterLink>
              </li>
            </template>
          </ul>
          <ul class="inline-flex items-center justify-center">
            <li class="cursor-pointer py-2.5 px-2">
              <i class="ic i-sun text-[1.125em]"></i>
            </li>
            <li class="cursor-pointer py-2.5 px-2" @click="showSearch">
              <i class="ic i-search"></i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <div ref="wavesRef">
    <svg
      class="relative mb-[-0.6875rem] h-[10vh] max-h-[9.375rem] min-h-[3.125rem] w-full"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" />
        <use xlink:href="#gentle-wave" x="48" y="3" />
        <use xlink:href="#gentle-wave" x="48" y="5" />
        <use xlink:href="#gentle-wave" x="48" y="7" />
      </g>
    </svg>
  </div>
  <main
    style="
      background: linear-gradient(to top,var(--body-bg-shadow) 0,var(--grey-1) 20%) no-repeat bottom;
    "
  >
    <div
      class="my-0 mx-auto flex items-start justify-between"
      style="width: calc(100% - 0.625rem)"
    >
      <div
        class="min-h-[37.5rem] w-full"
        style="
          background: linear-gradient(
              to top,
              var(--grey-0) 0,
              var(--grey-1) 20%
            )
            no-repeat top;
          box-shadow: 0 1.25rem 1rem 0.3125rem var(--body-bg-shadow);
        "
      >
        <slot name="content" />
      </div>
      <div
        ref="sideBarRef"
        class="fixed right-0 top-0 bottom-0 z-[99] hidden w-[15rem]"
        style="
          background: var(--grey-1);
          box-shadow: 0 0.375rem 0.9375rem 0.3125rem rgb(0 0 0 / 20%);
          transition: all 0.2s ease-in-out 0s;
        "
      >
        <slot name="sidebar" v-bind="{ isAffix }" />
      </div>
    </div>
  </main>
  <footer
    class="text-[.875em]"
    style="color: var(--grey-5); background: var(--body-bg-shadow)"
  >
    <div class="relative my-0 mx-auto w-auto px-0">
      <div
        class="z-[1] flex flex-col-reverse justify-around"
        style="background: var(--body-bg-shadow)"
      >
        <div style="width: calc(100% - 1rem)" class="p-4">
          <h2>随机文章</h2>
          <ul style="counter-reset: counter">
            <li
              v-for="post in randomPosts"
              :key="post.path"
              class="relative py-2 pl-8 pr-0"
              style="border-bottom: 0.0625rem dashed var(--grey-4)"
            >
              <div
                class="m-0 flex max-h-[1.2rem] flex-wrap items-center overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
              >
                <template v-for="(c, index) in post.categories" :key="c.path">
                  <RouterLink :to="`/categories/${c.path}`"
                    >{{ c.name }}
                  </RouterLink>
                  <i
                    v-if="index !== post.categories.length - 1"
                    class="ic i-angle-right my-0 mx-[0.125rem]"
                  ></i>
                </template>
              </div>
              <span
                class="block max-h-[2rem] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <RouterLink :to="post.path">{{ post.title }}</RouterLink>
              </span>
            </li>
          </ul>
        </div>
        <Comment />
      </div>
      <div class="mt-8 w-full text-center">
        <div>
          © 2010 – <span>2022</span>
          <span><i class="ic i-sakura rotate"></i> </span
          ><span>Ruri Shimotsuki @ Yume Shoka</span>
        </div>
        <div>
          <span> <i class="ic i-chart-area"></i> </span>
          <span title="站点总字数">1.8m 字</span>
          <span>|</span>
          <span><i class="ic i-coffee"></i> </span>
          <span title="站点阅读时长">27:33</span>
        </div>
        <div class="mb-2.5 inline-block">基于Vuepress 2 & Theme.Sakura</div>
      </div>
    </div>
  </footer>
  <Search ref="searchRef" />
</template>

<style scoped></style>
