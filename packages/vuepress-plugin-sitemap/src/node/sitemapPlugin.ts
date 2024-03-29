import { createWriteStream } from 'fs'
import { dirname } from 'node:path'
import { Readable } from 'stream'
import { getDatabase } from '@dragondyt/vuepress-plugin-warehouse'
import type { Plugin } from '@vuepress/core'
import { fs, withSpinner } from '@vuepress/utils'
import { SitemapAndIndexStream, SitemapStream } from 'sitemap'

export interface SitemapPluginOptions {
  hostname: string
  sub?: string
  limit?: number
  lastmodDateOnly?: boolean
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}

export const sitemapPlugin = (
  sitemapOptions: SitemapPluginOptions
): Plugin => ({
  name: '@dragondyt/vuepress-plugin-sitemap',
  multiple: false,
  onGenerated: async (app): Promise<void> => {
    await withSpinner('sitemap')(async () => {
      const { dest } = app.dir
      await fs.ensureDir(dirname(dest()))
      const sms = new SitemapAndIndexStream({
        limit: sitemapOptions.limit || 50000, // defaults to 45k
        lastmodDateOnly: sitemapOptions.lastmodDateOnly || false, // print date not time
        // SitemapAndIndexStream will call this user provided function every time
        // it needs to create a new sitemap file. You merely need to return a stream
        // for it to write the sitemap urls to and the expected url where that sitemap will be hosted
        getSitemapStream: (i) => {
          const sitemapStream = new SitemapStream({
            hostname: sitemapOptions.hostname,
          })
          // if your server automatically serves sitemap.xml.gz when requesting sitemap.xml leave this line be
          // otherwise you will need to add .gz here and remove it a couple lines below so that both the index
          // and the actual file have a .gz extension

          const path = `./sitemap-${i}.xml`

          const ws = sitemapStream.pipe(createWriteStream(dest(path))) // write it to sitemap-NUMBER.xml

          return [
            new URL(
              path,
              sitemapOptions.sub || sitemapOptions.hostname
            ).toString(),
            sitemapStream,
            ws,
          ]
        },
      })
      // or reading straight from an in-memory array
      sms.pipe(createWriteStream(dest('./sitemap-index.xml')))
      const database = await getDatabase(app)
      Readable.from(
        database
          .model('Post')
          .sort('-date')
          .map((p) => {
            return {
              url: p.path,
              changefreq:
                p.frontmatter?.sitemap?.changefreq ||
                sitemapOptions.changefreq ||
                'monthly',
              priority:
                p.frontmatter?.sitemap?.priority || sitemapOptions.priority,
              lastmod: p.frontmatter.updatedDate,
            }
          })
      ).pipe(sms) // available as of node 10.17.0
    })
  },
})
