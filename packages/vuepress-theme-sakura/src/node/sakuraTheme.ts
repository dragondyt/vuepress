import type {Page, Theme} from '@vuepress/core'
import {fs, path} from '@vuepress/utils'
import {themeDataPlugin} from '@vuepress/plugin-theme-data'
import type {
    DefaultThemeLocaleOptions,
    DefaultThemePageData,
    DefaultThemePluginsOptions,
} from '../shared'
// import {
//     assignDefaultLocaleOptions,
//     resolveContainerPluginOptions,
// } from './utils'

export interface DefaultThemeOptions extends DefaultThemeLocaleOptions {
    /**
     * To avoid confusion with the root `plugins` option,
     * we use `themePlugins`
     */
    themePlugins?: DefaultThemePluginsOptions
}

export const sakuraTheme = ({
                                themePlugins = {},
                                ...localeOptions
                            }: DefaultThemeOptions = {}): Theme => {
    return {
        name: '@dragondyt/vuepress-theme-sakura',
        layouts: path.resolve(__dirname, '../client/layouts'),
        templateBuild: path.resolve(__dirname, '../../templates/build.html'),
        // use alias to make all components replaceable
        alias: Object.assign(
            Object.fromEntries(
                fs
                    .readdirSync(path.resolve(__dirname, '../client/components'))
                    .filter((file) => file.endsWith('.vue'))
                    .map((file) => [
                        `@theme/${file}`,
                        path.resolve(__dirname, '../client/components', file),
                    ])
            ),
            {
                '@images/404': "../assets/images/404.png",
            }
        ),
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
            // save relative file path into page data to generate edit link
            page.data.filePathRelative = page.filePathRelative
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title
        },
        plugins: [
            themeDataPlugin({themeData: localeOptions}),
        ],
    }
}