export default {
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
