<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'
import { onMounted, onUnmounted, ref } from 'vue'

const isAffix = ref(false)
const headerHeight = ref(0)
const headerRef = ref<HTMLDivElement>()
const wavesRef = ref<HTMLDivElement>()
const siteLocaleData = useSiteLocaleData()

function scrollHandle(e: any): void {
  isAffix.value =
    window.scrollY > headerHeight.value && document.body.offsetWidth > 991
}

function resizeHandle(e?: any): void {
  // @ts-ignore
  const headerHightInner = headerRef.value.getBoundingClientRect().height
  headerHeight.value =
    // @ts-ignore
    headerHightInner + wavesRef.value.getBoundingClientRect().height
}

onMounted(() => {
  resizeHandle()
  window.addEventListener('scroll', scrollHandle)
  window.addEventListener('resize', resizeHandle)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})
</script>

<template>
  <header ref="headerRef" class="my-0 mx-auto relative w-full h-[50vh]">
    <div class="mx-auto my-0 w-full">
      <div
        class="flex flex-col justify-center items-center fixed pt-12 px-20 pb-0 text-center w-full h-[50vh] min-h-[10rem]"
        :class="[isAffix ? 'z-[-1]' : '']"
      >
        <div class="flex flex-col justify-center items-center">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" rel="start">
              <p
                v-if="siteLocaleData.alternate"
                class="text-[3.5em] leading-[1.2]"
              >
                {{ siteLocaleData.alternate }}
              </p>
              <h1 class="my-2.5 mx-0 text-[2.5em] tracking-[0.125rem]">
                {{ siteLocaleData.title }}
              </h1>
            </RouterLink>
            <p
              v-if="siteLocaleData.description"
              class="flex text-[0.875em] m-0"
            >
              = {{ siteLocaleData.description }} =
            </p>
          </slot>
        </div>
      </div>
    </div>
  </header>
  <div ref="wavesRef">
    <div
      class="w-full h-[15vh] mb-[-0.6875rem] min-h-[3.125rem] max-h-[9.375rem] relative"
    ></div>
  </div>
  <main>
    <div class="w-[72.5rem] items-start flex justify-between my-0 mx-auto">
      <div class="min-h-[37.5rem]" style="width: calc(100% - 15.75rem)">
        <slot name="content" />
      </div>
      <div class="static w-[15rem] top-0 bottom-0">
        <slot name="sidebar" v-bind="{ isAffix }" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
