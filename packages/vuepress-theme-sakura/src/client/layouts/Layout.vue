<script lang="ts" setup>
import { usePageData } from '@vuepress/client'
import anime from 'animejs'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import Comment from '../../../lib/client/components/comment/Comment.vue'
import Breadcrumb from '../../../lib/client/components/post/Breadcrumb.vue'
import Message from '../components/message/index.js'
import PostNav from '../components/post/index.js'
import PostFooter from '../components/post/PostFooter.vue'
import PostMeta from '../components/post/PostMeta.vue'
import PostReward from '../components/post/PostReward.vue'
import Sidebar from '../components/sidebar/Sidebar.vue'
import { useBlogStateHook } from '../store/blog.js'
import BaseLayout from './BaseLayout.vue'

const pageData = usePageData()
const title = computed(() => pageData.value.title)
const articleContent: Ref<HTMLDivElement> = ref<any>()
const clipBoard = function (str, callback): void {
  const ta = document.body.appendChild(
    Object.assign(document.createElement('textarea'), {
      style: {
        top: window.scrollY + 'px', // Prevent page scrolling
        position: 'absolute',
        opacity: '0',
      },
      readOnly: true,
      value: str,
    })
  )

  const selection: Selection = <Selection>document.getSelection()
  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
  ta.select()
  ta.setSelectionRange(0, str.length)
  ta.readOnly = false
  const result = document.execCommand('copy')
  callback && callback(result)
  ta.blur() // For iOS
  if (selected) {
    selection.removeAllRanges()
    selection.addRange(selected)
  }
  document.body.removeChild(ta)
}
const pageScroll = function (target, offset?, complete?): void {
  const opt = {
    targets:
      typeof offset === 'number'
        ? target.parentNode
        : document.scrollingElement,
    duration: 500,
    easing: 'easeInOutQuad',
    scrollTop:
      offset ||
      (typeof target === 'number'
        ? target
        : target
        ? target.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          siteNavHeight
        : 0),
    complete: function () {
      complete && complete()
    },
  }
  anime(opt)
}
const blogStateHook = useBlogStateHook()
const siteNavHeight = blogStateHook.siteNavHeight
onMounted(() => {
  // articleContent.value
  document.body
    .querySelectorAll('figure.highlight')
    .forEach(function (element) {
      const codeContainer: HTMLDivElement = <HTMLDivElement>(
        element.querySelector('.code-container')
      )
      const caption = element.querySelector('figcaption')

      const copyBtn: HTMLDivElement = <HTMLDivElement>(
        element.querySelector('.copy-btn')
      )

      copyBtn.addEventListener('click', function (event) {
        const target: HTMLDivElement = <HTMLDivElement>event.currentTarget
        let comma = ''
        let code = ''
        codeContainer.querySelectorAll('pre').forEach(function (line) {
          code += comma + line.innerText
          comma = '\n'
        })

        clipBoard(code, function (result) {
          target.querySelector('.ic')!.className = result
            ? 'ic i-check'
            : 'ic i-times'
          target.blur()
          Message.info(blogStateHook.copyright)
        })
      })
      copyBtn.addEventListener('mouseleave', function (event) {
        setTimeout(function () {
          const target: HTMLDivElement = <HTMLDivElement>event.target
          target.querySelector('.ic')!.className = 'ic i-clipboard'
        }, 1000)
      })

      const breakBtn: HTMLDivElement = <HTMLDivElement>(
        element.querySelector('.breakline-btn')
      )
      breakBtn.addEventListener('click', function (event) {
        const target: HTMLDivElement = <HTMLDivElement>event.currentTarget
        if (element.classList.contains('breakline')) {
          element.classList.remove('breakline')
          target.querySelector('.ic')!.className = 'ic i-align-left'
        } else {
          element.classList.add('breakline')
          target.querySelector('.ic')!.className = 'ic i-align-justify'
        }
      })

      const fullscreenBtn: HTMLDivElement = <HTMLDivElement>(
        element.querySelector('.fullscreen-btn')
      )
      const removeFullscreen = function (): void {
        element.classList.remove('fullscreen')
        element.scrollTop = 0
        document.body.classList.remove('fullscreen')
        fullscreenBtn.querySelector('.ic')!.className = 'ic i-expand'
      }
      const fullscreenHandle = function (event): void {
        if (element.classList.contains('fullscreen')) {
          removeFullscreen()
          hideCode && hideCode()
          pageScroll(element)
        } else {
          element.classList.add('fullscreen')
          document.body.classList.add('fullscreen')
          fullscreenBtn.querySelector('.ic')!.className = 'ic i-compress'
          showCode && showCode()
        }
      }
      fullscreenBtn.addEventListener('click', fullscreenHandle)
      caption && caption.addEventListener('click', fullscreenHandle)

      if (codeContainer && codeContainer.querySelectorAll('tr')!.length > 15) {
        codeContainer.style.maxHeight = '300px'
        codeContainer.insertAdjacentHTML(
          'beforeend',
          '<div class="show-btn"><i class="ic i-angle-down"></i></div>'
        )
        const showBtn: HTMLDivElement = <HTMLDivElement>(
          codeContainer.querySelector('.show-btn')
        )

        var showCode = function (): void {
          codeContainer.style.maxHeight = ''
          showBtn.classList.add('open')
        }

        var hideCode = function (): void {
          codeContainer.style.maxHeight = '300px'
          showBtn.classList.remove('open')
        }

        showBtn.addEventListener('click', function (event) {
          if (showBtn.classList.contains('open')) {
            removeFullscreen()
            hideCode()
            pageScroll(codeContainer)
          } else {
            showCode()
          }
        })
      }
    })
})
</script>
<template>
  <BaseLayout>
    <template #header>
      <h1 itemprop="name headline">
        <RouterLink :to="pageData.path">
          {{ title }}
          <i v-if="pageData.frontmatter.link" class="ic i-link-alt"></i
        ></RouterLink>
      </h1>
      <PostMeta :item="pageData.frontmatter" />
    </template>
    <template #content>
      <div class="article wrap">
        <Breadcrumb :post="pageData.frontmatter" :home="true" />
        <article
          itemscope
          itemtype="http://schema.org/Article"
          class="post block"
          lang="post.lang"
        >
          <link itemprop="mainEntityOfPage" href="post.permalink" />

          <span
            hidden
            itemprop="author"
            itemscope
            itemtype="http://schema.org/Person"
          >
            <meta itemprop="image" content="theme.sidebar.avatar" />
            <meta itemprop="name" content="author" />
            <meta itemprop="description" content="subtitle, description " />
          </span>

          <span
            hidden
            itemprop="publisher"
            itemscope
            itemtype="http://schema.org/Organization"
          >
            <meta itemprop="name" :content="title" />
          </span>
          <Content
            ref="articleContent"
            class="body md"
            itemprop="articleBody"
          />

          <footer>
            <PostFooter />
            <PostReward />
            <div id="copyright">
              <ul>
                <li class="author">
                  <strong>本文作者： </strong>Ruri Shimotsuki
                  <i class="ic i-at"><em>@</em></i
                  >優萌初華
                </li>
                <li class="link">
                  <strong>本文链接：</strong>
                  <a
                    href="https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/"
                    title="Hexo 主题 Shoka &amp; multi-markdown-it 渲染器使用说明"
                    data-pjax-state=""
                    >https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/</a
                  >
                </li>
                <li class="license">
                  <strong>版权声明： </strong>本站所有文章除特别声明外，均采用
                  <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                    rel="noopener external nofollow noreferrer"
                    target="_blank"
                    class="exturl"
                    title="(CC)BY-NC-SA"
                    ><i class="ic i-creative-commons"><em>(CC)</em></i
                    >BY-NC-SA</a
                  >
                  许可协议。转载请注明出处！
                </li>
              </ul>
            </div>
          </footer>
        </article>
      </div>
      <PostNav />
      <Comment />
    </template>
    <template #sidebar>
      <Sidebar :display_toc="true" />
    </template>
  </BaseLayout>
</template>
<style></style>
