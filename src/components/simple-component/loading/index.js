import loading from "./loading.vue"


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
    Vue.component("loading",loading);

    Vue.prototype.$cancelEx = function(ref,index){
      return ()=> {
          this.$cancel(ref,index);
      }
    };

    Vue.prototype.$cancel = function(ref,index){
      let $ref = check.bind(this)(ref,index);
      $ref&&$ref.cancel();
    };

    Vue.prototype.$isLoading = function(ref,index){
      let $ref = check.bind(this)(ref,index);
      return $ref&&$ref.isLoading();
    };

    Vue.prototype.$loadingEx = function(ref,index){
      return ()=> {
        this.$load(ref,index);
      }
    };

    Vue.prototype.$load = function(ref, index){
      this.$nextTick(()=>{
          let $ref = check.bind(this)(ref,index);
          $ref&&$ref.do();
        })
    }

  }
}
