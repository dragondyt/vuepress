<template>
  <nav id="nav">
    <div class="inner">
      <div class="toggle" @click="toggleSidebar">
        <div class="lines">
          <span v-for="i in 3" :key="i" class="line"/>
        </div>
      </div>
      <ul class="menu">
        <li class="item title">
          <RouterLink :to="themeData.root">{{ themeData.alternate || themeData.title }}</RouterLink>
        </li>
        <Menu/>
      </ul>
      <ul class="right">
        <li class="item theme">
          <i class="ic i-sun"></i>
        </li>
        <li class="item search">
          <i class="ic i-search"></i>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import anime from "animejs/lib/anime.es";
import {useAppStoreHook} from "../store/app";
import {useThemeData, useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {SakuraThemeOptions} from "../../shared";
import Menu from "./sidebar/Menu.vue";

const appStoreHook = useAppStoreHook();
const themeData = useThemeData<SakuraThemeOptions>()

const toggleSidebar = () => {
  if (appStoreHook.sidebar.opened) {
    anime(Object.assign({
      targets: '#sidebar',
      duration: 200,
      easing: 'linear'
    }, {
      translateX: [0, 100],
      opacity: [1, 0]
    })).finished.then(function () {
      appStoreHook.toggleSideBar()
    });
  } else {
    anime(Object.assign({
      targets: '#sidebar',
      duration: 200,
      easing: 'linear'
    }, {
      translateX: [100, 0],
      opacity: [0, 1]
    })).finished.then(function () {
      appStoreHook.toggleSideBar()
    });
  }
}

</script>
<style lang="postcss">
#nav {
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 3.125rem;
  transition: all .2s ease-in-out 0s;

  .inner {
    margin: 0 auto;
    height: 100%;
    display: flex;
    width: calc(100% - 0.625rem);
    flex-wrap: nowrap;

    .toggle {
      display: none;
      line-height: 0;
      cursor: pointer;

      .lines {
        padding: 1.25rem;
        width: 1.375rem;
        box-sizing: unset;

        .line {
          background: var(--header-text-color);
          display: inline-block;
          height: 0.125rem;
          left: 0;
          position: relative;
          border-radius: 0.0625rem;
          top: 0;
          transition: all .4s;
          vertical-align: top;
          width: 100%;
          box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);

          &:not(:first-child) {
            margin-top: 0.1875rem;
          }
        }
      }
    }

    @media (max-width: 991px) {
      .toggle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .menu {
      padding: 0.625rem 0;
      margin: 0;
      width: 100%;

      .item {
        display: inline-block;
        position: relative;
        padding: 0 0.625rem;
        letter-spacing: .0625rem;
        text-align: center;

        &:not(.title) a {
          display: block;
          font-size: 1em;
        }
      }

      @media (max-width: 767px) {
        .item {
          display: none;

          &.title {
            display: block;
          }
        }
      }

      .submenu {
        animation: slideUpIn .3s;
        display: none;
        position: absolute;
        margin-top: 0.5rem;
        padding: 0;
        width: max-content;
        background-color: var(--grey-9-a5);
        box-shadow: 0 0.3125rem 1.25rem -0.25rem var(--grey-9-a1);
        border-radius: 0.625rem 0;

        .item {
          display: block;

          &:last-child {
            border-radius: 0 0 0.625rem 0;
          }

          &:not(.title) a {
            display: block;
            font-size: 1em;
          }

          a {
            display: inline-block;
            padding: 0.3rem 0.7rem;
            width: 100%;
            text-shadow: none;
          }

        }
      }
    }

    .right {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .item {
        padding: 0.625rem 0.5rem;
        cursor: pointer;

      }
      .i-sun {
        font-size: 1.125em;
      }
    }
  }
}
</style>