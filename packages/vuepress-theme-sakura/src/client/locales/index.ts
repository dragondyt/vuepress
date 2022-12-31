// index.ts
import blog from '@temp/blog'
import { createI18n } from 'vue-i18n'
import en from './lang/en-US.js'
import zh from './lang/zh-CN.js'

const messages = {
  'en-US': en,
  'zh-CN': zh,
}
/* let language = 'en'
if (!__VUEPRESS_SSR__) {
  // 这是获取浏览器的语言
  language =
    localStorage.getItem('lang') ||
    (navigator.language || 'en').toLocaleLowerCase().split('-')[0] ||
    'en'
} */
const i18n = createI18n({
  legacy: false,
  locale: blog.lang, // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en-US', // 设置备用语言
  messages,
})

export default i18n
