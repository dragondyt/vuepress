<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps<{
  api: string
}>()
const { t } = useI18n()
interface Comment {
  nick: string | undefined
  objectId: string | undefined
  comment: string | undefined
  mail: string | undefined
  url: string | undefined
  link: string | undefined
}
const comments = ref<Comment[]>([])
onMounted(() => {
  fetch(`${props.api}/comment?type=recent&count=10`)
    .then((response) => response.json())
    .then((data) => (comments.value = data))
    .catch((e) => console.log('fail'))
})
</script>

<template>
  <div v-if="props.api">
    <h2>{{ t('index.recent_comments') }}</h2>
    <ul class="leancloud-recent-comment loaded">
      <li v-for="comment in comments" :key="comment.objectId" class="item">
        <RouterLink :to="comment.url"
          ><span class="breadcrumb">{{ `${comment.nick} @ ` }}</span>
          <span v-html="comment.comment"></span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <template v-else></template>
</template>

<style scoped></style>
