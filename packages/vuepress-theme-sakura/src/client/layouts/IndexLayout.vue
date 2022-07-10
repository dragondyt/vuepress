<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { striptags } from 'striptags'
import { onMounted, ref } from 'vue'
import Sidebar from '../components/common/Sidebar.vue'
import SakuraLayout from '../components/SakuraLayout.vue'

const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
const pageData = usePageData()

const prevNext = ref(pageData.value.frontmatter.prevNext)
const current = ref(pageData.value.frontmatter.current)
const total = ref(pageData.value.frontmatter.total)
const endSize = 1
const midSize = 1
const leftEnd = current.value <= endSize ? current.value - 1 : endSize
const rightEnd =
  total.value - current.value <= endSize
    ? current.value + 1
    : total.value - endSize + 1
const leftMid =
  current.value - midSize <= endSize ? leftEnd + 1 : current.value - midSize
const rightMid =
  current.value + midSize + endSize > total.value
    ? rightEnd - 1
    : current.value + midSize

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
      <div class="relative mb-5 p-2">
        <template v-if="pageData.frontmatter.stickyList.length > 0">
          <h2 class="divider">置顶文章</h2>
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
                  style="
                    border-radius: 1rem 0;
                    color: var(--grey-0);
                    background-image: linear-gradient(to right,var(--color-pink) 0,var(--color-orange) 100%);
                  "
                  :to="sticky.path"
                  :title="sticky.title"
                >
                  more...
                </RouterLink>
              </div>
            </article>
          </div>
        </template>
        <h2 class="divider">文章列表</h2>
        <div
          v-for="sticky in pageData.frontmatter.posts"
          :key="sticky.path"
          class="flex flex-col items-center justify-center"
        >
          <article
            class="relative my-4 mx-2 flex h-fit max-h-fit flex-col rounded-[0.5rem]"
            style="
              width: calc(100% - 1rem);
              color: inherit;
              min-width: calc(100% - 1rem);
              box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
              transition: all 0.2s ease-in-out 0s;
            "
          >
            <div
              class="m-auto h-[14rem] w-full overflow-hidden"
              style="
                clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
                border-radius: 0.625rem 0.625rem 0 0;
              "
            >
              <RouterLink :to="sticky.path">
                <img
                  class="h-full w-full object-cover"
                  src="https://tva3.sinaimg.cn/mw690/6833939bly1giciusoyjnj219g0u0x56.jpg"
                  alt="cover"
                  style="transition: all 0.2s ease-in-out 0s"
                />
              </RouterLink>
            </div>
            <div
              class="relative h-[14rem] w-full px-4 pt-0 pb-12"
              style="perspective: 62.5rem"
            >
              <div
                class="m-0 flex justify-end text-[0.8128em]"
                style="color: var(--grey-5)"
              >
                <span>
                  <span>
                    <i class="ic i-calendar"></i>
                  </span>
                  <time>{{ sticky.date }}</time>
                </span>
                <span class="ml-2.5 hidden">
                  <span><i class="ic i-pen"></i> </span>
                  <span>{{ count(striptags(sticky.contentRendered)) }}</span>
                  <span class="text">字</span>
                </span>
                <span class="ml-2.5 hidden">
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
                style="color: var(--primary-color)"
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
                style="color: var(--grey-5); max-width: calc(100% - 7rem)"
              >
                <span class="mr-2"
                  ><RouterLink to="to"
                    ><i class="ic i-flag mr-[0.0625rem]"></i
                    >{{ sticky.title }}</RouterLink
                  ></span
                >
              </div>
              <RouterLink
                class="btn absolute bottom-0 right-0 py-[0.3rem] px-4"
                style="
                  border-radius: 1rem 0;
                  color: var(--grey-0);
                  background-image: linear-gradient(to right,var(--color-pink) 0,var(--color-orange) 100%);
                "
                :to="sticky.path"
                :title="sticky.title"
              >
                more...
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
      <nav
        class="inline-block w-full py-5 px-2.5 text-center"
        style="color: var(--grey-5)"
      >
        <div class="mx-auto my-0 w-auto rounded-[0.9375rem]">
          <RouterLink
            v-if="prevNext && current > 1"
            class="relative my-0 mx-2 ml-0 inline-block rounded-[0.3125rem] py-0 px-3"
            :to="`/page/${current - 1}`"
          >
            <i class="ic i-angle-left"></i>
          </RouterLink>
          <template v-for="i in leftEnd" :key="i">
            <span
              v-if="i === current"
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              >{{ i }}</span
            >
            <RouterLink
              v-else
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              :to="i === 1 ? '/' : `/page/${i}`"
            >
              {{ i }}
            </RouterLink>
          </template>
          <template v-if="current - endSize - midSize > 1">
            <span class="relative m-0 inline-block rounded-[0.3125rem] p-0"
              >...</span
            >
          </template>
          <template
            v-for="i in current - leftMid"
            v-if="leftMid > leftEnd"
            :key="i"
          >
            <span
              v-if="i + leftMid === current"
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              >{{ i + leftMid }}</span
            >
            <RouterLink
              v-else
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              :to="i + leftMid === 1 ? '/' : `/page/${i + leftMid}`"
              >{{ i + leftMid }}
            </RouterLink>
          </template>

          <span
            class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
            >{{ current }}</span
          >

          <template v-for="i in rightMid - current" v-if="rightMid < rightEnd">
            <span
              v-if="i + current === current"
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              >{{ i + current }}</span
            >
            <RouterLink
              v-else
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              :to="i + current === 1 ? '/' : `/page/${i + current}`"
              >{{ i + current }}
            </RouterLink>
          </template>

          <template v-if="total - endSize - midSize > current">
            <span class="relative m-0 inline-block rounded-[0.3125rem] p-0"
              >...</span
            >
          </template>

          <template
            v-for="i in total - rightEnd + 1"
            v-if="rightMid < rightEnd"
          >
            <span
              v-if="i + rightEnd - 1 === current"
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              >{{ i + rightEnd - 1 }}</span
            >
            <RouterLink
              v-else
              class="relative my-0 mx-2 inline-block rounded-[0.3125rem] py-0 px-3"
              :to="i + rightEnd - 1 === 1 ? '/' : `/page/${i + rightEnd - 1}`"
              >{{ i + rightEnd - 1 }}
            </RouterLink>
          </template>

          <RouterLink
            v-if="prevNext && current < total"
            class="relative my-0 mx-2 ml-0 inline-block rounded-[0.3125rem] py-0 px-3"
            :to="`/page/${current + 1}`"
          >
            <i class="ic i-angle-right"></i>
          </RouterLink>
        </div>
      </nav>
    </template>
    <template #sidebar="scope">
      <Sidebar :affix="scope.isAffix" />
    </template>
  </SakuraLayout>
</template>

<style lang="postcss" scoped>
.divider {
  @apply my-4 mx-0 table h-auto select-none whitespace-nowrap text-center font-[700] uppercase leading-[1] tracking-[0.05rem];
  color: var(--grey-4);
  &::before,
  &::after {
    content: '';
    @apply relative top-1/2 table-cell w-1/2 bg-no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
  }
  &::before {
    background-position: right 1rem top 50%;
  }
  &:after {
    background-position: left 1rem top 50%;
  }
}
.btn {
  &::before {
    @apply absolute left-2 top-[0.8rem] block rounded-[5rem];
    content: '';
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    box-shadow: 0 0 0.6rem 0.6rem var(--color-pink-a3);
    background-color: var(--color-pink-a3);
  }
}
</style>
