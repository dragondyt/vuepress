import type { PropType, VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import type { MenuItem } from '../../../shared/themeOption.js'

const MenuComponent = defineComponent({
  props: {
    menus: {
      type: Object as PropType<Array<MenuItem>>,
      required: true,
    },
  },
  render() {
    const result: VNode[] = []
    for (const menu of this.menus) {
      if (!menu.children) {
        result.push(
          h(
            'li',
            { class: 'item' },
            {
              default: () =>
                h(RouterLink, { to: menu.path }, [
                  h('i', { class: 'ic i-paper-plane' }),
                ]),
            }
          )
        )
      } else {
        result.push(
          h('li', { class: 'item dropdown' }, [
            h(RouterLink, { to: menu.path }, () => [
              h('i', { class: 'ic i-paper-plane' }),
              menu.name,
            ]),
            h(
              'ul',
              { class: 'submenu' },
              menu.children?.map((m) =>
                h(
                  'li',
                  { class: 'item' },
                  h(RouterLink, { to: m.path }, () => [
                    h('i', { class: 'ic i-paper-plane' }),
                    m.name,
                  ])
                )
              )
            ),
          ])
        )
      }
    }
    return result
  },
})
MenuComponent.name = 'MenuComponent'
export default MenuComponent
