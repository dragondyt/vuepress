import type { Markdown } from '@vuepress/markdown/lib/types'

export function markdownItImg(md: Markdown): void {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const srcItem = tokens[idx]!.attrs!.find((item) => {
      return item[0] === 'src'
    })
    const src = srcItem![1]
    const alt = tokens[idx].content
    return `<AsImage alt="${alt}" src="${src}" :lazy="true" />`
  }
}
