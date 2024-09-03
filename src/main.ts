import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/css/variables.css'

import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  hideProgressBar: true,
}
app.use(Toast, options)
app.mount('#app')
