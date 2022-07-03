<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const props = defineProps<{
  affix: boolean
}>()
const panelsHeight = ref()
onMounted(() => {
  panelsHeight.value = window.innerHeight
})
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
              src="https://cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/avatar.jpg"
              alt=""
            />
            <p class="mx-0 mt-[.3125rem] mb-0 text-center font-[400]">
              Ruri Shimotsuki
            </p>
            <div class="description">琉璃的医学 &amp; 编程笔记</div>
          </div>
          <nav
            class="mt-2.5 flex justify-center overflow-hidden whitespace-nowrap text-center leading-[1.4]"
          >
            <div class="py-0 px-[0.9375rem]">
              <RouterLink to="/archives">
                <span class="block text-center text-[1.125em] font-[600]"
                  >200</span
                >
                <span class="text-[.875em]">文章</span>
              </RouterLink>
            </div>
            <div class="categories py-0 px-[0.9375rem]">
              <RouterLink to="/categories/">
                <span class="block text-center text-[1.125em] font-[600]"
                  >45</span
                >
                <span class="text-[.875em]">分类</span>
              </RouterLink>
            </div>
            <div class="tags py-0 px-[0.9375rem]">
              <RouterLink to="/tags/">
                <span class="block text-center text-[1.125em] font-[600]"
                  >70</span
                >
                <span class="text-[.875em]">标签</span>
              </RouterLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
