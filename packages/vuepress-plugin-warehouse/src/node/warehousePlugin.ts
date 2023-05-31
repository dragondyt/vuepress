import type { Plugin } from '@vuepress/core'
import { inited, initWarehouse } from './utils.js'
export const warehousePlugin = (): Plugin => ({
  name: '@dragondyt/vuepress-plugin-warehouse',
  multiple: false,
  onInitialized: async (app) => {
    if (!inited(app)) {
      await initWarehouse(app)
    }
  },
})
