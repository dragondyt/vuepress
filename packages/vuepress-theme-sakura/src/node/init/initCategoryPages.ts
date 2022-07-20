import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import type * as warehouse from 'warehouse'
const prepareQuery = (categories, parent?): any => {
  const query: {
    parent?: any
  } = {}

  if (parent) {
    query.parent = parent
  } else {
    query.parent = { $exists: false }
  }

  return categories
    .find(query)
    .sort('name', 1)
    .filter((cat) => cat.length)
}

export const initCategoryPages = async (
  app: App,
  database: warehouse
): Promise<void> => {
  const categories: any = database
    .model('Category')
    .filter((category) => category.length)
  if (!categories || !categories.toArray().length) return

  const hierarchicalList = (level, parent?): any[] => {
    const result: any[] = []
    prepareQuery(categories, parent).forEach((cat) => {
      result.push({
        path: '/categories/' + cat.slug,
        name: cat.name,
        length: cat.length,
        children:
          level + 1 < 3 ? hierarchicalList(level + 1, cat._id) : undefined,
      })
    })
    return result
  }
  app.pages.push(
    await createPage(app, {
      path: '/categories',
      frontmatter: {
        layout: 'CategoryLayout',
        title: '全部分类',
        length: categories.toArray().length,
        sitemap: {
          exclude: true,
        },
        categories: hierarchicalList(0),
      },
    })
  )
  //
  for (const category of categories.toArray()) {
    const total = Math.ceil(category.posts.length / 10)
    for (let i = 1; i <= total; i++) {
      app.pages.push(
        await createPage(app, {
          path: '/categories/' + category.slug + (i !== 1 ? '/page/' + i : ''),
          content: '',
          frontmatter: {
            layout: 'CategoryDetailLayout',
            title: '分类: ' + category.name,
            subtitle: `包含标签"${category.name}"的文章`,
            category: category.name,
            sitemap: {
              exclude: true,
            },
            pagination: {
              data: category.posts.slice(10 * (i - 1), 10 * i).map((s) => {
                return {
                  path: s.path,
                  categories: [],
                  title: s.title,
                }
              }),
              base: `/categories/${category.slug}`,
              current: i,
              total,
            },
          },
        })
      )
    }
  }
}
