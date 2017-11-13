import Vue from 'vue'
import Router from 'vue-router'
import loading from "./loading.vue"
import panel from "./panel.vue"

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
    }
  ]
});

export default router
