import {defineUserConfig} from '@vuepress/cli'
import {viteBundler} from '@vuepress/bundler-vite'
import {webpackBundler} from "@vuepress/bundler-webpack";
import {shikiPlugin} from '@vuepress/plugin-shiki'
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'

import {sakuraTheme} from '@dragondyt/vuepress-theme-sakura'
import {path} from '@vuepress/utils'

const isProd = process.env.NODE_ENV === 'production'
export default defineUserConfig({
    // set site base to default value
    base: '/',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Mulish:300,300italic,400,400italic,700,700italic%7CFredericka%20the%20Great:300,300italic,400,400italic,700,700italic%7CNoto%20Serif%20JP:300,300italic,400,400italic,700,700italic%7CNoto%20Serif%20SC:300,300italic,400,400italic,700,700italic%7CInconsolata:300,300italic,400,400italic,700,700italic&display=swap&subset=latin,latin-ext'
        }],
        ['link', {rel: 'stylesheet', href: '//at.alicdn.com/t/font_1832207_c8i9n1ulxlt.css'}],
    ],
    // site-level locales config
    locales: {
        '/': {
            lang: 'en-US',
            title: 'VuePress',
            // @ts-ignore
            alternate: 'VuePress',
            description: 'Vue-powered Static Site Generator',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'VuePress',
            // @ts-ignore
            alternate: 'VuePress',
            description: 'Vue 驱动的静态网站生成器',
        },
    },

    // specify bundler via environment variable
    bundler:
        process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),
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
    theme: sakuraTheme({
        // covers:  "https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg"
        locales: {
            '/': {

            }
        }
    }),
    plugins: [
        googleAnalyticsPlugin({
            // we have multiple deployments, which would use different id
            id: process.env.DOCS_GA_ID ?? '',
        }),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        isProd ? shikiPlugin({theme: 'dark-plus'}) : [],
    ]
})