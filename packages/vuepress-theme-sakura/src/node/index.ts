import {Theme} from "@vuepress/core";
import {fs, path} from "@vuepress/utils";
import {resolveContainerPluginOptions} from "./utils/resolveContainerPluginOptions";
import {SakuraThemeOptions} from "../shared";
import {assignDefaultOptions} from "./assignDefaultOptions";
import {doInitPageData} from "./doInitPageData";
import {assignPostcssConfig} from "./assignPostcssConfig";
import {resolveShiKiPluginOptions} from "./utils/resolveShiKiPluginOptions";
const VuepressThemeSakura: Theme<SakuraThemeOptions> = (themeOptions, app) => {
    const {themePlugins = {}, ...localeOptions} = themeOptions
    assignDefaultOptions(app, themeOptions)
    assignPostcssConfig(app)
    const themeData = {...themeOptions}
    return {
        name: "@dragondyt/vuepress-theme-sakura",
        layouts: path.resolve(__dirname, '../client/layouts'),
        templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),
        templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),
        // use alias to make all components replaceable
        alias: Object.fromEntries(
            fs
                .readdirSync(path.resolve(__dirname, '../client/components'))
                .filter((file) => file.endsWith('.vue'))
                .map((file) => [
                    `@theme/${file}`,
                    path.resolve(__dirname, '../client/components', file),
                ])
        ),
        clientAppEnhanceFiles: path.resolve(
            __dirname,
            "../client/clientAppEnhance.js"
        ),
        clientAppSetupFiles: path.resolve(
            __dirname,
            "../client/clientAppSetup.js"
        ),
        plugins: [
            ["@vuepress/plugin-theme-data", {themeData}],
            [
                '@vuepress/plugin-container',
                resolveContainerPluginOptions(themePlugins, localeOptions, 'info'),
            ],
            [
                '@vuepress/plugin-container',
                resolveContainerPluginOptions(themePlugins, localeOptions, 'warning'),
            ],
            [
                '@vuepress/plugin-container',
                resolveContainerPluginOptions(themePlugins, localeOptions, 'primary'),
            ],
            ['@vuepress/plugin-shiki', resolveShiKiPluginOptions(app, themeOptions)]
        ],
        onInitialized: async (app) => {
            await doInitPageData(app,themeOptions);
        }
    }
}
export default VuepressThemeSakura
