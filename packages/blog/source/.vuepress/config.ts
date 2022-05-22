import {defineUserConfig} from '@vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import {webpackBundler} from "@vuepress/bundler-webpack";
import { sakuraTheme } from '@dragondyt/vuepress-theme-sakura'
import { path } from '@vuepress/utils'
const isProd = process.env.NODE_ENV === 'production'
export default defineUserConfig({
    // set site base to default value
    base: '/',
    // site-level locales config
    locales: {
        '/': {
            lang: 'en-US',
            title: 'VuePress',
            description: 'Vue-powered Static Site Generator',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'VuePress',
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
    theme: sakuraTheme(),
    plugins: []
})