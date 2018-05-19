import wrapper from "./wrapper"


/**
 *
 *        <loading class="list-content" ref="loading">
              <kaddress v-on="$listeners" v-for="item,index in addresses" :key="index" :address="item" :class="{active:curaddress==index}" @click.native="curaddress=index;"></kaddress>
          </loading>
 *
 *    mounted() {
      this.loadAddresses().then(this.$cancel("loading"));
    },
 */

function check(ref,index) {
  let $ref = this.$refs[ref];
  if(!$ref) { console.error("请确保在mounted后使用 以及 ref正确"); return null; }
  if($ref instanceof Array){
    if(!index instanceof Number){ console.error("在for循环中记得传入index。"); return null; }
    $ref = $ref[index];
    if(!$ref){ console.error("index溢出"); return null;}
  }
  return $ref;
}

export default {
  install(Vue, options){
    function getInstance() {
      if(!this.__has_toast__){
        let toastWrapper = new Vue(wrapper).$mount();
        this.__has_toast__ = true;
        this.__toastWrapper__ = toastWrapper;
        this.$el.appendChild(toastWrapper.$el);
      }
      return this.__toastWrapper__.$refs.toast;
    }
    Vue.prototype.$toastError = function (content,ref) {
      let toast = getInstance.bind(this)();
      toast.showError(content);
    };

    Vue.prototype.$toastErrorEx = function (content,ref) {
      return (res)=>{
        let _content = content || res&&res.msg  || res&&res.data&&res.data.msg;
        this.$toastError(_content,ref);
      }
    };

      Vue.prototype.$toast = function(content,ref){
        let toast = getInstance.bind(this)();
        toast.showSuccess(content);
    };

    Vue.prototype.$toastEx = function(content,ref){
      return (res)=>{
        let _content = content || res&&res.msg  || res&&res.data&&res.data.msg;
        this.$toast(_content,ref);
      }
    };

  }
}
