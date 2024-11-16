import { createApp } from 'vue'
import './index.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
