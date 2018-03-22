export default {
  inserted(el, binding, vNode, oldVNode) {
    // .base-component{
    //     position: relative;
    //   &:before{
    //       content: '';
    //       display: inline-block;
    //       position: absolute;
    //       left: 0;
    //       right: 0;
    //       bottom: 0;
    //       top: 0;
    //       z-index: 1;
    //     }
    //   }
    el.style.transform = `translate3d(0,0,0)`;
    let
      startX = 0,
      startY = 0,
      isMove = false,
      resetPosition = ()=>{
        isMove = false;
        startX = 0;
        startY = 0;
        el.style.transition = `transform .3s`
        el.style.transform = `translate3d(0,0,0)`;
      };


    el.addEventListener('mousedown', (e) => {
      el.style.transition = `none`
      startX = e.clientX;
      startY = e.clientY;
      isMove = true;
    })
    document.addEventListener('mousemove', (e) => {
      if (isMove) {
        el.style.transform = `translate3d(${e.clientX - startX}px,${e.clientY - startY}px,0)`;
        vNode.context.$emit('move',e);
      }
    })
    document.addEventListener('mouseup', (e) => {
      resetPosition();
    })
    el.addEventListener('mouseup', (e) => {
      resetPosition();
    })
  }
}
