import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import fastClick from 'fastclick';
import home from './components/home.vue';
import search from './components/search.vue';

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
