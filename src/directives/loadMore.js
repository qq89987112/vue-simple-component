export default {
  bind(el, binding, vnode){
    if(!el.__load_more__){
      el.__load_more__ = function (e) {
      let srcElement = e.srcElement;
      if(srcElement.scrollHeight === srcElement.scrollTop + srcElement.offsetHeight){
        let cb = binding.value;
        (typeof cb === 'function')&&cb();
      }
      };
      el.addEventListener("scroll",el.__load_more__);
    }
  }
}
