import type { AbbrLinkPluginOptions } from '@dragondyt/vuepress-plugin-abbrlink'

export interface ThemeOption extends ThemeClientOption {
  category_map: Record<any, string>
  themePlugins: {
    abbrLink?: AbbrLinkPluginOptions
    prismjs?: boolean
  }
}
export interface MenuItem {
  name: string
  path: string
  children?: Array<MenuItem>
}
export interface ThemeClientOption {
  algoliaSearch?: {
    appId: string
    apiKey: string
    adminKey: string
    index: string
  }
  avatar: string
  alternate: string
  author: string
  comment?: {
    waline?: {
      serverURL: string
    }
  }
  description?: string
  footer: {
    since?: number
    icon: {
      name: string
    }
  }
  lang?: string
  menus?: Array<MenuItem>
  subtitle?: string
  timezone?: string
  title: string
  widgets?: {
    random_posts: boolean
    recent_comments: boolean
  }
}
