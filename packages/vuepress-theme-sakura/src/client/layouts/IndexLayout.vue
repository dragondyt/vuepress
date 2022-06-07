<script lang="ts" setup>
import SakuraLayout from '../components/SakuraLayout.vue'
import {usePageData} from "@vuepress/client";
import {striptags} from 'striptags'
import {onMounted, ref} from "vue";

const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
const pageData = usePageData();

function count(post: string) {
  let symbolsResult = ''
  if (post.length > 9999) {
    symbolsResult = Math.round(post.length / 1000) + 'k'; // > 9999 => 11k
  } else if (post.length > 999) {
    symbolsResult = Math.round(post.length / 100) / 10 + 'k'; // > 999 => 1.1k
  } // < 999 => 111
  return symbolsResult;
}

function getFormatTime(minutes, suffix) {
  const fHours = Math.floor(minutes / 60);
  let fMinutes = Math.floor(minutes - (fHours * 60));
  if (fMinutes < 1) {
    fMinutes = 1; // 0 => 1
  }
  return fHours < 1
    ? fMinutes + ' ' + suffix // < 59 => 59 mins.
    : fHours + ':' + ('00' + fMinutes).slice(-2); // = 61 => 1:01
}

function symbolsTime(post: string, awl = 4, wpm = 275, suffix = 'mins.') {
  const minutes = Math.round(post.length / (awl * wpm));
  return getFormatTime(minutes, suffix);
}
</script>

<template>
  <SakuraLayout>
    <template #content>
      <div class="mb-5 relative p-5">
        <template v-if="pageData.frontmatter.stickyList">
          <h2
            class="my-4 mx-0 font-[700] uppercase tracking-[0.05rem] select-none table whitespace-nowrap h-auto leading-[1] text-center">
            置顶文章</h2>
          <div class="flex flex-col justify-center items-center" v-for="sticky in pageData.frontmatter.stickyList"
               :key="sticky.path">
            <article class="flex rounded-[0.5rem] relative h-[14rem] m-4"
                     style="width: calc(100% - 2rem);min-width: calc(100% - 2rem);">
              <div class="w-1/2 mr-6 overflow-hidden">
                <RouterLink :to="sticky.path">
                  <img class="object-cover w-full h-full"
                       src="https://tva3.sinaimg.cn/mw690/6833939bly1giciusoyjnj219g0u0x56.jpg" alt="cover">
                </RouterLink>
              </div>
              <div class="relative w-1/2 pt-4 pr-6 pb-12 pl-0" style="perspective: 62.5rem;">
                <div class="flex justify-end m-0 text-[0.8128em]">
                  <span>
                    <span>
                      <i class="ic i-calendar"></i>
                    </span>
                    <time>{{ sticky.date }}</time>
                  </span>
                  <span class="ml-2.5">
                    <span><i class="ic i-pen"></i> </span>
                    <span>{{ count(striptags(sticky.contentRendered)) }}</span>
                    <span class="text">字</span>
                  </span>
                  <span class="ml-2.5">
                    <span>
                      <i class="ic i-clock"></i>
                    </span>
                    <span>{{ symbolsTime(striptags(sticky.contentRendered)) }}</span>
                  </span>
                </div>
                <h3 class="text-ellipsis overflow-hidden whitespace-nowrap my-2.5 mx-0">
                  <RouterLink :to="sticky.path">
                    {{ sticky.title }}
                  </RouterLink>
                </h3>
                <div class="overflow-hidden text-[0.875em] max-h-20 text-ellipsis"
                     style="display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3">
                  {{
                    sticky.frontmatter.description || sticky.frontmatter.excerpt || striptags(sticky.contentRendered).substring(0, 300)
                  }}
                </div>
                <div
                  class="absolute bottom-2 whitespace-nowrap overflow-hidden text-ellipsis justify-start flex m-0 text-[.8125em]"
                  style="max-width: calc(100% - 7rem);">
                  {{ sticky.title }}
                </div>
                <RouterLink class="absolute bottom-0 right-0 py-[0.3rem] px-4 " style="border-radius: 1rem 0;"
                            :to="sticky.path" :title="sticky.title">
                  more...
                </RouterLink>
              </div>
            </article>
          </div>
        </template>
        <h2
          class="my-4 mx-0 font-[700] uppercase tracking-[0.05rem] select-none table whitespace-nowrap h-auto leading-[1] text-center">
          文章列表</h2>

        <div class="flex flex-col justify-center items-center" v-for="sticky in pageData.frontmatter.posts"
             :key="sticky.path">
          <article class="flex rounded-[0.5rem] relative h-[14rem] m-4"
                   style="width: calc(100% - 2rem);min-width: calc(100% - 2rem);">
            <div class="w-1/2 mr-6 overflow-hidden">
              <RouterLink :to="sticky.path">
                <img class="object-cover w-full h-full"
                     src="https://tva3.sinaimg.cn/mw690/6833939bly1giciusoyjnj219g0u0x56.jpg" alt="cover">
              </RouterLink>
            </div>
            <div class="relative w-1/2 pt-4 pr-6 pb-12 pl-0" style="perspective: 62.5rem;">
              <div class="flex justify-end m-0 text-[0.8128em]">
                  <span>
                    <span>
                      <i class="ic i-calendar"></i>
                    </span>
                    <time>{{ sticky.date }}</time>
                  </span>
                <span class="ml-2.5">
                    <span><i class="ic i-pen"></i> </span>
                    <span>{{ count(striptags(sticky.contentRendered)) }}</span>
                    <span class="text">字</span>
                  </span>
                <span class="ml-2.5">
                    <span>
                      <i class="ic i-clock"></i>
                    </span>
                    <span>{{ symbolsTime(striptags(sticky.contentRendered)) }}</span>
                  </span>
              </div>
              <h3 class="text-ellipsis overflow-hidden whitespace-nowrap my-2.5 mx-0">
                <RouterLink :to="sticky.path">
                  {{ sticky.title }}
                </RouterLink>
              </h3>
              <div class="overflow-hidden text-[0.875em] max-h-20 text-ellipsis"
                   style="display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3">
                {{
                  sticky.frontmatter?.description || sticky.frontmatter?.excerpt || striptags(sticky.contentRendered).substring(0, 300)
                }}
              </div>
              <div
                class="absolute bottom-2 whitespace-nowrap overflow-hidden text-ellipsis justify-start flex m-0 text-[.8125em]"
                style="max-width: calc(100% - 7rem);">
                {{ sticky.title }}
              </div>
              <RouterLink class="absolute bottom-0 right-0 py-[0.3rem] px-4 " style="border-radius: 1rem 0;"
                          :to="sticky.path" :title="sticky.title">
                more...
              </RouterLink>
            </div>
          </article>
        </div>


      </div>
    </template>
    <template #sidebar="scope">
      <div
        class="w-[15rem] text-center flex justify-around items-start flex-wrap z-[1] my-0 mx-auto"
        :class="[scope.isAffix ? 'fixed top-0' : 'relative']">
        <div
          style="padding-top: .625rem;"
          :style="{ height: panelsHeight + 'px' }"
          class="px-0 pb-8 w-full overflow-hidden">
          <div class="overflow-x-hidden overflow-y-auto w-auto h-full my-0 mx-auto">
            <div class="pt-[0.875rem] px-[0.9375rem] pb-8">
              <div>
                <img class="block my-0 mx-auto max-w-[10rem] p-2.5 rounded-[50%]"
                     src="https://cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/avatar.jpg" alt=""/>
                <p class="font-[400] mt-[.3125rem] mb-0 mx-0 text-center">Ruri Shimotsuki</p>
                <div class="description">琉璃的医学 &amp; 编程笔记</div>
              </div>
              <nav class="flex justify-center leading-[1.4] mt-2.5 overflow-hidden text-center whitespace-nowrap">
                <div class="py-0 px-[0.9375rem]">
                  <RouterLink to="/archives">
                    <span class="block text-[1.125em] font-[600] text-center">200</span>
                    <span class="text-[.875em]">文章</span>
                  </RouterLink>
                </div>
                <div class="py-0 px-[0.9375rem] categories">
                  <RouterLink to="/categories/">
                    <span class="block text-[1.125em] font-[600] text-center">45</span>
                    <span class="text-[.875em]">分类</span>
                  </RouterLink>
                </div>
                <div class="py-0 px-[0.9375rem] tags">
                  <RouterLink to="/tags/">
                    <span class="block text-[1.125em] font-[600] text-center">70</span>
                    <span class="text-[.875em]">标签</span>
                  </RouterLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
