import Vue from 'vue'
import Router from 'vue-router'
import loading from "./loading.vue"
import panel from "./panel.vue"
import dialog from "./dialog.vue"
import list from "./list.vue"
import calendar from "./calendar.vue"
import validator from "./validator.vue"

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    }, {
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
