import './style.css'
import './assets/css/variables.css'
import App from './App.vue'
import { ViteSSG } from 'vite-ssg'
import routes from './router'

import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { MotionPlugin } from '@vueuse/motion'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    const options: PluginOptions = {
      position: POSITION.BOTTOM_RIGHT,
      hideProgressBar: true,
    }
    app.use(Toast, options)
    app.use(MotionPlugin)
  }
)
