<template>
  <li class="item" v-if="!menu.children">
    <RouterLink :to="menu.path">
      <i :class="`ic i-${menu.icon}`"/>
      {{ menu.name }}
    </RouterLink>
  </li>
  <li class="item dropdown" v-else>
    <RouterLink :to="menu.path">
      <i :class="`ic i-${menu.icon}`"/>
      {{ menu.name }}
    </RouterLink>
    <ul class="submenu">
      <MenuItem v-for="subMenu in menu.children" :menu="subMenu" :key="subMenu.path"/>
    </ul>
  </li>


</template>

<script lang="ts" setup>
const {menu} = defineProps<{
  menu: any
}>()
</script>