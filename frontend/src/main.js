import { createApp } from 'vue'
import './index.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  }
})

createApp(App)
  .use(VueQueryPlugin, {
    queryClient
  })
  .use(router)
  .mount('#app')
