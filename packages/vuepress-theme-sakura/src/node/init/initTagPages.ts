import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import type * as warehouse from 'warehouse'

export const initTagPages = async (
  app: App,
  database: warehouse
): Promise<void> => {
  const tags: any[] = database
    .model('Tag')
    .filter((tag) => tag.length)
    .toArray()
  app.pages.push(
    await createPage(app, {
      path: '/tags',
      content: '',
      frontmatter: {
        layout: 'TagLayout',
        title: '全部标签',
        sitemap: {
          exclude: true,
        },
        tags: tags.map((t) => t.name),
      },
    })
  )
  for (const tag of tags) {
    const total = Math.ceil(tag.posts.length / 10)
    for (let i = 1; i <= total; i++) {
      app.pages.push(
        await createPage(app, {
          path: '/tags/' + tag.name + (i !== 1 ? '/page/' + i : ''),
          content: '',
          frontmatter: {
            layout: 'TagDetailLayout',
            title: '标签: ' + tag.name,
            subtitle: `包含标签"${tag.name}"的文章`,
            tag: tag.name,
            sitemap: {
              exclude: true,
            },
            pagination: {
              data: tag.posts.slice(10 * (i - 1), 10 * i).map((s) => {
                return {
                  path: s.path,
                  categories: [],
                  title: s.title,
                }
              }),
              base: `/tags/${tag.name}`,
              current: i,
              total,
            },
          },
        })
      )
    }
  }
}
