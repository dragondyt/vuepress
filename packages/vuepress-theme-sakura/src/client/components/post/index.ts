import { usePageData } from '@vuepress/client'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const PostNav = defineComponent({
  render() {
    const pageData = usePageData()
    const { t } = useI18n()
    function navPost(post: any, type: string): VNode | undefined {
      if (post) {
        return h(
          RouterLink,
          {
            to: post.path,
          },
          () => [
            h('span', { type: 'type' }, () => t('post.' + type)),
            h('span', { class: 'category' }, () => [
              h('i', { class: 'ic i-flag' }),
              { default: () => post.category.name },
            ]),
            h('h3', {}, () => post.title || post.link || t('post.untitled')),
          ]
        )
      }
      return undefined
    }
    return h(
      'div',
      {
        class: 'post-nav',
      },
      [
        h('div', { class: 'item left' }, () =>
          navPost(pageData.value.frontmatter.prev, 'prev')
        ),
        h('div', { class: 'item right' }, () =>
          navPost(pageData.value.frontmatter.next, 'next')
        ),
      ]
    )
  },
})
PostNav.name = 'PostNav'
export default PostNav
