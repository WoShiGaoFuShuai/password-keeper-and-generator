import { onAuthStateChanged } from 'firebase/auth';
import { createApp } from 'vue'
import App from './App.vue'
import { auth } from './firebase/config';
import router from './router'
import css from "@/assets/global.css"

let app;

onAuthStateChanged(auth, () => {
   if (!app) {
    app = createApp(App).use(router).mount('#app')

   }
})

