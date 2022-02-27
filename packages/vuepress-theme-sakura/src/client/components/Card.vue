<template>
  <section class="item">
    <div class="cover lozaded"
         :style="`background-image: url(./${cat.slug}/cover.jpg)`">
      <h2 class="title">{{ cat.name }}</h2>
      <span v-if="cat.top?.name">{{ cat.top.name }}</span>
      <template v-else/>
    </div>
    <div class="info">
      <div class="ribbon">
        <a :href="cat.link||cat.path" :title="cat.name || cat.link  || '无标题'">{{
            cat.name || `${cat.link}<i class='ic i-link-alt'/>` || '无标题' }}</a>
      </div>
      <div class="inner">
        <ul class="posts">
          <li v-for="sub in cat.subs">
            <a :href="sub.path" :title="sub.name || sub.title">{{ sub.name || sub.title }}</a>
          </li>
        </ul>
        <div class="meta footer">
          <span v-if="cat.top">
            <a :href="cat.top.path" :title="cat.top.name" data-pjax-state=""><i class="ic i-flag"/>{{
                cat.top.name
              }}</a>
          </span>
          <span>
            <i class="ic i-file"/>{{ (cat.child ? `${cat.child} 个子项，` : '') + (cat.length ? `${cat.length} 篇文章` : '') }}
          </span>
        </div>
        <a :href="cat.path" :title="cat.name" class="btn">more...</a></div>
    </div>
  </section>
</template>
<script lang="ts" setup>

import {Category} from "../../shared";

const {cat} = defineProps<{
  cat: Category
}>();
</script>
<style lang="postcss">

</style>