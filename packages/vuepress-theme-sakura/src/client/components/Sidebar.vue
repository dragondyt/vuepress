<template>
  <div class="inner">
    <ul class="absolute inline-flex px-0 pt-[1.875rem] px-2.5">
      <li class="cursor-pointer inline-flex text-[.875em] py-[.3125rem] px-[.9375rem] rounded-[.625rem] text-myGray-5 text-center no-underline transition-all duration-200 ease-in-out before:font-ic before:font-normal before:content-['\f039']"
          style="background-color: rgba(0,0,0,.08);"><span style="word-break: keep-all;">文章目录</span></li>
      <li class="cursor-pointer inline-flex text-[.875em] py-[.3125rem] px-[.9375rem] rounded-[.625rem] text-myGray-5 text-center no-underline transition-all duration-200 ease-in-out my-auto mx-2.5 before:font-ic before:font-normal before:content-['\f0bd']"
          style="background-color: rgba(0,0,0,.08);"><span class="hidden" style="word-break: keep-all;">系列文章</span></li>
      <li class="cursor-pointer inline-flex text-[.875em] py-[.3125rem] px-[.9375rem] rounded-[.625rem] text-myGray-5 text-center no-underline transition-all duration-200 ease-in-out my-auto mx-2.5 before:font-ic before:font-normal before:content-['\e8ed']"
          style="background-color: rgba(0,0,0,.08);"><span class="hidden" style="word-break: keep-all;">站点概览</span></li>
    </ul>
    <div class="pt-[4.6875rem] px-0 pb-8 w-full overflow-hidden"  style="height: 760px">
      <div class="overflow-x-hidden overflow-y-auto w-auto h-full my-0 mx-auto">
        <div :title="themeData.toc" class="pt-[0.875rem] px-[0.9375rem] pb-8">
          <Toc :headers="pageData.headers"/>
        </div>
        <div :title="themeData.related" class="pt-[0.875rem]">
          <ul v-html="related"/>
        </div>
        <div :title="themeData.overview" v-show="!isPost" class="overview panel">
          <Overview/>
        </div>
      </div>
    </div>

    <ul class="hidden">
      <li class="prev pjax">
        <i class="ic i-chevron-left"></i>
      </li>
      <li class="up"><i class="ic i-arrow-up"></i></li>
      <li class="down"><i class="ic i-arrow-down"></i></li>
      <li class="next pjax">
        <i class="ic i-chevron-right"></i>
      </li>
      <li class="percent"></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import Overview from "./sidebar/overview.vue";
import {usePageData} from "@vuepress/client";
import {Toc} from './Toc'
import {SakuraThemeOptions} from "../../shared";

const {isPost} = withDefaults(defineProps<{
  isPost?: boolean
}>(), {
  isPost: false
})
const themeData = useThemeLocaleData<SakuraThemeOptions>()
const pageData = usePageData();
const toc = ''
const related = ''
</script>