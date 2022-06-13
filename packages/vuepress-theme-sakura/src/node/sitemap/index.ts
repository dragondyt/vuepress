import type {SiteMapOption} from "../../shared";
import type {App} from "@vuepress/core";
import {createWriteStream} from "fs";
import {SitemapStream} from "sitemap";
import {debug} from "@vuepress/utils";
const log = debug('theme:sakura/sitemap')
export function sitemap(app: App, sitemapOption: SiteMapOption) {
  log("站点地图生成开始")
  // Creates a sitemap object given the input configuration with URLs
  const sitemap = new SitemapStream({hostname: sitemapOption.hostname});

  const writeStream = createWriteStream(app.dir.dest(sitemapOption.out ?? './sitemap.xml'));
  sitemap.pipe(writeStream);
  for (let page of app.pages) {
    sitemap.write({
      url: page.path,
      changefreq: sitemapOption.defaultChangeFreq ?? 'monthly',
      priority: sitemapOption.defaultPriority ?? 1.0
    });
  }
  sitemap.end();
  log("站点地图生成完成")
}
