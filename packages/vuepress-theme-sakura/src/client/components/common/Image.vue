<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    alt: string
    src: string
    lazy?: boolean
  }>(),
  {
    lazy: true,
  }
)

const image = ref<HTMLImageElement>()
const placeholder = ref<string>(__VUEPRESS_SSR__ ? props.src : '')
onMounted(() => {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imageDom = entry.target
          placeholder.value = props.src
          imageObserver.unobserve(imageDom)
        }
      })
    },
    {
      rootMargin: '480px',
    }
  )
  imageObserver.observe(image.value!)
})
</script>

<template>
  <img ref="image" loading="lazy" :alt="alt" :src="placeholder" />
</template>

<style scoped></style>
