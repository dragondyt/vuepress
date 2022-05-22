<template>
  <Layout>
    <template #content>
      <div v-for="post in posts" :key="post.key">
        <RouterLink :to="post.path">{{post.title}}</RouterLink>
      </div>
    </template>
  </Layout>
</template>
<script setup lang="ts">
import Layout from '@theme/SakuraLayout.vue'
import posts from '@temp/postList'
console.log(posts)
</script>

<style scoped>

</style>