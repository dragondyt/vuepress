<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { ACL, Object as AVObject, init, Query } from 'leancloud-storage'
import { onMounted, ref, unref } from 'vue'
import type { QueryResult } from '../../../shared'
import RenderContent from './RenderContent.vue'

class Comment extends AVObject {
  nick: string | undefined
  objectId: string | undefined
  comment: string | undefined
  mail: string | undefined
  url: string | undefined
}

const pageData = usePageData()
const defaultForm = {
  ip: '',
  comment: '',
  rid: '',
  pid: '',
  at: '',
  nick: '',
  mail: '',
  mailMd5: '',
  link: '',
  ua: '',
  url: '',
}
const comment = ref(defaultForm)
const commentCount = ref(0)
const pageNum = ref(1)
const comments = ref<Comment[]>([])
const initData = () => {
  init({
    appId: 'OpI7jtevkQGNeDiSFMuQvHFk-9Nh9j0Va',
    appKey: '5aILzwJo7Vwqp20EHM6wC8Iz',
    serverURLs: 'https://opi7jtev.lc-cn-e1-shared.com',
  })
  const query1 = new Query('Comment')
  query1.doesNotExist('rid')
  const query2 = new Query('Comment')
  query2.equalTo('rid', '')
  const query = Query.or(query1, query2)
  query.notEqualTo('isSpam', true)
  query.equalTo('url', pageData.value.path)
  query
    .count()
    .then((count) => {
      commentCount.value = count
    })
    .catch((ex) => {
      console.log(ex)
      commentCount.value = 0
    })
  Query.doCloudQuery<QueryResult<Comment>>(
    `select nick, comment, link, rid, isSpam, mailMd5, ua
                                            from Comment
                                            where (rid = '' or rid is not exists)
                                              and url = '${pageData.value.path}'
                                            order by -createdAt limit ${
                                              (pageNum.value - 1) * 10
                                            }, 10`
  ).then((r) => {
    comments.value = r.results || []
  })
}
const submitComment = async () => {
  const commentForm = unref(comment)
  if (!commentForm.nick) {
    document.getElementsByName('author').item(0).focus()
    return
  } else if (!commentForm.mail) {
    document.getElementsByName('email').item(0).focus()
    return
  } else if (!commentForm.comment) {
    document.getElementsByName('comment').item(0).focus()
    return
  }
  //
  // 注册子类
  AVObject.register(Comment)
  const commentEntity = new Comment('Comment')
  const acl = new ACL()
  acl.setWriteAccess('role:admin', true)
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(false)
  commentEntity.setACL(acl)
  const response = await fetch('https://ip.zxinc.org/api.php?type=json', {
    method: 'GET',
    headers: {
      'accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json;charset=UTF-8',
    },
  })
  const ip = await response.json()
  commentForm.ip = ip?.data?.myip
  commentForm.ua = navigator.userAgent
  commentForm.url = location.pathname
  for (const i in commentForm) {
    if (commentForm.hasOwnProperty(i)) {
      if (i === 'at') continue
      const _v = commentForm[i]
      commentEntity.set(i, _v)
    }
  }
  commentEntity
    .save()
    .then(() => {
      initData()
      comment.value = defaultForm
    })
    .catch()
}
onMounted(() => {
  initData()
})
</script>

<template>
  <div class="relative mb-5 p-5">
    <article class="py-0 px-8">
      <RenderContent />
    </article>
  </div>
  <div class="relative p-5">
    <div>
      <div class="relative mb-2.5 rounded-[0.5rem] p-2.5">
        <div class="my-0 mx-auto w-full">
          <section class="flex py-[0.3em] px-[0.6em]">
            <div class="w-[27%] flex-shrink flex-grow basis-[27%]">
              <input
                v-model="comment.nick"
                type="text"
                name="author"
                class="w-full border-none py-2.5 px-[0.3125rem] text-[.75em] outline-0"
                placeholder="昵称"
              />
            </div>
            <div class="w-[27%] flex-shrink flex-grow basis-[27%]">
              <input
                v-model="comment.mail"
                type="email"
                name="email"
                class="w-full border-none py-2.5 px-[0.3125rem] text-[.75em] outline-0"
                placeholder="邮箱"
              />
            </div>
            <div class="w-[27%] flex-shrink flex-grow basis-[27%]">
              <input
                v-model="comment.website"
                type="text"
                name="website"
                class="w-full border-none py-2.5 px-[0.3125rem] text-[.75em] outline-0"
                placeholder="网站（可选）"
              />
            </div>
          </section>
          <div class="py-[0.3em] px-[0.6em]">
            <textarea
              v-model="comment.comment"
              placeholder="1. 提问前请先仔细阅读本文档⚡
2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址
3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
              name="comment"
              class="min-h-[8.75em] w-full resize-y border-none text-[.875em] leading-[1.75] outline-0"
            />
            <div class="flex py-2.5 px-0">
              <div class="w-[30%]">
                <a
                  href="https://guides.github.com/features/mastering-markdown/"
                  class="m-2 inline-block cursor-pointer overflow-hidden align-middle"
                  target="_blank"
                  ><i class="ic i-markdown text-[.75em]"></i
                ></a>
              </div>
              <div class="w-[70%] text-right">
                <div
                  class="m-2 inline-block cursor-pointer overflow-hidden align-middle"
                >
                  <i class="ic i-smile"></i>
                </div>
                <div
                  class="m-2 inline-block cursor-pointer overflow-hidden align-middle"
                >
                  <i class="ic i-preview"></i>
                </div>
                <button
                  title="Cmd|Ctrl+Enter"
                  type="button"
                  class="mb-0 inline-block min-h-[1em] cursor-pointer touch-manipulation select-none whitespace-nowrap rounded-[0.3em] py-[0.5em] px-[1.25em] text-center align-middle text-[.875em] font-[400] leading-[1.5] outline-0 will-change-auto"
                  @click="submitComment"
                >
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-[.3125rem] text-[1.25em] font-[600]">
      <div class="relative z-[2] inline-block py-0 px-[20px]">
        已有<span class="text-[1.375rem]">{{ commentCount }}</span
        >条评论
      </div>
    </div>
    <ul class="w-full">
      <li
        v-for="comment in comments"
        v-if="comments.length > 0"
        :key="comment.objectId"
        class="break-all pt-[1.25em]"
      >
        <img
          class="float-left mr-[.7525em] h-[3.125em] w-[3.125em] rounded-[50%] p-[.125em]"
          alt="头像"
          :src="`https://gravatar.loli.net/avatar/${comment.mailMd5}?size=80&d=mp`"
        />
        <div class="overflow-hidden pb-[0.5em]">
          <div class="leading-[1.8]">
            <a v-if="comment.link" class="mr-[0.875rem]" :href="comment.link">{{
              comment.nick
            }}</a>
            <span v-else class="mr-[0.875rem]">{{ comment.nick }}</span>
            <span class="mr-2 rounded-[.125rem] py-0 px-[0.3125rem]"
              >新朋友</span
            >
            <span class="inline-block text-[.75em]"
              ><i class="ic i-chrome"></i><span>{{ comment.ua }}</span></span
            >
            <span class="inline-block text-[.75em]"
              ><i class="ic i-windows"></i><span>Windows 10</span></span
            >
          </div>
          <div class="leading-[1]">
            <a class="float-right">回复</a>
            <span class="inline-block text-[.75em]">17 天前</span>
          </div>
          <section class="mb-[.75em] p-2.5">
            <div
              class="relative my-0 mx-auto w-full break-words break-all text-[.875em] leading-[2]"
              v-html="comment.comment"
            ></div>
          </section>
        </div>
      </li>
      <li v-else class="p-[20px] text-center">快来做第一个评论的人吧~</li>
    </ul>
  </div>
</template>

<style scoped></style>
