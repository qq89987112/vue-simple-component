const handle = function () {
  document.activeElement.scrollIntoView();
}
export default {
  register(){
    window.addEventListener('onResize',handle)
  },
  destory(){
    window.removeEventListener('onResize',handle)
  }
}
