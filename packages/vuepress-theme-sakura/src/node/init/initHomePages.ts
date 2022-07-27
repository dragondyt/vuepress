import { copyFileSync, existsSync } from 'fs'
import * as util from 'util'
import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import * as CRC32 from 'crc-32'
import type * as warehouse from 'warehouse'
import { mkdirsSync } from '../utils/file'
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

  function getCatList(): any[] {
    const catList: any[] = []
    const categories = database
      .model('Category')
      .filter((category) => category.length)

    function getTopCat(cat): any {
      if (cat.parent) {
        const pCat = categories.findOne({ _id: cat.parent })
        return getTopCat(pCat)
      } else {
        return {
          path: `/categories/${cat.slug}`,
          name: cat.name,
          slug: cat.slug,
          top: cat.top,
          child: cat.child,
          length: cat.length,
          subs: cat.subs,
        }
      }
    }

    if (categories && categories.length) {
      categories.forEach((cat) => {
        const cover = app.dir.source(`${cat.slug}/cover.jpg`)
        if (existsSync(cover)) {
          if (!existsSync(app.dir.dest(`${cat.slug}`))) {
            mkdirsSync(app.dir.dest(`${cat.slug}`))
            copyFileSync(cover, app.dir.dest(`${cat.slug}/cover.jpg`))
          }
          const topCat = getTopCat(cat)
          if (topCat._id !== cat._id) {
            cat.top = topCat
          }
          const child = categories.find({ parent: cat._id })
          let pl = 6
          if (child.length !== 0) {
            cat.child = child.length
            cat.subs = child
              .sort({ name: 1 })
              .limit(6)
              .toArray()
              .map((c) => c.toObj)
            pl = Math.max(0, pl - child.length)
            if (pl > 0) {
              cat.subs.push(
                cat.posts
                  .sort({ title: 1 })
                  .filter(function (item, i): boolean {
                    return item.categories.last()._id === cat._id
                  })
                  .limit(pl)
                  .toArray()
                  .map((p) => {
                    return {
                      path: p.path,
                      name: p.title,
                    }
                  })
              )
            }
          } else {
            cat.subs = cat.posts
              .sort({ title: 1 })
              .limit(6)
              .toArray()
              .map((p) => {
                return {
                  path: p.path,
                  name: p.title,
                }
              })
          }
          catList.push({
            path: `/categories/${cat.slug}`,
            name: cat.name,
            slug: cat.slug,
            top: cat.top,
            child: cat.child,
            length: cat.length,
            subs: cat.subs,
            cover: `${cat.slug}/cover.jpg`,
          })
        }
      })
    }
    return catList
  }

  for (let i = 1; i <= total; i++) {
    app.pages.push(
      await createPage(app, {
        path: formatURL(i),
        content: '',
        frontmatter: {
          layout: 'IndexLayout',
          title: `= ${app.siteData.locales['/'].title} =`,
          stickyList: i === 1 ?? app.pages.filter((_) => _.frontmatter?.sticky),
          categories: i === 1 ? getCatList() : [],
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
