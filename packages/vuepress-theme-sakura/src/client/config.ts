import {defineClientConfig} from '@vuepress/client'
import TagLayout from './components/TagLayout.vue'
import CategoryLayout from './components/TagLayout.vue'
import ArchiveLayout from './components/TagLayout.vue'
import IndexLayout from './components/IndexLayout.vue'
import './styles/index.css'

export default defineClientConfig({
    enhance({app, router, siteData}) {
        app.component('TagLayout', TagLayout)
        app.component('CategoryLayout', CategoryLayout)
        app.component('ArchiveLayout', ArchiveLayout)
        app.component('IndexLayout', IndexLayout)
    },
    setup() {

    }
})