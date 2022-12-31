import type { Plugin } from '@vuepress/core'
import { fs, logger } from '@vuepress/utils'
import CRC32 from 'crc-32'
import matter from 'gray-matter'
import { add, check } from './check.js'

export interface AbbrLinkPluginOptions {
  alg?: 'crc16' | 'crc32'
  autoDate?: boolean
  force?: boolean
  rep?: string
}

export const abbrLinkPlugin = (
  { alg, autoDate, force }: AbbrLinkPluginOptions = {
    alg: 'crc16',
    autoDate: false,
    force: false,
    rep: 'dec',
  }
): Plugin => ({
  name: '@dragondyt/vuepress-plugin-abbrlink',
  extendsPageOptions: (pageOptions, app) => {
    if (pageOptions.filePath) {
      // 读取文件
      const mdContent = fs.readFileSync(pageOptions.filePath, {
        encoding: 'utf-8',
      })
      const { data: frontmatter, content } = matter(mdContent)

      const abbrlink = frontmatter.abbrlink || ''
      // ----- auto date ? easy
      if (autoDate && !frontmatter.date) {
        frontmatter.date = frontmatter.date.format('YYYY-MM-DD HH:mm:ss')
        logger.info(
          'Generated: date [%s] for post [ %s ]',
          frontmatter.date,
          pageOptions.filePath
        )
      }
      if (abbrlink !== '' && !force) {
        add(abbrlink)
      } else {
        if (!frontmatter.title || frontmatter.title.length === 0) {
          logger.info(
            'No title found for post [%s][ %s ]',
            pageOptions.filePath,
            frontmatter.title
          )
          return
        }
        // //生成链接
        let permalink = check(CRC32.str(frontmatter.title) >>> 0).toString(16)
        // //记录生成的链接
        add(permalink)
        // 处理目录
        permalink = pageOptions.filePath
          .replace(app.dir.source(), '')
          .replace(/[\w-]+\.(.*)?/g, `${permalink}.html`)
          .replace(/.(md|MD)$/g, '')
          .replace(frontmatter.title, `${permalink}.html`)
          .replace('//', '/')
        // 设置文章永久链接
        frontmatter.permalink = permalink
        Object.assign(pageOptions, {
          frontmatter,
        })
        // 写入
        fs.writeFileSync(
          pageOptions.filePath,
          matter.stringify(content, frontmatter)
        )
      }
    }
  },
})
