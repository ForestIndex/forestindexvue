import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import fastClick from 'fastclick';
import home from './components/home.vue';
import search from './components/search.vue';
import profile from './components/profile.vue';
import about from './components/about.vue';
import contact from './components/contact.vue';

if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true;
}

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(() => {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        fastClick.attach(document.body);
    }, false);
  }
});

const routes = [
  {
    path: '/',
    component: home,
    name: 'home'
   },
   {
     path: '/search',
     component: search,
     name: 'search'
   },
   {
     path: '/users/:id',
     component: profile,
     name: 'profile'
   },
   {
     path: '/about',
     component: about,
     name: 'about'
   },
   {
     path: '/contact',
     component: contact,
     name: 'contact'
   },
   {
     path: '*',
     redirect: '/'
   }
];

const router = new VueRouter({
  routes,
  // mode: 'history'
});

const app = new Vue({
  router
}).$mount('#app');
