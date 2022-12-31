<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import Footer from '../components/footer/index.js'
import MenuComponent from '../components/menu/index.js'
import Search from '../components/search/Search.vue'
import Sidebar from '../components/sidebar/Sidebar.vue'
import { useBlogStateHook } from '../store/blog.js'
import { transition } from '../utils/index.js'

const siteLocaleData = useSiteLocaleData()
const covers =
  'https://avatars.mds.yandex.net/i?id=49a9245e2a63af52b8d64ab9a7193244-5161321-images-thumbs&n=13'
const darkTheme = ref(false)
const blogStateHook = useBlogStateHook()

function changeTheme(): void {
  darkTheme.value = !darkTheme.value
  blogStateHook.theme = darkTheme.value ? 'light' : 'dark'
  const neko: HTMLDivElement = document.body.appendChild(
    Object.assign(document.createElement('div'), {
      id: 'neko',
      innerHTML:
        '<div class="planet"><div class="sun"></div><div class="moon"></div></div><div class="body"><div class="face"><section class="eyes left"><span class="pupil"></span></section><section class="eyes right"><span class="pupil"></span></section><span class="nose"></span></div></div>',
    })
  )
  const hideNeko = function (): void {
    transition(
      neko,
      {
        delay: 2500,
        opacity: 0,
      },
      function () {
        document.body.removeChild(neko)
      }
    )
  }
  let c: () => void
  if (!darkTheme.value) {
    c = function () {
      neko.classList.add('dark')
      document.documentElement.classList.toggle('dark', !darkTheme.value)
      hideNeko()
    }
  } else {
    c = function () {
      neko.classList.remove('dark')
      document.documentElement.classList.toggle('dark', !darkTheme.value)
      hideNeko()
    }
  }
  transition(neko, 1, function () {
    setTimeout(c, 210)
  })
}

const siteNav: Ref<HTMLDivElement> = ref<any>()
const siteHeader: Ref<HTMLDivElement> = ref<any>()
const sideBar: Ref<HTMLDivElement> = ref<any>()
const siteBrand: Ref<HTMLDivElement> = ref<any>()
const waves: Ref<HTMLDivElement> = ref<any>()
const mainInner: Ref<HTMLDivElement> = ref<any>()
const menuToggle: Ref<HTMLDivElement> = ref<any>()
let headerHightInner, headerHight

function resizeHandle(): void {
  blogStateHook.siteNavHeight = siteNav.value.getBoundingClientRect().height
  headerHightInner = siteHeader.value.getBoundingClientRect().height
  headerHight = headerHightInner + waves.value.getBoundingClientRect().height
  //
  // if (oWinWidth !== window.innerWidth) sideBarToggleHandle(null, 1)
  //
  // oWinHeight = window.innerHeight
  // oWinWidth = window.innerWidth
  // sideBar.child('.panels').height(oWinHeight + 'px')
}

let diffY = 0
const scrollAction: any = { x: 'undefined', y: 'undefined' }

function scrollHandle(): void {
  const SHOW = window.pageYOffset > headerHightInner
  const startScroll = window.pageYOffset > 0
  siteNav.value.classList.toggle('show', SHOW)
  siteBrand.value.classList.toggle('affix', startScroll)
  sideBar.value.classList.toggle(
    'affix',
    window.pageYOffset > headerHight && document.body.offsetWidth > 991
  )

  if (typeof scrollAction.y === 'undefined') {
    scrollAction.y = window.pageYOffset
  }
  diffY = scrollAction.y - window.pageYOffset
  if (diffY < 0) {
    // Scroll down
    siteNav.value.classList.remove('up')
    siteNav.value.classList.toggle('down', SHOW)
  } else if (diffY > 0) {
    // Scroll up
    siteNav.value.classList.remove('down')
    siteNav.value.classList.toggle('up', SHOW)
  } else {
    // First scroll event
  }
  // scrollAction.x = Container.scrollLeft;
  scrollAction.y = window.pageYOffset
}

function toggleSidebar(): void {
  if (sideBar.value.classList.contains('on')) {
    sideBar.value.classList.remove('on')
    menuToggle.value.classList.remove('close')
    transition(sideBar.value, 'slideRightOut')
  } else {
    transition(sideBar.value, 'slideRightIn', function () {
      sideBar.value.classList.add('on')
      menuToggle.value.classList.add('close')
    })
  }
}

function toggleSearch(): void {
  blogStateHook.showSearch = true
}

interface Comment {
  id: string | ''
  nick: string | undefined
  objectId: string | undefined
  comment: string | undefined
  mail: string | undefined
  url: string | undefined
  link: string | undefined
}

const comments = ref<Comment[]>([])
const recentComment = ref<HTMLDivElement>()
onMounted(() => {
  // init
  const originTitle = document.title
  let titleTime
  darkTheme.value = localStorage.getItem('vuepress-color-scheme') !== 'dark'
  // init-end
  document.addEventListener('visibilitychange', function () {
    switch (document.visibilityState) {
      case 'hidden':
        document.title = '(´Д｀)大変だ！'
        clearTimeout(titleTime)
        break
      case 'visible':
        document.title = '（●´3｀●）やれやれだぜ'
        titleTime = setTimeout(function () {
          document.title = originTitle
        }, 2000)
        break
      default:
        break
    }
  })
  window.addEventListener('scroll', scrollHandle)
  window.addEventListener('resize', resizeHandle)
  resizeHandle()
  document.body.classList.add('loaded')
  fetch('https://waline-chi-weld.vercel.app/comment?type=recent&count=10')
    .then((response) => response.json())
    .then((data) => {
      recentComment.value?.classList.add('loaded')
      return (comments.value = data)
    })
    .catch()
})
onUnmounted(() => {
  // init
  const originTitle = document.title
  let titleTime
  document.removeEventListener('visibilitychange', function () {
    switch (document.visibilityState) {
      case 'hidden':
        document.title = '(´Д｀)大変だ！'
        clearTimeout(titleTime)
        break
      case 'visible':
        document.title = '（●´3｀●）やれやれだぜ'
        titleTime = setTimeout(function () {
          document.title = originTitle
        }, 2000)
        break
      default:
        break
    }
  })
  window.removeEventListener('scroll', scrollHandle)
  window.removeEventListener('resize', resizeHandle)
})
</script>
<template>
  <header id="header" ref="siteHeader">
    <div class="inner">
      <div id="brand" ref="siteBrand">
        <div class="pjax">
          <slot name="header">
            <RouterLink :to="siteLocaleData.base" class="logo" rel="start">
              <p v-if="blogStateHook.alternate" class="artboard">
                {{ blogStateHook.alternate }}
              </p>
              <h1 itemprop="name headline" class="title">
                {{ blogStateHook.title }}
              </h1>
            </RouterLink>
            <p
              v-if="blogStateHook.subtitle"
              class="meta"
              itemprop="description"
            >
              = {{ blogStateHook.subtitle }} =
            </p>
          </slot>
        </div>
      </div>
      <nav id="nav" ref="siteNav">
        <div class="inner">
          <div ref="menuToggle" class="toggle" @click="toggleSidebar">
            <div class="lines" aria-label="切换导航栏">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </div>
          </div>
          <ul class="menu">
            <li class="item title">
              <RouterLink :to="siteLocaleData.base" rel="start"
                >{{ blogStateHook.alternate || blogStateHook.title }}
              </RouterLink>
            </li>
            <MenuComponent :menus="blogStateHook.menus" />
          </ul>
          <ul class="right">
            <li class="item theme" @click="changeTheme">
              <i class="ic" :class="darkTheme ? 'i-sun' : 'i-moon'"></i>
            </li>
            <li class="item search" @click="toggleSearch">
              <i class="ic i-search"></i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div id="imgs" class="pjax">
      <img :src="covers" alt="covers" />
    </div>
    <div id="tool">
      <div class="item player"></div>
      <div class="item contents"><i class="ic i-list-ol"></i></div>
      <div class="item chat"><i class="ic i-comments"></i></div>
      <div class="item back-to-top">
        <i class="ic i-arrow-up"></i><span>0%</span>
      </div>
    </div>
  </header>
  <div id="waves" ref="waves">
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" />
        <use xlink:href="#gentle-wave" x="48" y="3" />
        <use xlink:href="#gentle-wave" x="48" y="5" />
        <use xlink:href="#gentle-wave" x="48" y="7" />
      </g>
    </svg>
  </div>
  <main>
    <div ref="mainInner" class="inner">
      <div id="main" class="pjax">
        <slot name="content" />
      </div>
      <div id="sidebar" ref="sideBar">
        <slot name="sidebar">
          <Sidebar />
        </slot>
      </div>
      <div class="dimmer" @click="toggleSidebar"></div>
    </div>
  </main>
  <Footer />
  <Search />
</template>
