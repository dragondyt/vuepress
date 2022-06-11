<script lang="ts" setup>
import RenderContent from './RenderContent.vue'
import {usePageData} from "@vuepress/client";
import {onMounted, ref} from "vue";
import {init, Query} from "leancloud-storage";
const pageData = usePageData();
const commentCount = ref(0)
interface Comment {

}
const comments = ref<Comment>([])
onMounted(()=>{
  init({
    appId: 'OpI7jtevkQGNeDiSFMuQvHFk-9Nh9j0Va',
    appKey: '5aILzwJo7Vwqp20EHM6wC8Iz',
    serverURLs: 'https://opi7jtev.lc-cn-e1-shared.com'
  })
  const query1 = new Query('Comment');
  query1.doesNotExist('rid')
  const query2 = new Query('Comment')
  query2.equalTo('rid', '')
  const query = Query.or(query1,query2);
  query.notEqualTo('isSpam', true)
  query.equalTo('url', pageData.value.path)
  query.count().then((count) => {
    commentCount.value = count
  }).catch((ex) => {
    console.log(ex)
    commentCount.value = 0
  })
})
</script>

<template>
  <div class="relative p-5 mb-5">
    <article class="py-0 px-8">
      <RenderContent/>
    </article>
  </div>
  <div class="relative p-5">
    <div>
      <div class="rounded-[0.5rem] mb-2.5 p-2.5 relative">
        <div class="w-full my-0 mx-auto">
          <section class="flex py-[0.3em] px-[0.6em]">
            <div class="flex-grow flex-shrink basis-[27%] w-[27%]">
              <input type="text" name="author" class="py-2.5 px-[0.3125rem] w-full border-none outline-0 text-[.75em]"
                     placeholder="昵称" value="">
            </div>
            <div class="flex-grow flex-shrink basis-[27%] w-[27%]">
              <input type="email" name="email" class="py-2.5 px-[0.3125rem] w-full border-none outline-0 text-[.75em]"
                     placeholder="邮箱" value="">
            </div>
            <div class="flex-grow flex-shrink basis-[27%] w-[27%]">
              <input type="text" name="website" class="py-2.5 px-[0.3125rem] w-full border-none outline-0 text-[.75em]"
                     placeholder="网站（可选）" value="">
            </div>
          </section>
          <div class="py-[0.3em] px-[0.6em]">
            <textarea placeholder="1. 提问前请先仔细阅读本文档⚡
2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址
3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪" name="comment"
                      class="w-full min-h-[8.75em] text-[.875em] leading-[1.75] resize-y border-none outline-0"/>
            <div class="py-2.5 px-0 flex">
              <div class="w-[30%]">
                <a href="https://guides.github.com/features/mastering-markdown/"
                   class="cursor-pointer inline-block m-2 overflow-hidden align-middle"
                   target="_blank"><i class="ic i-markdown text-[.75em]"></i></a>
              </div>
              <div class="w-[70%] text-right">
                <div class="cursor-pointer inline-block m-2 overflow-hidden align-middle">
                  <i class="ic i-smile"></i>
                </div>
                <div class="cursor-pointer inline-block m-2 overflow-hidden align-middle">
                  <i class="ic i-preview"></i>
                </div>
                <button type="button" title="Cmd|Ctrl+Enter"
                        class="text-[.875em] inline-block cursor-pointer touch-manipulation text-center align-middle whitespace-nowrap rounded-[0.3em] font-[400] leading-[1.5] mb-0 min-h-[1em] py-[0.5em] px-[1.25em] select-none outline-0 will-change-auto">
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-[.3125rem] font-[600] text-[1.25em]">
      <div class="inline-block relative py-0 px-[20px] z-[2]"> 已有<span class="text-[1.375rem] ">{{ commentCount }}</span>条评论</div>
    </div>
    <ul class="w-full">
      <li v-if="comments.length>0"></li>
      <li class="text-center p-[20px]" v-else>快来做第一个评论的人吧~</li>
    </ul>
  </div>
</template>

<style scoped></style>
