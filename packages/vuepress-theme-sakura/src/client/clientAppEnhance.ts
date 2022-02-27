import {defineClientAppEnhance} from "@vuepress/client"
import './styles/index.css'
import {setupStore} from "./store";

export default defineClientAppEnhance(context => {
    setupStore(context.app)
})
