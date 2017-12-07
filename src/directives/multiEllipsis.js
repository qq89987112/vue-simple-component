export default {
  bind(el, binding, vnode){
    debugger;
    if(el.scrollHeight > el.offsetHeight){
      el.classList.add(binding.expression);
    }else{
      el.classList.remove(binding.expression);
    }
  }
}
