import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

console.log('현재 버전: 04시 10분')

app.mount('#app')
