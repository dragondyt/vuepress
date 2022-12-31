import dayjs from 'dayjs'
import type { PropType, VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

type Post = {
  path: string
  title: string
  date: string
  link: string
  categories: [
    {
      path: string
      name: string
      length: number
      slug: string
    }
  ]
}
const CategoryItem = defineComponent({
  props: {
    posts: {
      type: Object as PropType<Array<Post>>,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
  render: function () {
    const result: VNode[] = []
    let current = 'c'
    for (const post of this.posts) {
      if (post.categories) {
        let lastcat: VNode[] = []
        let lastcatslug = ''
        for (let i = 0; i < post.categories.length; i++) {
          const category = post.categories[i]
          if (category.name === this.name) {
            lastcat = []
            lastcatslug = ''
          } else {
            lastcat = lastcat.concat([
              h(
                RouterLink,
                {
                  to: category.path,
                },
                {
                  default: () => category.name,
                }
              ),
              h('small', null, {
                default: () =>
                  i === post.categories.length - 1
                    ? `( ${category.length} )`
                    : '/',
              }),
            ])
            lastcatslug = lastcatslug + category.slug
          }
        }
        if (
          lastcat &&
          lastcat.length &&
          lastcatslug &&
          lastcatslug !== current
        ) {
          const item = h(
            'h3',
            {
              class: 'item section',
            },
            lastcat
          )
          result.push(item)
          current = lastcatslug
        }
        result.push(
          h(
            'article',
            {
              class: 'item normal',
            },
            [
              h(
                'div',
                { class: 'meta' },
                h('time', null, {
                  default: () => dayjs(post.date).format('MM-DD'),
                })
              ),
              h(
                'div',
                { class: 'title' },
                post.link
                  ? h(RouterLink, { to: post.link }, [
                      <any>{ default: () => post.title },
                      h('i', { class: 'ic i-link-alt' }),
                    ])
                  : h(RouterLink, { to: post.path }, () =>
                      h('span', null, {
                        default: () => post.title || '未命名',
                      })
                    )
              ),
            ]
          )
        )
      }
    }
    return result
  },
})
CategoryItem.name = 'CategoryItem'
export default CategoryItem
