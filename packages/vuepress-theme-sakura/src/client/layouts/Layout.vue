<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { onMounted, ref } from 'vue'
import Page from '../components/page/Page.vue'
import { Toc } from '../components/page/Toc'
import SakuraLayout from '../components/SakuraLayout.vue'

const tabName = ref('contents')
const pageData = usePageData()
const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
</script>

<template>
  <SakuraLayout>
    <template #header>
      <h1 class="text-[2.5em] tracking-[0.125rem]">
        {{ pageData.title }}
      </h1>
    </template>
    <template #content>
      <Page />
    </template>
    <template #sidebar="scope">
      <div
        class="z-[1] my-0 mx-auto flex w-[15rem] flex-wrap items-start justify-around text-center"
        :class="[scope.isAffix ? 'fixed top-0' : 'relative']"
      >
        <ul class="absolute m-0 inline-flex px-0 pt-[1.875rem] pb-2.5">
          <li
            class="inline-flex cursor-pointer rounded-[0.625rem] py-[0.3125rem] px-[0.9375rem] text-center text-[0.875rem]"
            @click="tabName = 'contents'"
          >
            <span>文章目录</span>
          </li>
          <li
            class="my-auto mx-2.5 inline-flex cursor-pointer rounded-[0.625rem] py-[0.3125rem] px-[0.9375rem] text-center text-[0.875rem]"
            @click="tabName = 'related'"
          >
            <span>系列文章</span>
          </li>
          <li
            class="inline-flex cursor-pointer rounded-[0.625rem] py-[0.3125rem] px-[0.9375rem] text-center text-[0.875rem]"
            @click="tabName = 'overview'"
          >
            <span>站点概览</span>
          </li>
        </ul>
        <div
          :style="{ height: panelsHeight + 'px' }"
          class="w-full overflow-hidden px-0 pt-[4.6875rem] pb-8"
        >
          <div
            class="my-0 mx-auto h-full w-auto overflow-y-auto overflow-x-hidden"
          >
            <div
              class="px-[.9375rem] pt-[.875rem] pb-8"
              :class="[tabName === 'contents' ? 'block' : 'hidden']"
            >
              <Toc :headers="pageData.headers" />
            </div>
            <div>侧边</div>
          </div>
        </div>
      </div>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
