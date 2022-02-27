import type {Plugin} from "@vuepress/core"

export const VuepressPluginSeo: Plugin = (options, app) => {
    return {
        name: "@dragondyt/vuepress-plugin-seo",
        onPrepared: (app) => {
            //去除无效的，按时间降序
            const pages = app.pages
                .map(_ => {
                    if (!_.frontmatter.head) {
                        _.frontmatter.head = []
                    }
                    return _
                })
                .filter(item => item.path !== '/' && item.path !== '/404.html'
                    && item.path !== '/archives/' && item.path !== '/categories/' && item.path !== '/tags/' && !item.path.startsWith('/page/'))

            for (let i = 0; i < pages.length; i++) {
                pages[i].frontmatter.head?.push([
                    'script', {
                        'type': 'application/ld+json'
                    },
                    `{
      "@context": "https://schema.org",
      "@type": "${pages[i].frontmatter?.type || 'NewsArticle'}",
      "headline": "${pages[i].title}",
      "image": [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg"
       ],
      "datePublished": "${pages[i].frontmatter.date}",
      "dateModified": "${pages[i].frontmatter.date}",
      "author": [{
          "@type": "Person",
          "name": "Dyt",
          "url": "https://blog.dragondyt.top/profile/dyt"
        }]
    }`
                ])
            }
        }
    }
}

export default VuepressPluginSeo
