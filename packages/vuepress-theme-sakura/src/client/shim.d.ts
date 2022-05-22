declare module '*.vue' {
    import type { ComponentOptions } from 'vue'
    const comp: ComponentOptions
    export default comp
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