export {}
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof  import('vue-router')['RouterView']
    Content: typeof  import('@vuepress/client')['Content']
    ClientOnly: typeof  import('@vuepress/client')['ClientOnly']
  }
}

declare module '@images/*' {
  import type { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}
