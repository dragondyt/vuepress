import {BUNDLED_LANGUAGES} from 'shiki'
import {App} from "@vuepress/core";

interface ShiKiPluginOptions {

}

export const resolveShiKiPluginOptions = (
    app: App,
    themePluginsOptions: any): ShiKiPluginOptions => {
    const myLangu = {
        id: 'plain',
        scopeName: 'source.plain',
        path: app.dir.source('./shiki/languages/plain.tmLanguage.json'),
        samplePath: app.dir.source('./shiki/samples/plain.sample'),
        embeddedLangs: ['plain']
    }
    const objectivec = {
        id: 'objectivec',
        scopeName: 'source.plain',
        path: app.dir.source('./shiki/languages/plain.tmLanguage.json'),
        samplePath: app.dir.source('./shiki/samples/plain.sample'),
        embeddedLangs: ['plain']
    }
    const raw = {
        id: 'raw',
        scopeName: 'source.plain',
        path: app.dir.source('./shiki/languages/plain.tmLanguage.json'),
        samplePath: app.dir.source('./shiki/samples/plain.sample'),
        embeddedLangs: ['plain']
    }
    const mermaid = {
        id: 'mermaid',
        scopeName: 'source.plain',
        path: app.dir.source('./shiki/languages/plain.tmLanguage.json'),
        samplePath: app.dir.source('./shiki/samples/plain.sample'),
        embeddedLangs: ['plain']
    }
    const gradle = {
        id: 'gradle',
        scopeName: 'source.plain',
        path: app.dir.source('./shiki/languages/plain.tmLanguage.json'),
        samplePath: app.dir.source('./shiki/samples/plain.sample'),
        embeddedLangs: ['plain']
    }
    return {
        langs: [...BUNDLED_LANGUAGES.map(l => l.id).filter(r => r), myLangu, objectivec, raw, mermaid, gradle]
    }
}