<template>

  <div class="post-nav">
    <div class="item left"><a class="lozaded"
                              data-background-image="https://tva1.sinaimg.cn/mw690/6833939bly1giclx6phq6j20zk0m8e36.jpg"
                              data-loaded="true"
                              data-pjax-state=""
                              href="/inter-discipline/health-informatics/specialization-1/course-1/week-1/"
                              style="background-image: url(https://tva1.sinaimg.cn/mw690/6833939bly1giclx6phq6j20zk0m8e36.jpg);"
                              title="Week 1. Overview of Health Informatics"><span
        class="type">上一篇</span> <span class="category"><i class="ic i-flag"></i> Course 1. The Social and Technical Context of Health Informatics</span>
      <h3>Week 1. Overview of Health Informatics</h3></a></div>
    <div class="item right"><a class="lozaded"
                               data-background-image="https://tva1.sinaimg.cn/mw690/6833939bly1gipew8gmvyj20zk0m87wh.jpg"
                               data-loaded="true"
                               data-pjax-state=""
                               href="/computer-science/note/theme-shoka-doc/dependents/"
                               title="Step.1 依赖插件"><span
        class="type">下一篇</span> <span class="category"><i class="ic i-flag"></i> Theme Shoka Documentation</span>
      <h3>Step.1 依赖插件</h3></a></div>
  </div>

</template>

<script lang="ts" setup>

</script>

<style>
.post-nav {
  display: flex;
  margin-bottom: 2.5rem;

  .item {
    width: 50%;

    a {
      display: flex;
      flex-direction: column;
      height: 100%;
      color: var(--header-text-color);
      padding: 1.25rem 2.5rem;
      background-size: cover;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #434343, #000);
        opacity: .5;
        transition: all .2s ease-in-out 0s;
        z-index: -1;
        top: 0;
        left: 0;
      }

      &:hover {
        &::before {
          opacity: .4;
        }
      }
    }

    span {
      font-size: .8125em
    }

    &.left {
      span, h3 {
        align-self: flex-start;
      }
    }

    &.right {
      span, h3 {
        align-self: flex-end;
        text-align: right;
      }
    }

  }

}

@media (max-width: 767px) {
  .post-nav {
    flex-direction: column
  }
}

@media (max-width: 767px) {
  .post-nav .item {
    width: 100%
  }
}

</style>