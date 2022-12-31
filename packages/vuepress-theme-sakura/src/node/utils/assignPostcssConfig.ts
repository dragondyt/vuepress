import type { App } from '@vuepress/core'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import nesting from 'tailwindcss/nesting/index.js'

export const assignPostcssConfig = (bundlerOptions, app: App): void => {
  const tailwindConfig = {
    content: [
      'node_modules/@dragondyt/vuepress-theme-sakura/lib/**/*.{vue,js,ts,jsx,tsx,css,vue}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  const postcssConfig = {
    plugins: [
      nesting,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tailwindcss(tailwindConfig),
      autoprefixer,
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
