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
}
const comments = ref<Comment[]>([])
onMounted(() => {
  init({
    appId: 'OpI7jtevkQGNeDiSFMuQvHFk-9Nh9j0Va',
    appKey: '5aILzwJo7Vwqp20EHM6wC8Iz',
    serverURLs: 'https://opi7jtev.lc-cn-e1-shared.com',
  })
  Query.doCloudQuery<QueryResult<Comment>>(
    "select nick, mail, comment, url from Comment where (rid='' or rid is not exists) order by -createdAt limit 0,10"
  )
    .then((r) => {
      comments.value = r.results
    })
    .catch((ex) => {
      if (ex.code === 101) {
        // 注册子类
        AVObject.register(Comment)
        const comment = new Comment()
        // 将对象保存到云端
        comment.save().then(
          () => {
            // 成功保存之后，执行其他逻辑
          },
          (error) => {
            console.error(error)
            // 异常处理
          }
        )
      }
    })
})
</script>

<template>
  <div class="p-4" style="width: calc(50% - 2rem)">
    <h3>最新评论</h3>
    <ul style="counter-reset: counter">
      <li
        v-for="comment in comments"
        :key="comment.objectId"
        class="relative py-2 pl-8 pr-0"
      >
        <a :href="comment.url">
          <span
            class="m-0 flex max-h-[1.2rem] flex-wrap items-center overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
            >{{ `${comment.nick} @ ` }}</span
          >
          <span
            class="block max-h-[2rem] overflow-hidden text-ellipsis whitespace-nowrap"
            >{{
              comment.comment?.replace(/<[^>]+>/gi, '').substring(0, 100)
            }}</span
          >
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
