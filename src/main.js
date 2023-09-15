import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import LoginView from '../src/components/LoginView'
import RegisterView from '../src/components/RegisterView'
import GetEvents from '../src/components/GetEvents'
import CreateEvents from '../src/components/CreateEvents'
import accountCreated from '../src/components/accountCreated'

// difinición objeto routes
const routes = [
        // se crean las rutas para cada vista
        {path: '/', component: LoginView},
        {path: '/register', component : RegisterView},
        {path: '/getEvents', component: GetEvents},
        {path: '/createEvents', component: CreateEvents},
        {path: '/accountCreated', component: accountCreated}

]

// creación del objeto routes

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


// instancia de vue
const app = createApp(App)

app.use(router)


app.mount('#app')
