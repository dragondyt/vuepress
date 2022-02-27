import type {Plugin} from "@vuepress/core";
import {SiteMapPluginOptions} from "../shared";
import * as path from "path";
import * as fs from "fs";
import {SitemapStream} from "sitemap";
import {ErrorLevel} from "sitemap/dist/lib/types";

function stripLocalePrefix(path, localePathPrefixes) {
    const matchingPrefix = localePathPrefixes.filter(prefix => path.startsWith(prefix)).shift()
    return {normalizedPath: path.replace(matchingPrefix, '/'), localePrefix: matchingPrefix}
}

export const VuepressPluginSiteMap: Plugin = (pluginOptions: SiteMapPluginOptions, app) => {
    const {
        urls = [],
        hostname,
        cacheTime = 600,
        xslUrl,
        xmlNs,
        outFile = 'sitemap.xml',
        changefreq = 'daily',
        exclude = [],
        dateFormatter = (lastUpdated) => new Date(lastUpdated).toISOString(),
        ...others
    } = pluginOptions

    return {
        name: "vuepress-plugin-sitemap",
        onGenerated: (app) => {
            if (!hostname) {
                return console.error(
                    'Not generating sitemap because required "hostname" option doesn\'t exist',
                    'red'
                )
            }
            console.debug('Generating sitemap...')
            const {locales, base} = app.siteData
            const withBase = url => base.replace(/\/$/, '') + url
            // Sort the locale keys in reverse order so that longer locales, such as '/en/', match before the default '/'
            const localeKeys = (locales && Object.keys(locales).sort().reverse()) || []

            const localesByNormalizedPagePath = app.pages.reduce((map, page) => {
                const {normalizedPath, localePrefix} = stripLocalePrefix(page.path, localeKeys)
                const prefixesByPath = map.get(normalizedPath) || []
                prefixesByPath.push(localePrefix)
                return map.set(normalizedPath, prefixesByPath)
            }, new Map())

            const pagesMap = new Map()

            app.pages.forEach(page => {
                const fmOpts = page.frontmatter.sitemap as any || {}
                const metaRobots = (page.frontmatter.meta as any || [])
                    .find(meta => meta.name === 'robots')
                const excludePage = metaRobots
                    ? (metaRobots.content || '').split(/,/).map(x => x.trim()).includes('noindex')
                    : fmOpts.exclude === true

                if (excludePage) {
                    exclude.push(page.path)
                }

                const lastmodISO = page.frontmatter.lastUpdated
                    ? dateFormatter(page.frontmatter.lastUpdated)
                    : undefined

                const {normalizedPath} = stripLocalePrefix(page.path, localeKeys)
                const relatedLocales = localesByNormalizedPagePath.get(normalizedPath)

                let links = []
                if (relatedLocales.length > 1) {
                    links = relatedLocales.map(localePrefix => {
                        return {
                            lang: locales[localePrefix].lang,
                            url: withBase(normalizedPath.replace('/', localePrefix))
                        }
                    })
                }

                pagesMap.set(page.path, {
                        changefreq: fmOpts.changefreq || changefreq,
                        lastmodISO,
                        links,
                        ...others
                    }
                )
            })

            const smStream = new SitemapStream({
                hostname,
                level: ErrorLevel.WARN,
                lastmodDateOnly: true,
                xmlns: xmlNs,
                xslUrl: xslUrl
            })
            const sitemapXML = path.resolve(pluginOptions.dest || app.dir.dest(), outFile)
            smStream.pipe(fs.createWriteStream(sitemapXML))
            pagesMap.forEach((page, url) => {
                if (!exclude.includes(url)) {
                    smStream.write({
                        url: withBase(url),
                        ...page
                    })
                }
            })

            urls.forEach(item => {
                const page = pagesMap.get(item.url)
                if (page) {
                    smStream.write({...page, ...item})
                } else {
                    smStream.write(item)
                }
            })
            smStream.end()
            console.debug("生成站点地图完成")
            console.debug("生成robots.txt")
            let robots;
            //如果存在
            if (fs.existsSync(path.resolve(app.dir.dest(), './robots.txt'))) {
                robots = fs.readFileSync(path.resolve(app.dir.dest(), './robots.txt')).toString()
                robots = robots.replace(`Sitemap: ${hostname}/${outFile}`, '') + `\nSitemap: ${hostname}/${outFile}`
            } else {
                //读取自定义robots。txt
                if (fs.existsSync(path.resolve(app.dir.source(), './robots.txt'))) {
                    robots = fs.readFileSync(path.resolve(app.dir.source(), './robots.txt')).toString()
                } else {
                    //读取默认robots。txt
                    robots = fs.readFileSync(path.resolve(__dirname, '../../templates/robots.txt')).toString()
                }
                robots = robots + `\nSitemap: ${hostname}/${outFile}`
            }
            fs.writeFileSync(path.resolve(app.dir.dest(), './robots.txt'), robots, 'utf8');
        }
    }
}

export default VuepressPluginSiteMap
