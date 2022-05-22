declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        RouterLink: typeof import("vue-router")["RouterLink"]
        RouterView: typeof import("vue-router")["RouterView"]
        Content: typeof import("@vuepress/client")["Content"]
        ClientOnly: typeof import("@vuepress/client")["ClientOnly"]
    }
}

declare module '@images/*' {
    import type { ComponentOptions } from 'vue'
    const comp: ComponentOptions
    export default comp
}
declare module '@theme/*' {
    import type { ComponentOptions } from 'vue'
    const comp: ComponentOptions
    export default comp
}
declare module '@theme/SakuraLayout.vue' {
    import SakuraLayout from './components/SakuraLayout.vue'
    export default SakuraLayout
}

declare module '@temp/postList' {
    import {PageData} from "../shared";
    const data: Array<PageData>
    export default data
}