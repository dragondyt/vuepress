import { defineClientConfig } from '@vuepress/client'
import './styles/index.css'

export default defineClientConfig({
  enhance() {
    console.log('enhance')
  },

  setup() {
    console.log('setup')
  },
})
