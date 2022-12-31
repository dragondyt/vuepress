import { createPinia } from 'pinia/dist/pinia.mjs'
import type { App } from 'vue'

const store = createPinia()
export function setupStore(app: App<Element>): void {
  app.use(store)
}
export { store }
