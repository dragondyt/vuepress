import type { PluginWithOptions } from 'markdown-it'
import {
  isHighlightLine,
  resolveHighlightLines,
} from './resolveHighlightLines.js'
import { resolveLanguage } from './resolveLanguage.js'

export const codePlugin: PluginWithOptions = (
  md,
  {
    prismjs = true,
    highlightLines = true,
    lineNumbers = true,
    preWrapper = true,
    vPre: { block: vPreBlock = true, inline: vPreInline = true } = {},
  } = {}
): void => {
  const defaultRenderer = md.renderer.rules.fence!.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const text = token.content.trim()
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    // resolve language from token info
    const language = resolveLanguage(info)
    let lang = info.trim().split(' ')[0]
    if (lang === 'info') {
      return `<pre class="info" v-pre><code>${text}</code></pre>`
    }
    // try to get highlighted code
    const code = token.content
    if (lang !== 'raw') {
      // console.debug('raw')
    }
    if (code) {
      lang = language.name
      // code fences always have an ending `\n`, so we should trim the last line
      const lines = code.split('\n').slice(0, -1)
      // resolve highlight line ranges from token info
      const highlightLinesRanges = highlightLines
        ? resolveHighlightLines(info)
        : null
      let content = ''
      for (let index = 0, len = lines.length; index < len; index++) {
        let line =
          (language.name !== 'raw' &&
            options.highlight?.(lines[index], language.name, '')) ||
          md.utils.escapeHtml(lines[index])
        if (
          highlightLinesRanges &&
          isHighlightLine(index + 1, highlightLinesRanges)
        ) {
          content += `<tr class="marked">`
        } else {
          content += `<tr>`
        }
        if (prismjs) {
          line = `<pre>${line}</pre>`
        }
        content += `<td data-num="${index + 1}"></td>`
        content += `<td>${line}</td></tr>`
      }
      return `<figure class="highlight ${lang}">
<figcaption data-lang="${lang}"></figcaption>
<div class="code-container">
<table>${content}</table>
<div class="operation"><span class="breakline-btn"><i class="ic i-align-left"></i></span><span class="copy-btn"><i class="ic i-clipboard"></i></span><span class="fullscreen-btn"><i class="ic i-expand"></i></span></div>
</div>
</figure>`
    }
    return defaultRenderer(tokens, idx, options, env, slf)
  }
}
