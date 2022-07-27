import { defineClientConfig } from '@vuepress/client'
import './styles/index.css'
import AsImage from './components/common/Image.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('AsImage', AsImage)
    //
  },

  setup() {
    //
  },
})
