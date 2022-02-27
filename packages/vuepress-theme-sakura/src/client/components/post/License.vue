<template>
  <div id="copyright">
    <ul>
      <li class="author"><strong>本文作者： </strong>Ruri Shimotsuki <i class="ic i-at"><em>@</em></i>優萌初華</li>
      <li class="link"><strong>本文链接：</strong> <a :href="pageData.path" :title="pageData.title">{{pageData.path}}</a>
      </li>
      <li class="license"><strong>版权声明： </strong>本站所有文章除特别声明外，均采用 <a
          class="exturl" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
          rel="noopener external nofollow noreferrer" target="_blank" title="(CC)BY-NC-SA"><i
          class="ic i-creative-commons"><em>(CC)</em></i>BY-NC-SA</a>
        许可协议。转载请注明出处！
      </li>
    </ul>
  </div>

</template>

<script lang="ts" setup>
import {usePageData} from "@vuepress/client";

const pageData = usePageData();
</script>

<style>
#copyright {
  background: var(--grey-2);
  padding: 1rem 2rem;
  position: relative;
  font-size: .75em;
  border-radius: .625rem;
  color: var(--grey-6);

  li {
    &::before {
      font-family: ic;
      font-weight: 400;
      color: var(--grey-5);
      margin-right: .3125rem;
      font-size: 1.1rem;
      line-height: .75rem;
      vertical-align: -.0667rem;
    }
  }
}

</style>