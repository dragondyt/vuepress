/* eslint-disable @typescript-eslint/dot-notation */
import type { App } from '@vuepress/core'
import { fs, path, withSpinner } from '@vuepress/utils'
import Database from 'warehouse'
import DatabaseInstance from './database.js'
import { registerModel } from './registerModel.js'
export const inited = (app: App): boolean => {
  return app['warehouse']
}
export const initWarehouse = async (app: App): Promise<any> => {
  return await withSpinner('warehouse')(async () => {
    if (!fs.existsSync(app.dir.temp())) {
      fs.mkdirSync(app.dir.temp(), { recursive: true })
    }
    const filePath = path.join(app.dir.temp(), 'db.json')
    const database = new Database({
      version: 1,
      path: filePath,
    })
    registerModel({
      database,
      config: {
        category_map: app.siteData.locales.category_map || {},
        filename_case: false,
        category_dir: '/categories',
        tag_dir: '/tags',
      },
    })
    const postService = database.model('Post')
    // 处理页面
    const pages = app.pages.filter(
      (page) => page.path !== '/' && page.path !== '/404.html'
    )
    for (const page of pages) {
      let categories = page.frontmatter.categories || []
      let tags = page.frontmatter.tags || []
      if (!Array.isArray(categories)) {
        categories = [categories]
      }
      if (!Array.isArray(tags)) {
        tags = [tags]
      }

      const post = await postService.insert(page)

      await Promise.all([
        post.setCategories(categories),
        post.setTags(tags),
        (page.frontmatter.id = post._id),
      ])
    }
    await database.save()
    app['warehouse'] = true
    return Promise.resolve(database)
  })
}
export const getDatabase = async (app: App): Promise<DatabaseInstance> => {
  let database
  if (!inited(app)) {
    database = await initWarehouse(app)
  } else {
    const filePath = path.join(app.dir.temp(), 'db.json')
    database = new Database({
      version: 1,
      path: filePath,
    })
    registerModel({
      database,
      config: {
        category_map: app.siteData.locales.category_map || {},
        filename_case: false,
        category_dir: '/categories',
        tag_dir: '/tags',
      },
    })
    await database.load()
  }

  return Promise.resolve(new DatabaseInstance(database))
}
