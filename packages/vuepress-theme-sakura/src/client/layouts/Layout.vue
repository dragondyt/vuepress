<template>
  <Layout>
    <template #header>

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
</script>

<style lang="postcss">
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

  :not(pre) > code {
    color: var(--primary-color);
    border-radius: 0.3rem;
    border: 0.0625rem solid rgba(0, 0, 0, .1);
    background-color: var(--grey-0);
    padding: 0.2rem 0.3rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
}
</style>