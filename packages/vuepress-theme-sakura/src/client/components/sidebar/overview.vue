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
<style lang="postcss">
.social {
  margin-top: .9375rem;
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

    i {
      font-size: 1.4em;
      vertical-align: middle;
      transform: scale(.8);
    }


    &::before {
      top: 90%;
      left: -110%;
      content: "";
      width: 120%;
      height: 120%;
      position: absolute;
      transform: rotate(45deg);
    }

    &::before,
    i {
      transition: all .35s cubic-bezier(.31, -.105, .43, 1.59) 0s
    }

    &:focus::before,
    &:hover::before {
      top: -10%;
      left: -10%;
    }


    .github::before {
      background-color: #191717
    }

    .github i {
      color: #191717
    }

    .twitter::before {
      background-color: #00aff0
    }

    .twitter i {
      color: #00aff0
    }

    .zhihu::before {
      background-color: #1e88e5
    }

    .zhihu i {
      color: #1e88e5
    }

    .music::before {
      background-color: #e60026
    }

    .music i {
      color: #e60026
    }

    .telegram::before {
      background-color: #32afed
    }

    .telegram i {
      color: #32afed
    }

    .about::before {
      background-color: #3b5998
    }

    .about i {
      color: #3b5998
    }

    &:focus i,
    &:hover i {
      color: var(--grey-0);
      transform: scale(1);
    }

  }
}

.state {
  display: flex;
  justify-content: center;
  line-height: 1.4;
  margin-top: .625rem;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;


  .item {
    padding: 0 .9375rem;

    &:not(:first-child) {
      border-left: .0625rem solid var(--grey-4);
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

</style>