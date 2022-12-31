<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import BaseLayout from '../../client/layouts/BaseLayout.vue'
import { useBlogStateHook } from '../store/blog.js'
import { Color } from '../utils/color.js'

const siteLocaleData = useSiteLocaleData()
const blogStateHook = useBlogStateHook()
const pageData = usePageData()
const tags: any[] = <{ name: string; path: string; length: number }[]>(
  pageData.value.frontmatter.tags
)
const options = {
  min_font: 16,
  max_font: 22,
  amount: 200,
  color: true,
  order: 1,
  unit: 'px',
  class: '',
  level: 10,
  transform: (tag: string) => {
    return tag
  },
  separator: ' ',
  start_color: '#72cecf',
  end_color: '#ffbac3',
}
const min = options.min_font || 10
const max = options.max_font || 20
const unit = options.unit || 'px'
const color = options.color
const { transform } = options
const result: {
  path: string
  name: string
  style: any
}[] = []
let startColor, endColor

if (color) {
  if (!options.start_color) throw new TypeError('start_color is required!')
  if (!options.end_color) throw new TypeError('end_color is required!')

  startColor = new Color(options.start_color)
  endColor = new Color(options.end_color)
}

const sizes: any[] = []

tags
  .sort((a, b) => a.length - b.length)
  .forEach((tag) => {
    const { length } = tag
    if (sizes.includes(length)) return

    sizes.push(length)
  })
const length = sizes.length - 1
tags.forEach((tag) => {
  const ratio = length ? sizes.indexOf(tag.length) / length : 0
  const size = min + (max - min) * ratio
  let style = `font-size: ${parseFloat(size.toFixed(2))}${unit};`
  if (color) {
    const midColor = startColor.mix(endColor, ratio)
    style += ` color: ${midColor.toString()}`
  }

  result.push({
    path: tag.path,
    name: transform ? transform(tag.name) : tag.name,
    style,
  })
})
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 itemprop="name headline">全部标签</h1>
    </template>
    <template #content>
      <div class="collapse wrap">
        <h2 class="item title">
          <RouterLink :to="siteLocaleData.base">首页</RouterLink>
          <small>/</small> 目前共计 {{ blogStateHook.tagCount }} 个标签
        </h2>
        <div class="tag cloud">
          <RouterLink
            v-for="tag in result"
            :key="tag.path"
            :to="tag.path"
            :style="tag.style"
            >{{ tag.name }}
          </RouterLink>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<style scoped></style>
