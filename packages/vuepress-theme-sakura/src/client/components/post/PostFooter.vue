<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
function date(date: any): string {
  return ''
}
function fullDate(date: any): string {
  return ''
}
function time(date: any): string {
  return ''
}
const pageData = usePageData()
</script>

<template>
  <div class="meta">
    <span
      v-if="
        date(pageData.frontmatter.date) !==
          date(pageData.frontmatter.updated) ||
        time(pageData.frontmatter.date) !== time(pageData.frontmatter.updated)
      "
      class="item"
    >
      <span class="icon">
        <i class="ic i-calendar-check"></i>
      </span>
      <span class="text">{{ t('post.edited') }}</span>
      <time
        :title="
          t('post.modified') +
          t('symbol.colon') +
          fullDate(pageData.frontmatter.updated)
        "
        itemprop="dateModified"
        :datetime="pageData.frontmatter.updated.format()"
        >{{ date(pageData.frontmatter.updated) }}</time
      >
    </span>
    <span
      class="item leancloud_visitors"
      data-flag-title="{{ pageData.title }}"
      :title="t('post.views')"
    >
      <span class="icon">
        <i class="ic i-eye"></i>
      </span>
      <span class="text">{{ t('post.views') }}</span>
      <span class="waline-pageview-count" :data-path="pageData.path">0</span>
      <span class="text">{{ t('symbols_count_time.view') }}</span>
    </span>
  </div>
</template>
