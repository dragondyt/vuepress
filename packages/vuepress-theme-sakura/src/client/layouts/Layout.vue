<template>
  <BaseLayout>
    <template #header>
      <h1>
        <template v-if="pageData.path">
          <a :href="pageData.path">{{ pageData.title || pageData.path }}<i class="ic i-link-alt"></i></a>
        </template>
        <template v-else>
          - {{ pageData.title }}
        </template>
      </h1>
      <slot name="postMeta">
        <Meta :post="pageData" full/>
      </slot>
    </template>
    <template #content>
      <div class="first:mb-[1.25rem]">
        <slot name="breadCrumb">
          <BreadCrumb :post="pageData"/>
        </slot>
        <slot name="post">
          <Post/>
        </slot>
      </div>
      <slot name="postNav">
        <Nav/>
      </slot>
      <slot name="comment">
        <Comment/>
      </slot>
    </template>
    <template #sidebar>
      <Sidebar isPost/>
    </template>
  </BaseLayout>
</template>

<script lang="ts" setup>
import BaseLayout from "../components/BaseLayout.vue";
import {usePageData} from "@vuepress/client";
import Meta from "../components/Meta.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import Post from "../components/post/Post.vue";
import Sidebar from "../components/Sidebar.vue";
import Nav from "../components/post/Nav.vue";
import Comment from "../components/Comment.vue";
const pageData = usePageData();
</script>