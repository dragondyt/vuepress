import process from 'node:process'
import sakuraTheme from '@dragondyt/vuepress-theme-sakura'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
import { shikiPlugin } from '@vuepress/plugin-shiki'

const isProd = process.env.NODE_ENV === 'production'
export default defineUserConfig({
  lang: 'zh-CN',
  // specify bundler via environment variable
  // site-level locales config
  locales: {
    'tagLine': {},
    '/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator',
    },
    '/zh/': {
      lang: 'zh-CN.ts-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器',
    },
  },
  head: [
    [
      'link',
      {
        href: '//at.alicdn.com/t/font_1832207_igi8uaupcus.css',
        rel: 'stylesheet',
      },
    ],
  ],
  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),
  theme: sakuraTheme({
    alternate: '',
    category_map: {},
    algoliaSearch: {
      appId: '5BTZLCECBW',
      apiKey: '9472de061655eb367be386d92aa70793',
      index: 'Sakura',
      adminKey: process.env.ALGOLIA_ADMIN_KEY ?? '',
    },
    avatar:
      'https://cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/avatar.jpg',
    title: 'Hexo',
    subtitle: 'subtitle',
    comment: {
      waline: {
        serverURL: 'https://waline-chi-weld.vercel.app',
      },
    },
    description: '描述123',
    author: 'John Doe',
    footer: {
      since: 2021,
      icon: {
        name: 'sakura rotate',
      },
    },
    lang: 'zh-CN',
    menus: [
      {
        name: 'home',
        path: '/',
      },
      {
        name: 'home',
        path: '/test',
        children: [
          {
            name: 'home',
            path: '/test',
          },
        ],
      },
    ],
    timezone: 'Asia/Shanghai',
    themePlugins: {
      // use shiki plugin in production mode instead
      prismjs: !isProd,
      abbrLink: {
        autoDate: false,
        alg: 'crc32',
      },
      sitemap: {
        hostname: 'https://dragondyt.top',
      },
      algoliaConfig: {
        appId: '5BTZLCECBW',
        index: 'Sakura',
        chunkSize: 5000,
        fields: [
          'title',
          'path',
          'categories',
          'content:strip:truncate,0,2000',
          'gallery',
          'photos',
          'tags',
        ],
        adminKey: process.env.ALGOLIA_ADMIN_KEY ?? '',
      },
    },
    widgets: {
      random_posts: false,
      recent_comments: true,
    },
  }),
  plugins: [
    // only enable shiki plugin in production mode
    isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
  ],
})
