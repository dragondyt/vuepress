<script lang="ts" setup>
import {usePageData, useSiteLocaleData} from '@vuepress/client'
import {onMounted, onUnmounted, ref} from 'vue'
import {useThemeLocaleData} from "../composables";

const isAffix = ref(false)
const headerHeight = ref(0)
const headerRef = ref<HTMLDivElement>()
const wavesRef = ref<HTMLDivElement>()
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
          <li class="my-2.5 mx-2 cursor-pointer"><i class="ic i-search"></i></li>
        </ul>
      </div>
    </nav>
  </header>
  <div ref="wavesRef">
    <div
      class="w-full h-[15vh] mb-[-0.6875rem] min-h-[3.125rem] max-h-[9.375rem] relative"
    ></div>
  </div>
  <main>
    <div class="w-[72.5rem] items-start flex justify-between my-0 mx-auto">
      <div class="min-h-[37.5rem]" style="width: calc(100% - 15.75rem)">
        <slot name="content"/>
      </div>
      <div class="static w-[15rem] top-0 bottom-0">
        <slot name="sidebar" v-bind="{ isAffix }"/>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
