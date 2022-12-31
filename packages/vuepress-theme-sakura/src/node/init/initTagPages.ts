import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import type Database from 'warehouse'
import { pagination } from '../utils/paginationUtil.js'

export const initTagPages = async (
  app: App,
  database: Database
): Promise<void> => {
  const tags = database.model('Tag').filter((tag) => tag.length)
  app.pages.push(
    await createPage(app, {
      path: '/tags',
      content: '',
      frontmatter: {
        layout: 'TagLayout',
        title: '全部标签',
        tags: tags.toArray().map((t) => {
          return {
            name: t.name,
            path: t.path,
            length: t.length,
          }
        }),
      },
    })
  )
  const tempPages = tags.reduce((result, tag) => {
    if (!tag.length) return result

    const posts = tag.posts.sort('-date')
    const data = pagination(tag.path, posts, {
      perPage: 10,
      layout: ['tag', 'archive', 'index'],
      format: 'page/%d/',
      data: {
        tag: tag.name,
      },
    })

    return result.concat(data)
  }, [])

  for (const tempPage of tempPages) {
    app.pages.push(
      await createPage(app, {
        path: tempPage.path,
        frontmatter: {
          title: `标签: ${tempPage.data.tag}`,
          name: tempPage.data.tag,
          layout: 'TagLayoutDetail',
          current: tempPage.data.current,
          prev: tempPage.data.prev,
          next: tempPage.data.next,
          total: tempPage.data.total,
          mid_size: 1,
          end_size: 1,
          space: '...',
          base: tempPage.path,
          posts: tempPage.data.posts.toArray().map((p) => {
            return {
              path: p.path,
              title: p.title,
              date: p.date,
              categories: p.categories.toArray().map((c) => {
                return {
                  path: c.path,
                  name: c.name,
                  slug: c.slug,
                  length: c.length,
                }
              }),
            }
          }),
        },
      })
    )
  }
}
