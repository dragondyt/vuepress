<script lang="ts" setup>
import { ref } from 'vue'
import MoreBtn from '../common/MoreBtn.vue'
import Divider from './Divider.vue'

const props = defineProps<{
  categories: []
  title: string
}>()
const active = ref<boolean>(false)
</script>

<template>
  <template v-if="categories && categories.length > 0">
    <Divider :title="title" />
    <div class="my-0 mx-auto flex flex-wrap items-center justify-between">
      <section
        v-for="cat in categories"
        :key="cat.slug"
        class="relative my-4 mx-2 h-[14rem]"
        style="
          perspective: 62.5rem;
          width: calc(100% - 1rem);
          min-width: calc(100% - 1rem);
        "
      >
        <div
          class="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[0.375rem] bg-cover bg-center py-2 px-4 text-[1em]"
          style="
            animation: blur 0.8s ease-in-out forwards;
            color: var(--header-text-color);
            /*transform: rotateY(0);*/
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transition: ease-in-out 0.6s;
          "
          :style="cat.cover ? { 'background-image': `url(${cat.cover})` } : {}"
        >
          <h2 class="m-0 whitespace-normal text-center">{{ cat.name }}</h2>
          <span
            v-if="cat.top && cat.top.name"
            class="absolute right-[.9375rem] top-[.625rem] rounded-[0.3125rem] py-0 px-[0.3125rem] text-[.75em]"
            style="
              box-shadow: 0 0 0.3125rem 0.0625rem rgb(0 0 0 / 60%);
              background: rgba(0, 0, 0, 0.5);
            "
            >{{ cat.top.name }}</span
          >
          <template v-else />
          >
        </div>
        <div
          class="absolute flex h-full w-full flex-col items-center justify-between rounded-[0.375rem] px-4 pt-4 pb-16"
          style="
            background-color: var(--grey-0);
            /*transform: rotateY(-180deg);*/
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transition: ease-in-out 0.6s;
          "
        >
          <div
            class="relative -left-8 mb-[0.8rem] mt-4 inline-block self-start py-0 pl-8 pr-4"
            style="
              max-width: calc(100% + 2rem);
              border-radius: 0 0.3rem 0.3rem 0;
              background-image: linear-gradient( to right, var(--color-orange) 0, var(--color-pink) 100% );
              color: var(--grey-0);
            "
          >
            <RouterLink
              class="ribbon m-0 block overflow-hidden text-ellipsis whitespace-nowrap text-center"
              to="to"
              >{{ cat.name }}
            </RouterLink>
          </div>
          <div class="my-0 mx-auto">
            <ul
              class="flex min-h-[5rem] flex-wrap items-baseline justify-between overflow-hidden"
            >
              <li
                v-for="sub in cat.subs"
                :key="sub.path"
                class="w-[45%] overflow-hidden text-ellipsis whitespace-nowrap"
                style="color: var(--primary-color)"
              >
                <RouterLink :to="sub.path" :title="sub.name">{{
                  sub.name
                }}</RouterLink>
              </li>
            </ul>
            <div
              class="absolute bottom-2 justify-start overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
              style="max-width: calc(100% - 7rem); color: var(--grey-5)"
            >
              <span v-if="cat.top" class="mr-2">
                <RouterLink :to="cat.top.path"
                  ><i class="ic i-flag mr-[0.0625rem]"></i
                  >{{ cat.top.name }}</RouterLink
                >
              </span>
              <template v-else />
              <span
                ><i class="ic i-file mr-[0.0625rem]"></i
                >{{ cat.child ? `${cat.child}个子项 ` : ''
                }}{{ cat.length }} 篇文章</span
              >
            </div>
            <MoreBtn
              class="absolute bottom-0 right-0 py-[0.3rem] px-4"
              :path="cat.path"
              :title="cat.name"
            />
          </div>
        </div>
      </section>
    </div>
  </template>
  <template v-else />
</template>

<style scoped>
.ribbon::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-width: 0 1rem 1rem 0;
  border-color: transparent;
  border-right-color: var(--color-orange);
  filter: brightness(0.9);
}
</style>
