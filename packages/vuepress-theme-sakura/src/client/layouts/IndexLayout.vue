<script lang="ts" setup>
import SakuraLayout from '../components/SakuraLayout.vue'
import {usePageData} from "@vuepress/client";
import * as striptags from "striptags";
const pageData = usePageData();
</script>

<template>
  <SakuraLayout>
    <template #content>
      <div class="mb-5 relative p-5">
        <template v-if="pageData.frontmatter.stickyList">
          <h2 class="my-4 mx-0 font-[700] uppercase tracking-[0.05rem] select-none table whitespace-nowrap h-auto leading-[1] text-center">置顶文章</h2>
          <div class="flex flex-col justify-center items-center" v-for="sticky in pageData.frontmatter.stickyList" :key="sticky.path">
            <article class="flex rounded-[0.5rem] relative h-[14rem] m-4" style="width: calc(100% - 2rem);min-width: calc(100% - 2rem);">
              <div class="w-1/2 mr-6 overflow-hidden">

              </div>
              <div class="relative w-1/2 pt-4 pr-6 pb-12 pl-0" style="perspective: 62.5rem;">
                <h3 class="text-ellipsis overflow-hidden whitespace-nowrap my-2.5 mx-0">
                  <RouterLink :to="sticky.path">
                    {{sticky.title}}
                  </RouterLink>
                </h3>
                <div class="overflow-hidden text-[0.875em] max-h-20 text-ellipsis" style="display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3">
                  {{
                    sticky.frontmatter.description || sticky.frontmatter.excerpt || striptags(sticky.contentRendered).substring(0,300)
                  }}
                </div>
                <div class="absolute bottom-2 whitespace-nowrap overflow-hidden text-ellipsis justify-start flex m-0 text-[.8125em]" style="max-width: calc(100% - 7rem);">
                  {{sticky.title}}
                </div>
                <RouterLink class="absolute bottom-0 right-0 py-[0.3rem] px-4 " style="border-radius: 1rem 0;" :to="sticky.path" :title="sticky.title">
                  more...
                </RouterLink>
              </div>
            </article>
          </div>
        </template>
      </div>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
