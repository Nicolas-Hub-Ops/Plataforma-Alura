import Home from './components/home/home.vue';
import Register from './components/register/register.vue';
import Sobre from './components/sobre/sobre.vue';
import Login from './components/login/login.vue';

export const routes = [

    {path: '', component: Home, titulo: 'Home'  },
    {path: '/register', component: Register, titulo: 'Register'},
    {path: '/sobre', component: Sobre, titulo: 'Sobre'},
    {path: '/login', component: Login, titulo: 'Login'}

];
