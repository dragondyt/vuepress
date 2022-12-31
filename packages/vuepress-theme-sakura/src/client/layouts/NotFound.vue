<script lang="ts" setup>
import img from '@images/404'
import { useBlogStateHook } from '../store/blog.js'
import BaseLayout from './BaseLayout.vue'
const blogStateHook = useBlogStateHook()
const messages = blogStateHook.notFound ?? ['Not Found']
const getMsg = (): string =>
  messages[Math.floor(Math.random() * messages.length)]
const notfoundStyle = {
  'width': '18.75rem',
  'height': '22.625rem',
  'text-align': 'center',
  'background': `url("${img}") no-repeat center bottom`,
  'margin': '6.25rem auto',
}
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 class="text-[2.5em] tracking-[0.125rem]">{{ getMsg() }}</h1>
    </template>
    <template #content>
      <div class="page wrap">
        <div :style="notfoundStyle">{{ getMsg() }}</div>
      </div>
    </template>
  </BaseLayout>
</template>
<style scoped></style>
