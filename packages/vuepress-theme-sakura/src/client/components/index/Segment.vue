<script lang="ts" setup>
import { striptags } from 'striptags'
import MoreBtn from '../common/MoreBtn.vue'
const props = defineProps<{
  post: any
}>()

function symbolsTime(
  post: string,
  awl = 4,
  wpm = 275,
  suffix = 'mins.'
): string {
  const minutes = Math.round(post.length / (awl * wpm))
  return getFormatTime(minutes, suffix)
}

function getFormatTime(minutes, suffix): string {
  const fHours = Math.floor(minutes / 60)
  let fMinutes = Math.floor(minutes - fHours * 60)
  if (fMinutes < 1) {
    fMinutes = 1 // 0 => 1
  }
  return fHours < 1
    ? fMinutes + ' ' + suffix // < 59 => 59 mins.
    : fHours + ':' + ('00' + fMinutes).slice(-2) // = 61 => 1:01
}

function count(post: string): string {
  let symbolsResult = ''
  if (post.length > 9999) {
    symbolsResult = Math.round(post.length / 1000) + 'k' // > 9999 => 11k
  } else if (post.length > 999) {
    symbolsResult = Math.round(post.length / 100) / 10 + 'k' // > 999 => 1.1k
  } // < 999 => 111
  return symbolsResult
}
</script>

<template>
  <article
    class="relative my-4 mx-2 flex h-fit max-h-fit flex-col rounded-[0.5rem]"
    style="
      width: calc(100% - 1rem);
      color: inherit;
      min-width: calc(100% - 1rem);
      box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
      transition: all 0.2s ease-in-out 0s;
      animation: slideUpBigIn 0.5s;
    "
  >
    <div
      class="m-auto h-[14rem] w-full overflow-hidden"
      style="
        clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
        border-radius: 0.625rem 0.625rem 0 0;
      "
    >
      <RouterLink :to="props.post.path">
        <AsImage
          class="h-full w-full object-cover"
          :alt="props.post.title"
          :src="props.post.frontmatter?.cover"
          :lazy="true"
        >
        </AsImage>
      </RouterLink>
    </div>
    <div
      class="relative h-[14rem] w-full px-4 pt-0 pb-12"
      style="perspective: 62.5rem"
    >
      <div
        class="m-0 flex justify-end text-[0.8128em]"
        style="color: var(--grey-5)"
      >
        <span>
          <span>
            <i class="ic i-calendar"></i>
          </span>
          <time>{{ props.post.date }}</time>
        </span>
        <span class="ml-2.5 hidden">
          <span><i class="ic i-pen"></i> </span>
          <span>{{ count(striptags(props.post.contentRendered)) }}</span>
          <span class="text">字</span>
        </span>
        <span class="ml-2.5 hidden">
          <span>
            <i class="ic i-clock"></i>
          </span>
          <span>{{ symbolsTime(striptags(props.post.contentRendered)) }}</span>
        </span>
      </div>
      <h3
        class="my-2.5 mx-0 overflow-hidden text-ellipsis whitespace-nowrap"
        style="color: var(--primary-color)"
      >
        <RouterLink :to="props.post.path">
          {{ props.post.title }}
        </RouterLink>
      </h3>
      <div
        class="max-h-20 overflow-hidden text-ellipsis text-[0.875em]"
        style="
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        "
      >
        {{
          props.post.frontmatter?.description ||
          props.post.frontmatter?.excerpt ||
          striptags(props.post.contentRendered).substring(0, 300)
        }}
      </div>
      <div
        class="absolute bottom-2 m-0 flex justify-start overflow-hidden text-ellipsis whitespace-nowrap text-[.8125em]"
        style="color: var(--grey-5); max-width: calc(100% - 7rem)"
      >
        <span class="mr-2"
          ><RouterLink to="to"
            ><i class="ic i-flag mr-[0.0625rem]"></i
            >{{ props.post.title }}</RouterLink
          ></span
        >
      </div>
      <MoreBtn
        class="absolute bottom-0 right-0 py-[0.3rem] px-4"
        :path="props.post.path"
        :title="props.post.title"
      />
    </div>
  </article>
</template>
