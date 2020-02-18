import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
function page(path) {
    return () => import(/*webpackChunkName: '' */ `${path}`).then(m => m.default || m) 
}

const router = new VueRouter({
    mode: 'history',

    routes: [
         {
            path: '/dashboard',
            component: page('./views/home.vue'),
            name:'dashboard'
        },
       
       
        {
            path: '/403',
            component: page('./views/403.vue'),
        },
        {
            path: '*',
            component: page('./views/404.vue'),
            name:'404'
        },
    ],
})


export default router;