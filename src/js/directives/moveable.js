export default {
  unbind(el) {
    el.removeEventListener('mousedown', el.mousedown)
    document.removeEventListener('mousemove', el.mousemove)
    document.removeEventListener('mouseup', el.mouseup)
    el.removeEventListener('mouseup', el.mouseup)
  },
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
      isMove = false;

    el.mousedown = (e) => {
      el.style.transition = `none`
      startX = e.clientX;
      startY = e.clientY;
      isMove = true;
    },
      el.mousemove = (e) => {
        if (isMove) {
          el.style.transform = `translate3d(${e.clientX - startX}px,${e.clientY - startY}px,0)`;
          vNode.context.$emit('move', e);
        }
      },
      el.mouseup = (e) => {
        isMove = false;
        startX = 0;
        startY = 0;
        el.style.transition = `transform .3s`
        el.style.transform = `translate3d(0,0,0)`;
      };
    el.addEventListener('mousedown', el.mousedown)
    document.addEventListener('mousemove', el.mousemove)
    document.addEventListener('mouseup', el.mouseup)
    el.addEventListener('mouseup', el.mouseup)
  }
}
