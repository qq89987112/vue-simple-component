export default {
  install(Vue, options) {
    Vue.prototype.$error = function (message) {
      this.$notify.error({
        message
      });
    };


    Vue.prototype.$sccuess = function (message) {
      this.$notify.sccuess({
        message
      });
    };

    Vue.prototype.$wrapLoad = function (target, promise) {
      this.target = true;
      return promise.finally(() => this.target = false);
    };

    Vue.prototype.$wrapLoadTarget = function (target, promise) {
      let handle = this.$loadTarget(target);
      return promise.finally(() => handle.close());
    };

    Vue.prototype.$loadTarget = function (target) {
      let
        __loadings__ = this.__loadings__ || new Set();
      let handle = this.$loading({
        target: target,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
      let originCloe = handle.close.bind(handle);
      handle.close = (...params) => {
        __loadings__.delete(target);
        originCloe(...params);
      };
      __loadings__.add(target);
      this.__is_loading__ = __loadings__;
      return handle;
    }





    // Vue.prototype.$load = function (target) {
    //   let
    //     __loadings__ = this.__loadings__ || new Set();
    //   __loadings__.add(target);
    //   this.__is_loading__ = __loadings__;
    // };
    //
    // Vue.prototype.$cancel = function (target) {
    //   let
    //     __loadings__ = this.__loadings__ || new Set();
    //   __loadings__.delete(target);
    // };

    // Vue.prototype.$isLoading = function (target) {
    //   let
    //     __loadings__ = this.__loadings__ || new Set();
    //   return __loadings__.has(target);
    // };

  }
}
