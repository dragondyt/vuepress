import { useIntersectionObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref } from 'vue'

// 封装一个Hook方法实现数据懒加载
export const useLazyComp = (apiFn: () => any): any => {
  console.log('show')

  // 当前组件进入可视区时触发接口调用
  // 被监听的DOM元素
  const lazyComp: Ref<HTMLDivElement> = ref<any>(null)
  // 调用接口获取的结果
  const result = ref([])
  const { stop } = useIntersectionObserver(lazyComp, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // 进入可视区
      lazyComp.value.classList.add('show')
      apiFn()
      // 停止监听
      stop()
    }
  })
  return { result, lazyComp }
}
