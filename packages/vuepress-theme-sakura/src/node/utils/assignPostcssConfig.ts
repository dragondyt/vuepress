import type { App } from '@vuepress/core'

export const assignPostcssConfig = (bundlerOptions: any, app: App): void => {
  const tailwindConfig = {
    content: [
      'source/**/*.md',
      'node_modules/@dragondyt/vuepress-theme-sakura/lib/**/*.{vue,js,ts,jsx,tsx,css,vue}',
    ],
  }
  const postcssConfig = {
    plugins: [
      require(require.resolve('tailwindcss/nesting')),
      require(require.resolve('tailwindcss'))(tailwindConfig),
      require('cssnano')({
        preset: [
          'default',
          {
            normalizeWhitespace: false,
            colormin: false,
          },
        ],
      }),
    ],
  }
  switch (app.options.bundler.name) {
    case '@vuepress/bundler-webpack':
    case '@vuepress/webpack':
      Object.assign(bundlerOptions, {
        postcss: {
          postcssOptions: postcssConfig,
        },
      })
      break
    case '@vuepress/bundler-vite':
    case '@vuepress/vite':
      Object.assign(bundlerOptions, {
        viteOptions: {
          css: {
            postcss: postcssConfig,
          },
          resolve: {
            dedupe: ['vue'],
          },
        },
      })
      break
  }
}
