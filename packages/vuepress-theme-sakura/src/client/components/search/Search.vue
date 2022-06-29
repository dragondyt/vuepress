<script setup lang="ts">
import algoliasearch from 'algoliasearch'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeLocaleData } from '../../composables'

const { algoliaSearch } = useThemeLocaleData().value.themePlugins
interface Result {
  objectID: string
  title: string
  path: string
  categories: string[]
}

const client = algoliasearch(algoliaSearch.appId, algoliaSearch.apiKey)
const index = client.initIndex('Sakura')

const show = ref(false)
const searchText = ref<string>('')
const pageNum = ref(1)
const time = ref(0)
const total = ref(0)
const result = ref<Result[]>([])
let timeout

function debounce(fn, wait) {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}

function showSearch() {
  show.value = true
}

function search() {
  debounce(() => {
    index
      .search<Result>(searchText.value, {
        hitsPerPage: 10,
      })
      .then((r) => {
        time.value = r.processingTimeMS
        total.value = r.nbHits
        result.value = r.hits
      })
  }, 150)
}

const route = useRoute()
watch(
  () => route.path,
  () => (show.value = false)
)
defineExpose({ showSearch })
</script>
<template>
  <div
    v-if="show"
    class="fixed left-0 top-0 z-[999] h-full w-full p-5"
    style="background: var(--nav-bg)"
  >
    <div class="my-0 mx-auto h-full w-[43.75rem] rounded-[0]">
      <div
        class="mb-5 flex items-center rounded-[3rem] py-2 px-6 text-[1.125em]"
        style="
          background: var(--grey-1-a5);
          border: 0.0625rem solid var(--grey-5);
        "
      >
        <span class="py-0 px-2.5 text-[1.125rem]"
          ><i class="ic i-search"></i
        ></span>
        <div class="flex-grow">
          <div>
            <form class="p-2.5">
              <input
                v-model="searchText"
                class="w-full border-0 outline-0"
                style="background: 0 0; outline-offset: -0.125rem"
                type="search"
                placeholder="文章搜索"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                maxlength="512"
                @input="search"
              />
            </form>
          </div>
        </div>
        <span
          class="cursor-pointer py-0 px-2.5 text-[1.125rem]"
          @click="show = false"
          ><i class="ic i-times-circle"></i
        ></span>
      </div>
      <div
        class="px-[1.875rem] pt-[1.875rem] pb-[.3125rem]"
        style="height: calc(100% - 6.25rem)"
      >
        <div class="relative my-0 mx-auto h-full w-full overflow-hidden">
          <div id="search-stats">
            <div class="ais-Stats">
              <span class="ais-Stats-text"
                >{{ time }} ms 内找到 {{ total }} 条结果
                <span class="algolia-powered"></span>
                <hr />
              </span>
            </div>
          </div>
          <div id="search-hits">
            <div>
              <div class="ais-Hits">
                <ol class="ais-Hits-list">
                  <li
                    v-for="r in result"
                    :key="r.objectID"
                    class="ais-Hits-item item"
                  >
                    <RouterLink :to="r.path">
                      <span>
                        <template v-for="(c, index) in r.categories" :key="c">
                          {{ c }}
                          <i
                            v-if="index !== r.categories.length - 1"
                            class="ic i-angle-right"
                          ></i>
                        </template>
                      </span>
                      {{ r.title }}
                    </RouterLink>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div id="search-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>
