<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { useI18n } from 'vue-i18n'
import { useBlogStateHook } from '../../store/blog.js'

const { t } = useI18n()
const pageData = usePageData()
const blogStateHook = useBlogStateHook()
</script>

<template>
  <div id="copyright">
    <ul>
      <li class="author">
        <strong>{{ t('post.copyright.author') + t('symbol.colon') }} </strong
        >{{ `- ${pageData.frontmatter.author || blogStateHook.author} ` }}
        <i class="ic i-at"><em>@</em></i
        >{{ blogStateHook.title }}
      </li>
      <li class="link">
        <strong>{{ t('post.copyright.link') + t('symbol.colon') }}</strong>
        <RouterLink :to="pageData.path" :title="pageData.title">
          {{ pageData.title }}
        </RouterLink>
      </li>
      <li class="license">
        <strong
          >{{ t('post.copyright.license_title') + t('symbol.colon') }}
        </strong>
        <span
          v-if="pageData.frontmatter.copyright !== true"
          v-html="t('post.copyright.nocopy')"
        />
        <span v-else v-html="t('post.copyright.license_content')" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
