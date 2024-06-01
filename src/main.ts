import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/mock/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element icons
import * as Icons from "@element-plus/icons-vue";
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

// register the element Icons component
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });

app.use(router)
app.use(ElementPlus)

app.mount('#app')
