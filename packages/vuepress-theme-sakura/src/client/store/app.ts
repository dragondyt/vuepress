import {defineStore} from "pinia";
import {store} from "./index";
import {appType} from "./types";
import {onBeforeMount} from "vue";
export const useAppStore = defineStore({
    id: "dragon-app",
    state: (): appType => ({
        sidebar: {
            opened: false,
        },
        allPost: [],
        posts: [],
        sticky: [],
        tags: [],
        socials: [{
            name: "github",
            href: "https://github.com"
        }],
        categories: []
    }),
    getters: {
        getSidebarStatus(): boolean {
            return this.sidebar.opened;
        },
    },
    actions: {
        TOGGLE_SIDEBAR(opened?: boolean, resize?: string) {
            if (opened && resize) {
                this.sidebar.opened = true;
            } else if (!opened && resize) {
                this.sidebar.opened = false;
            } else if (!opened && !resize) {
                this.sidebar.opened = !this.sidebar.opened;
            }
        },
        async toggleSideBar(opened?: boolean, resize?: string) {
            await this.TOGGLE_SIDEBAR(opened, resize);
        },
        async closeSideBar() {
            this.sidebar.opened = false;
        },
        async initSite() {
            onBeforeMount(async () => {

            })
        }
    }
})

export function useAppStoreHook() {
    return useAppStore(store);
}