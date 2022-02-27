<template>
  <Layout>
    <template #header>
      <h1>
        全部分类
      </h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item title">
          <a data-pjax-state="" href="/">首页</a>
          <small>/</small> 目前共计 36 个分类
        </h2>
        <div>
          <h2 class="item header">
            <a data-pjax-state="" href="/categories/inter-discipline/">交叉学科</a>
            <small>( 3 )</small>
          </h2>
          <h3 class="item section">
            <a data-pjax-state="" href="/categories/inter-discipline/artificial-intelligence/">人工智能</a>
            <small>( 2 )</small>
          </h3>
          <div class="item normal">
            <div class="title"><a data-pjax-state=""
                                  href="/categories/inter-discipline/artificial-intelligence/radiomics/">零基础入门影像组学</a>
              <small>( 2 )</small>
            </div>
          </div>
          <h3 class="item section">
            <a data-pjax-state="" href="/categories/inter-discipline/health-informatics/">医学信息学</a>
            <small>( 1 )</small>
          </h3>
          <div class="item normal">
            <div class="title">
              <a data-pjax-state="" href="/categories/inter-discipline/health-informatics/specialization-1/">Health Informatics - Johns Hopkins University</a>
              <small>( 1 )</small>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '../components/Layout.vue'
import {usePageData} from "@vuepress/client"
import {useAppStore} from "../store/app";
const appStore = useAppStore();
</script>

<style lang="postcss">
.collapse {
  .item {
    position: relative;
    padding: 1.25rem 1.875rem;
    margin: 0;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      transition: all .2s ease-in-out 0s;
      box-sizing: unset;
      top: 1.9rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      border: 0.15rem solid var(--primary-color);
      border-radius: 50%;
      background: var(--grey-1);
    }

    &.title a {
      border-bottom: 0.0625rem dashed var(--grey-4);
    }

    &:not(:last-child):not(.title)::after {
      content: "";
      position: absolute;
      top: 1.9rem;
      bottom: -1.9rem;
      left: 0.35rem;
      border-left: 0.2rem solid var(--color-red-a3);
    }

    &.header::after {
      border-left-style: dashed !important;
    }

    &.section::before {
      width: 0.4rem;
      height: 0.4rem;
      margin-left: 0.1rem;
    }

    &.normal {
      .title a {
        color: var(--primary-color);
      }
    }
  }

  small {
    color: var(--grey-4);
    margin: auto 0.3125rem;
  }

  .item.section a, .collapse .item.title a {
    border-bottom: 0.0625rem dashed var(--grey-4);
  }
}
</style>