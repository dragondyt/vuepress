<template>
  <header class="my-0 mx-auto relative w-full h-[50vh]">
    <div class="inner">
      <div id="brand">
        <div class="pjax">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" class="logo" rel="start">
              <p class="artboard" v-if="siteLocaleData.alternate" v-text="siteLocaleData.alternate"/>
              <h1 itemprop="name headline" class="title" v-if="siteLocaleData.title" v-text="siteLocaleData.title"/>
            </RouterLink>
            <p class="meta" itemprop="description" v-if="siteLocaleData.description">= {{
                siteLocaleData.description
              }} =</p>
          </slot>
        </div>
      </div>
      <!--        {{ partial('_partials/header.njk', {}, {cache: true}) }}-->
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

const siteLocaleData: SiteData = useSiteLocaleData();
const themeLocaleData: DefaultThemeData = useThemeLocaleData();
</script>

<style scoped>

</style>