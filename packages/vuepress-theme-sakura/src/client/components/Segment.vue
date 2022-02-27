<template>
  <article class="item show">
    <div class="cover">
      <RouterLink :to="post.path" :title="post.title">
        <img
            class="lozaded" :src="getCover(post)" alt="文章封面">
      </RouterLink>
    </div>
    <div class="info">
      <div class="meta">
            <span class="item" :title="`创建时间：${post.frontmatter.date}`">
                  <span class="icon">
                    <i class="ic i-calendar"></i>
                </span>
                  <time :datetime="post.frontmatter.date"
                  >{{ post.frontmatter.date }}</time>
            </span>
        <span
            class="item" title="本文字数">
          <span class="icon">
            <i class="ic i-pen"></i>
          </span>
          <span>16k</span>
          <span
              class="text">字</span>
        </span>
        <span class="item" title="阅读时长">
          <span class="icon"><i
              class="ic i-clock"></i>
          </span>
          <span>15 分钟</span>
        </span>
      </div>
      <h3>
        <RouterLink :title="post.title" :to="post.path">
          {{ post.title }}
        </RouterLink>
      </h3>

      <div class="excerpt"
           v-html="post.frontmatter.description || post.excerpt"></div>
      <div
          class="meta footer">
                <span class="mr-2">
          <a href="/"><i
              class="ic i-flag"></i>{{ post.title }}</a></span>
      </div>
      <RouterLink :to="post.path" :title="post.title"
                  class="btn">more...
      </RouterLink>
    </div>
  </article>
</template>

<script lang="ts" setup>
import {Page} from "@vuepress/core";
import {getCover} from "../utils/imageUtil";

const {post} = defineProps<{
  post: Page
}>();

</script>
<style lang="postcss">
.segments {
  > .item {
    position: relative;
    color: inherit;
    width: calc(50% - 2rem);
    min-width: calc(50% - 2rem);
    height: 14rem;
    margin: 1rem;
    opacity: 0;

    &:nth-child(even) {
      flex-direction: row-reverse;

      .cover {
        margin-right: auto;
        margin-left: 1.5rem;
        -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
        border-radius: 0 0.625rem 0.625rem 0;
      }

      .info {
        padding: 1rem 0 3rem 1.5rem;

        .meta {
          justify-content: flex-start;
        }
      }

      .btn {
        left: 0;
        right: auto;
        border-radius: 0 1rem;
        background-image: linear-gradient(to right, var(--color-orange) 0, var(--color-pink) 100%);
      }

      .meta.footer {
        right: 0.5rem;
        justify-content: flex-start;
      }
    }

    &.show {
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    > .item {
      width: calc(100% - 1rem) !important;
      min-width: calc(100% - 1rem) !important;
      margin: 1rem 0.5rem !important;

      &:nth-child(even) {
        flex-direction: column;

        .cover {
          width: 100%;
          margin: auto;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
          border-radius: 0.625rem 0.625rem 0 0;
        }

        .info {
          padding: 0 1rem 3rem;
        }
      }
    }
  }

  > .item {
    display: flex;
    width: calc(100% - 2rem);
    min-width: calc(100% - 2rem);
    border-radius: 0.5rem;
    box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
    transition: all .2s ease-in-out 0s;
  }

  @media (max-width: 767px) {
    > .item {
      flex-direction: column;
      height: fit-content;
      max-height: fit-content;
    }
  }

  > .item.show {
    opacity: 1;
    animation: slideUpBigIn .5s;
  }

  .cover {
    width: 50%;
    margin-right: 1.5rem;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
    border-radius: 0.625rem 0 0 0.625rem;
    overflow: hidden;
  }

  @media (max-width: 767px) {
    .cover {
      width: 100%;
      height: 14rem;
      margin: auto;
      clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
      border-radius: 0.625rem 0.625rem 0 0;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: all .2s ease-in-out 0s;
        animation: blur .8s ease-in-out forwards;
      }
    }
  }

  .info {
    position: relative;
    width: 50%;
    padding: 1rem 1.5rem 3rem 0;
    perspective: 62.5rem;

    h3 {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin: 0.625rem 0;
      color: var(--primary-color);
    }

    .meta {
      display: flex;
      justify-content: flex-end;
      margin: 0;

      .item + .item {
        margin-left: 0.625rem;
      }

      @media (max-width: 767px) {
        .item:not(:first-child) {
          display: none;
        }
      }
    }

    .excerpt {
      overflow: hidden;
      font-size: .875em;
      max-height: 5rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 767px) {
    .info {
      width: 100%;
      height: 14rem;
      padding: 0 1rem 3rem;

    }
  }

}

.index.wrap {
  .meta {
    font-size: .8125em;
    color: var(--grey-5);

    &.footer {
      position: absolute;
      bottom: 0.5rem;
      max-width: calc(100% - 7rem);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: flex-start;

      span {
        margin-right: 0.5rem;
      }
    }

    .ic {
      margin-right: 0.0625rem;
    }
  }

  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.3rem 1rem;
    border-radius: 1rem 0;
    color: var(--grey-0);
    background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);

    &::before {
      position: absolute;
      display: block;
      content: '';
      height: calc(100% - 1rem);
      width: calc(100% - 1rem);
      border-radius: 5rem;
      left: 0.5rem;
      top: 0.8rem;
      box-shadow: 0 0 0.6rem 0.6rem var(--color-pink-a3);
      background-color: var(--color-pink-a3);
    }
  }
}

</style>