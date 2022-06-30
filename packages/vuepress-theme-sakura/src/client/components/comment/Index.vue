<script setup lang="ts">
import { Object as AVObject, init, Query } from 'leancloud-storage'
import { onMounted, ref } from 'vue'
import type { QueryResult } from '../../../shared'
class Comment extends AVObject {
  nick: string | undefined
  objectId: string | undefined
  comment: string | undefined
  mail: string | undefined
  url: string | undefined
  link: string | undefined
}
const comments = ref<Comment[]>([])
onMounted(() => {
  fetch('https://waline-chi-weld.vercel.app/comment?type=recent&count=10')
    .then((response) => response.json())
    .then((data) => (comments.value = data))
})
</script>

<template>
  <div style="width: calc(100% - 1rem)" class="p-4">
    <h3>最新评论</h3>
    <ul style="counter-reset: counter">
      <li
        v-for="comment in comments"
        :key="comment.objectId"
        class="relative py-2 pl-8 pr-0"
      >
        <a :href="comment.link">
          <span
            class="m-0 flex max-h-[1.2rem] flex-wrap items-center overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
            >{{ `${comment.nick} @ ` }}</span
          >
          <span v-html="comment.comment"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
