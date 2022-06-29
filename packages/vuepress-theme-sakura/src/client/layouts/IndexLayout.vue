<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { striptags } from 'striptags'
import { onMounted, ref } from 'vue'
import SakuraLayout from '../components/SakuraLayout.vue'

const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
const pageData = usePageData()

function count(post: string) {
  let symbolsResult = ''
  if (post.length > 9999) {
    symbolsResult = Math.round(post.length / 1000) + 'k' // > 9999 => 11k
  } else if (post.length > 999) {
    symbolsResult = Math.round(post.length / 100) / 10 + 'k' // > 999 => 1.1k
  } // < 999 => 111
  return symbolsResult
}

function getFormatTime(minutes, suffix) {
  const fHours = Math.floor(minutes / 60)
  let fMinutes = Math.floor(minutes - fHours * 60)
  if (fMinutes < 1) {
    fMinutes = 1 // 0 => 1
  }
  return fHours < 1
    ? fMinutes + ' ' + suffix // < 59 => 59 mins.
    : fHours + ':' + ('00' + fMinutes).slice(-2) // = 61 => 1:01
}

function symbolsTime(post: string, awl = 4, wpm = 275, suffix = 'mins.') {
  const minutes = Math.round(post.length / (awl * wpm))
  return getFormatTime(minutes, suffix)
}
</script>

<template>
  <SakuraLayout>
    <template #content>
      <div class="relative mb-5 p-5">
        <template v-if="pageData.frontmatter.stickyList">
          <h2
            class="my-4 mx-0 table h-auto select-none whitespace-nowrap text-center font-[700] uppercase leading-[1] tracking-[0.05rem]"
          >
            置顶文章
          </h2>
          <div
            v-for="sticky in pageData.frontmatter.stickyList"
            :key="sticky.path"
            class="flex flex-col items-center justify-center"
          >
            <article
              class="relative m-4 flex h-[14rem] rounded-[0.5rem]"
              style="width: calc(100% - 2rem); min-width: calc(100% - 2rem)"
            >
              <div class="mr-6 w-1/2 overflow-hidden">
                <RouterLink :to="sticky.path">
                  <img
                    class="h-full w-full object-cover"
                    src="https://tva3.sinaimg.cn/mw690/6833939bly1giciusoyjnj219g0u0x56.jpg"
                    alt="cover"
                  />
                </RouterLink>
              </div>
              <div
                class="relative w-1/2 pt-4 pr-6 pb-12 pl-0"
                style="perspective: 62.5rem"
              >
                <div class="m-0 flex justify-end text-[0.8128em]">
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
                    <span>{{
                      symbolsTime(striptags(sticky.contentRendered))
                    }}</span>
                  </span>
                </div>
                <h3
                  class="my-2.5 mx-0 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <RouterLink :to="sticky.path">
                    {{ sticky.title }}
                  </RouterLink>
                </h3>
                <div
                  class="max-h-20 overflow-hidden text-ellipsis text-[0.875em]"
                  style="
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                  "
                >
                  {{
                    sticky.frontmatter.description ||
                    sticky.frontmatter.excerpt ||
                    striptags(sticky.contentRendered).substring(0, 300)
                  }}
                </div>
                <div
                  class="absolute bottom-2 m-0 flex justify-start overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
                  style="max-width: calc(100% - 7rem)"
                >
                  {{ sticky.title }}
                </div>
                <RouterLink
                  class="absolute bottom-0 right-0 py-[0.3rem] px-4"
                  style="border-radius: 1rem 0"
                  :to="sticky.path"
                  :title="sticky.title"
                >
                  more...
                </RouterLink>
              </div>
            </article>
          </div>
        </template>
        <h2
          class="my-4 mx-0 table h-auto select-none whitespace-nowrap text-center font-[700] uppercase leading-[1] tracking-[0.05rem]"
        >
          文章列表
        </h2>

        <div
          v-for="sticky in pageData.frontmatter.posts"
          :key="sticky.path"
          class="flex flex-col items-center justify-center"
        >
          <article
            class="relative m-4 flex h-[14rem] rounded-[0.5rem]"
            style="width: calc(100% - 2rem); min-width: calc(100% - 2rem)"
          >
            <div class="mr-6 w-1/2 overflow-hidden">
              <RouterLink :to="sticky.path">
                <img
                  class="h-full w-full object-cover"
                  src="https://tva3.sinaimg.cn/mw690/6833939bly1giciusoyjnj219g0u0x56.jpg"
                  alt="cover"
                />
              </RouterLink>
            </div>
            <div
              class="relative w-1/2 pt-4 pr-6 pb-12 pl-0"
              style="perspective: 62.5rem"
            >
              <div class="m-0 flex justify-end text-[0.8128em]">
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
                  <span>{{
                    symbolsTime(striptags(sticky.contentRendered))
                  }}</span>
                </span>
              </div>
              <h3
                class="my-2.5 mx-0 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <RouterLink :to="sticky.path">
                  {{ sticky.title }}
                </RouterLink>
              </h3>
              <div
                class="max-h-20 overflow-hidden text-ellipsis text-[0.875em]"
                style="
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                "
              >
                {{
                  sticky.frontmatter?.description ||
                  sticky.frontmatter?.excerpt ||
                  striptags(sticky.contentRendered).substring(0, 300)
                }}
              </div>
              <div
                class="absolute bottom-2 m-0 flex justify-start overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
                style="max-width: calc(100% - 7rem)"
              >
                {{ sticky.title }}
              </div>
              <RouterLink
                class="absolute bottom-0 right-0 py-[0.3rem] px-4"
                style="border-radius: 1rem 0"
                :to="sticky.path"
                :title="sticky.title"
              >
                more...
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </template>
    <template #sidebar="scope">
      <div
        class="z-[1] my-0 mx-auto flex w-[15rem] flex-wrap items-start justify-around text-center"
        :class="[scope.isAffix ? 'fixed top-0' : 'relative']"
      >
        <div
          style="padding-top: 0.625rem"
          :style="{ height: panelsHeight + 'px' }"
          class="w-full overflow-hidden px-0 pb-8"
        >
          <div
            class="my-0 mx-auto h-full w-auto overflow-y-auto overflow-x-hidden"
          >
            <div class="px-[0.9375rem] pt-[0.875rem] pb-8">
              <div>
                <img
                  class="my-0 mx-auto block max-w-[10rem] rounded-[50%] p-2.5"
                  src="https://cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/avatar.jpg"
                  alt=""
                />
                <p class="mx-0 mt-[.3125rem] mb-0 text-center font-[400]">
                  Ruri Shimotsuki
                </p>
                <div class="description">琉璃的医学 &amp; 编程笔记</div>
              </div>
              <nav
                class="mt-2.5 flex justify-center overflow-hidden whitespace-nowrap text-center leading-[1.4]"
              >
                <div class="py-0 px-[0.9375rem]">
                  <RouterLink to="/archives">
                    <span class="block text-center text-[1.125em] font-[600]"
                      >200</span
                    >
                    <span class="text-[.875em]">文章</span>
                  </RouterLink>
                </div>
                <div class="categories py-0 px-[0.9375rem]">
                  <RouterLink to="/categories/">
                    <span class="block text-center text-[1.125em] font-[600]"
                      >45</span
                    >
                    <span class="text-[.875em]">分类</span>
                  </RouterLink>
                </div>
                <div class="tags py-0 px-[0.9375rem]">
                  <RouterLink to="/tags/">
                    <span class="block text-center text-[1.125em] font-[600]"
                      >70</span
                    >
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
