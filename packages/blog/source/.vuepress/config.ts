import {defineUserConfig} from "@vuepress/cli"
import type {ViteBundlerOptions} from '@vuepress/bundler-vite'
import {SakuraThemeOptions} from "@dragondyt/vuepress-theme-sakura/src/shared";
import {SiteMapPluginOptions} from "@dragondyt/vuepress-plugin-sitemap/src/shared";
import {APiPluginOptions} from "@dragondyt/vuepress-plugin-api/src/shared";

export default defineUserConfig<SakuraThemeOptions, ViteBundlerOptions>({
    title: "秦时明月",
    description: "技术与生活",
    lang: "zh-CN",
    base: "/",
    head: [
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Mulish:300,300italic,400,400italic,700,700italic%7CFredericka%20the%20Great:300,300italic,400,400italic,700,700italic%7CNoto%20Serif%20JP:300,300italic,400,400italic,700,700italic%7CNoto%20Serif%20SC:300,300italic,400,400italic,700,700italic%7CInconsolata:300,300italic,400,400italic,700,700italic&display=swap&subset=latin,latin-ext'
        }],
        ['link', {rel: 'stylesheet', href: '//at.alicdn.com/t/font_1832207_c8i9n1ulxlt.css'}],
    ],

    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    markdown: {
        extractHeaders: {
            level: [1, 2]
        }
    },
    plugins: [
        ["@vuepress/plugin-pwa", {
            skipWaiting: true,
        }],
        ["@dragondyt/vuepress-plugin-abbrlink", {enable: true}],
        ["@dragondyt/vuepress-plugin-seo"],
        ["@dragondyt/vuepress-plugin-sitemap", {
            hostname: 'https://blog.dragondyt.top'
        } as SiteMapPluginOptions],
    ],
    // bundler: process.env.NODE_ENV === 'production' ? '@vuepress/bundler-webpack' : '@vuepress/bundler-vite',
    bundler: "@vuepress/vite",
    theme: "@dragondyt/vuepress-theme-sakura",
    themeConfig: {
        root: '',
        author: "author",
        alternate: 'Yume Shoka',
        title: 'title',
        subtitle: 'subtitle',
        description: "description",
        avatar: 'https://cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/avatar.jpg',
        per_page: 10,
        menus: [
            {
                name: '首页',
                path: '/',
                icon: 'home'
            },
            {
                name: '关于',
                path: '/posts',
                icon: 'user',
                children: [
                    {
                        name: '自设',
                        path: '/default',
                        icon: 'cloud'
                    }
                ]
            },
            {
                name: '文章',
                path: '/posts',
                icon: 'feather',
                children: [
                    {
                        name: '归档',
                        path: '/default',
                        icon: 'list-alt'
                    },
                    {
                        name: '分类',
                        path: '/default',
                        icon: 'th'
                    },
                    {
                        name: '标签',
                        path: '/default',
                        icon: 'tags'
                    }
                ]
            },
            {
                name: '链环',
                path: '/posts',
                icon: 'magic',
                children: [
                    {
                        name: '友链',
                        path: '/default',
                        icon: 'heart'
                    },
                    {
                        name: '网址',
                        path: '/default',
                        icon: 'star'
                    }
                ]
            },
            {
                name: '开往',
                path: '/posts',
                icon: 'paper-plane'
            },
        ],
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
                alternate: '',
                title: '',
                subtitle: '',
                sticky: '置顶文章',
                category: '精选分类',
                posts: '文章列表',
                toc: '文章目录',
                overview: '站点概览',
                related: '系列文章',
                posted: '发表于',
                home: '首页',
                state: {
                    posts: '文章',
                    categories: '分类',
                    tags: '标签'
                }
            },

            /**
             * Chinese locale config
             */
            '/zh-CN/': {

                // custom containers
                info: '提示',
                warning: '注意',
                primary: '警告',

                // 404 page
                notFound: [
                    '这里什么都没有',
                    '我们怎么到这来了？',
                    '这是一个 404 页面',
                    '看起来我们进入了错误的链接',
                ],
                alternate: '',
                title: '',
                subtitle: ''
            },
        },
    }
})
