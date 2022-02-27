declare module '*.vue' {
    import type {ComponentOptions} from 'vue'
    const comp: ComponentOptions
    export default comp
}
declare module '@temp/categories' {
    import {Category} from "../types/category";
    const cats: {
        catList: Category[]
    }
    export default cats
}
declare module '@temp/allCategory' {
    import {Category} from "../types/category";
    const cats: {
        allCategory: Category[]
    }
    export default cats
}
declare module '@temp/allPost' {
    import {PageData} from "../shared";
    const data: Array<PageData>
    export default data
}
declare module '@temp/stickyList' {
    import {PageData} from "../shared";
    const data: Array<PageData>
    export default data
}
declare module '@temp/catList' {
    import {PageData} from "../shared";
    const data: Array<PageData>
    export default data
}
declare module '@temp/tags' {
    const data: {
        tags: string[],
    }
    export default data
}