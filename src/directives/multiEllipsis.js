export default {
  // 需要设置max-height 以及 ellipsis的样式
  inserted(el, binding, vnode) {
    let expression = binding.expression||"";
    expression = expression.replace(/['"]/g,"");
    if (el.scrollHeight > el.offsetHeight) {
      el.classList.add(expression);
    } else {
      el.classList.remove(expression);
    }
  }
}
