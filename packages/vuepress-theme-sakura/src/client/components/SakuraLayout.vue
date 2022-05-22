<template>
  <header class="my-0 mx-auto relative w-full h-[50vh]">
    <div class="inner">
      <div id="brand">
        <div class="pjax">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" class="logo" rel="start">
              <p class="artboard" v-if="siteLocaleData.alternate" v-text="siteLocaleData.alternate"/>
              <h1 itemprop="name headline" class="title" v-if="siteLocaleData.title" v-text="siteLocaleData.title"/>
            </RouterLink>
            <p class="meta" itemprop="description" v-if="siteLocaleData.description">= {{
                siteLocaleData.description
              }} =</p>
          </slot>
        </div>
      </div>
      <slot name="header"/>
      <!--        {{ partial('_partials/header.njk', {}, {cache: true}) }}-->
    </div>
    <div id="imgs" class="pjax">
      {%- set covers = _cover(page, 6) %}
      {%- if covers.length == 6 %}
      <ul>
        {%- for image in covers %}
        <li class="item" data-background-image="{{ image }}"></li>
        {%- endfor %}
      </ul>
      {%- else %}
      <img src="{{ covers }}">
      {%- endif %}
    </div>
  </header>
  <main class="block">
      <slot name="content"/>
  </main>
  <footer class="text-[0.875rem]">

  </footer>
</template>

<script lang="ts" setup>
import {useSiteLocaleData} from "@vuepress/client";
import {SiteData} from "@vuepress/shared";
const siteLocaleData: SiteData = useSiteLocaleData();
</script>

<style scoped>

</style>