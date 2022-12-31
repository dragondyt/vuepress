<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
const props = withDefaults(
  defineProps<{
    full?: boolean
    item: any
  }>(),
  {
    full: false,
  }
)

const { t } = useI18n()
function fullDate(date: string): string {
  return dayjs(date).format()
}
</script>

<template>
  <div class="meta">
    <span
      class="item"
      :title="t('post.created') + t('symbol.colon') + fullDate(item.date)"
    >
      <span class="icon">
        <i class="ic i-calendar"></i>
      </span>
      <span v-if="props.full" class="text">{{ t('post.posted') }}</span>
      <time
        itemprop="dateCreated datePublished"
        :datetime="dayjs(item.date).format()"
        >{{ dayjs(item.date) }}</time
      >
    </span>
    <span class="item" :title="t('symbols_count_time.count')">
      <span class="icon">
        <i class="ic i-pen"></i>
      </span>
      <span v-if="props.full" class="text">{{
        t('symbols_count_time.count')
      }}</span>
      <span>{{ item.symbolsCount }}</span>
      <span class="text">{{ t('symbols_count_time.word') }}</span>
    </span>
    <span class="item" :title="t('symbols_count_time.time')">
      <span class="icon">
        <i class="ic i-clock"></i>
      </span>
      <span v-if="props.full" class="text">{{
        t('symbols_count_time.time')
      }}</span>
      <span
        >{{ item.symbolsTime }} {{ t('symbols_count_time.time_minutes') }}</span
      >
    </span>
  </div>
</template>

<style scoped></style>
