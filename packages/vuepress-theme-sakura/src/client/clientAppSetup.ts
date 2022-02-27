import {defineClientAppSetup, useRouter} from "@vuepress/client"
import {useAppStoreHook} from "./store/app";
import {onMounted} from "vue";

export default defineClientAppSetup(() => {
    const appStoreHook = useAppStoreHook();
    appStoreHook.initSite().then()
    useRouter().beforeEach((to => appStoreHook.closeSideBar()))
})