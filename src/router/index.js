import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import { auth } from '@/firebase/config'


const requireAuth = (from, to, next) => {
  const user = auth.currentUser;
  if(!user) {
    next({name: "Login"})
  } else {
    next();
  }
} 

const requireNoAuth = (from, to, next) => {
  const user = auth.currentUser;
  if(user) {
    next({name: "Home"})
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNoAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireNoAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
