import {sakuraTheme} from '@dragondyt/vuepress-theme-sakura'
import {viteBundler} from '@vuepress/bundler-vite'
import {webpackBundler} from '@vuepress/bundler-webpack'
import {defineUserConfig} from '@vuepress/cli'
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import {path} from '@vuepress/utils'
import {head} from './configs'
import {pwaPlugin} from "@vuepress/plugin-pwa";

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // extra tags in `<head>`
  head,
// @ts-ignore
  author: 'qhmy',

  description: '描述',

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: '秦时明月',
      description: '这是一个无聊的人搭建的博客。',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '秦时明月',
      description: '这是一个无聊的人搭建的博客。',
    },
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  // configure default theme
  theme: sakuraTheme({
    logo: '/images/hero.png',
    repo: 'vuepress/vuepress-next',
    docsDir: 'docs',
    navbar: [
      {
        name: '首页',
        path: '/',
        icon: 'home'
      },
      {
        name: '关于',
        path: '/about',
        icon: 'user'
      },
      {
        name: '文章',
        icon: 'feather',
        children: [
          {
            name: '归档',
            path: '/archives',
            icon: 'list-alt'
          }, {
            name: '分类',
            path: '/category',
            icon: 'th'
          }, {
            name: '标签',
            path: '/tag',
            icon: 'tags'
          },
        ]
      }, {
        name: '链环',
        icon: 'magic',
        children: [{
          name: '友達',
          path: 'friend',
          icon: 'heart'
        }, {
          name: '网址',
          path: 'links',
          icon: 'star'
        }]
      }, {
        name: '开往',
        path: '',
        icon: 'paper-plane'
      }
    ],
    selectLanguageName: 'zh',
    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // sidebar
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
      },
    },
    social: [
      {
        name: 'github',
        url: 'https://github.com',
        icon: 'github',
        color: '#191717',
      }
    ],
    categoryMap:{
      '计算机科学': 'computer-science',
      '算法': 'algorithm',
      '二叉树': 'binary-tree',
      '二进制杂谈': 'note',
      '零基础学Java语言-浙江大学-翁恺': 'course-1',
      'Theme Shoka Documentation': 'theme-shoka-doc',
    },
    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
      container: {
        info: true,
      },
      algoliaSearch: {
        appId: '5BTZLCECBW',
        apiKey: '9472de061655eb367be386d92aa70793',
        adminKey: process.env.ALGOLIA_ADMIN_KEY ?? ''
      },
      sitemap: {
        hostname: 'https://blog.dragondyt.top'
      }
    },
    cover: [
      'https://tva3.sinaimg.cn/large/6833939bly1gicis3attqj20zk0m8k7l.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1giciszlczyj20zk0m816d.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicit31ffoj20zk0m8naf.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicit4jrvuj20zk0m8785.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicitcxhpij20zk0m8hdt.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicitf0kl1j20zk0m87fe.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicitht3xtj20zk0m8k5v.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicitspjpbj20zk0m81ky.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1gicitzannuj20zk0m8b29.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1giciub8ja1j20zk0m81ky.jpg',
      'https://tva3.sinaimg.cn/large/6833939bly1giciuja1j1j20zk0m8kjl.jpg',
    ],
    sidebar: {
      avatar: '',
      position: 'left'
    },
    footer: {
      icon: {
        name: 'sakura rotate',
        color: '#ffc0cb',
      },
      since: 2019,
      count: false,
      powered: true
    }
  }),

  // configure markdown
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(
          /^@vuepress/,
          path.resolve(__dirname, '../../packages/@vuepress')
        ),
    },
  },

  // use plugins
  plugins: [
    googleAnalyticsPlugin({
      // we have multiple deployments, which would use different id
      id: process.env.DOCS_GA_ID ?? '',
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    pwaPlugin({
      // 配置项
    }),
    // only enable shiki plugin in production mode
    // isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
  ],
})
