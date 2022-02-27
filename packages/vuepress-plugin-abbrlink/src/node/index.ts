import type {Plugin} from "@vuepress/core";
import {resolvePageContent} from "@vuepress/core"
import matter = require('gray-matter');

import fs = require("fs");
import CRC32 = require('crc-32');
import moment = require("moment");

const {check, add} = require('./check')
export const VuepressPluginAbbrLink: Plugin = ({}, app) => {
    return {
        name: "vuepress-plugin-abbrlink",
        extendsPageOptions: (page, app) => {
            if (page != null) {
                if (page.filePath != null) {
                    //读取文件
                    let contentRaw = fs.readFileSync(page.filePath, 'utf8').toString() as string;
                    const {content, frontmatterRaw} = resolvePageContent({
                        contentRaw,
                    })
                    if (frontmatterRaw.title != null && frontmatterRaw.title != '') {

                        if (frontmatterRaw.permalink != null && frontmatterRaw.permalink != '') {
                            return {
                                frontmatter: {
                                    permalink: page.filePath.replace(app.dir.source(), '').replace(/[\w-]+\.(.*)?/g, `${frontmatterRaw.permalink}.html`),
                                },
                            }
                        } else {
                            add(frontmatterRaw.permalink)
                        }
                        // //生成链接
                        let permalink = check(CRC32.str(frontmatterRaw.title) >>> 0).toString(16);
                        // //记录生成的链接
                        add(permalink)
                        // 处理目录
                        permalink = page.filePath.replace(app.dir.source(), '').replace(/[\w-]+\.(.*)?/g, `${permalink}.html`).replace('//', '/')
                        //设置文章永久链接
                        frontmatterRaw.permalink = permalink
                        //设置时间
                        frontmatterRaw.date = moment(frontmatterRaw.date).format("YYYY-MM-DD HH:mm:ss")
                        // 写入
                        fs.writeFileSync(page.filePath, matter.stringify(content, frontmatterRaw));
                        return {
                            frontmatter: {
                                permalink: permalink,
                            },
                        }
                    }

                }
            }
            return {}
        }
    }
}

export default VuepressPluginAbbrLink
