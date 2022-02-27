<template>
  <article class="post block py-0 px-8">
    <link href=" post.permalink }}">
    <span hidden>
    <meta content=" url_for(theme.statics + theme.images + '/' + theme.sidebar.avatar) }}">
    <meta content=" author }}">
    <meta content=" subtitle }},  description }}">
  </span>

    <span hidden>
    <meta content=" title }}">
  </span>

    <div class="md"
    >
      <div v-if="pageData.frontmatter.photos" class="gallery">
        <img v-for="photo in pageData.frontmatter.photos" data-src=" _image_url(photo, post.path) }}"
        >
      </div>

      <Content :page-key="pageData.key"/>

      <div v-if="pageData.frontmatter.tags" class="tags">
        <a v-for="tag in pageData.frontmatter.tags" :href="`/tags/${tag}`">
          <i class="ic i-tag"/>
          {{ tag }}
        </a>
      </div>
    </div>

    <footer>
      <slot name="postFooter">
        <Footer/>
      </slot>

      <slot v-if="reward" name="reward">
        <Reward/>
      </slot>
      <slot v-if="license" name="license">
        <License/>
      </slot>
    </footer>

  </article>

</template>

<script lang="ts" setup>

import Footer from "./Footer.vue";
import {ref} from "vue";
import Reward from "./Reward.vue";
import License from "./License.vue";
import {usePageData} from "@vuepress/client"

const reward = ref(false)
const license = ref(false)
const pageData = usePageData();
</script>
<style lang="postcss">
.post {

}

.md {
  font-family: Mulish, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  overflow-wrap: break-word;
  word-wrap: break-word;

  h1, h2, h3, h4, h5, h6 {
    position: relative;
    padding-top: 0.625rem;
  }

  dl, ol, ul {
    margin: 0.5em 0 0.5em;
    padding: 0.1em 0.2em 0.1em 1.4em;
  }

  a {
    color: var(--primary-color);
  }

  p {
    margin: 0 0 0.8rem;
  }

  h1 {
    font-size: 1.5em;

    &::after {
      content: "";
      display: block;
      box-sizing: unset;
      width: 100%;
      height: 0.0625rem;
      background: var(--grey-3);
      padding-right: 1.25rem;
      margin-left: -1.25rem;
      margin-top: 0.3125rem;
    }
  }

  h2 {
    font-size: 1.375em;
  }

  .note {
    border-radius: 0.1875rem;
    margin: 1rem 0;
    position: relative;
    background: var(--note-bg, var(--grey-2));
    color: var(--grey-6);
    border-left: 0.25rem solid var(--note-border, var(--grey-4));
    font-size: .875em;
    padding: 1rem 1rem 1rem 2.5rem;
    --primary-color: var(--note-text);

    p {
      line-height: 1.8;
    }

    ul {
      li::before {
        background: var(--note-text);
      }
    }

    a:not(.btn), details a:not(.btn) {
      color: var(--note-hover);
      border-bottom: 0.0625rem dashed var(--note-text);
    }

    &::before {
      position: absolute;
      left: 0.5rem;
      top: calc(50% - 1.5rem);
      font-family: ic;
      font-weight: 400;
      font-size: 1.5rem;
      color: var(--note-text, var(--grey-6));
    }

    &.info::before {
      content: "\f02b";
    }

    &.warning::before {
      content: "\efb5";
    }

    &.primary::before {
      content: "\f082";
    }
  }

  details p {
    line-height: 1.8;
  }

  li {
    position: relative;
    margin: 0.2rem 0;

    &:before {
      transition: all .2s ease-in-out 0s;
    }
  }

  ul > li::before {
    content: "";
    position: absolute;
    width: 0.4em;
    height: 0.4em;
    background: var(--primary-color);
    border-radius: 50%;
    top: 0.85em;
    left: -1em;
  }

  details a:not(.btn) {
    color: var(--note-hover);
    border-bottom: 0.0625rem dashed var(--note-text);
  }

  .header-anchor {
    border-bottom-style: none;
    color: var(--grey-4);
    float: right;
    margin-left: 0.625rem;

    &::before {
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

    &::after {
      font-size: 50%;
      left: -1.375rem;
      line-height: 3;
    }
  }

  .header-anchor::after, .header-anchor::before {
    color: var(--grey-4);
    position: absolute;
    font-weight: 400;
    transition: all .2s ease-out 0s;
  }

  div[class*='language-'] {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 0.3125rem 0.625rem -0.125rem var(--grey-9-a1);
    background: var(--grey-2);
    color: var(--grey-7);
    line-height: 1.6;
    margin: 1.25rem auto;

    .shiki {
      overflow-x: scroll;
      overflow-y: hidden;
      font-family: Inconsolata,consolas,Menlo,-apple-system,"PingFang SC","Microsoft YaHei";
      font-size: 1em;
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
        top: -18px;
        width: var(--code-ln-wrapper-width);
        text-align: center;
        color: white;
        padding-top: 1.25rem;
        line-height: 1.6;

        br {
          user-select: none;
        }

        .line-number {
          position: relative;
          z-index: 3;
          user-select: none;
          font-size: 1em;
          line-height: 0;
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
}

.info {
  --note-border: #8fa4dc;
  --note-bg: #f1f9ff;
  --note-text: #1d4974;
  --note-hover: #1d5fa0;
}

.warning {
  --note-border: #c9ba9b;
  --note-bg: #fffbeb;
  --note-text: #947600;
  --note-hover: #ccb045;
}

.primary {
  --note-border: #cda0c7;
  --note-bg: #fdf8ff;
  --note-text: #8a51c0;
  --note-hover: #935aca;
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

code, pre {
  font-family: Inconsolata, consolas, Menlo, -apple-system, "PingFang SC", "Microsoft YaHei";
  font-size: 1em;
}
</style>