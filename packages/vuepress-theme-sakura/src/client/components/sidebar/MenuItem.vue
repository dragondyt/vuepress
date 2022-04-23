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
<style lang="postcss" scoped>
.menu {
  .item {
    border-radius: 0.9375rem;
    margin-bottom: 0.625rem;
    display: block;
    color: var(--grey-5);
    transition: all .2s ease-in-out 0s;

    a {
      color: inherit;
      display: block;
      line-height: 3;
    }
    .ic {
      margin-right: 0.625rem;
    }
    .submenu {
      display: none;
      padding: 0;
      animation: slideDownIn .3s;
    }
  }
}
</style>