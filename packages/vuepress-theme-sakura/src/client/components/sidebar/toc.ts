import type { PageHeader } from '@vuepress/client'
import { usePageData } from '@vuepress/client'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

const Toc = defineComponent({
  render() {
    const pageData = usePageData()
    function renderLevel(data: PageHeader, pIndex = 0, flag = false): VNode {
      return h(
        'ol',
        { class: `${flag ? 'toc' : 'toc-child'}` },
        data.children.map((header, index) =>
          h('li', { class: `toc-item toc-level-${header.level}` }, [
            h('a', { href: header.link, class: 'toc-link' }, [
              h(
                'span',
                { class: 'toc-number' },
                {
                  default: () =>
                    `${pIndex === 0 ? '' : pIndex + '.'}${index + 1}. `,
                }
              ),
              h('span', { class: 'toc-text' }, { default: () => header.title }),
            ]),
            header?.children && header?.children.length > 0
              ? renderLevel(header, index + 1)
              : [],
          ])
        )
      )
    }
    return renderLevel(
      {
        level: 0,
        title: '',
        slug: '',
        link: '',
        children: pageData.value.headers,
      },
      0,
      true
    )
  },
})
Toc.name = 'Toc'
export default Toc
