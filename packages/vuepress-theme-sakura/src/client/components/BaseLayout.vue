<template>
  <header id="header">
    <div class="inner">
      <div id="brand" :class="{affix: isAffix}">
        <div class="pjax">
          <slot name="header">
            <RouterLink :to="themeData.root" class="logo" rel="start">
              <p v-if="themeData.alternate" class="artboard">{{ themeData.alternate }}</p>
              <h1 class="title">{{ themeData.title }}</h1>
            </RouterLink>
            <p v-if="themeData.subtitle" class="meta">= {{ themeData.subtitle }} =</p>
          </slot>
        </div>
      </div>
      <Header/>
    </div>
    <div id="imgs">
      <template v-if="covers.length===6">
        <ul>
          <li v-for="cover in covers" :key="cover" :style="`background-image: url(${cover});`"
              class="item"/>
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
  <main>
    <div class="inner">
      <div id="main">
        <slot name="content"/>
      </div>
      <div id="sidebar" :class="{affix: isAffix}">
        <slot name="sidebar">
          <Sidebar/>
        </slot>
      </div>
      <div class="dimmer"></div>
    </div>
  </main>
  <footer id="footer">
    <div class="inner">
      <div class="widgets">
        <Widgets/>
      </div>
      <Footer/>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import {useThemeData} from "@vuepress/plugin-theme-data/lib/client";
import {SakuraThemeOptions} from "../../shared";
import Header from "./Header.vue"
import Footer from "./Footer.vue"
import {getCover} from "../utils/imageUtil";
import {usePageData} from "@vuepress/client";
import Wave from "./Wave.vue";
import Sidebar from "./Sidebar.vue";
import Widgets from "./Widgets.vue";
import {onMounted, ref} from "vue";

const themeData = useThemeData<SakuraThemeOptions>();
const pageData = usePageData();
const covers = getCover(pageData.value, 6);
const isAffix = ref(false)
onMounted(() => {
  window.addEventListener('scroll', function () {
    isAffix.value = window.pageYOffset > 0;
  })
})
</script>
<style lang="postcss">
#header {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 50vh;
  text-shadow: 0 0.2rem 0.3rem rgb(0 0 0 / 50%);
  color: var(--header-text-color);

  .inner {
    margin: 0 auto;
    width: 100%;

    #brand {
      position: fixed;
      padding: 3rem 5rem 0;
      text-align: center;
      width: 100%;
      height: 50vh;
      min-height: 10rem;

      &.affix {
        z-index: -1;
      }
    }

    #brand {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .pjax {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: slideDownIn .3s;

        .artboard {
          font-family: 'Fredericka the Great', Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
          font-size: 3.5em;
          line-height: 1.2;
        }

        @media (max-width: 413px) {
          .artboard {
            font-size: 2.5em;
          }
        }

        h1 {
          font-size: 2.5em;
          letter-spacing: .125rem;
        }

        @media (max-width: 767px) {
          h1 {
            font-size: 1.5em;
          }
        }


        .meta {
          display: flex;
          font-size: .875em;
          margin: 0;
        }

        @media (max-width: 767px) {
          .meta {
            font-size: .75em;
          }
        }
      }

      .artboard + h1 {
        margin: 0.625rem 0;
      }
    }

    @media (max-width: 767px) {
      #brand {
        padding: 3rem 0.5rem 0;
      }
    }
  }

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

    .item {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-size: cover;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      opacity: 0;
      z-index: 0;
      animation: imageAnimation 36s linear infinite 0s;
      backface-visibility: hidden;
      transform-style: preserve-3d;

      &:nth-child(2) {
        animation-delay: 6s;
      }

      &:nth-child(3) {
        animation-delay: 12s;
      }

      &:nth-child(4) {
        animation-delay: 18s;
      }

      &:nth-child(5) {
        animation-delay: 24s;
      }

      &:nth-child(6) {
        animation-delay: 30s;
      }
    }
  }
}

main {
  background: linear-gradient(to top, var(--body-bg-shadow) 0, var(--grey-1) 20%) no-repeat bottom;

  .inner {
    margin: 0 auto;
    width: 100%;

    #main {
      background: linear-gradient(to top, var(--grey-0) 0, var(--grey-1) 20%) no-repeat top;
      box-shadow: 0 1.25rem 1rem 0.3125rem var(--body-bg-shadow);
      width: calc(100% - 15.75rem);
      min-height: 37.5rem;
    }

    @media (max-width: 991px) {
      #main {
        width: 100%;
      }
    }

    #sidebar {
      position: static;
      width: 15rem;
      top: 0;
      bottom: 0;
      transition: all .2s ease-in-out 0s;
    }

    @media (max-width: 991px) {
      #sidebar {
        display: none;
        position: fixed;
        right: 0;
        background: var(--grey-1);
        box-shadow: 0 0.375rem 0.9375rem 0.3125rem rgb(0 0 0 / 20%);
        z-index: 99;
      }
    }

    .dimmer {
      display: none;
    }

    @media (max-width: 991px) {
      .dimmer {
        background: #000;
        height: 100%;
        left: 100%;
        opacity: 0;
        top: 0;
        width: 100%;
        z-index: 9;
        transition: opacity 1s;
      }
    }


  }

  > .inner {
    width: calc(100% - 0.625rem);
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
  }
}

#footer {
  color: var(--grey-5);
  font-size: .875em;
  background: var(--body-bg-shadow);

  .inner {
    margin: 0 auto;
    width: calc(100% - 0.625rem);
    position: relative;
    padding-right: 16.25rem;

    .widgets {
      display: flex;
      z-index: 1;
      background: var(--body-bg-shadow);
      justify-content: space-around;
    }

    @media (max-width: 767px) {
      .widgets {
        flex-direction: column-reverse;
      }
    }

  }

  @media (max-width: 991px) {
    .inner {
      padding-left: 0;
      padding-right: 0;
      width: auto;
    }
  }
}
</style>