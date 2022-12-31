import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import striptags from 'striptags'
import { pagination } from '../utils/paginationUtil.js'

export const initHomePages = async (app: App, database: any): Promise<void> => {
  const posts = database
    .model('Post')
    .find({ frontmatter: { sticky: { $exists: false } } })
    .sort('-date')
  const sticky = database
    .model('Post')
    .find({ frontmatter: { sticky: true } })
    .sort('-date')
  let pages
  const basePath = '/'
  const paginationDir = 'page'
  const catlist: any[] = []
  const categories = database
    .model('Category')
    .filter((category) => category.length)
  const getTopCat = function (cat): any {
    if (cat.parent) {
      const pCat = categories.findOne({ _id: cat.parent })
      return getTopCat(pCat)
    } else {
      return {
        _id: cat._id,
        parent: cat.parent,
        path: cat.path,
        name: cat.name,
      }
    }
  }

  if (categories && categories.length) {
    categories.forEach((cat) => {
      const cover = path.join(app.dir.source(), cat.slug + '/cover.jpg')

      if (fs.existsSync(cover)) {
        // covers.push({
        //   path: cat.slug + '/cover.jpg',
        //   data: function () {
        //     return fs.createReadStream(cover)
        //   },
        // })

        const topCat = getTopCat(cat)

        if (topCat._id !== cat._id) {
          cat.top = topCat
        }

        const child = categories.find({ parent: cat._id })
        let pl = 6

        if (child.length !== 0) {
          cat.child = child.length
          cat.subs = child.sort({ name: 1 }).limit(6).toArray()
          pl = Math.max(0, pl - child.length)
          if (pl > 0) {
            // eslint-disable-next-line prefer-spread
            cat.subs.push.apply(
              cat.subs,
              cat.posts
                .sort({ title: 1 })
                .filter(function (item, i) {
                  return item.categories.last()._id === cat._id
                })
                .limit(pl)
                .toArray()
            )
          }
        } else {
          cat.subs = cat.posts.sort({ title: 1 }).limit(6).toArray()
        }

        catlist.push({
          name: cat.name,
          path: cat.path,
          top: cat.top,
          subs: cat.subs.map((p) => {
            return {
              path: p.path,
              name: p.name,
            }
          }),
          link: cat.link,
        })
      }
    })
  }

  if (posts.length > 0) {
    pages = pagination(basePath, posts, {
      perPage: 10,
      layout: ['index', 'archive'],
      format: paginationDir + '/%d/',
    })
  } else {
    pages = [
      {
        basePath,
        layout: ['index', 'archive'],
      },
    ]
  }
  for (const page of pages) {
    app.pages.push(
      await createPage(app, {
        path: page.path,
        frontmatter: {
          title: '首页',
          layout: 'IndexLayout',
          current: page.data.current,
          prev: page.data.prev,
          next: page.data.next,
          total: page.data.total,
          mid_size: 1,
          end_size: 1,
          space: '...',
          base: app.siteData.base,
          posts: page.data.posts?.map((p) => {
            return {
              path: p.path,
              title: p.title,
              date: p.date,
              description: p.frontmatter.description,
              symbolsCount: p.frontmatter.symbolsCount,
              symbolsTime: p.frontmatter.symbolsTime,
              excerpt:
                p.frontmatter.excerpt ||
                striptags(p.contentRendered).substring(0, 300),
              category: {
                path: p.categories.last()?.path,
                name: p.categories.last()?.name,
              },
            }
          }),
          sticky: sticky.map((p) => {
            return {
              path: p.path,
              title: p.title,
              date: p.date,
              description: p.description,
              symbolsCount: p.frontmatter.symbolsCount,
              symbolsTime: p.frontmatter.symbolsTime,
              excerpt:
                p.frontmatter.excerpt ||
                striptags(p.contentRendered).substring(0, 300),
              category: {
                path: p.categories.last()?.path,
                name: p.categories.last()?.name,
              },
            }
          }),
          catlist,
        },
      })
    )
  }
}
