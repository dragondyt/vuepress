import type { App } from '@vuepress/core'
import { getSymbolsCountTotal, symbolsTimeTotal } from '../utils/index.js'

export const initSiteData = async (
  app: App,
  themeConfig,
  database: any
): Promise<void> => {
  const obj = Object.assign(themeConfig, {
    categoryCount: database
      .model('Category')
      .filter((category) => category.length).length,
    postCount: database.model('Post').find({}).length,
    symbolsCountTotal: getSymbolsCountTotal(database),
    symbolsTimeTotal: symbolsTimeTotal(database),
    tagCount: database.model('Tag').filter((tag) => tag.length).length,
  })
  await app.writeTemp('blog.ts', `export default ${JSON.stringify(obj)}`)
}
