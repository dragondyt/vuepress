import {PluginOptions} from "@vuepress/core/lib/types/plugin";

export interface APiPluginOptions extends PluginOptions {
    api: string
    token?: string
}

export interface Post {
    id: string
    title: string
    tags?: string[]
    sticky: boolean
    description?: string
    content?: string
    createdDateTime?: string
    updateDateTime?: string
}