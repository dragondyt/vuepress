<script lang="ts" setup>
import algoliasearch from 'algoliasearch'
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useBlogStateHook } from '../../store/blog.js'
import { transition } from '../../utils/index.js'
interface Result {
  objectID: string
  title: string
  path: string
  categories: string[]
}

const siteSearch = ref()

function onPopupClose(): void {
  document.body.style.overflow = ''
  transition(siteSearch.value, 0) // "transition.shrinkOut"
}

const blogStateHook = useBlogStateHook()
const { algoliaSearch } = blogStateHook
const client = algoliasearch(algoliaSearch.appId, algoliaSearch.apiKey)
const index = client.initIndex(algoliaSearch.index)
const searchText = ref<string>('')
const searchInputRef: Ref<HTMLInputElement> = ref<any>()
const page = ref(1)
const time = ref(0)
const total = ref(0)
const nbPages = ref(0)
const result = ref<Result[]>([])
let timeout

function debounce(fn: () => any, wait): void {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}

function doSearch(): void {
  debounce(() => {
    index
      .search<Result>(searchText.value, {
        hitsPerPage: 10,
      })
      .then((r) => {
        time.value = r.processingTimeMS
        total.value = r.nbHits
        nbPages.value = r.nbPages
        page.value = r.page
        result.value = r.hits
      })
  }, 50)
}
function esc(event): void {
  if (event.key === 'Escape') {
    onPopupClose()
  }
}
const onClose = (event: Event): void => {
  if (event.target === siteSearch.value) {
    onPopupClose()
  }
}
onMounted(() => {
  blogStateHook.$subscribe((args, state) => {
    if (state.showSearch) {
      state.showSearch = false
      document.body.style.overflow = 'hidden'
      transition(siteSearch.value, 'shrinkIn', function () {
        // $(".search-input").focus();
        searchInputRef.value.focus()
      }) // transition.shrinkIn
    }
  })
  window.addEventListener('keyup', esc)
})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', esc)
})
</script>

<template>
  <div id="search" ref="siteSearch" @click="onClose">
    <div class="inner">
      <div class="header">
        <span class="icon"><i class="ic i-search"></i></span>
        <div class="search-input-container">
          <div class="ais-SearchBox">
            <form
              action=""
              role="search"
              class="ais-SearchBox-form"
              novalidate=""
              @submit.prevent
            >
              <input
                ref="searchInputRef"
                v-model="searchText"
                class="ais-SearchBox-input search-input"
                type="search"
                placeholder="文章搜索"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                maxlength="512"
                @input="doSearch"
                @keyup.enter="doSearch"
              />
              <button
                class="ais-SearchBox-submit"
                type="submit"
                title="Submit the search query."
                hidden=""
              >
                <svg
                  class="ais-SearchBox-submitIcon"
                  width="10"
                  height="10"
                  viewBox="0 0 40 40"
                >
                  <path
                    d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
                  ></path>
                </svg>
              </button>
              <button
                class="ais-SearchBox-reset"
                type="reset"
                title="Clear the search query."
                hidden=""
              >
                <svg
                  class="ais-SearchBox-resetIcon"
                  viewBox="0 0 20 20"
                  width="10"
                  height="10"
                >
                  <path
                    d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <span class="close-btn" @click="onPopupClose"
          ><i class="ic i-times-circle"></i
        ></span>
      </div>
      <div class="results">
        <div class="inner">
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
                    v-for="res in result"
                    :key="res.objectID"
                    class="ais-Hits-item item"
                  >
                    <RouterLink :to="res.path"
                      ><span>
                        <template v-for="(c, i) in res.categories" :key="c">
                          {{ c }}
                          <i
                            v-if="i !== res.categories.length - 1"
                            class="ic i-angle-right"
                          ></i>
                        </template> </span
                      >{{ res.title }}</RouterLink
                    >
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div v-show="nbPages !== 0" id="search-pagination">
            <div class="ais-Pagination pagination">
              <ul class="ais-Pagination-list">
                <li
                  class="ais-Pagination-item pagination-item ais-Pagination-item--previousPage ais-Pagination-item--disabled disabled-item"
                >
                  <span class="ais-Pagination-link page-number"
                    ><i class="ic i-angle-left"></i
                  ></span>
                </li>
                <template v-for="i in nbPages" :key="i">
                  <li
                    class="ais-Pagination-item pagination-item ais-Pagination-item--page"
                    :class="page + 1 === i ? 'current' : ''"
                  >
                    <a
                      class="ais-Pagination-link page-number"
                      :aria-label="i"
                      href="#"
                      >{{ i }}</a
                    >
                  </li></template
                >
                <li
                  class="ais-Pagination-item pagination-item ais-Pagination-item--nextPage"
                >
                  <a
                    class="ais-Pagination-link page-number"
                    aria-label="Next"
                    href="#"
                    ><i class="ic i-angle-right"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
