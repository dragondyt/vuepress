<template>
  <nav class="fixed z-[9] w-full h-[3.125rem]">
    <div class="h-full flex flex-nowrap my-0 mx-auto" style="width: calc(100% - 0.625rem);">
      <div class="hidden">
        <div class="p-5 w-[1.375rem] box-content" aria-label="切换导航栏">
          <span class="inline-block h-0.5 left-0 relative rounded-[.0625rem] top-0 align-top w-full" v-for="i in 3"
                :key="i"/>
        </div>
      </div>
      <!--    menu-->
      <ul class="py-2.5 m-0 w-full">
        <li class="inline-block relative my-0 mx-2.5 tracking-[.0625rem] text-center">
          <RouterLink :to="siteLocaleData.base"
                      rel="start">{{ siteLocaleData.alternate ?? siteLocaleData.title }}
          </RouterLink>
        </li>
        <MenuItem v-for="menu in themeLocaleData.navbar" :menu="menu" :key="menu.path??menu.name"/>
      </ul>

      <ul class="inline-flex justify-center items-center">
        <li class="py-2.5 px-2 cursor-pointer">
          <i class="text-[1.125em] ic i-sun"></i>
        </li>
        <li class="py-2.5 px-2 cursor-pointer">
          <i class="ic i-search"></i>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script lang="ts" setup>
import {useThemeLocaleData} from "../composables";
import {useSiteLocaleData} from "@vuepress/client";
import MenuItem from "./menu/MenuItem.vue";

const themeLocaleData = useThemeLocaleData();
const siteLocaleData = useSiteLocaleData();
</script>

<style scoped>

</style>