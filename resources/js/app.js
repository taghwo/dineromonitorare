/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import router from './routes'

Vue.component('appLayout', require('./views/app.vue').default);


import appLayout from './views/app.vue'

var vm = new Vue({  
    // appLayout,
    component:{appLayout},
    template:'<appLayout/>',
    router
  })
vm.$mount('#app');
  
  
// const app = new Vue({
//     el: '#app',
//      router,
//      components:{appLayout},
//      store,
// }).$mount('#app');
