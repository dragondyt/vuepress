import blog from '@temp/blog'
import { defineClientConfig } from '@vuepress/client'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import ArchiveLayout from './layouts/ArchiveLayout.vue'
import ArchiveMonthLayout from './layouts/ArchiveMonthLayout.vue'
import ArchiveYearLayout from './layouts/ArchiveYearLayout.vue'
import CategoryDetailLayout from './layouts/CategoryDetailLayout.vue'
import CategoryLayout from './layouts/CategoryLayout.vue'
import IndexLayout from './layouts/IndexLayout.vue'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'
import TagLayout from './layouts/TagLayout.vue'
import TagLayoutDetail from './layouts/TagLayoutDetail.vue'
import './styles/index.scss'
import i18n from './locales/index.js'
import { useBlogStateHook } from './store/blog.js'
import { setupStore, store } from './store/index.js'

export default defineClientConfig({
  enhance: ({ app }) => {
    setupStore(app)
    app.use(i18n)
    if (!__VUEPRESS_SSR__) {
      // 持久化
      store.use(createPersistedState())
    }
    // ssr时使用
    useBlogStateHook().$state = blog
  },
  setup() {
    if (!__VUEPRESS_SSR__) {
      // 持久化
      useBlogStateHook().initSite()
    }
  },
  layouts: {
    Layout,
    NotFound,
    IndexLayout,
    ArchiveLayout,
    ArchiveYearLayout,
    ArchiveMonthLayout,
    CategoryLayout,
    CategoryDetailLayout,
    TagLayout,
    TagLayoutDetail,
  },
})
