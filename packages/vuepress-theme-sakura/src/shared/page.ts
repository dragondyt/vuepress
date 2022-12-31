import type { Page, PageData } from '@vuepress/core'

export interface DefaultThemePageData extends PageData {
  posts: Array<Page>
  stickyPosts: Array<Page>
}

export interface DefaultThemeIndexPageData extends PageData {
  frontmatter: {
    posts: Array<Page>
    catList: Array<Page>
    stickyPosts: Array<Page>
    pagination: {
      base: string
      current: number
      total: number
    }
  }
}
