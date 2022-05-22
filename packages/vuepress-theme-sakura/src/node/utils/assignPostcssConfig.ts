import type {App} from "@vuepress/core"
import type {WebpackBundlerOptions} from "@vuepress/bundler-webpack"
import type {ViteBundlerOptions} from "@vuepress/bundler-vite"
import {viteBundler} from '@vuepress/bundler-vite'
import {webpackBundler} from "@vuepress/bundler-webpack";

export const assignPostcssConfig = (app: App
): void => {
    const tailwindConfig = {
        content: [
            "source/**/*.md",
            "node_modules/@dragondyt/vuepress-theme-sakura/lib/**/*.{vue,js,ts,jsx,tsx,css,vue}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
    }
    const postcssConfig = {
        plugins: [
            // require(require.resolve("postcss-import")),
            require(require.resolve("tailwindcss/nesting")),
            require(require.resolve("tailwindcss"))(tailwindConfig),
            ...(process.env.NODE_ENV === "production"
                ? [
                    require(require.resolve("postcss-preset-env"))({stage: 0}),
                    require(require.resolve("autoprefixer"))
                ]
                : []),
        ],
    }
    switch (app.options.bundler.name) {
        case "@vuepress/bundler-webpack":
        case "@vuepress/webpack":
            app.options.bundler = webpackBundler({
                postcss: {
                    postcssOptions: postcssConfig,
                },
            })
            break
        case "@vuepress/bundler-vite":
        case "@vuepress/vite":
            app.options.bundler = viteBundler({
                viteOptions: {
                    css: {
                        postcss: postcssConfig,
                    },
                },
            })
            break
    }
}