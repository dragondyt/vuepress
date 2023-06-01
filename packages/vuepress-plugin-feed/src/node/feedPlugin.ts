import { dirname } from 'node:path'
import { getDatabase } from '@dragondyt/vuepress-plugin-warehouse'
import type { Plugin } from '@vuepress/core'
import { fs, withSpinner } from '@vuepress/utils'
import dayjs from 'dayjs'
import type { FeedOptions } from 'feed'
import { Feed } from 'feed'
import { Guid } from 'js-guid'

export interface FeedPluginOptions extends FeedOptions {
  types: string[]
  category: string
  host: string
}

export const feedPlugin = (feedOptions: FeedPluginOptions): Plugin => ({
  name: '@dragondyt/vuepress-plugin-feed',
  multiple: true,
  onGenerated: async (app): Promise<void> => {
    const { dest } = app.dir
    await withSpinner('feed')(async () => {
      const feed = new Feed(feedOptions)
      const database = await getDatabase(app)
      database
        .model('Post')
        .sort('-date')
        .forEach((post) => {
          if (post.title) {
            feed.addItem({
              title: post.title,
              id: post.permalink,
              link: feedOptions.host + post.permalink,
              date: post.date ? dayjs(post.date).toDate() : new Date(),
              description: post.frontmatter.description || post.excerpt,
              content: post.contentRendered?.replace(
                /<RouterLink to="(.*?)">(.*?)<\/RouterLink>/gi,
                '<a href="' + feedOptions.host + '$1">$2</a>'
              ),
              category: post.frontmatter.categories || [],
              guid: feedOptions.host + post.permalink,
              image: post.frontmatter.image,
              audio: Array.isArray(post.frontmatter.audio)
                ? post.frontmatter.audio[0]
                : post.frontmatter.audio,
              video: post.frontmatter.video,
              enclosure: post.frontmatter.enclosure,
              author: post.frontmatter.authors || [feedOptions.author],
              contributor: post.frontmatter.contributor || [feedOptions.author],
              published: post.date ? dayjs(post.date).toDate() : new Date(),
              copyright: post.frontmatter.copyright || feedOptions.copyright,
              extensions: post.frontmatter.extensions || [],
            })
          }
        })
      if (feedOptions.category) {
        feed.addCategory(feedOptions.category)
      }
      if (feedOptions.types && Array.isArray(feedOptions.types)) {
        for (const t of feedOptions.types) {
          if (t === 'json') {
            const rssOutputFilename = 'feed.json'
            await fs.ensureDir(dirname(dest(rssOutputFilename)))
            await fs.outputFile(dest(rssOutputFilename), feed.json1())
          } else if (t === 'atom') {
            const rssOutputFilename = 'atom.xml'
            await fs.ensureDir(dirname(dest(rssOutputFilename)))
            await fs.outputFile(dest(rssOutputFilename), feed.atom1())
          } else {
            const rssOutputFilename = 'rss.xml'
            await fs.ensureDir(dirname(dest(rssOutputFilename)))
            await fs.outputFile(dest(rssOutputFilename), feed.rss2())
          }
        }
      }
    })
  },
})
