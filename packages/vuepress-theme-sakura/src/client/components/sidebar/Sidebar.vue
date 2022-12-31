<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBlogStateHook } from '../../store/blog.js'
import MenuComponent from '../menu/index.js'
import Toc from './toc.js'
const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line vue/prop-name-casing
    display_toc?: boolean
  }>(),
  {
    display_toc: false,
  }
)
const { t } = useI18n()
const pageData = usePageData()
const state = useBlogStateHook()
const blogStateHook = useBlogStateHook()
const tabIndex = ref(props.display_toc ? 0 : 2)
function changeIndex(index: number): void {
  tabIndex.value = index
}
</script>

<template>
  <div class="inner">
    <ul v-if="props.display_toc" class="tab">
      <li
        :class="tabIndex === 0 ? 'active' : ''"
        class="contents item"
        @click="changeIndex(0)"
      >
        <span>{{ t('sidebar.toc') }}</span>
      </li>
      <li
        :class="tabIndex === 1 ? 'active' : ''"
        class="related item"
        @click="changeIndex(1)"
      >
        <span>{{ t('sidebar.related') }}</span>
      </li>
      <li
        :class="tabIndex === 2 ? 'active' : ''"
        class="overview item"
        @click="changeIndex(2)"
      >
        <span>{{ t('sidebar.overview') }}</span>
      </li>
    </ul>
    <div class="panels">
      <div class="inner">
        <div
          :class="tabIndex === 0 ? 'active' : ''"
          class="contents panel pjax"
          :data-title="t('sidebar.toc')"
        >
          <Toc v-if="props.display_toc" />
        </div>
        <div
          :class="tabIndex === 1 ? 'active' : ''"
          class="related panel pjax"
          :data-title="t('sidebar.related')"
        >
          <ul v-if="pageData.frontmatter.related">
            <li
              v-for="post in pageData.frontmatter.related"
              :key="post.path"
              :class="pageData.path === post.path ? 'active' : ''"
            >
              <RouterLink ref="bookmark" :to="post.path"
                >{{ post.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div
          :class="tabIndex === 2 ? 'active' : ''"
          class="overview panel"
          :data-title="t('sidebar.overview')"
        >
          <div class="author">
            <img class="image" :src="state.avatar" :alt="state.author" />
            <p class="name" itemprop="name">{{ state.author }}</p>
            <div class="description" itemprop="description">
              {{ state.description }}
            </div>
          </div>

          <nav class="state">
            <div class="item posts">
              <RouterLink to="/archives">
                <span class="count">{{ state.postCount }}</span>
                <span class="name">{{ t('state.posts') }}</span>
              </RouterLink>
            </div>

            <div class="item categories">
              <RouterLink to="/categories">
                <span class="count">{{ state.categoryCount }}</span>
                <span class="name">{{ t('state.categories') }}</span>
              </RouterLink>
            </div>

            <div class="item tags">
              <RouterLink to="/tags">
                <span class="count">{{ state.tagCount }}</span>
                <span class="name">{{ t('state.tags') }}</span>
              </RouterLink>
            </div>
          </nav>

          <div class="social">
            <a
              v-for="s in blogStateHook.social"
              :key="s.path"
              class="item"
              :class="s.name"
              :href="s.url"
              :title="s.name"
              ><i class="ic" :class="`i-${s.name}`"></i
            ></a>
          </div>

          <ul class="menu">
            <MenuComponent :menus="blogStateHook.menus" />
          </ul>
        </div>
      </div>
    </div>

    <ul id="quick">
      <li class="prev pjax"></li>
      <li class="up"><i class="ic i-arrow-up"></i></li>
      <li class="down"><i class="ic i-arrow-down"></i></li>
      <li class="next pjax"></li>
      <li class="percent"></li>
    </ul>
  </div>
</template>

<style scoped></style>
