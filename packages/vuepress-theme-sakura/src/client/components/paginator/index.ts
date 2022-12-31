import type { PropType, VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

type Pagination = {
  mid_size: number
  end_size: number
  base: string
  current: number
  total: number
  space: boolean
  showAll?: boolean
}

function passionatePartShow(options: Pagination): VNode[] {
  const tags: VNode[] = []
  const {
    current,
    total,
    space,
    end_size: endSize,
    mid_size: midSize,
    base,
  } = options
  const leftEnd = current <= endSize ? current - 1 : endSize
  const rightEnd =
    total - current <= endSize ? current + 1 : total - endSize + 1
  const leftMid = current - midSize <= endSize ? leftEnd + 1 : current - midSize
  const rightMid =
    current + midSize + endSize > total ? rightEnd - 1 : current + midSize
  const spaceHtml = h('span', { class: 'space' }, { default: () => space })
  const pageTag = (i: number): VNode => {
    return h(
      RouterLink,
      {
        class: `page-number ${i === current ? 'current' : ''}`,
        to: i === 1 ? base : `${base}page/${i}/`,
      },
      { default: () => i }
    )
  }

  // Display pages on the left edge
  for (let i = 1; i <= leftEnd; i++) {
    tags.push(pageTag(i))
  }

  // Display spaces between edges and middle pages
  if (space && current - endSize - midSize > 1) {
    tags.push(spaceHtml)
  }

  // Display left middle pages
  if (leftMid > leftEnd) {
    for (let i = leftMid; i < current; i++) {
      tags.push(pageTag(i))
    }
  }

  // Display the current page
  tags.push(pageTag(current))

  // Display right middle pages
  if (rightMid < rightEnd) {
    for (let i = current + 1; i <= rightMid; i++) {
      tags.push(pageTag(i))
    }
  }

  // Display spaces between edges and middle pages
  if (space && total - endSize - midSize > current) {
    tags.push(spaceHtml)
  }

  // Display pages on the right edge
  for (let i = rightEnd; i <= total; i++) {
    tags.push(pageTag(i))
  }
  return tags
}

const Paginator = defineComponent({
  props: {
    options: {
      type: Object as PropType<Pagination>,
      required: true,
    },
  },
  render() {
    const { current, total, showAll, base } = this.options
    let result: VNode[] = []
    const link = (i: number): string => {
      return i === 1 ? base : `${base}page/${i}/`
    }
    if (current > 1) {
      result.push(
        h(
          RouterLink,
          {
            class: 'extend prev',
            rel: 'prev',
            to: link(current - 1),
          },
          {
            default: () => h('i', { class: 'ic i-angle-left' }),
          }
        )
      )
    }
    if (showAll) {
      for (let i = 1; i <= total; i++) {
        result.push(
          h(
            RouterLink,
            { class: `page-number ${i === current ? 'current' : ''}`, to: '' },
            { default: () => i }
          )
        )
      }
    } else {
      result = result.concat(passionatePartShow(this.options))
    }
    // Display the link to the next page
    if (current < total) {
      result.push(
        h(
          RouterLink,
          {
            class: 'extend next',
            rel: 'next',
            to: link(current + 1),
          },
          {
            default: () => h('i', { class: 'ic i-angle-right' }),
          }
        )
      )
    }
    return result
  },
})
Paginator.name = 'Paginator'
export default Paginator
