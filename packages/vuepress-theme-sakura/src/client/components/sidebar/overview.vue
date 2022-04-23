<template>
  <div class="author">
    <img class="image" :src="themeLocaleData.avatar" alt="author">
    <p class="name" v-text="themeLocaleData.author"/>
    <div class="description" v-text="themeLocaleData.description"/>
  </div>

  <nav class="state">
    <div class="item posts">
      <RouterLink to="/archives">
        <span class="count" v-text="appStore.allPost.length"/>
        <span class="name" v-text="themeLocaleData.state.posts"/>
      </RouterLink>
    </div>

    <div class="item categories">
      <RouterLink to="/categories">
        <span class="count" v-text="appStore.categories.length"/>
        <span class="name" v-text="themeLocaleData.state.categories"/>
      </RouterLink>
    </div>
    <div class="item tags">
      <RouterLink to="/tags">
        <span class="count" v-text="appStore.tags.length"/>
        <span class="name" v-text="themeLocaleData.state.tags"/>
      </RouterLink>
    </div>
  </nav>

  <div class="social">
    <a v-for="link in appStore.socials" target="_blank" :href="link.href" :title="link.name"
       :class="`exturl item ${link.name}`">
      <i :class="`ic i-${link.name}`"></i>
    </a>
  </div>

  <ul class="menu">
    <Menu/>
  </ul>
</template>

<script lang="ts" setup>
import Menu from "./Menu.vue";
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {useAppStore} from "../../store/app";

const themeLocaleData = useThemeLocaleData();
const appStore = useAppStore();
</script>
<style lang="postcss" scoped>
.overview {
  .author {
    .image {
      border: 0.0625rem solid var(--body-bg-shadow);
      display: block;
      margin: 0 auto;
      max-width: 10rem;
      padding: 0.125rem;
      box-shadow: 0 0 1rem 0.625rem var(--body-bg-shadow);
      border-radius: 50%;
    }

    .name {
      color: var(--grey-7);
      font-weight: 400;
      margin: 0.3125rem 0 0;
      text-align: center;
    }
    .description {
      color: var(--grey-5);
      font-size: 1em;
      margin-top: 0.3125rem;
      text-align: center;
    }
  }

  .state {
    display: flex;
    justify-content: center;
    line-height: 1.4;
    margin-top: 0.625rem;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;

    .item {
      padding: 0 0.9375rem;

      &:not(:first-child) {
        border-left: 0.0625rem solid var(--grey-4);
      }

      a {
        border-bottom: none;
      }

      .count {
        display: block;
        font-size: 1.25em;
        font-weight: 600;
        text-align: center;
      }

      .name {
        color: inherit;
        font-size: .875em;
      }
    }
  }

  .social {
    margin-top: 0.9375rem;
    text-align: center;

    .item {
      display: inline-block;
      width: 1.875rem;
      height: 1.875rem;
      line-height: 1.875rem;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-radius: 38%;

      &::before {
        top: 90%;
        left: -110%;
        content: "";
        width: 120%;
        height: 120%;
        position: absolute;
        transform: rotate(45deg);
      }

      &::before {
        transition: all .35s cubic-bezier(.31, -.105, .43, 1.59) 0s;
      }

      i {
        transition: all .35s cubic-bezier(.31, -.105, .43, 1.59) 0s;
        font-size: 1.4em;
        vertical-align: middle;
        transform: scale(.8);
      }
    }
  }

  .menu {
    padding: 1.25rem;
    margin: 0;
    background-color: transparent;
  }
}
</style>