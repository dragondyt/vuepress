import type { Markdown } from '@vuepress/markdown/lib/types'
import * as Prism from 'prismjs'
import * as loadLanguages from 'prismjs/components/'
import {htmlUnescape} from "@vuepress/shared";
const { escapeHTML } = require('hexo-util')
const pangu = require('pangu')
const LanguagesTip = require('./lang')
const escapeSwigTag = (str): string =>
  str.replace(/{/g, '&#123;').replace(/}/g, '&#125;')
const unescapeSwigTag = (str) =>
  str.replace(/&#123;/g, '{').replace(/&#125;/g, '}')

export function markdownItPrism(md: Markdown, options = {}): void {
  const config: {
    plugins: string[]
    defaultLanguageForUnknown: undefined | string
    defaultLanguageForUnspecified: undefined | string
    defaultLanguage: undefined | string
    line_number: boolean
    init: (prism) => void
  } = {
    plugins: [
      'autolinker',
      'show-invisibles',
      'normalize-whitespace',
      'diff-highlight',
    ], // {String[]} Names of Prism plugins to load
    init: (prism) => {
      //
    },
    defaultLanguageForUnknown: undefined, // The language to use for code blocks that specify a language that Prism does not know
    defaultLanguageForUnspecified: undefined, // The language to use for code block that do not specify a language
    defaultLanguage: undefined, // Shorthand to set both {@code defaultLanguageForUnknown} and {@code defaultLanguageForUnspecified} to the same value
    line_number: true,
    ...options,
  }

  checkLanguageOption(config, 'defaultLanguage')
  checkLanguageOption(config, 'defaultLanguageForUnknown')
  checkLanguageOption(config, 'defaultLanguageForUnspecified')
  config.defaultLanguageForUnknown =
    config.defaultLanguageForUnknown || config.defaultLanguage
  config.defaultLanguageForUnspecified =
    config.defaultLanguageForUnspecified || config.defaultLanguage

  config.plugins.forEach(loadPrismPlugin)

  Prism.hooks.add('wrap', function (env) {
    if (env.type === 'comment') {
      env.content = pangu.spacing(env.content)
    }
  })
  config.init(Prism)

  const defaultRenderer = md.renderer.rules.fence!.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const text = token.content.trim()
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const lang = info.trim().split(' ')[0]
    let code: string | null = null
    // resolve language from token info
    let [langToUse, langShow, prismLang] = selectLanguage(options, lang)
    const {
      firstLine = 1,
      caption = '',
      mark = false,
      command = false,
    } = getOptions(info.slice(lang.length))
    if (prismLang) {
      code = unescapeSwigTag(text)
    } else if (lang === 'raw') {
      code = escapeHTML(pangu.spacing(unescapeSwigTag(text)))
      langShow = null
    }
    if (code) {
      // code = escapeSwigTag(code)
      const lines = code.split('\n')
      let content = ''
      for (let i = 0, len = lines.length; i < len; i++) {
        const line: string = prismLang
          ? md.options.highlight?.(lines[i], langToUse, '') || lines[i]
          : lines[i]
        const lineno = Number(firstLine) + i
        if (mark && Array.isArray(mark) && mark.includes(lineno)) {
          content += `<tr class="marked">`
        } else {
          content += `<tr>`
        }
        content += `<td data-num="${lineno}"></td>`
        if (command) {
          content += `<td data-command="${command[lineno] || ''}"></td>`
        }
        content += `<td>${htmlUnescape(line)}</td></tr>`
      }
      let result = `<figure class="highlight">`

      result += `<figcaption data-lang="${
        langShow || ''
      }">${caption}</figcaption>`

      result += `<div class="code-container"><table>${content}</table></div></figure>`
      return result
    }
    if (lang === 'info') {
      return `<pre class="info" v-pre><code>${text}</code></pre>`
    } else {
      return defaultRenderer(tokens, idx, options, env, slf)
    }
  }
}

/**
 * Checks whether an option represents a valid Prism language
 *
 * @param {MarkdownItPrismOptions} options
 *        The options that have been used to initialise the plugin.
 * @param optionName
 *        The key of the option insides {@code options} that shall be checked.
 * @throws {Error} If the option is not set to a valid Prism language.
 */
function checkLanguageOption(options, optionName): void {
  const language = options[optionName]
  if (language !== undefined && loadPrismLang(language) === undefined) {
    throw new Error(
      `Bad option ${optionName}: There is no Prism language '${language}'.`
    )
  }
}

/**
 * Loads the provided Prism plugin.a
 * @param name
 *        Name of the plugin to load
 * @throws {Error} If there is no plugin with the provided {@code name}
 */
function loadPrismPlugin(name): void {
  try {
    require(`prismjs/plugins/${name}/prism-${name}`)
  } catch (e) {
    throw new Error(
      `Cannot load Prism plugin "${name}". Please check the spelling.`
    )
  }
}

/**
 * Loads the provided {@code lang} into prism.
 *
 * @param {String} lang
 *        Code of the language to load.
 * @return {Object} The Prism language object for the provided {@code lang} code. {@code undefined} if the language is not known to Prism.
 */
function loadPrismLang(lang): undefined | string {
  if (!lang) return undefined
  let langObject = Prism.languages[lang]
  if (langObject === undefined) {
    loadLanguages([lang])
    langObject = Prism.languages[lang]
  }
  return langObject
}

/**
 * Select the language to use for highlighting, based on the provided options and the specified language.
 *
 * @param {Object} options
 *        The options that were used to initialise the plugin.
 * @param {String} lang
 *        Code of the language to highlight the text in.
 * @return {Array} An array where the first element is the name of the language to use, and the second element is the PRISM language object for that language.
 */
function selectLanguage(
  options,
  lang
): [langToUse: string, langShow: string | null, prismLang: string | undefined] {
  let langToUse = lang
  if (langToUse === '' && options.defaultLanguageForUnspecified !== undefined) {
    langToUse = options.defaultLanguageForUnspecified
  }
  const langShow = LanguagesTip[langToUse] || langToUse
  let prismLang = loadPrismLang(langToUse)
  if (
    prismLang === undefined &&
    options.defaultLanguageForUnknown !== undefined
  ) {
    langToUse = options.defaultLanguageForUnknown
    prismLang = loadPrismLang(langToUse)
  }
  return [langToUse, langShow, prismLang]
}

function getOptions(info): {
  firstLine: number
  caption: string
  mark: boolean | number[]
  command:
    | {
        [key: number]: string
      }
    | boolean
} {
  const rFirstLine = /\s*first_line:(\d+)/i
  const rMark = /\s*mark:([0-9,-]+)/i
  const rCommand = /\s*command:\((\S[\S\s]*)\)/i
  const rSubCommand = /"+(\S[\S\s]*)"(:([0-9,-]+))?/i
  const rCaptionUrlTitle = /(\S[\S\s]*)\s+(https?:\/\/)(\S+)\s+(.+)/i
  const rCaptionUrl = /(\S[\S\s]*)\s+(https?:\/\/)(\S+)/i
  const rCaption = /(\S[\S\s]*)/

  let firstLine = 1
  if (rFirstLine.test(info)) {
    info = info.replace(rFirstLine, (match, _firstLine) => {
      firstLine = _firstLine
      return ''
    })
  }

  let mark: boolean | number[] = false
  if (rMark.test(info)) {
    mark = []
    info = info.replace(rMark, (match, _mark) => {
      mark = _mark
        .split(',')
        .reduce((prev, cur) => lineRange(prev, cur, false), mark)
      return ''
    })
  }

  let command:
    | boolean
    | {
        [key: number]: string
      } = false
  if (rCommand.test(info)) {
    command = {}
    info = info.replace(rCommand, (match, _command) => {
      _command.split('||').forEach((cmd) => {
        if (rSubCommand.test(cmd)) {
          const match = cmd.match(rSubCommand)

          if (match[1]) {
            command = match[3]
              .split(',')
              .reduce((prev, cur) => lineRange(prev, cur, match[1]), command)
          } else {
            command[1] = match[1]
          }
        }
      })
      return ''
    })
  }

  let caption = ''
  if (rCaptionUrlTitle.test(info)) {
    const match = info.match(rCaptionUrlTitle)
    caption = `<span>${match[1]}</span><a href="${match[2]}${match[3]}">${match[4]}</a>`
  } else if (rCaptionUrl.test(info)) {
    const match = info.match(rCaptionUrl)
    caption = `<span>${match[1]}</span><a href="${match[2]}${match[3]}">link</a>`
  } else if (rCaption.test(info)) {
    const match = info.match(rCaption)
    caption = `<span>${match[1]}</span>`
  }

  return {
    firstLine,
    caption,
    mark,
    command,
  }
}

function lineRange(prev: number[], cur: string, value): any {
  const prevd = function (key: number): void {
    if (value) {
      prev[key] = value
    } else {
      prev.push(key)
    }
  }
  if (/-/.test(cur)) {
    let a = Number(cur.substring(0, cur.indexOf('-')))
    let b = Number(cur.substring(cur.indexOf('-') + 1))
    if (b < a) {
      // switch a & b
      const temp = a
      a = b
      b = temp
    }

    for (; a <= b; a++) {
      prevd(a)
      // prev[a] = value;
    }

    return prev
  }
  prevd(Number(cur))
  return prev
}
