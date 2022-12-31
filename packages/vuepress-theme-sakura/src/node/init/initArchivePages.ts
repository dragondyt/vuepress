import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import dayjs from 'dayjs'
import type * as warehouse from 'warehouse'
const fmtNum = (num: number): any => {
  return num < 10 ? '0' + num : num
}
export const initArchivePages = async (
  app: App,
  database: warehouse
): Promise<void> => {
  const allPosts = database.model('Post').sort('-date')
  const posts: Record<string, any> = {}
  allPosts.forEach((post) => {
    const date = dayjs(post.frontmatter.date)
    const year = date.year()
    const month = date.month() + 1 // month is started from 0
    if (!Object.prototype.hasOwnProperty.call(posts, year)) {
      // 13 arrays. The first array is for posts in this year
      // and the other arrays is for posts in this month
      posts[year] = [[], [], [], [], [], [], [], [], [], [], [], [], []]
    }
    posts[year][0].push(post)
    posts[year][month].push(post)
  })
  const pageData: any[] = []
  const years = Object.keys(posts)
  for (let i = years.length - 1; i >= 0; i--) {
    const year = years[i]
    // 无数据
    if (!posts[year][0].length) {
      continue
    }
    // 生成年
    const yearData: any[] = []
    for (let month = 12; month >= 1; month--) {
      if (!posts[year][month].length) {
        continue
      }
      yearData.push({
        month: fmtNum(month),
        posts: posts[year][month].map((p) => {
          return {
            path: p.path,
            title: p.title,
            frontmatter: {
              date: p.frontmatter.date,
            },
            categories: p.categories.toArray().map((c) => {
              return {
                path: c.path,
                name: c.name,
              }
            }),
          }
        }),
      })
    }
    app.pages.push(
      await createPage(app, {
        path: `/archives/${year}`,
        frontmatter: {
          layout: 'ArchiveYearLayout',
          title: `${year} - 归档`,
          data: yearData,
          year,
        },
      })
    )
    for (let month = 12; month >= 1; month--) {
      if (!posts[year][month].length) {
        continue
      }
      app.pages.push(
        await createPage(app, {
          path: `/archives/${year}/${fmtNum(month)}`,
          frontmatter: {
            layout: 'ArchiveMonthLayout',
            title: `${year} / ${fmtNum(month)} - 归档`,
            year,
            month: fmtNum(month),
            data: posts[year][month].map((p) => {
              return {
                path: p.path,
                title: p.title,
                frontmatter: {
                  date: p.frontmatter.date,
                },
                categories: p.categories.toArray().map((c) => {
                  return {
                    path: c.path,
                    name: c.name,
                  }
                }),
              }
            }),
          },
        })
      )
      pageData.push({
        year,
        month: fmtNum(month),
        count: posts[year][month].length,
      })
    }
  }
  app.pages.push(
    await createPage(app, {
      path: '/archives',
      frontmatter: {
        layout: 'ArchiveLayout',
        title: '归档',
        data: pageData,
      },
    })
  )
}
