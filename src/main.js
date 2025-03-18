import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia';

const app = createApp(App)
app.use(createPinia());
app.use(router);



app.mount('#app')
