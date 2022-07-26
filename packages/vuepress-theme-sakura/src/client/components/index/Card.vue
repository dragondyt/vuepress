<script lang="ts" setup>
import Divider from "./Divider.vue";

const props = defineProps<{
  categories: []
  title: string
}>()
</script>

<template>
  <template v-if="categories && categories.length>0">
    <Divider :title="title" />
    <div class="my-0 mx-auto flex flex-wrap items-center justify-between">
      <section
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
            transform: rotateY(0);
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transition: ease-in-out 0.6s;
          "
        >
          <h2 class="m-0 whitespace-normal text-center">二进制杂谈</h2>
          <span
            class="absolute right-[.9375rem] top-[.625rem] rounded-[0.3125rem] py-0 px-[0.3125rem] text-[.75em]"
            style="
              box-shadow: 0 0 0.3125rem 0.0625rem rgb(0 0 0 / 60%);
              background: rgba(0, 0, 0, 0.5);
            "
            >计算机科学</span
          >
        </div>
        <div
          class="absolute flex h-full w-full flex-col items-center justify-between rounded-[0.375rem] px-4 pt-4 pb-16"
          style="
            background-color: var(--grey-0);
            transform: rotateY(-180deg);
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transition: ease-in-out 0.6s;
          "
        >
          <div
            class="relative -left-8 mx-0 mx-8 mb-[3.2rem] mt-4 inline-block self-start py-0 pl-8 pr-4"
            style="
              width: calc(100% + 2rem);
              border-radius: 0 0.3rem 0.3rem 0;
              background-image: linear-gradient(
                to right,
                var(--color-orange) 0,
                var(--color-pink) 100%
              );
              color: var(--grey-0);
            "
          >
            <RouterLink
              class="ribbon m-0 block overflow-hidden text-ellipsis whitespace-nowrap text-center"
              to="to"
              >二进制杂谈
            </RouterLink>
          </div>
          <div class="my-0 mx-auto"></div>
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
