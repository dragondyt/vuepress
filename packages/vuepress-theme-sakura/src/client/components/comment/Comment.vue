<script lang="ts" setup>
import { init } from '@waline/client'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import '@waline/client/dist/waline.css'
import { useBlogStateHook } from '../../store/blog.js'

const path = computed(() => useRoute().path)
const blogStateHook = useBlogStateHook()
onMounted(() => {
  if (!blogStateHook.comment?.waline) {
    return
  }
  init({
    el: '#comments',
    serverURL: blogStateHook.comment?.waline?.serverURL,
    dark: 'html[class="dark"]',
    path: path.value,
    lang: blogStateHook.lang,
    // ...
    pageview: true, // 浏览量统计
  })
  ;(<HTMLInputElement>document.getElementById('wl-nick')).placeholder = '昵称'
  ;(<HTMLInputElement>document.getElementById('wl-mail')).placeholder = '邮箱'
  ;(<HTMLInputElement>document.getElementById('wl-link')).placeholder = '网址'
  ;(<HTMLInputElement>document.getElementById('wl-edit')).placeholder =
    '1. 提问前请先仔细阅读本文档⚡\n' +
    '2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n' +
    '3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪'
})
</script>

<template>
  <div id="comments" class="wrap"></div>
</template>

<style>
.dark .wl-panel {
  background: none;
}

.wl-comment {
}

.wl-panel {
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--grey-2);
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
  margin-bottom: 0.625rem;
  position: relative;
  padding: 0.625rem;

  .wl-header {
    display: flex;
    padding: 0.3em 0.6em;
    border-bottom: none;

    .wl-header-item {
      flex: 1 1 100%;
      padding-right: 0;
      width: 100%;
      border-bottom: none;

      label {
        display: none;
      }
    }

    input {
      padding: 0.625rem 0.3125rem;
      width: 100%;
      border-bottom: 0.0625rem dashed var(--grey-4);
      outline: 0;
      background: 0 0;
      font-size: 0.75em;
      transition: all 0.25s ease;
    }

    textarea {
      border: none;
      outline: 0;
      background: 0 0;
      font-size: 0.75em;
      transition: all 0.25s ease;
    }
  }

  .wl-editor {
    width: 100%;
    min-height: 8.75em;
    font-size: 0.875em;
    line-height: 1.75;
    resize: vertical;
  }
}
</style>
