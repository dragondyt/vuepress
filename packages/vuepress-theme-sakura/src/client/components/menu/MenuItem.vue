<template>
  <li class="inline-block relative my-0 mx-2.5 tracking-[.0625rem] text-center" v-if="!menu.children">
    <RouterLink :to="menu.path??''">
      <i :class="`ic i-${menu.icon}`"></i>
      {{ menu.name }}
    </RouterLink>
  </li>
  <li class="inline-block relative my-0 mx-2.5 tracking-[.0625rem] text-center" v-else>
    <RouterLink :to="menu.path??''">
      <i :class="`ic i-${menu.icon}`"/>
      {{ menu.name }}
    </RouterLink>
    <ul class="absolute mt-2 p-0 w-[max-content] hidden" style="border-radius: .625rem 0">
      <MenuItem v-for="subMenu in menu.children" :menu="subMenu" :key="menu.path??menu.name"/>
    </ul>
  </li>
</template>

<script lang="ts" setup>
const {menu} = defineProps<{
  menu: any
}>()</script>

<style scoped>

</style>