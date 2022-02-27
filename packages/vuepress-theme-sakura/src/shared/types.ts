import type {LocaleData, PageData as _PageData, ThemeConfig} from "@vuepress/core"
import type {ThemeData as _ThemeData} from "@vuepress/plugin-theme-data"
import {PageFrontmatter} from "@vuepress/shared/lib/types/page";

export interface DefaultThemePluginsOptions {
    /**
     * Enable @vuepress/plugin-active-header-links or not
     */
    activeHeaderLinks?: boolean

    /**
     * Enable @vuepress/plugin-back-to-top or not
     */
    backToTop?: boolean

    /**
     * Enable @vuepress/plugin-container or not
     */
    container?: {
        tip?: boolean
        warning?: boolean
        danger?: boolean
        details?: boolean
        codeGroup?: boolean
        codeGroupItem?: boolean
    }

    /**
     * Enable @vuepress/plugin-external-link-icon or not
     */
    externalLinkIcon?: boolean

    /**
     * Enable @vuepress/plugin-git or not
     */
    git?: boolean

    /**
     * Enable @vuepress/plugin-medium-zoom or not
     */
    mediumZoom?: boolean

    /**
     * Enable @vuepress/plugin-nprogress or not
     */
    nprogress?: boolean

    /**
     * Enable @vuepress/plugin-prismjs or not
     */
    prismjs?: boolean
}

export interface SakuraThemeOptions extends ThemeConfig, ThemeLocaleOptions {
}

export type ThemeLocaleOptions = ThemeData

export type ThemeData = _ThemeData<ThemeLocaleData>

export type PageData = _PageData<PageDataLocal>

export interface ThemeLocaleData extends LocaleData {
    author?: string;
    avatar?: string;
    alternate?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    image_server?: string;
    root?: string;
    per_page?: number;
    themePlugins?: DefaultThemePluginsOptions;
}

export interface SakuraPageFrontmatter extends PageFrontmatter {
    categories: Array<string>
}

export interface PageDataLocal {

}

export interface Menu {
    name: string
    path: string
    icon?: string
}

export interface SakuraPageData extends PageData {
    frontmatter: SakuraPageFrontmatter
}
export interface Category {
    
}
