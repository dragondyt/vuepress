import { createWriteStream } from 'fs'
import type { App } from '@vuepress/core'
import { debug } from '@vuepress/utils'
import { SitemapStream } from 'sitemap'
import type { SiteMapOption } from '../../shared'
const log = debug('theme:sakura/sitemap')
export function sitemap(app: App, sitemapOption: SiteMapOption): void {
  log('站点地图生成开始')
  // Creates a sitemap object given the input configuration with URLs
  const sitemap = new SitemapStream({ hostname: sitemapOption.hostname })

  const writeStream = createWriteStream(
    app.dir.dest(sitemapOption.out ?? './sitemap.xml')
  )
  sitemap.pipe(writeStream)
  for (const page of app.pages) {
    // @ts-ignore
    if (page.frontmatter?.sitemap?.exclude) {
      continue
    }
    sitemap.write({
      url: page.path,
      changefreq: sitemapOption.defaultChangeFreq ?? 'monthly',
      priority: sitemapOption.defaultPriority ?? 1.0,
    })
  }
  sitemap.end()
  log('站点地图生成完成')
}
