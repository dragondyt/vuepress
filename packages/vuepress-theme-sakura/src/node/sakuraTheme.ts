import type { Page, Theme } from '@vuepress/core'
import { createPage, resolvePageContent } from '@vuepress/core'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { fs, path } from '@vuepress/utils'
import algoliasearch from 'algoliasearch'
import * as CRC32 from 'crc-32'
import * as matter from 'gray-matter'
import * as moment from 'moment'
import { getHighlighter } from 'shiki'
import * as striptags from 'striptags'
import type {
  SakuraThemeLocaleOptions,
  SakuraThemePageData,
  SakuraThemePluginsOptions,
} from '../shared'
import {
  initArchivePages,
  initCategoryPages,
  initHomePages,
  initTagPages,
} from './init'
import {
  markdownItExcerpt,
  markdownItKatex,
  markdownItPrism,
  markdownItSpoiler,
} from './plugins'
import { sitemap } from './sitemap'
import { assignDefaultLocaleOptions, assignPostcssConfig } from './utils'
// @ts-ignore
const { check, add } = require('./abbr/check')
export interface SakuraThemeOptions extends SakuraThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: SakuraThemePluginsOptions
}

export const sakuraTheme = ({
  ...localeOptions
}: SakuraThemeOptions = {}): Theme => {
  assignDefaultLocaleOptions(localeOptions)
  const { themePlugins } = localeOptions
  return {
    name: '@vuepress/theme-default',

    layouts: path.resolve(__dirname, '../client/layouts'),

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias: {
      '@images/404': '../assets/images/404.png',
      '@images/upyun_logo2': '../assets/images/upyun_logo2.png',
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
      markdownOptions.extractHeaders = {
        level: [1, 2],
      }
    },

    extendsMarkdown: async (md) => {
      const highlighter = await getHighlighter({
        theme: 'material-lighter',
        langs: ['java', 'bash', 'sql', 'groovy', 'xml', 'yaml'],
      })
      md.options.highlight = (code, lang) =>
        highlighter.codeToHtml(code, { lang })
      markdownItExcerpt(md)
      markdownItSpoiler(md, {
        title: '你知道得太多了',
      })
      markdownItPrism(md)
      markdownItKatex(md)
      md.use(require('./plugins/markdown-it-furigana'), {
        fallbackParens: '()',
      })
        .use(require('./plugins/markdown-it-container'))
        // .use(require('./mermaid'))
        .use(require('markdown-it-pangu'))
        .use(require('markdown-it-task-checkbox'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-multimd-table'), {
          multiline: true,
          rowspan: true,
          headerless: true,
        })
        .use((md, option) => {
          md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
            return '<div class="table-container"><table>'
          }
          md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
            return '</table></div>'
          }
        })
        .use(require('markdown-it-mark'))
        .use(require('markdown-it-ins'))
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-emoji'))
        .use(require('markdown-it-deflist'))
        .use(require('markdown-it-attrs'), {
          // optional, these are default options
          leftDelimiter: '{',
          rightDelimiter: '}',
          // empty array = all attributes are allowed
          allowedAttributes: [],
        })
        .use(require('markdown-it-bracketed-spans'))
        .use(require('markdown-it-abbr'))
    },

    extendsPage: (page: Page<Partial<SakuraThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },
    extendsPageOptions: (page, app) => {
      if (page != null && page.filePath != null) {
        // 读取文件
        const contentRaw = fs
          .readFileSync(page.filePath, 'utf8')
          .toString() as string
        const { content, frontmatterRaw } = resolvePageContent({
          contentRaw,
        })
        if (frontmatterRaw.title != null && frontmatterRaw.title != '') {
          if (
            frontmatterRaw.permalink != null &&
            frontmatterRaw.permalink != ''
          ) {
          } else {
            add(frontmatterRaw.permalink)
          }
          // //生成链接
          let permalink = check(CRC32.str(frontmatterRaw.title) >>> 0).toString(
            16
          )
          // //记录生成的链接
          add(permalink)
          // 处理目录
          permalink = page.filePath
            .replace(app.dir.source(), '')
            .replace(/[\w-]+\.(.*)?/g, `${permalink}.html`)
            .replace(/.(md|MD)$/g, '')
            .replace(frontmatterRaw.title, `${permalink}.html`)
            .replace('//', '/')
          // 设置文章永久链接
          frontmatterRaw.permalink = permalink
          // 设置时间
          frontmatterRaw.date = moment(frontmatterRaw.date)
            .format('YYYY-MM-DD HH:mm:ss')
            .toString()
          // 写入
          fs.writeFileSync(
            page.filePath,
            matter.stringify(content, frontmatterRaw)
          )
        }
      }
    },
    onInitialized: async (app) => {
      // 处理页面
      const pages = app.pages.filter(
        (page) => page.path != '/' && page.path != '/404.html'
      )
      const registerModels = require('./register_models')

      const Database = require('warehouse')
      // 创建数据库
      const database = new Database({
        version: 1,
        path: path.join(app.dir.temp(), 'db.json'),
      })
      // 注册模型
      registerModels({
        database,
        category_map: {
          '计算机科学': 'computer-science',
          'Java': 'java',
          '二进制杂谈': 'note',
          '零基础学Java语言-浙江大学-翁恺': 'course-1',
          'Theme Shoka Documentation': 'theme-shoka-doc',
        },
        tag_map: {},
      })

      for (const page of pages) {
        let categories
        let tags
        // @ts-ignore
        page.published = true
        categories = page.frontmatter.categories || []
        delete page.frontmatter.categories

        tags = page.frontmatter.tags || []
        delete page.frontmatter.tags

        if (!Array.isArray(categories)) {
          categories = [categories]
        }
        if (!Array.isArray(tags)) {
          tags = [tags]
        }
        const post = await database.model('Post').insert(page)

        await Promise.all([
          post.setCategories(categories),
          post.setTags(tags),
          (page.frontmatter.id = post._id),
        ])
      }
      await app.writeTemp(
        'randomPosts.ts',
        `export default ${JSON.stringify(
          database
            .model('Post')
            .shuffle()
            .limit(10)
            .toArray()
            .map((s) => {
              return {
                title: s.title,
                contentRendered: s.contentRendered,
                path: s.path,
                date: s.date,
                categories: s.categories
                  .toArray()
                  .slice(0, 10)
                  .map((c) => {
                    return {
                      name: c.name,
                      path: c.slug,
                    }
                  }),
              }
            })
        )}`
      )
      // 初始化首页以及分页
      const posts = database
        .model('Post')
        .find({ sticky: { $exists: false } })
        .sort('-date')

      await initHomePages(app, database)
      // 归档页面
      await initArchivePages(app, database, posts)
      // 标签页面
      await initTagPages(app, database)
      // 分类页面
      await initCategoryPages(app, database)
      if (themePlugins?.algoliaSearch && themePlugins.algoliaSearch.adminKey) {
        // 搜索
        let posts = database
          .model('Post')
          .find({
            published: true,
          })
          .sort('date', 'asc')
          .toArray()

        const pick = (object, attributes) => {
          const newObject = {
            objectID: '',
          }
          attributes.forEach((attribute) => {
            if (object.hasOwnProperty(attribute)) {
              newObject[attribute] = object[attribute]
            }
          })
          return newObject
        }
        const upperFirst = (string: string) => {
          return string.charAt(0).toUpperCase() + string.slice(1)
        }

        const FILTER_FUNCTIONS = {
          strip: striptags.striptags,
          truncate: function truncate(post, start, end) {
            return post.substr(start, end)
          },
        }
        const preparePosts = (posts, fields, fieldsWithFilters: string[]) => {
          const tagsAndCategoriesFields = ['tags', 'categories'].filter(
            (field) => fields.includes(field)
          )
          return posts.map((initialPost) => {
            const postToIndex = pick(initialPost, fields) // define a unique ID to identfy this post on Algolia

            postToIndex.objectID = initialPost._id // extract tags and categories

            tagsAndCategoriesFields.forEach((field) => {
              postToIndex[field] = []
              initialPost[field].data.forEach(function (fieldElement) {
                postToIndex[field].push(fieldElement.name)
              })
            }) // execute filters of fields

            fieldsWithFilters.forEach((field) => {
              const indexedFieldName: string[] = []
              const fieldFilters = field.split(':')
              const fieldName = <string>fieldFilters.shift()

              if (!initialPost.hasOwnProperty(fieldName)) {
                console.log(
                  `"${initialPost.title}" post has no "${fieldName}" field.`
                )
                return
              }

              let fieldValue = initialPost[fieldName]
              fieldFilters.forEach(function (filter) {
                const filterArgs = filter.split(',')
                const filterName = <string>filterArgs.shift()
                indexedFieldName.push(upperFirst(filterName))
                filterArgs.unshift(fieldValue) // execute filter on field value

                fieldValue = FILTER_FUNCTIONS[filterName].apply(
                  // @ts-ignore
                  this,
                  filterArgs
                )
              }) // store filter result in post object

              postToIndex[fieldName + indexedFieldName.join('')] = fieldValue
            })
            return postToIndex
          })
        }
        if (!posts.length) {
          console.log('There is no post to index.')
        } else {
        }
        const getBasicFields = (fields) =>
          fields.filter((field) => !/:/.test(field))
        const getFieldsWithFilters = (fields) =>
          fields.filter((field) => /:/.test(field))
        posts = preparePosts(
          posts,
          getBasicFields([
            'contentRendered:strip:truncate,0,500',
            'gallery',
            'permalink',
            'photos',
            'path',
            'tags',
            'title',
            'categories',
          ]),
          getFieldsWithFilters([
            'contentRendered:strip:truncate,0,500',
            'gallery',
            'permalink',
            'photos',
            'path',
            'tags',
            'title',
            'categories',
          ])
        )
        const splitIntoChunks = <T>(array: T[], chunkSize: number) => {
          const newArrays = array.slice(0)
          const chunks: T[][] = []

          while (newArrays.length) {
            chunks.push(newArrays.splice(0, chunkSize))
          }

          return chunks
        }
        const chunkedPosts = splitIntoChunks(posts, 5000)
        const client = algoliasearch(
          themePlugins.algoliaSearch.appId,
          themePlugins.algoliaSearch.adminKey
        )
        const index = client.initIndex('Sakura')
        index.clearObjects()
        // @ts-ignore
        await Promise.all(chunkedPosts.map((posts) => index.saveObjects(posts)))
          .then(console.log)
          .catch(console.log)
      }
    },
    onGenerated: (app) => {
      if (themePlugins?.sitemap) {
        sitemap(app, themePlugins?.sitemap)
      }
    },
    plugins: [
      // @vuepress/plugin-theme-data
      themeDataPlugin({ themeData: localeOptions }),
    ],
  }
}
