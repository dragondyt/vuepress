<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import Page from '../components/page/Page.vue'
import { Toc } from '../components/page/Toc'

const isAffix = ref(false)
const panelsHeight = ref()
const headerHeight = ref(0)
const tabName = ref('contents')
const pageData = usePageData()
const headerRef = ref<HTMLDivElement>()
const wavesRef = ref<HTMLDivElement>()

function scrollHandle(e: any): void {
  isAffix.value =
    window.scrollY > headerHeight.value && document.body.offsetWidth > 991
}

function resizeHandle(e?: any) {
  // @ts-ignore
  const headerHightInner = headerRef.value.getBoundingClientRect().height
  headerHeight.value =
    // @ts-ignore
    headerHightInner + wavesRef.value.getBoundingClientRect().height
}

onMounted(() => {
  panelsHeight.value = window.innerHeight
  resizeHandle()
  window.addEventListener('scroll', scrollHandle)
  window.addEventListener('resize', resizeHandle)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})
</script>

<template>
  <header
    ref="headerRef"
    class="my-0 mx-auto relative w-full h-[50vh]"
  ></header>
  <div ref="wavesRef">
    <div
      class="w-full h-[15vh] mb-[-0.6875rem] min-h-[3.125rem] max-h-[9.375rem] relative"
    ></div>
  </div>
  <main>
    <div class="w-[72.5rem] items-start flex justify-between my-0 mx-auto">
      <div class="min-h-[37.5rem]" style="width: calc(100% - 15.75rem)">
        <Page />
      </div>
      <div class="static w-[15rem] top-0 bottom-0">
        <div
          class="w-[15rem] text-center flex justify-around items-start flex-wrap z-[1] my-0 mx-auto"
          :class="[isAffix ? 'fixed top-0' : 'relative']"
        >
          <ul class="absolute inline-flex m-0 pt-[1.875rem] px-0 pb-2.5">
            <li
              class="cursor-pointer inline-flex text-[0.875rem] py-[0.3125rem] px-[0.9375rem] rounded-[0.625rem] text-center"
              @click="tabName = 'contents'"
            >
              <span>文章目录</span>
            </li>
            <li
              class="cursor-pointer inline-flex text-[0.875rem] py-[0.3125rem] px-[0.9375rem] rounded-[0.625rem] text-center my-auto mx-2.5"
              @click="tabName = 'related'"
            >
              <span>系列文章</span>
            </li>
            <li
              class="cursor-pointer inline-flex text-[0.875rem] py-[0.3125rem] px-[0.9375rem] rounded-[0.625rem] text-center"
              @click="tabName = 'overview'"
            >
              <span>站点概览</span>
            </li>
          </ul>
          <div
            :style="{ height: panelsHeight + 'px' }"
            class="pt-[4.6875rem] px-0 pb-8 w-full overflow-hidden"
          >
            <div
              class="overflow-x-hidden overflow-y-auto w-auto h-full my-0 mx-auto"
            >
              <div
                class="pt-[.875rem] px-[.9375rem] pb-8"
                :class="[tabName === 'contents' ? 'block' : 'hidden']"
              >
                <Toc :headers="pageData.headers" />
              </div>
              <div>侧边</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
