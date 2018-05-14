export default {
  install(Vue,options) {
    Vue.prototype.$load = function (target) {
      return this.$loading({target: target});
    }
  }
}
