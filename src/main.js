import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Membuat instance aplikasi Vue
const app = createApp(App)

// Menggunakan Vue Router untuk navigasi multi-halaman
app.use(router)

// Memasang aplikasi Vue ke elemen dengan id 'app' pada index.html
app.mount('#app')