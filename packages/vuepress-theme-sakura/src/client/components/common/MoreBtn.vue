<script lang="ts" setup>
const props = defineProps<{
  path: string
  title: string
}>()
</script>

<template>
  <RouterLink
    class="btn absolute bottom-0 right-0 py-[0.3rem] px-4"
    :to="path"
    :title="title"
  >
    more...
  </RouterLink>
</template>

<style lang="postcss" scoped>
.btn {
  border-radius: 1rem 0;
  color: var(--grey-0);
  background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100% );
  &::before {
    @apply absolute left-2 top-[0.8rem] block rounded-[5rem];
    content: '';
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    box-shadow: 0 0 0.6rem 0.6rem var(--color-pink-a3);
    background-color: var(--color-pink-a3);
  }
}
</style>
