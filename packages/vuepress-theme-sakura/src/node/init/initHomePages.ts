import * as util from 'util'
import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import type * as warehouse from 'warehouse'
export const initHomePages = async (
  app: App,
  database: warehouse
): Promise<void> => {
  const urlCache = {}
  function formatURL(i): string {
    if (urlCache[i]) return urlCache[i]

    let url = app.siteData.base
    if (i > 1) url += util.format('page/%d/', i)
    urlCache[i] = url

    return url
  }
  const posts = database
    .model('Post')
    .find({ sticky: { $exists: false } })
    .sort('-date')
    .toArray()
    .slice(0, 10)
    .map((s) => {
      return {
        title: s.title,
        contentRendered: s.contentRendered,
        path: s.path,
        date: s.date,
        frontmatter: {
          cover:
            s.frontmatter.cover ||
            'https://tva3.sinaimg.cn/mw690/6833939bly1giciusoyjnj219g0u0x56.jpg',
        },
      }
    })
  const length = posts.length
  const perPage = 10
  const total = perPage ? Math.ceil(length / perPage) : 1

  for (let i = 1; i <= total; i++) {
    app.pages.push(
      await createPage(app, {
        path: formatURL(i),
        content: '',
        frontmatter: {
          layout: 'IndexLayout',
          title: `= ${app.siteData.title} =`,
          stickyList: app.pages.filter((_) => _.frontmatter?.sticky),
          posts: posts.slice(perPage * (i - 1), perPage * i),
          prev: i > 1 ? i - 1 : 0,
          prevNext: i > 1 ? formatURL(i) : '',
          next: i < total ? i + 1 : 0,
          next_link: i < total ? formatURL(i) : '',
          current: i,
          total,
          sitemap: {
            exclude: i !== 1,
          },
        },
      })
    )
  }
}
