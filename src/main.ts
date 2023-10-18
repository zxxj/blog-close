import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css'
import Particles from 'particles.vue3'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Particles)

app.mount('#app')
