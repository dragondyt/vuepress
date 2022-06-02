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
        class="w-[15rem] text-center flex justify-around items-start flex-wrap z-[1] my-0 mx-auto"
        :class="[scope.isAffix ? 'fixed top-0' : 'relative']"
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
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
