import { createApp } from "vue"; 
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/main.css'
import "@fortawesome/fontawesome-free/js/all.min.js";
import router from "./router";

import store from './store/store'

createApp(App).use(router).use(store).mount('#app');

