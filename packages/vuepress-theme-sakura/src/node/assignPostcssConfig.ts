import type {App} from "@vuepress/core"
import type {WebpackBundlerOptions} from "@vuepress/bundler-webpack"
import type {ViteBundlerOptions} from "@vuepress/bundler-vite"


export function assignPostcssConfig(app: App) {
    const tailwindConfig = {
        content: [
            "posts/**/*.md",
            "node_modules/@dragondyt/vuepress-theme-sakura/lib/**/*.css",
            "node_modules/@dragondyt/vuepress-theme-sakura/lib/**/*.vue",
            "node_modules/@dragondyt/vuepress-theme-sakura/lib/**/*.{vue,js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {
                colors: {
                    primary: {
                        50: "var(--color-primary-50)",
                        100: "var(--color-primary-100)",
                        200: "var(--color-primary-200)",
                        300: "var(--color-primary-300)",
                        400: "var(--color-primary-400)",
                        500: "Var(--color-primary-500)",
                        600: "var(--color-primary-600)",
                        700: "var(--color-primary-700)",
                        800: "var(--color-primary-800)",
                        900: "var(--color-primary-900)",
                    },
                    secondary: {
                        50: "var(--color-secondary-50)",
                        100: "var(--color-secondary-100)",
                        200: "var(--color-secondary-200)",
                        300: "var(--color-secondary-300)",
                        400: "var(--color-secondary-400)",
                        500: "Var(--color-secondary-500)",
                        600: "var(--color-secondary-600)",
                        700: "var(--color-secondary-700)",
                        800: "var(--color-secondary-800)",
                        900: "var(--color-secondary-900)",
                    },
                    'header-text': 'var(--header-text-color)',
                    myGray: {
                        3: "var(--grey-3)",
                        5: "var(--grey-5)",
                        6: "var(--grey-6)"
                    }
                },
                height: {
                    'screen-50': '50vh',
                    'screen-70': '70vh',
                },
                fontFamily: {
                    'Fredericka': ['Fredericka the Great', 'Mulish', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
                    'ic': 'ic',
                },
                boxShadow: {
                    'body-bg': '0 1.25rem 1rem .3125rem var(--body-bg-shadow)',
                    'line': '0 0 .5rem rgba(0, 0, 0, .5)',
                },
                keyframes: {
                    slideUpIn: {
                        '0%': {
                            opacity: 0,
                            transform: 'translateY(10px)',
                        },
                        'to': {
                            opacity: 1,
                            transform: 'translateY(0)',
                        }
                    },
                    slideUpBigIn: {
                        '0%': {
                            opacity: 0,
                            transform: 'translateY(80px)'
                        },
                        '100%': {
                            opacity: 1,
                            transform: 'translateY(0)'
                        }
                    }
                },
                animation: {
                    'slideUpIn': 'slideUpIn .3s',
                    'slideUpBigIn': 'slideUpBigIn .5s',
                },
            },
        },
        plugins: [],
    }

    const postcssConfig = {
        plugins: [
            require(require.resolve("postcss-import")),
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

    const webpackBundlerOptions: WebpackBundlerOptions = {
        postcss: {
            postcssOptions: postcssConfig,
        },
    }

    const viteBundlerOptions: ViteBundlerOptions = {
        viteOptions: {
            css: {
                postcss: postcssConfig,
            },
        },
    }
    switch (app.options.bundler) {
        case "@vuepress/bundler-webpack":
        case "@vuepress/webpack":
            app.options.bundlerConfig = webpackBundlerOptions
            break
        case "@vuepress/bundler-vite":
        case "@vuepress/vite":
            app.options.bundlerConfig = viteBundlerOptions
            break
    }
}
