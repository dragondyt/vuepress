import * as util from 'util'
import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import * as CRC32 from 'crc-32'
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
    .find({ frontmatter: { home: { $exists: false } } })
    .find({ home: { $exists: false } })
    .sort('-date')
    .toArray()
    .map((s) => {
      return {
        title: s.title,
        contentRendered: s.contentRendered,
        path: s.path,
        date: s.date,
        frontmatter: {
          cover:
            s.frontmatter.cover ||
            'https://api.ixiaowai.cn/api/api.php?t=' +
              (CRC32.str(s.title) >>> 0).toString(16),
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
          title: `= ${app.siteData.locales['/'].title} =`,
          stickyList: i === 1 ?? app.pages.filter((_) => _.frontmatter?.sticky),
          posts: posts.slice(perPage * (i - 1), perPage * i),
          sitemap: {
            exclude: i !== 1,
          },
          pagination: {
            base: app.siteData.base,
            current: i,
            total,
          },
        },
      })
    )
  }
}
