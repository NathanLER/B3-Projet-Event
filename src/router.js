import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Events from './views/AddEvents.vue'
import ListEvents from './views/ListEvents.vue'
import ListUsers from './views/ListUsers.vue'
import CreateUser from './views/CreateUser.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/events', name: 'Events', component: Events, meta: { requiresAuth: true }},
  { path: '/listevents', name: 'ListEvents', component: ListEvents, meta: { requiresAuth: true }},
  { path: '/listusers', name: 'ListUsers', component: ListUsers, meta: { requiresAuth: true }},
  { path: '/createuser', name: 'CreateUser', component: CreateUser, meta: { requiresAuth: true }},

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' }); // redirige vers Login si pas de token
  } else {
    next(); // sinon, continue
  }
});

export default router
