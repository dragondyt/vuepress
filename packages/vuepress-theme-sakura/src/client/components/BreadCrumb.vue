<template>
  <template v-if="isHome">
    <div class="breadcrumb">
      <i class="ic i-home"></i>
      <span><a href=" url_for(site.path) }}"> {{ themeData.home }}</a></span>
      <i class="ic i-angle-right"></i>
      <span><a href=" url_for(cat.path) }}" rel="index"
               title=" __('post.in') }}  cat.name }}"><span>
          cat.name
      </span></a>
<meta content=" loop.index }}"/></span>
      <i class="ic i-angle-right"></i>
    </div>

  </template>
  <template v-else>
    <div class="breadcrumb">
      <i class="ic i-home"/>
      <span>
        <RouterLink to="/" v-text="themeData.home"/>
      </span>
      <i class="ic i-angle-right"/>
      <template v-for="(category,index) in post.frontmatter.categories">
        <span :class="index===post.frontmatter.categories.length-1?'current':''">
          <RouterLink :to="`/categories/${category.slug}`" :title="`分类于 ${category.name}`">
                      <span>{{ category.name }}</span>
          </RouterLink>
      <meta :content="index+1">
      </span>
        <i v-if="index!==post.frontmatter.categories.length-1" class="ic i-angle-right"/>
        <template v-else/>
      </template>
    </div>

  </template>

</template>

<script lang="ts" setup>
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {Page} from "@vuepress/core";
import {SakuraPageData, SakuraThemeOptions} from "../../shared";
import {onBeforeMount} from "vue";

const {isHome, post} = defineProps<{
  isHome?: boolean
  post: SakuraPageData
}>();

const themeData = useThemeLocaleData<SakuraThemeOptions>();
onBeforeMount(() => {
  console.log(post.frontmatter.categories)
})
</script>