import type {Plugin} from "@vuepress/core";
import {APiPluginOptions, Post} from "../shared/types";
import axios from "axios";
import CRC32 = require('crc-32');

export const VuepressPluginApi: Plugin = (options: APiPluginOptions, app) => {
    return {
        name: "vuepress-plugin-api",
        onInitialized: async app => {
            if (options.api && options.api !== '') {
                const instance = axios.create({
                    baseURL: options.api,
                    timeout: 10000,
                    headers: {'Authorization': options.token as string}
                });
                for (let page of app.pages) {
                    if (page.title === '') {
                        continue
                    }
                    instance({
                        url: '',
                        method: 'post',
                        data: {
                            id: (CRC32.str(page.title) >>> 0).toString(16),
                            tags: page.frontmatter.tags,
                            title: page.title,
                            content: page.content,
                            description: page.frontmatter.description || page.excerpt,
                            createdDateTime: page.frontmatter.date || new Date(),
                            updateDateTime: page.frontmatter.updateDate || new Date()
                        } as Post
                    }).then(({data}) => {
                        console.log(data?.data?.title)
                    }).catch(({response}) => {
                        console.error(response)
                    })
                }
            } else {
                throw new Error("api can not be null");
            }
        }
    }
}

export default VuepressPluginApi
