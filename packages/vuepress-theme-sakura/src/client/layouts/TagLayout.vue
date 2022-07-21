<script lang="ts" setup>
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import SakuraLayout from '../components/SakuraLayout.vue'
import { Color } from '../utils/color'
const pageData = usePageData()
const siteLocaleData = useSiteLocaleData()
const tags: string[] = <string[]>pageData.value.frontmatter.tags
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
const order = options.order || 1
const unit = options.unit || 'px'
const color = options.color
const className = options.class
const level = options.level || 10
const { transform } = options
const separator = options.separator || ' '
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
    path: `/tags/${tag}`,
    name: transform ? transform(tag) : tag,
    style,
  })
})
</script>

<template>
  <SakuraLayout>
    <template #header>
      <h1 class="text-[1.5em] tracking-[0.125rem]">{{ pageData.title }}</h1>
    </template>
    <template #content>
      <div class="relative mb-6 p-2" style="animation: slideUpBigIn 0.5s">
        <h2 class="relative m-0 py-6 px-[1.875rem]">
          <RouterLink
            :to="siteLocaleData.base"
            style="border-bottom: 0.0625rem dashed var(--grey-4)"
            >首页</RouterLink
          >
          <small class="my-auto mx-[0.3125rem]" style="color: var(--grey-4)"
            >/</small
          >
          {{ `目前共计 ${1} 个标签` }}
        </h2>
        <div class="text-center">
          <RouterLink
            v-for="tag in result"
            :key="tag.path"
            class="m-2.5 inline-block"
            :to="tag.path"
            :style="tag.style"
            >{{ tag.name }}</RouterLink
          >
        </div>
      </div>
    </template>
  </SakuraLayout>
</template>

<style scoped></style>
