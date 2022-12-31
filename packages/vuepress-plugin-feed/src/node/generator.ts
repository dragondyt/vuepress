import type { App } from '@vuepress/core'
import type { FeedPluginOptions } from './feedPlugin.js'

export class FeedGenerator {
  private app
  constructor(app: App, feedOptions: FeedPluginOptions) {
    this.app = app
  }
}
