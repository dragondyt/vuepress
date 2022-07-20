<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { onMounted, ref } from 'vue'
import Pagination from '../components/common/Pagination.vue'
import Sidebar from '../components/common/Sidebar.vue'
import Segment from '../components/index/Segment.vue'
import SakuraLayout from '../components/SakuraLayout.vue'

const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
const pageData = usePageData()
</script>

<template>
  <SakuraLayout>
    <template #content>
      <div class="relative mb-5 p-2">
        <template v-if="pageData.frontmatter.stickyList.length > 0">
          <h2 class="divider">置顶文章</h2>
          <div class="flex flex-col items-center justify-center">
            <Segment
              v-for="sticky in pageData.frontmatter.stickyList"
              :key="sticky.path"
              :post="sticky"
            />
          </div>
        </template>
        <h2 class="divider">文章列表</h2>
        <div class="flex flex-col items-center justify-center">
          <Segment
            v-for="post in pageData.frontmatter.posts"
            :key="post.path"
            :post="post"
          />
        </div>
      </div>
      <Pagination :pagination="pageData.frontmatter.pagination" />
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
</style>
