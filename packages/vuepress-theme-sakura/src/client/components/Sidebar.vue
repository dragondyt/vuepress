<template>
  <div class="inner">
    <div class="panels" style="height: 760px; padding-top: 0.625rem;">
      <div class="inner">
        <div class="contents panel pjax" data-title="文章目录"></div>
        <div class="related panel pjax" data-title="系列文章"></div>
        <div class="overview panel active" data-title="站点概览">
          <Overview/>
        </div>
      </div>
    </div>
    <ul id="quick">
      <li class="prev pjax"></li>
      <li class="up"><i class="ic i-arrow-up"></i></li>
      <li class="down"><i class="ic i-arrow-down"></i></li>
      <li class="next pjax"><a href="/page/2/" rel="next" title="下一篇" data-pjax-state=""><i
          class="ic i-chevron-right"></i></a>
      </li>
      <li class="percent" style="width: 27%;"></li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import Overview from "./sidebar/overview.vue";
</script>
<style scoped lang="postcss">
#sidebar.affix > .inner {
  @apply fixed;
  @apply top-0;
}

#sidebar {
  .inner {
    position: relative;
    width: 15rem;
    color: var(--grey-6);
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
  }
}

main .inner {
  margin: 0 auto;
  width: 100%;
}

.panels {
  padding: 4.6875rem 0 2rem;
  width: 100%;
  overflow: hidden;

  .inner {
    overflow-x: hidden;
    overflow-y: auto;
    overflow-scrolling: touch;
    width: auto;
    height: 100%;
  }

  .panel {
    display: none;
    padding: 0.875rem 0.9375rem 2rem;

    &.active {
      display: block;
    }
  }

}

#quick {
  display: none;
  align-items: center;
  flex-wrap: wrap;
  width: 15rem;
  margin: 0;
  padding: 0;
  position: fixed;
  bottom: 0.125rem;
}
</style>