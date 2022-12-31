import type { Plugin } from '@vuepress/core'
import { inited, initWarehouse } from './utils.js'
export interface WarehousePluginOptions {
  appId: string
  adminKey: string
  index: string
}
export const warehousePlugin = (config: WarehousePluginOptions): Plugin => ({
  name: '@dragondyt/vuepress-plugin-algoliasearch',
  onInitialized: async (app) => {
    if (!inited()) {
      await initWarehouse(app)
    }
  },
})
