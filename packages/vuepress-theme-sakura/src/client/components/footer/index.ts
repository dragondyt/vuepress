import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBlogStateHook } from '../../store/blog.js'
import RecentComment from './RecentComment.vue'
const Footer = defineComponent({
  render() {
    const blogStateHook = useBlogStateHook()
    const fullYear = new Date().getFullYear()
    const { t } = useI18n()
    return h(
      'footer',
      { id: 'footer' },
      h('div', { class: 'inner' }, [
        h('div', { class: 'widgets' }, [
          blogStateHook?.widgets?.random_posts
            ? h('div', { class: 'rpost pjax' }, [
                h('h2', null, { default: () => t('index.random_posts') }),
                h('ul'),
              ])
            : [],
          h(RecentComment, {
            api: blogStateHook.comment?.waline?.serverURL,
          }),
        ]),
        h('div', { class: 'status' }, [
          h('div', { class: 'copyright' }, [
            `© ${
              blogStateHook.footer.since !== fullYear
                ? blogStateHook.footer.since + ' - '
                : ''
            }`,
            h('span', null, { default: () => fullYear }),
            h(
              'span',
              { class: 'with-love' },
              h('i', { class: `ic i-${blogStateHook.footer?.icon?.name}` })
            ),
            h(
              'span',
              { class: 'author' },
              {
                default: () =>
                  `${blogStateHook.author} @ ${
                    blogStateHook.alternate || blogStateHook.title
                  }`,
              }
            ),
          ]),
        ]),
      ])
    )
  },
})
Footer.name = 'Footer'
export default Footer
