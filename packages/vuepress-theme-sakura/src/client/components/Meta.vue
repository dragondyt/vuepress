<template>
  <div class="meta">
    <span class="item" title="{{ create_title }}">
    <span class="icon">
      <i class="ic i-calendar"></i>
    </span>
    <span v-if="full" class="text">{{ themeData.posted }}</span>
    <time datetime="{{ post.frontmatter.date }}">{{ post.frontmatter.date }}</time>
  </span>
    <template>
      <span class="item" title="{{ __('symbols_count_time.count') }}">
    <span class="icon">
      <i class="ic i-pen"></i>
    </span>
    <span v-if="full" class="text"> symbols_count_time.count</span>
    <span> symbolsCount(item) </span>
    <span class="text"> __('symbols_count_time.word') </span>
  </span>
      <span class="item">
    <span class="icon">
      <i class="ic i-clock"></i>
    </span>
    <span v-if="full" class="text">symbols_count_time.time</span>
    <span>symbolsTime(item, config.symbols_count_time.awl, config.symbols_count_time.wpm, __('symbols_count_time.time_minutes'))</span>
  </span>
    </template>

  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Page} from "@vuepress/core";
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {ThemeData} from "../../types";

const {full, post} = withDefaults(defineProps<{
  full: boolean
  post: Page
}>(), {
  full: false
})
const themeData = useThemeLocaleData<ThemeData>()

const count = ref<boolean>(false)

</script>

<style scoped>

</style>