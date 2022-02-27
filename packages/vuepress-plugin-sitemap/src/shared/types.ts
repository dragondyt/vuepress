import {PluginOptions} from "@vuepress/core/lib/types/plugin";

export interface SiteMapPluginOptions extends PluginOptions {
    hostname: string
    dest?: string
}