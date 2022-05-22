<template>
  <Layout>
    <template #content>
      <div class="page wrap">
        <div :style="notfoundStyle">{{ getMsg() }}</div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import {useThemeLocaleData} from '../composables'
import img from '@images/404'
import Layout from "./Layout.vue";

const themeLocale = useThemeLocaleData()
const messages = themeLocale.value.notFound ?? ['Not Found']
const getMsg = (): string =>
    messages[Math.floor(Math.random() * messages.length)]
const notfoundStyle = {
  width: '18.75rem',
  height: '22.625rem',
  'text-align': 'center',
  background: `url("${img}") no-repeat center bottom`,
  margin: '6.25rem auto',
}
</script>

<style scoped>

</style>