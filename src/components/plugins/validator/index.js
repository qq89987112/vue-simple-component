export default {
  install(Vue) {
    Vue.prototype.$validate = function (options) {
      let
        regExp = /\/(.+)\/([^\|]+)?(?:\|(.+))?/,
        regStr,
        result,
        flags,
        name,
        key,
        reg,
        errorMsg;

      for (key in options) {
        if (!options.hasOwnProperty(key)) return;
        result = regExp.exec(key);
        regStr = result[1];
        flags = result[2];
        name = result[3];

        if (regStr) {
          reg = new RegExp(regStr, flags);
          errorMsg = options[key];
          result = reg.test(this[name]);
          // 有错就返回,不把所有的错列出来
          if(!result){
            // 与后台格式保持一致
            return Promise.reject(
              {
                "msg":errorMsg
              }
            );
          }
        }
      }

      return Promise.resolve();
    }
  }
}
