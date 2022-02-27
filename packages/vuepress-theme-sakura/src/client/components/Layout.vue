<template>
  <header id="header" class="my-0 mx-auto relative w-full"

          style="height: 50vh;text-shadow: 0 0.2rem 0.3rem rgb(0 0 0 / 50%);color: var(--header-text-color);">
    <div class="inner my-0 mx-auto w-full">
      <div id="brand" class="pt-12 px-2 pb-0 flex flex-col justify-center content-center fixed text-center w-full"
           style="height: 50vh;min-height: 10rem">
        <div class="pjax flex flex-col justify-center content-center" style="animation: slideDownIn .3s;">
          <slot name="header">
            <RouterLink :to="themeData.root" class="logo" rel="start">
              <p v-if="themeData.alternate" class="artboard" style="font-size: 2.5rem;">{{ themeData.alternate }}</p>
              <h1 class="title my-2.5 mx-0 font-bold"
              >
                {{ themeData.title }}</h1>
            </RouterLink>
            <p v-if="themeData.subtitle" class="meta">=
              {{ themeData.subtitle }} =</p>
          </slot>
        </div>
      </div>
      <Header/>
    </div>
    <div id="imgs" class="pjax block fixed top-0 left-0 w-full"
         style="height: 70vh;min-height: 25rem; z-index: -9;background-color: #363636;">
      <template v-if="covers.length===6">
        <ul>
          <li v-for="cover in covers" :key="cover" :style="`background-image: url(${cover});`"
              class="item lozaded"></li>
        </ul>
      </template>
      <template v-else>
        <img :src="covers" alt=""/>
      </template>
    </div>
  </header>
  <slot name="wares">
    <Wave/>
  </slot>
  <main style="z-index: 10">
    <div class="inner content-start flex justify-between my-0 mx-auto" style="width: calc(100% - 0.625rem);">
      <div id="main" class="pjax w-full" style="background: linear-gradient(to top,var(--grey-0) 0,var(--grey-1) 20%) no-repeat top;box-shadow: 0 1.25rem 1rem 0.3125rem var(--body-bg-shadow);
    min-height: 37.5rem;">
        <slot name="content"/>
      </div>
      <div id="sidebar" ref="sidebarRef" :class="appStoreHook.sidebar.opened?'block':'hidden'"
           class="fixed right-0 top-0 bottom-0" style="    background: var(--grey-1);
    box-shadow: 0 0.375rem 0.9375rem 0.3125rem rgb(0 0 0 / 20%);
    z-index: 99;width: 15rem;transition: all .2s ease-in-out 0s;">
        <slot name="sidebar">
          <Sidebar/>
        </slot>
      </div>
      <div class="dimmer hidden bg-black h-full left-full opacity-0 top-0 w-full"
           style="z-index: 9;transition: opacity 1s;"></div>
    </div>
  </main>
  <footer id="footer" style="    color: var(--grey-5);font-size: .875em;background: var(--body-bg-shadow);">
    <div class="inner px-0 w-auto my-0 mx-auto relative">
      <div class="widgets flex-col-reverse flex justify-around" style="z-index: 1;background: var(--body-bg-shadow);">
        <Widgets/>
      </div>
      <Footer/>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import Wave from "./Wave.vue";
import Sidebar from "./Sidebar.vue";
import {useAppStoreHook} from "../store/app";
import {ref} from "vue";
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {ThemeData} from "../../types";
import Header from "./Header.vue";
import Widgets from "./Widgets.vue";
import Footer from "./Footer.vue";
import {getCover} from "../utils/imageUtil";
import {usePageData} from "@vuepress/client";

const appStoreHook = useAppStoreHook();
const sidebarRef = ref<HTMLElement>()
const themeData = useThemeLocaleData<ThemeData>()
const pageData = usePageData().value;
const covers = getCover(pageData, 6)
</script>

<style lang="postcss">
#imgs {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70vh;
  min-height: 25rem;
  z-index: -9;
  background-color: #363636;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0rem;
    left: 0rem;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 0;
    animation: imageAnimation 36s linear infinite 0s;
    backface-visibility: hidden;
    transform-style: preserve-3d;


    &:nth-child(2) {
      -webkit-animation-delay: 6s;
      animation-delay: 6s
    }

    &:nth-child(3) {
      -webkit-animation-delay: 12s;
      animation-delay: 12s
    }

    &:nth-child(4) {
      -webkit-animation-delay: 18s;
      animation-delay: 18s
    }

    &:nth-child(5) {
      -webkit-animation-delay: 24s;
      animation-delay: 24s
    }

    &:nth-child(6) {
      -webkit-animation-delay: 30s;
      animation-delay: 30s
    }

    &:nth-child(7) {
      -webkit-animation-delay: 36s;
      animation-delay: 36s
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    z-index: 1;
    transition: all .2s ease-in-out 0s;
  }

}

@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }
  2% {
    opacity: 1;
  }
  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }
  17% {
    opacity: 1;
    transform: scale(1.1);
  }
  25% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 0
  }
}

</style>