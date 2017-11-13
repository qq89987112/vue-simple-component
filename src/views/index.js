import Vue from 'vue'
import Router from 'vue-router'
import loading from "./loading.vue"
import panel from "./panel.vue"
import validator from "./validator.vue"

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path:'/',
      name: 'panel',
      component:panel
    },
    {
      path:'/loading',
      name: 'loading',
      component:loading
    },
    {
      path:'/validator',
      name: 'validator',
      component:validator
    }
  ]
});

export default router
