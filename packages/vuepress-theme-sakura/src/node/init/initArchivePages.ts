import type { App } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import * as moment from 'moment'
import type * as warehouse from 'warehouse'

const fmtNum = (num: number): any => {
  return num < 10 ? '0' + num : num
}
export const initArchivePages = async (
  app: App,
  database: warehouse,
  allPosts: any
): Promise<void> => {
  const perPage = 10

  async function generate(path, posts, options?): Promise<void> {
    options = options || {}
    options.archive = true
    const perPageTmp = path === '/archives' ? 0 : perPage
    const total = perPageTmp ? Math.ceil(posts.length / perPageTmp) : 1
    for (let i = 1; i <= total; i++) {
      app.pages.push(
        await createPage(app, {
          path,
          content: '',
          frontmatter: {
            layout: 'ArchiveLayout',
            title: `${
              options.year
                ? options.month
                  ? options.year + ' 年 / ' + options.month + ' 月 - '
                  : options.year + ' 年 - '
                : ''
            }归档`,
            subtitle: `${
              options.year
                ? options.month
                  ? '发表于"' + options.year + '年' + options.month + '月"文章'
                  : '发表于"' + options.year + '"年文章'
                : '归档'
            }`,
            year: options.year,
            month: options.month,
            sitemap: {
              exclude: true,
            },
            pagination: {
              data: posts.slice(perPage * (i - 1), perPage * i).map((s) => {
                return {
                  title: s.title,
                  contentRendered: s.contentRendered,
                  path: s.path,
                  date: s.date,
                }
              }),
              base: path,
              current: i,
              total,
            },
          },
        })
      )
    }
  }

  await generate('/archives', allPosts)
  const posts = {}
  allPosts.forEach((post) => {
    const date = moment(post.frontmatter.date)
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
  const Query = database.model('Post').Query
  const years = Object.keys(posts)
  let year, data, month, monthData, url
  for (let i = 0, len = years.length; i < len; i++) {
    year = +years[i]
    data = posts[year]
    url = '/archives/' + year + '/'
    if (!data[0].length) continue
    await generate(url, new Query(data[0]), { year })
    for (month = 1; month <= 12; month++) {
      monthData = data[month]
      if (!monthData.length) continue
      await generate(url + fmtNum(month) + '/', new Query(monthData), {
        year,
        month,
      })
    }
  }
}
