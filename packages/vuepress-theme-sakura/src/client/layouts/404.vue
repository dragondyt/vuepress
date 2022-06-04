<template>
  <SakuraLayout>
    <template #header>
      <h1 class="text-[2.5em] tracking-[0.125rem]">{{getMsg()}}</h1>
    </template>
    <template #content>
      <div class="page wrap">
        <div :style="notfoundStyle">{{ getMsg() }}</div>
      </div>
    </template>
  </SakuraLayout>>
</template>

<script setup lang="ts">
import {useThemeLocaleData} from '../composables'
import img from '@images/404'
import SakuraLayout from "../components/SakuraLayout.vue";

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
