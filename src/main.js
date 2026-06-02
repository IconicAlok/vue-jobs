import './assets/main.css'
import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'
import router from './router'
import Toast from 'vue-toastification'

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const options = {
  position: 'top-right',
  timeout: 3000
}
const app = createApp(App)
app.use(router)
app.use(Toast, options)
app.mount('#app')
