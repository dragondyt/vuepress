<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import { useI18n } from 'vue-i18n'

const pageData = usePageData()
const { t } = useI18n()
</script>

<template>
  <div v-if="pageData.frontmatter.reward" class="reward">
    <button><i class="ic i-heartbeat"></i> {{ t('reward.donate') }}</button>
    <p>{{ t('reward.text') }}</p>
    <div id="qr">
      <div>
        <img
          data-src="url_for(theme.statics + theme.images + image)"
          alt=" author translation"
        />
        <p>translation</p>
      </div>
    </div>
  </div>
</template>
