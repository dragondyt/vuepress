import type {Page, Theme} from '@vuepress/core'
import {createPage, resolvePageContent} from '@vuepress/core'
import {themeDataPlugin} from '@vuepress/plugin-theme-data'
import {fs, path} from '@vuepress/utils'
import type {SakuraThemeLocaleOptions, SakuraThemePageData, SakuraThemePluginsOptions,} from '../shared'
import {markdownItExcerpt, markdownItKatex, markdownItPrism, markdownItSpoiler,} from './plugins'
import {assignDefaultLocaleOptions, assignPostcssConfig} from './utils'
// @ts-ignore
import * as CRC32 from "crc-32";
import * as moment from "moment";
import * as matter from "gray-matter";
const {check, add} = require('./abbr/check')

export interface SakuraThemeOptions extends SakuraThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: SakuraThemePluginsOptions
}

export const sakuraTheme = ({
                              themePlugins = {},
                              ...localeOptions
                            }: SakuraThemeOptions = {}): Theme => {
  assignDefaultLocaleOptions(localeOptions)
  return {
    name: '@vuepress/theme-default',

    layouts: path.resolve(__dirname, '../client/layouts'),

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias:  {
      '@images/404': "../assets/images/404.png",
      '@images/upyun_logo2': "../assets/images/upyun_logo2.png",
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

    extendsMarkdown: (md) => {
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
        //读取文件
        let contentRaw = fs.readFileSync(page.filePath, 'utf8').toString() as string;
        const {content, frontmatterRaw} = resolvePageContent({
          contentRaw,
        })
        if (frontmatterRaw.title != null && frontmatterRaw.title != '') {
          if (frontmatterRaw.permalink != null && frontmatterRaw.permalink != '') {
          } else {
            add(frontmatterRaw.permalink)
          }
          // //生成链接
          let permalink = check(CRC32.str(frontmatterRaw.title) >>> 0).toString(16);
          // //记录生成的链接
          add(permalink)
          // 处理目录
          permalink = page.filePath.replace(app.dir.source(), '').replace(/[\w-]+\.(.*)?/g, `${permalink}.html`).replace('//', '/')
          //设置文章永久链接
          frontmatterRaw.permalink = permalink
          //设置时间
          frontmatterRaw.date = moment(frontmatterRaw.date).format("YYYY-MM-DD HH:mm:ss").toString()
          // 写入
          fs.writeFileSync(page.filePath, matter.stringify(content, frontmatterRaw));
        }
      }
    },
    onInitialized: async (app) => {
      app.pages.push(
        await createPage(app, {
          path: '/',
          content: '',
          frontmatter: {
            layout: 'IndexLayout',
            stickyList:app.pages.filter(_=>_.frontmatter?.sticky)
          },
        })
      )
    },
    plugins: [
      // @vuepress/plugin-theme-data
      themeDataPlugin({themeData: localeOptions}),
    ],
  }
}
