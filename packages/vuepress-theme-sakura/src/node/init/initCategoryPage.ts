import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import type Database from 'warehouse'
import { pagination } from '../utils/paginationUtil.js'

export const initCategoryPage = async (
  app: App,
  database: Database
): Promise<void> => {
  //
  let allCategory = database
    .model('Category')
    .find({ parent: { $exists: false } })
    .filter((cat) => cat.length)
    .sort('-date')
  const categories: any[] = []
  allCategory.forEach((c) => {
    categories.push({
      name: c.name,
      path: c.path,
      count: c.length,
      children: database
        .model('Category')
        .find({ parent: c._id })
        .map((s) => {
          return {
            name: s.name,
            path: s.path,
            count: s.length,
            children: database
              .model('Category')
              .find({ parent: s._id })
              .map((t) => {
                return {
                  name: t.name,
                  path: t.path,
                  count: t.length,
                }
              }),
          }
        }),
    })
  })
  app.pages.push(
    await createPage(app, {
      path: '/categories',
      frontmatter: {
        title: '全部分类',
        layout: 'CategoryLayout',
        data: categories,
      },
    })
  )
  allCategory = database.model('Category').filter((cat) => cat.length)
  const perPage = 10
  const paginationDir = 'page'
  const tempPages: any[] = allCategory.reduce((result, category) => {
    if (!category.length) return result
    const posts = category.posts.sort('-date')
    const data = pagination(category.path, posts, {
      perPage,
      layout: ['category', 'archive', 'index'],
      format: paginationDir + '/%d/',
      data: {
        category: category.name,
      },
    })
    return result.concat(data)
  }, [])
  for (const tempPage of tempPages) {
    app.pages.push(
      await createPage(app, {
        path: tempPage.path,
        frontmatter: {
          title: `分类: ${tempPage.data.category}`,
          name: tempPage.data.category,
          layout: 'CategoryDetailLayout',
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
