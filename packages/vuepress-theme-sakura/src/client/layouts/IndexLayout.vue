<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Pagination from '../components/paginator/Pagination.vue'
import Segment from '../components/post/Segment.vue'
import $ from '../utils/dom.js'
import BaseLayout from './BaseLayout.vue'

const { t } = useI18n()

function cardActive(): void {
  if (!$('.index.wrap')) return
  if (!window.IntersectionObserver) {
    $.each(
      '.index.wrap article.item, .index.wrap section.item',
      function (article) {
        if (!article.hasClass('show')) {
          article.addClass('show')
        }
      }
    )
  } else {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (article: any) {
          if (article.target.hasClass('show')) {
            io.unobserve(article.target)
          } else {
            if (article.isIntersecting || article.intersectionRatio > 0) {
              article.target.addClass('show')
              io.unobserve(article.target)
            }
          }
        })
      },
      {
        root: null,
        threshold: [0.3],
      }
    )

    $.each(
      '.index.wrap article.item, .index.wrap section.item',
      function (article) {
        io.observe(article)
      }
    )

    $('.index.wrap .item:first-child').addClass('show')
  }
}

function cardActiveStart(): void {
  document.querySelectorAll('.cards .item').forEach(function (value) {
    value.classList.remove('active')
    value.classList.add('active')
  })
}

function cardActiveEnd(): void {
  document.querySelectorAll('.cards .item').forEach(function (value) {
    value.classList.remove('active')
  })
}

onMounted(() => {
  cardActive()
})
const router = useRouter()
watch(
  () => router.currentRoute.value.path,
  () => {
    if (!__VUEPRESS_SSR__) {
      cardActive()
    }
  },
  { immediate: true, deep: true }
)
const pageData = usePageData()
</script>
<template>
  <BaseLayout>
    <template #content>
      <div class="index wrap">
        <template v-if="pageData.frontmatter.current === 1">
          <h2 class="divider">{{ t('index.sticky') }}</h2>
          <div class="segments sticky">
            <Segment ref="lazyComp" :posts="pageData.frontmatter.sticky" />
          </div>
          <template
            v-if="
              pageData.frontmatter.catlist &&
              pageData.frontmatter.catlist.length > 0
            "
          >
            <h2 class="divider">{{ t('index.category') }}</h2>
            <div class="cards">
              <section
                v-for="cat in pageData.frontmatter.catlist"
                :key="cat.path"
                class="item"
                @mouseenter="cardActiveStart"
                @touchstart="cardActiveStart"
                @mouseleave="cardActiveEnd"
              >
                <div
                  class="cover"
                  style="
                    background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.moyublog.com%2Fd%2Ffile%2F2020-11-28%2F11a56a31a189ea64a33b7da640a15efc.jpg&refer=http%3A%2F%2Ffile.moyublog.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669304625&t=41aa19cfc7ea790ecda529f5462d8ab5');
                  "
                >
                  <h2 class="title">{{ cat.name }}</h2>
                  <span v-if="cat.top && cat.top.name">
                    {{ cat.top.name }}
                  </span>
                </div>
                <div class="info">
                  <div class="ribbon">
                    {{ cat.name || '未命名' }}
                    <i v-if="cat.link" class="ic i-link-alt"></i>
                  </div>
                  <div class="inner">
                    <ul class="posts">
                      <li v-for="sub in cat.subs" :key="sub.path">
                        <RouterLink title="subname" :to="sub.path">
                          {{ sub.name || sub.title }}
                        </RouterLink>
                      </li>
                    </ul>
                    <div class="meta footer">
                      <span v-if="cat.top">
                        <RouterLink :to="cat.top.path">
                          <i class="ic i-flag"></i> {{ cat.top.name }}
                        </RouterLink>
                      </span>
                      <span>
                        <i class="ic i-file"></i>{{ cat.subs.length }}
                      </span>
                    </div>
                    <RouterLink :to="cat.path" class="btn">more...</RouterLink>
                  </div>
                </div>
              </section>
            </div>
          </template>
        </template>
        <h2 v-if="pageData.frontmatter.current === 1" class="divider">
          {{ t('index.posts') }}
        </h2>
        <div class="segments posts">
          <Segment ref="lazyComp" :posts="pageData.frontmatter.posts" />
        </div>
      </div>
      <Pagination :data="pageData.frontmatter" />
    </template>
  </BaseLayout>
</template>
