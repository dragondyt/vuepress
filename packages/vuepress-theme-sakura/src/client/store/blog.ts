import type { Store } from 'pinia/dist/pinia.mjs'
import { defineStore } from 'pinia/dist/pinia.mjs'
import type { ThemeClientOption } from '../../shared/themeOption.js'
import { store } from './index.js'
interface BlogState extends ThemeClientOption {
  categoryCount: number
  copyright?: string
  postCount: number
  siteNavHeight: number
  social?: []
  symbolsCountTotal: number
  symbolsTimeTotal: number
  tagCount: number
  theme: 'light' | 'dark' | string
  showSearch: boolean
}
interface BlogAction {
  initSite: () => void
}
interface BlogGetter {
  darkMode: () => boolean
}
export const blogState = defineStore<string, BlogState, BlogGetter, BlogAction>(
  'sakura-blog',
  {
    state: (): BlogState => ({
      algoliaSearch: {
        appId: '',
        apiKey: '',
        index: '',
        adminKey: '',
      },
      avatar: './avatar.jpg',
      author: '',
      alternate: '',
      categoryCount: 0,
      comment: {
        waline: {
          serverURL: '',
        },
      },
      footer: {
        icon: {
          name: 'sakura rotate',
        },
      },
      lang: 'en-US',
      postCount: 0,
      showSearch: false,
      siteNavHeight: 0,
      social: [],
      menus: [],
      subtitle: '',
      symbolsCountTotal: 0,
      symbolsTimeTotal: 0,
      tagCount: 0,
      title: '',
      theme: 'light',
    }),
    getters: {
      darkMode: (state) => state.theme === 'dark',
    },
    actions: {
      initSite() {
        // console.log('初始化')
      },
    },
  }
)

export function useBlogStateHook(): Store<
  string,
  BlogState,
  BlogGetter,
  BlogAction
> {
  return blogState(store)
}
