<template>
  <Layout>
    <template #header>
      <h1 class="text-[2.5em] tracking-[.125rem]">{{pageData.title}}</h1>
    </template>
    <template #content>
      <!--      inner-->
      <div class="flex items-start justify-between my-0 mx-auto" style="width: calc(100% - 0.625rem);">
        <!--        main-->
        <div class="min-h-[37.5rem]" style="width: calc(100% - 15.75rem);">
          <!--          article-->
          <div class="relative mb-5  p-5">
            <article class="py-0 px-8">
              <div class="md">
                <Content/>
              </div>
            </article>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>
<script setup lang="ts">
import Layout from '@theme/SakuraLayout.vue'
import {usePageData} from "@vuepress/client";
const pageData = usePageData();
</script>

<style lang="postcss">


code[class*='language-'],
pre[class*='language-'] {
  color: #ccc;
  background: none;
  font-family: var(--font-family-code);
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code blocks */
pre[class*='language-'] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: #2d2d2d;
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999;
}

.token.punctuation {
  color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #ec5975;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: #3eaf7c;
}

.md {
  font-family: Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  overflow-wrap: break-word;
  word-wrap: break-word;

  p {
    margin: 0 0 0.8rem;
  }

  h1 {
    font-size: 1.5em;
    position: relative;
    padding-top: .625rem;

    &&::after {
      content: "";
      display: block;
      box-sizing: unset;
      width: 100%;
      height: .0625rem;
      background: var(--grey-3);
      padding-right: 1.25rem;
      margin-left: -1.25rem;
      margin-top: .3125rem
    }
  }

  h2 {
    font-size: 1.375em;
    position: relative;
    padding-top: .625rem;
    font-family: Mulish, 'Noto Serif SC', 'Noto Serif JP', Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    font-weight: 700;
    line-height: 1.5;
    margin: 1.25rem 0 0.9375rem;

    .header-anchor::after {
      content: " 2 ";
    }
  }

  h3 {
    font-size: 1.25em;
    position: relative;
    padding-top: .625rem
  }

  h4 {
    font-size: 1.125em;
    position: relative;
    padding-top: .625rem
  }

  h5 {
    font-size: 1em;
    position: relative;
    padding-top: .625rem
  }

  h6 {
    font-size: .875em;
    position: relative;
    padding-top: .625rem
  }

  a {
    color: var(--primary-color);
  }

  code, kbd, samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  code, pre {
    font-family: Inconsolata, consolas, Menlo, -apple-system, "PingFang SC", "Microsoft YaHei";
    font-size: 1em;
  }

  dl, ol, ul {
    margin: 0.5em 0 0.5em;
    padding: 0.1em 0.2em 0.1em 1.4em;
  }

  ul {
    && > li {
      &&::before {
        content: "";
        position: absolute;
        width: 0.4em;
        height: 0.4em;
        background: var(--primary-color);
        border-radius: 50%;
        top: 0.85em;
        left: -1em;
      }
    }
  }

  li {
    position: relative;
    margin: 0.2rem 0;

    &:before {
      transition: all .2s ease-in-out 0s;
    }
  }

  .header-anchor {
    border-bottom-style: none;
    color: var(--grey-4);
    float: right;
    margin-left: 0.625rem;

    &&::before {
      color: var(--grey-4);
      position: absolute;
      font-weight: 400;
      transition: all .2s ease-out 0s;
      content: "H";
      font-family: Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
      left: -1.875rem;
      top: 1rem;
      width: 1.25rem;
      height: 1.5625rem;
      text-align: right;
      visibility: visible;
      font-size: 80%;
    }

    &&::after {

      content: "H";
      font-family: Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
      top: 1rem;
      width: 1.25rem;
      height: 1.5625rem;
      text-align: right;
      visibility: visible;
      color: var(--grey-4);
      position: absolute;
      font-weight: 400;
      transition: all .2s ease-out 0s;
      font-size: 50%;
      left: -1.375rem;
      line-height: 3;
    }
  }

  pre,
  pre[class*='language-'] {
    line-height: 1.4;
    padding: 1.3rem 1.5rem;
    margin: 0.85rem 0;
    border-radius: 6px;
    overflow: auto;

    code {
      color: #fff;
      padding: 0;
      background-color: transparent;
      border-radius: 0;
      overflow-wrap: unset;
      -webkit-font-smoothing: auto;
      -moz-osx-font-smoothing: auto;
    }
  }

  .line-number {
    font-family: var(--font-family-code);
  }

}

div[class*='language-'] {
  position: relative;
  background-color: var(--code-bg-color);
  border-radius: 6px;

  &::before {
    position: absolute;
    z-index: 3;
    top: 0.8em;
    right: 1em;
    font-size: 0.75rem;
    color: var(--code-ln-color);
  }

  pre,
  pre[class*='language-'] {
    background: transparent !important;
    position: relative;
    z-index: 1;
  }

  .highlight-lines {
    user-select: none;
    padding-top: 1.3rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 1.4;

    .highlight-line {
      background-color: var(--code-hl-bg-color);
    }
  }

  &:not(.line-numbers-mode) {
    .line-numbers {
      display: none;
    }
  }

  &.line-numbers-mode {
    .highlight-lines .highlight-line {
      position: relative;

      &::before {
        content: ' ';
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        display: block;
        width: var(--code-ln-wrapper-width);
        height: 100%;
      }
    }

    pre {
      margin-left: var(--code-ln-wrapper-width);
      padding-left: 1rem;
      vertical-align: middle;
    }

    .line-numbers {
      position: absolute;
      top: 0;
      width: var(--code-ln-wrapper-width);
      text-align: center;
      color: var(--code-ln-color);
      padding-top: 1.25rem;
      line-height: 1.4;
      counter-reset: line-number;

      .line-number {
        position: relative;
        z-index: 3;
        user-select: none;
        height: 1.4em;

        &::before {
          counter-increment: line-number;
          content: counter(line-number);
          font-size: 0.85em;
        }
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: var(--code-ln-wrapper-width);
      height: 100%;
      border-radius: 6px 0 0 6px;
      border-right: 1px solid var(--code-hl-bg-color);
    }
  }
}

div[class*='language-'].ext-c {
  &:before {
    content: 'c';
  }
}

div[class*='language-'].ext-cpp {
  &:before {
    content: 'cpp';
  }
}

div[class*='language-'].ext-cs {
  &:before {
    content: 'cs';
  }
}

div[class*='language-'].ext-css {
  &:before {
    content: 'css';
  }
}

div[class*='language-'].ext-dart {
  &:before {
    content: 'dart';
  }
}

div[class*='language-'].ext-docker {
  &:before {
    content: 'docker';
  }
}

div[class*='language-'].ext-fs {
  &:before {
    content: 'fs';
  }
}

div[class*='language-'].ext-go {
  &:before {
    content: 'go';
  }
}

div[class*='language-'].ext-html {
  &:before {
    content: 'html';
  }
}

div[class*='language-'].ext-java {
  &:before {
    content: 'java';
  }
}

div[class*='language-'].ext-js {
  &:before {
    content: 'js';
  }
}

div[class*='language-'].ext-json {
  &:before {
    content: 'json';
  }
}

div[class*='language-'].ext-kt {
  &:before {
    content: 'kt';
  }
}

div[class*='language-'].ext-less {
  &:before {
    content: 'less';
  }
}

div[class*='language-'].ext-makefile {
  &:before {
    content: 'makefile';
  }
}

div[class*='language-'].ext-md {
  &:before {
    content: 'md';
  }
}

div[class*='language-'].ext-php {
  &:before {
    content: 'php';
  }
}

div[class*='language-'].ext-py {
  &:before {
    content: 'py';
  }
}

div[class*='language-'].ext-rb {
  &:before {
    content: 'rb';
  }
}

div[class*='language-'].ext-rs {
  &:before {
    content: 'rs';
  }
}

div[class*='language-'].ext-scss {
  &:before {
    content: 'scss';
  }
}

div[class*='language-'].ext-sh {
  &:before {
    content: 'sh';
  }
}

div[class*='language-'].ext-styl {
  &:before {
    content: 'styl';
  }
}

div[class*='language-'].ext-ts {
  &:before {
    content: 'ts';
  }
}

div[class*='language-'].ext-toml {
  &:before {
    content: 'toml';
  }
}

div[class*='language-'].ext-vue {
  &:before {
    content: 'vue';
  }
}

div[class*='language-'].ext-yml {
  &:before {
    content: 'yml';
  }
}

@media (max-width: 419px) {
  .theme-default-content {
    div[class*='language-'] {
      margin: 0.85rem -1.5rem;
      border-radius: 0;
    }
  }
}

</style>