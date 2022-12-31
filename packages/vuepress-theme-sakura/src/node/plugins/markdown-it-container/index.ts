import type { PluginWithOptions } from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'

/**
 * Code plugin
 */
export const containerPlugin: PluginWithOptions = (
  md,
  {
    highlightLines = true,
    lineNumbers = true,
    preWrapper = true,
    vPre: { block: vPreBlock = true, inline: vPreInline = true } = {},
  } = {}
): void => {
  md.use(MarkdownItContainer, 'note', {
    validate: function (params) {
      return params
        .trim()
        .match(/^(default|primary|success|info|warning|danger)(.*)$/)
    },
    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="note ' + m[1].trim() + '">\n'
      } else {
        // closing tag
        return '</div>\n'
      }
    },
  })
}
