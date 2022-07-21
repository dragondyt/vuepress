<script setup lang="ts">
const props = defineProps<{
  pagination: {
    base: string
    current: number
    total: number
  }
}>()
const urlCache = {}
function formatURL(i): string {
  if (urlCache[i]) return urlCache[i]

  let url = props.pagination.base
  if (i > 1) url += 'page/' + i
  urlCache[i] = url

  return url
}
</script>

<template>
  <nav
    v-if="props.pagination && pagination.total > 1"
    class="inline-block w-full py-5 px-2.5 text-center"
    style="color: var(--grey-5)"
  >
    <div class="my-0 mx-auto w-auto rounded-[0.9375rem]">
      <RouterLink
        v-if="props.pagination.current > 1"
        class="relative my-0 mx-2 ml-0 inline-block rounded-[0.3125rem] py-0 px-3"
        :to="`/page/${props.pagination.current - 1}`"
      >
        <i class="ic i-angle-left"></i>
      </RouterLink>
      <template v-for="i in pagination.total" :key="i">
        <span
          v-if="i === pagination.current"
          class="relative my-0 mx-[0.3125rem] inline-block rounded-[0.3125rem] py-0 px-3"
          style="color: var(--grey-0);
    background-image: linear-gradient(to right,var(--color-pink) 0,var(--color-orange) 100%);
    box-shadow: 0 0 0.75rem var(--color-pink-a3);
        transition: all .2s ease-in-out 0s;
}"
        >
          {{ i }}
        </span>
        <template v-else>
          <RouterLink
            class="relative my-0 mx-[0.3125rem] inline-block rounded-[0.3125rem] py-0 px-3"
            :to="formatURL(i)"
            >{{ i }}</RouterLink
          >
        </template>
      </template>
    </div>
  </nav>
  <template v-else />
</template>

<style scoped></style>
