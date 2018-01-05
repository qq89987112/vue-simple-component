const handle = function () {
  let activeElement = document.activeElement;
  activeElement.scrollIntoView();
  activeElement.scrollIntoViewIfNeeded();
}
export default {
  register(){
    window.addEventListener('resize',handle)
  },
  destory(){
    window.removeEventListener('resize',handle)
  }
}
