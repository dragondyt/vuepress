import { AsImage } from '@awesome-image/image'
import { defineClientConfig } from '@vuepress/client'
import '@awesome-image/image/dist/style.css'
import './styles/index.css'

export default defineClientConfig({
  enhance({ app }) {
    app.use(AsImage, {
      responsive: false,
      progressive: false,
      imageUrlGenerator: (src) => src,
      autoWebp: true,
      placeholderLazyOffset: '480px',
      imageLazyOffset: '480px',
    })

    //
  },

  setup() {
    //
  },
})
