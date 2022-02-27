<template>
  <nav class="pagination">
    <div class="inner">
      <RouterLink class="extend prev" rel="prev" :to="`/page/${current-1}/`" v-if="current!==1">
        <i class="ic i-angle-left" aria-label="上一页"/>
      </RouterLink>
      <template v-if="current>=4">
        <RouterLink class="page-number" to="/page/1/" v-if="current>=4">1</RouterLink>
        <span class="space" v-if="current>=4">…</span>
      </template>

      <RouterLink class="page-number" :to="`/page/${i}/`" v-if="current<4" v-for="i in current-1">{{ i }}</RouterLink>
      <RouterLink class="page-number" :to="`/page/${current - 1}/`" v-else>{{ current - 1 }}</RouterLink>

      <span class="page-number current">{{ current }}</span>

      <RouterLink class="page-number" :to="`/page/${current+1}/`" v-if="current<=total -3">{{
          current + 1
        }}
      </RouterLink>
      <RouterLink class="page-number" :to="`/page/${current+1}/`" v-else v-for="i in total-current">{{
          current + i
        }}
      </RouterLink>

      <template v-if="current<=total -3">
        <span class="space">…</span>
        <RouterLink class="page-number" :to="`/page/${total}/`">{{ total }}</RouterLink>
      </template>

      <a class="extend next" rel="next" href="/page/5/"
         v-if="current!==total">
        <i class="ic i-angle-right" aria-label="下一页"/>
      </a>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import {usePageData} from "@vuepress/client";

const pageData = usePageData();
const current = pageData.value.frontmatter.current
const total = pageData.value.frontmatter.total
</script>
<style lang="postcss">
.pagination {
  width: 100%;
  padding: 1.25rem 3.125rem;
  text-align: center;
  display: inline-block;
  color: var(--grey-5);

  .prev {
    display: inline-block;
    padding: 0 0.75rem;
    position: relative;
    border-radius: 0.3125rem;
    margin-left: 0;
    transition: all .2s ease-in-out 0s;
  }
  .pagination .next {
    display: inline-block;
    margin: 0 0.5rem;
    padding: 0 0.75rem;
    position: relative;
    border-radius: 0.3125rem;
    transition: all .2s ease-in-out 0s;
  }

  .space {
    margin: 0;
    padding: 0;
  }


  .inner {
    width: auto;
    border-radius: 0.9375rem;

    .page-number {
      display: inline-block;
      margin: 0 0.5rem;
      padding: 0 0.75rem;
      position: relative;
      border-radius: 0.3125rem;
      transition: all .2s ease-in-out 0s;

      &.current {
        color: var(--grey-0);
        background-image: linear-gradient(to right, var(--color-pink) 0, var(--color-orange) 100%);
        box-shadow: 0 0 0.75rem var(--color-pink-a3);
      }
    }
  }
}

@media (max-width: 767px) {

  .pagination {
    padding: 1.25rem 0.625rem;

    .prev {
      margin: 0 0.3125rem;
    }

    .page-number {
      margin: 0 0.3125rem;
    }
  }
}
</style>