import type { PageHeader } from '@vuepress/shared'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { RouterLink, useRoute } from 'vue-router'

const renderLink = (
  header: PageHeader,
  index: number,
  route: RouteLocationNormalizedLoaded
): VNode => {
  const hash = `#${header.slug}`
  // add active class if any sub-header hash is matched

  return h(
    RouterLink,
    {
      to: hash,
      ariaLabel: header.title,
    },
    [
      h(
        'span',
        {},
        {
          default: () => `${index + 1}.`,
        }
      ),
      h(
        'span',
        {},
        {
          default: () => header.title,
        }
      ),
    ]
  )
}

function renderHeaders(
  headers: any | [],
  route: RouteLocationNormalizedLoaded,
  notTop?: boolean
): VNode[] {
  if (headers.length === 0) {
    return []
  }

  return [
    h(
      'ol',
      {
        class: `pt-0 pl-2.5 pr-[0.125rem] pb-[0.3125rem] text-left ${
          !notTop ? '' : 'hidden'
        }`,
      },
      () =>
        headers.map((header, index) =>
          h(
            'li',
            {
              class: `text-[1em] leading-[1.8] overflow-hidden overflow-ellipsis whitespace-nowrap toc-level-${header.level}`,
            },
            () => [
              renderLink(header, index, route),
              renderHeaders(header.children, route, true),
            ]
          )
        )
    ),
  ]
}

export const Toc = defineComponent({
  name: 'Toc',
  props: {
    headers: {},
  },
  setup(props) {
    const route = useRoute()
    return () => {
      return renderHeaders(props.headers, route)
    }
  },
})
