export default {
  install(Vue, options) {
    Vue.prototype.$error = function (message) {
      this.$notify.error({
        message
      });
    };

    Vue.prototype.$formCheckContext = function(params,context){
          return params.find(item => {
              const
                  name = item[0],
                  //通过时的条件
                  test = item[1],
                  error = item[2];
              if (test instanceof Function) {
                  if (!test(context[name])) {
                      this.$error(error);
                      //中断循环
                      return true;
                  }
              } else if (test instanceof RegExp) {
                  if (!test.test(context[name])) {
                      this.$error(error);
                      //中断循环
                      return true;
                  }
              } else {
                  throw new Error('不支持的语法')
              }
          })
      }

        //form表单相关
        //
        // 多条件判断可以写多个
        //  ['nameTitle',v=>v,"请指定姓名"],
        //  ['nameTitle',v=>v.length<20,"姓名不能大于20个字符"],
        //  
        // if(this.$formCheck(
        //   ['content',v=>v,"请输入内容！"]
        // )){
        //   return ;
        // }
      Vue.prototype.$formCheck = function(...params){
          return this.$formCheckContext(params,this);
      }

    Vue.prototype.$sccuess = function (message) {
      this.$notify({
        message,
        type: 'success'
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
