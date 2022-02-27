import {Page, PageData} from "@vuepress/core";

interface Link {
    name: string;
    href: string;
}

export type appType = {
    sidebar: {
        opened: boolean;
    };
    posts: PageData[][],
    sticky: Page[],
    allPost: PageData[],
    categories: any[],
    tags: string[],
    socials: Link[],
    [key: string]: any
};
