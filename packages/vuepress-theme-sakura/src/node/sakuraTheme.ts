import { abbrLinkPlugin } from '@dragondyt/vuepress-plugin-abbrlink'
import { algoliasearchPlugin } from '@dragondyt/vuepress-plugin-algoliasearch'
import { feedPlugin } from '@dragondyt/vuepress-plugin-feed'
import { sitemapPlugin } from '@dragondyt/vuepress-plugin-sitemap'
import type { PostService } from '@dragondyt/vuepress-plugin-warehouse'
import {
  getDatabase,
  warehousePlugin,
} from '@dragondyt/vuepress-plugin-warehouse'
import type { Page, Theme } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { fs, getDirname, path } from '@vuepress/utils'
import type { ThemeOption } from '../shared/themeOption.js'
import {
  initArchivePages,
  initHomePages,
  initSiteData,
  initTagPages,
} from './init/index.js'
import { initCategoryPage } from './init/initCategoryPage.js'
import { codePlugin, containerPlugin } from './plugins/index.js'
import {
  assignPostcssConfig,
  symbolsCount,
  symbolsTime,
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export const sakuraTheme = ({
  themePlugins = {},
  ...themeConfig
}: ThemeOption): Theme => {
  return {
    name: '@dragondyt/vuepress-theme-sakura',
    templateBuild: path.resolve(__dirname, '../../templates/build.html'),
    templateDev: path.resolve(__dirname, '../../templates/dev.html'),
    alias: {
      // use alias to make all components replaceable
      ...Object.fromEntries(
        fs
          .readdirSync(path.resolve(__dirname, '../client/components'))
          .filter((file) => file.endsWith('.vue'))
          .map((file) => [
            `@theme/${file}`,
            path.resolve(__dirname, '../client/components', file),
          ])
      ),

      // workaround for https://github.com/vitejs/vite/issues/7621
      '@dragondyt/vuepress-theme-sakura/client': path.resolve(
        __dirname,
        '../client/index.js'
      ),
      '@images/404': path.resolve(__dirname, '../client/assets/images/404.png'),
    },
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    extendsBundlerOptions: (bundlerOptions, app) => {
      assignPostcssConfig(bundlerOptions, app)
    },
    extendsMarkdownOptions: (markdownOptions, app) => {
      markdownOptions.breaks = true
      markdownOptions.html = false
      markdownOptions.xhtmlOut = true
      markdownOptions.linkify = true
      markdownOptions.typographer = true
      markdownOptions.code = false
      markdownOptions.quotes = '“”‘’'
      markdownOptions.headers = {
        level: [1, 2],
      }
    },
    extendsMarkdown: (md) => {
      md.use(containerPlugin, {})
      md.use(codePlugin, {
        prismjs: themePlugins?.prismjs,
      })
    },
    extendsPage: (page: Page<Partial<any>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
      page.frontmatter.symbolsCount = symbolsCount(page)
      page.frontmatter.symbolsTime = symbolsTime(page)
    },
    extendsPageOptions: (options, app) => {
      //
    },
    onInitialized: async (app) => {
      const database = await getDatabase(app)
      const postService = database.model<PostService>('Post')
      const posts = postService.find({}).toArray()
      app.pages = []
      for (const post of posts) {
        if (!post.content || post.content === '') {
          continue
        }
        const tempPage = await createPage(app, {
          path: post.path,
          frontmatter: post.frontmatter,
          content: post.content,
        })
        tempPage.frontmatter.categories = postService
          .findOne({ _id: post._id })
          ?.categories.toArray()
          .map((c) => {
            return {
              path: c.path,
              name: c.name,
            }
          })
        tempPage.frontmatter.tags = post.tags.map((t) => t.name)
        app.pages.push(tempPage)
      }
      // 初始化首页
      await initHomePages(app, database)
      // 初始化归档页面
      await initArchivePages(app, database)
      // 初始化标签页面
      await initTagPages(app, database)
      // 初始化分类页面
      await initCategoryPage(app, database)
      // 初始化全局数据
      await initSiteData(app, themeConfig, database)
    },
    plugins: [
      warehousePlugin(),
      themePlugins.abbrLinkOption
        ? abbrLinkPlugin(themePlugins.abbrLinkOption)
        : [],
      themePlugins.algoliaConfig
        ? algoliasearchPlugin(themePlugins.algoliaConfig)
        : [],
      themePlugins.sitemap ? sitemapPlugin(themePlugins.sitemap) : [],
      themePlugins.feedOption ? feedPlugin(themePlugins.feedOption) : [],
      themePlugins.prismjs ? prismjsPlugin() : [],
      palettePlugin({ preset: 'sass' }),
    ],
  }
}
