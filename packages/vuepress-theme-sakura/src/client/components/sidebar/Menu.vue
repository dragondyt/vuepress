<template>
  <MenuItem v-for="menu in themeLocaleData.menus" :menu="menu" :key="menu.path"/>
</template>

<script lang="ts" setup>
import MenuItem from "./MenuItem.vue";
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";

const themeLocaleData = useThemeLocaleData();
</script>

<style scoped>

</style>