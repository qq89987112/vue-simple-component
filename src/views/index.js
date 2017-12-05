import Vue from 'vue'
import Router from 'vue-router'
import loading from "./loading.vue"
import panel from "./panel.vue"
import dialog from "./dialog.vue"
import list from "./list.vue"
import calendar from "./calendar.vue"
import validator from "./validator.vue"
import slideDelete from "./slideDelete.vue"

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      //这里头包含了button
      path: '/calendar',
      name: 'calendar',
      component: calendar
    },
    {
      path: '/panel',
      name: 'panel',
      component: panel
    },
    {
      path: '/slideDelete',
      name: 'slideDelete',
      component: slideDelete
    },
    {
      //这里头包含了loading
      path: '/dialog',
      name: 'dialog',
      component: dialog
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/validator',
      name: 'validator',
      component: validator
    }
  ]
});

export default router
