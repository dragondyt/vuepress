<script lang="ts" setup>
import PostMeta from '../post/PostMeta.vue'

const props = defineProps<{
  posts: Array<any>
}>()
</script>

<template>
  <article v-for="post in props.posts" :key="post.path" class="item">
    <div class="cover">
      <RouterLink :to="post.path">
        <img
          src="https://img0.baidu.com/it/u=3715403936,1769851969&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
          alt=""
        />
      </RouterLink>
    </div>
    <div class="info">
      <PostMeta :item="post" />
      <h3>
        <RouterLink :to="post.path">{{ post.title }}</RouterLink>
      </h3>
      <div class="excerpt">
        {{ post.description || post.excerpt }}
      </div>
      <div class="meta footer">
        <span>
          <RouterLink
            v-if="post.category && post.category.path"
            :to="post.category.path"
          >
            <i class="ic i-flag"></i> {{ post.category.name }}
          </RouterLink></span
        >
      </div>
      <RouterLink :to="post.path" class="btn">more...</RouterLink>
    </div>
  </article>
</template>

<style scoped></style>
