<template>
  <BaseLayout>
    <template #content>
      <div class="index wrap">
        <template v-if="pageData.frontmatter.current===1">
          <template v-if="stickyList.length">
            <h2 class="divider"
                style="color: var(--grey-4);">
              {{ themeData.sticky }}</h2>
            <div class="segments sticky">
              <Segment v-for="post in stickyList" :post="post" :key="post.key"/>
            </div>
          </template>

          <h2 class="divider"
              style="color: var(--grey-4);"> {{ themeData.category }}</h2>
          <div class="cards">
            <template v-if="catList.length">
              <Card v-for="cat in catList" :cat="cat" :key="cat.path"/>
            </template>
          </div>
        </template>
        <template v-if="pageData.frontmatter.posts.length">
          <template v-if="pageData.frontmatter.current===1">
            <h2 class="divider"> {{ themeData.posts }}</h2>
          </template>
          <div class="segments posts">
            <Segment v-for="post in pageData.frontmatter.posts" :post="post" :key="post.path"/>
          </div>
        </template>

      </div>
      <Pagination/>
    </template>
  </BaseLayout>
</template>
<script setup lang="ts">
import stickyList from "@temp/stickyList"
import catList from "@temp/catList"
import BaseLayout from "../components/BaseLayout.vue";
import Pagination from "../components/Pagination.vue";
import Segment from "../components/Segment.vue";
import {useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {SakuraThemeOptions} from "../../shared";
import Card from "../components/Card.vue";
import {usePageData} from "@vuepress/client";

const themeData = useThemeLocaleData<SakuraThemeOptions>();
const pageData = usePageData();
</script>
<style lang="postcss">
.index {
  .divider {

    margin: 1rem 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05rem;
    user-select: none;
    color: var(--grey-4);
    display: table;
    white-space: nowrap;
    height: auto;
    line-height: 1;
    text-align: center;

    &::before {
      background-position: right 1rem top 50%;
    }

    &::after {
      background-position: left 1rem top 50%;
    }

    &::before {
      content: '';
      display: table-cell;
      position: relative;
      top: 50%;
      width: 50%;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
    }

    &::after {
      content: '';
      display: table-cell;
      position: relative;
      top: 50%;
      width: 50%;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
    }
  }

  .segments {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.wrap {
  position: relative;
  padding: 1.25rem;
  animation: slideUpBigIn .5s;

  &:nth-child(1) {
    margin-bottom: 1.25rem;
  }
}

@media (max-width: 991px) {
  .wrap {
    padding: 0.625rem;
  }
}

@media (max-width: 767px) {
  .wrap {
    padding: 0.5rem;
  }
}
</style>
