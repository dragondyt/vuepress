<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  home: boolean
  post: any
}>()

const siteLocaleData = useSiteLocaleData()
const { t } = useI18n()
</script>

<template>
  <div
    class="breadcrumb"
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    <template v-if="props.home">
      <i class="ic i-home"></i>
      <span
        ><RouterLink :to="siteLocaleData.base">{{
          t('menu.home')
        }}</RouterLink></span
      >
      <i class="ic i-angle-right"></i>
    </template>
    <template
      v-for="(category, index) in props.post.categories"
      :key="category.path"
    >
      <template v-if="props.home">
        <span
          itemprop="itemListElement"
          itemscope
          :class="index === props.post.categories.length - 1 ? 'current' : ''"
          itemtype="https://schema.org/ListItem"
          ><RouterLink
            :to="category.path"
            itemprop="item"
            rel="index"
            :title="t('post.in') + category.name"
            ><span itemprop="name">{{ category.name }}</span></RouterLink
          >
          <meta itemprop="position" :content="index"
        /></span>
      </template>

      <RouterLink
        v-else
        :to="category.path"
        :title="t('post.in') + category.name"
        >{{ category.name }}
      </RouterLink>
      <i
        v-if="
          props.post.categories &&
          props.post.categories.length > 1 &&
          index !== props.post.categories.length - 1
        "
        class="ic i-angle-right"
      ></i>
    </template>
  </div>
</template>

<style scoped></style>
