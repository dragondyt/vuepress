<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'
import { onMounted, ref } from 'vue'
import { useThemeLocaleData } from '../../composables'
import Menu from './Menu.vue'

const props = defineProps<{
  affix: boolean
}>()
const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
const themeLocaleData = useThemeLocaleData()
const siteLocaleData = useSiteLocaleData()
</script>

<template>
  <div
    class="z-[1] my-0 mx-auto flex w-[15rem] flex-wrap items-start justify-around text-center"
    :class="[props.affix ? 'fixed top-0' : 'relative']"
  >
    <div
      style="padding-top: 0.625rem"
      :style="{ height: panelsHeight + 'px' }"
      class="w-full overflow-hidden px-0 pb-8"
    >
      <div class="my-0 mx-auto h-full w-auto overflow-y-auto overflow-x-hidden">
        <div class="px-[0.9375rem] pt-[0.875rem] pb-8">
          <div>
            <img
              class="my-0 mx-auto block max-w-[10rem] rounded-[50%] p-2.5"
              :src="themeLocaleData.sidebar.avatar"
              alt=""
            />
            <p class="mx-0 mt-[.3125rem] mb-0 text-center font-[400]">
              {{ siteLocaleData.author }}
            </p>
            <div class="description">{{ siteLocaleData.description }}</div>
          </div>
          <nav
            class="mt-2.5 flex justify-center overflow-hidden whitespace-nowrap text-center leading-[1.4]"
          >
            <div class="py-0 px-[0.9375rem]">
              <RouterLink to="/archives">
                <span class="block text-center text-[1.125em] font-[600]">{{
                  siteLocaleData.postLength
                }}</span>
                <span class="text-[.875em]">文章</span>
              </RouterLink>
            </div>
            <div class="categories py-0 px-[0.9375rem]">
              <RouterLink to="/categories/">
                <span class="block text-center text-[1.125em] font-[600]">{{
                  siteLocaleData.categoriesLength
                }}</span>
                <span class="text-[.875em]">分类</span>
              </RouterLink>
            </div>
            <div class="tags py-0 px-[0.9375rem]">
              <RouterLink to="/tags/">
                <span class="block text-center text-[1.125em] font-[600]">{{
                  siteLocaleData.tagLength
                }}</span>
                <span class="text-[.875em]">标签</span>
              </RouterLink>
            </div>
          </nav>
          <div class="mt-[0.9375rem] text-center">
            <a
              v-for="item in themeLocaleData.social"
              :key="item.url"
              :href="item.url"
              rel="noopener external nofollow noreferrer"
              target="_blank"
              class="relative inline-block h-[1.875rem] w-[1.875rem] overflow-hidden rounded-[38%] text-center leading-[1.875rem]"
              :class="item.name"
              :title="item.url"
              ><i
                style="
                  transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59)
                    0s;
                  transform: scale(0.8);
                "
                :style="{ color: item.color }"
                class="align-middle text-[1.4em]"
                :class="`ic i-${item.icon}`"
              ></i
            ></a>
          </div>
          <ul class="m-0 p-5" style="background-color: transparent">
            <Menu
              v-for="(menu, index) in themeLocaleData.navbar"
              :key="menu.path"
              :menu="menu"
              :active="index === 0 && !menu.children"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
