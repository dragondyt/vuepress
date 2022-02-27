import type {ContainerPluginOptions} from '@vuepress/plugin-container'
import {DefaultThemePluginsOptions, ThemeData} from "../../shared";

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
    themePlugins: DefaultThemePluginsOptions,
    localeOptions: ThemeData,
    type: 'info' | 'warning' | 'primary'
): ContainerPluginOptions | boolean => {

    if (themePlugins?.container?.[type] === false) {
        return false
    }

    const locales = Object.entries(localeOptions.locales || {}).reduce(
        (result, [key, value]) => {
            result[key] = {
                defaultInfo: value?.[type] ?? localeOptions[type],
            }
            return result
        },
        {}
    )
    return {
        type,
        locales,
        before : (info) => `<div class="note ${type}">`,
        after : () => '</div>'
    }
}