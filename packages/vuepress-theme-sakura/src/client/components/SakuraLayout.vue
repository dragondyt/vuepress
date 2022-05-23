<template>
  <header class="my-0 mx-auto relative w-full h-[50vh]">
    <div class="w-full mx-auto my-0">
      <div
          class="flex flex-col justify-center items-center fixed px-20 pt-12 text-center w-full h-[50vh] min-h-[10rem] z-[-1]">
        <div class="flex flex-col justify-center items-center">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" class="logo" rel="start">
              <p class="text-[3.5em] leading-[1.2]" v-if="siteLocaleData.alternate" v-text="siteLocaleData.alternate"/>
              <h1 class="mt-2.5 mx-0 text-[2.5em] tracking-[.125rem]" v-if="siteLocaleData.title"
                  v-text="siteLocaleData.title"/>
            </RouterLink>
            <p class="flex m-0 text-[0.875em]" itemprop="description" v-if="siteLocaleData.description">= {{
                siteLocaleData.description
              }} =</p>
          </slot>
        </div>
      </div>
      <Header/>
    </div>
    <div id="imgs" class="block fixed top-0 left-0 w-full h-[70vh] min-h-[25rem] z-[-9]">
      <ul v-if="Array.isArray(themeLocaleData.covers)&&themeLocaleData.covers.length===6">
        <li v-for="cover in themeLocaleData.covers" :key="cover" class="item"
            :style="{'background-image': `url(${cover})`}"></li>
      </ul>
      <img alt="" v-else :src="themeLocaleData.covers">
    </div>
  </header>
  <main class="block">
    <slot name="content"/>
  </main>
  <footer class="text-[0.875rem] text-center">
    <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank">
      <img class="w-[100px] h-[50px] inline-block" alt="又拍云" :src="upyun_logo2" width="5%"/>提供存储服务</a>
  </footer>
</template>

<script lang="ts" setup>
import {useSiteLocaleData} from "@vuepress/client";
import {SiteData} from "@vuepress/shared";
import {useThemeLocaleData} from "../composables";
import {DefaultThemeData} from "../../shared";
import upyun_logo2 from '@images/upyun_logo2'
import Header from "./Header.vue";

const siteLocaleData: SiteData = useSiteLocaleData();
const themeLocaleData: DefaultThemeData = useThemeLocaleData();
</script>

<style scoped>

</style>