<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps<{
  menu: any
  active: boolean
}>()
const activeStyle = {
  'color': 'var(--grey-0)',
  'background-image':
    'linear-gradient(to right,var(--color-pink) 0,var(--color-orange) 100%)',
  'box-shadow': '0 0 0.75rem var(--color-pink-a3)',
}
</script>

<template>
  <li
    v-if="!props.menu.children"
    class="mb-2.5 block rounded-[0.9375rem]"
    style="color: var(--grey-5); transition: all 0.2s ease-in-out 0s"
    :style="props.active ? activeStyle : {}"
  >
    <RouterLink
      :to="props.menu.path || ''"
      class="block leading-[3]"
      style="color: inherit"
    >
      <i class="mr-[0.625rem]" :class="`ic i-${props.menu.icon}`" />
      {{ props.menu.name }}
    </RouterLink>
  </li>
  <li
    v-else
    class="mb-2.5 block rounded-[0.9375rem]"
    style="color: var(--grey-5); transition: all 0.2s ease-in-out 0s"
    :style="props.active ? activeStyle : {}"
  >
    <RouterLink
      :to="props.menu.path || ''"
      class="block leading-[3]"
      style="color: inherit"
    >
      <i class="mr-[0.625rem]" :class="`ic i-${props.menu.icon}`" />
      {{ props.menu.name }}
    </RouterLink>
    <ul class="hidden p-0" style="animation: slideDownIn 0.3s">
      <Menu
        v-for="(subMenu, index) in props.menu.children"
        :key="subMenu.path"
        :menu="subMenu"
        :active="index === 0 && !subMenu.children"
      />
    </ul>
  </li>
</template>

<style scoped></style>
