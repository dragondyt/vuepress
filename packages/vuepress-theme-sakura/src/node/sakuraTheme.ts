import type { Page, Theme } from '@vuepress/core'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { path } from '@vuepress/utils'
import type {
  SakuraThemeLocaleOptions,
  SakuraThemePageData,
  SakuraThemePluginsOptions,
} from '../shared'
import {
  markdownItExcerpt,
  markdownItKatex,
  markdownItSpoiler,
} from './plugins'
import {
  assignDefaultLocaleOptions,
  assignPostcssConfig,
} from './utils'

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
      md.use(require('./plugins/markdown-it-prism'))
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
    plugins: [
      // @vuepress/plugin-theme-data
      themeDataPlugin({ themeData: localeOptions }),
    ],
  }
}
