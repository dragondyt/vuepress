<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { onMounted, ref } from 'vue'
import Pagination from '../components/common/Pagination.vue'
import Sidebar from '../components/common/Sidebar.vue'
import Segment from '../components/index/Segment.vue'
import SakuraLayout from '../components/SakuraLayout.vue'
import Card from "../components/index/Card.vue";
import Divider from "../../../lib/client/components/index/Divider.vue";

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
          <Divider title="置顶文章" />
          <div class="flex flex-col items-center justify-center">
            <Segment
              v-for="sticky in pageData.frontmatter.stickyList"
              :key="sticky.path"
              :post="sticky"
            />
          </div>
        </template>
        <Card :categories="[]" title="精选分类" />
        <Divider title="文章列表" />
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
