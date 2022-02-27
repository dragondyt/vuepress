<template>
  <Layout>
    <template #header>
      <h1>
        全部标签
      </h1>
    </template>
    <template #content>
      <div class="collapse wrap"><h2 class="item title"><a data-pjax-state="" href="/">首页</a> <small>/</small> 目前共计
        {{ appStore.tags.length }}
        个标签</h2>
        <div class="tag cloud">
          <RouterLink v-for="tag in result" :to="tag.path" :style="tag.style" :key="tag.path">{{tag.name}}</RouterLink>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '../components/Layout.vue'
import {usePageData} from "@vuepress/client"
import {useAppStore} from "../store/app";
import {useThemeData} from "@vuepress/plugin-theme-data/lib/client";
import {Color} from "../utils/color";

const pageData = usePageData();
const appStore = useAppStore()
const themeData = useThemeData();

//tagcloud
const tags: string[] = appStore.tags

let {options} = themeData.value
options = options || {
  min_font: 16,
  max_font: 22,
  amount: 200,
  color: true,
  start_color: "#72cecf",
  end_color: "#ffbac3"
}
const min = options.min_font || 10;
const max = options.max_font || 20;
const order = options.order || 1;
const unit = options.unit || 'px';
const color = options.color;
const className = options.class;
const level = options.level || 10;
const {transform} = options;
const separator = options.separator || ' ';
const result: {
  path: string;
  name: string;
  style: {}
}[] = [];
let startColor, endColor;

if (color) {
  if (!options.start_color) throw new TypeError('start_color is required!');
  if (!options.end_color) throw new TypeError('end_color is required!');

  startColor = new Color(options.start_color);
  endColor = new Color(options.end_color);
}

const sizes: any[] = [];

tags.sort((a, b) => a.length - b.length).forEach(tag => {
  const {length} = tag;
  if (sizes.includes(length)) return;

  sizes.push(length);
});
const length = sizes.length - 1;
tags.forEach(tag => {
  const ratio = length ? sizes.indexOf(tag.length) / length : 0;
  const size = min + ((max - min) * ratio);
  let style = `font-size: ${parseFloat(size.toFixed(2))}${unit};`;
  if (color) {
    const midColor = startColor.mix(endColor, ratio);
    style += ` color: ${midColor.toString()}`;
  }

  result.push(
      {
        path: `/tags/${tag}`,
        name: transform ? transform(tag) : tag,
        style: style,
      }
  );
});
</script>

<style>
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
  }

  a {
    display: unset;
  }

  small {
    color: var(--grey-4);
    margin: auto 0.3125rem;
  }
}

.tag.cloud {
  text-align: center;

  a {
    display: inline-block;
    margin: 0.625rem;
  }
}
</style>