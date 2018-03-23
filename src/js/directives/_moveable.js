let
  lastPlayed = [],
  isAnimation = false;

// 用于拖动切换位置。当界面更新前(mouseup),帮助你完成切换相关动画,
export function overlapDetection(elementList, dragElement) {
  //播放动画时不检测
  let
    overlapIndex,
    dragIndex = elementList.findIndex(i => i === dragElement);
  if (!isAnimation) {
    elementList.find((item, index) => {
      if (item === dragElement) {
        return;
      }
      //  它两顶底的距离 要是 <= 它两最高的那一个,就算是重叠了。
      let
        boundingBox = item.getBoundingClientRect(),
        dragBoundingBox = dragElement.getBoundingClientRect(),
        boundingBoxHeight = boundingBox.y + boundingBox.height,
        dragBoundingBoxHeight = dragBoundingBox.y + dragBoundingBox.height,
        top = boundingBox.y < dragBoundingBox.y ? boundingBox.y : dragBoundingBox.y,
        bottom = boundingBoxHeight > dragBoundingBoxHeight ? boundingBoxHeight : dragBoundingBoxHeight,
        height = dragBoundingBox.height > boundingBox.height ? dragBoundingBox.height : boundingBox.height;


      if (bottom - top <= height) {
        overlapIndex = index;
      }
      return overlapIndex !== undefined;
    });
  }
  return overlapIndex>=0&&{
    overlapIndex,
    dragIndex
  };
}

// index从上到下,从小到大
export function hoverItemAnimation(elementList, overlapItem, dragElement) {
  if (!isAnimation) {
    let
      overlapIndex = elementList.findIndex(i => i === overlapItem),
      dragIndex = elementList.findIndex(i => i === dragElement),
      height = dragElement.offsetHeight,
      played = [];
    if ((overlapIndex >= 0) && (dragIndex >= 0) && (overlapIndex !== dragIndex)) {
      if (overlapIndex < dragIndex) {
        // 鼠标往上滑
        played = elementList.slice(overlapIndex, dragIndex)

        played.forEach(item => {
          item.style.transition = `transform .3s`;
          item.style.transform = `translate3d(${0},${height}px,0)`
        })
      } else {
        // 鼠标往下滑 +1 是因为 前闭后开
        played = elementList.slice(dragIndex + 1, overlapIndex + 1);
        played.forEach(item => {
          item.style.transition = 'transform .3s';
          item.style.transform = `translate3d(${0},${-height}px,0)`;
        })
      }
      //计算需要恢复transform的元素

      lastPlayed.forEach(item => {
        if (!~played.indexOf(item)) {
          console.log(overlapIndex, dragIndex, played);
          item.style.transform = `translate3d(0,0,0)`;
        }
      })


      lastPlayed = played;
      if (!lastPlayed.length) {
        isAnimation = true;
        setTimeout(() => {
          isAnimation = false;
        }, 300)
      }


    }
  }
}

// 播放回归动画(mouseup)
export function dragElementBackAnimation(elementList, overlapItem, dragElement) {
  let
    overlapIndex = elementList.findIndex(i => i === overlapItem),
    dragIndex = elementList.findIndex(i => i === dragElement),
    played,
    height = 0;
  return new Promise((resolve, reject) => {
    //
    // 可能是因为 up 的自动恢复
    if (overlapIndex >= 0 && dragIndex >= 0) {
      if (overlapIndex < dragIndex) {
        // 鼠标往上滑
        played = elementList.slice(overlapIndex, dragIndex)

        height = -played.reduce((total, item) => {
          return total += item.offsetHeight
        }, 0)
      } else {
        // 鼠标往下滑 +1 是因为 前闭后开
        played = elementList.slice(dragIndex + 1, overlapIndex + 1);
        height = played.reduce((total, item) => {
          return total += item.offsetHeight
        }, 0)
      }
      setTimeout(() => {
        dragElement.style.transition = 'transform .3s';
        dragElement.style.transform = `translate3d(${0},${height}px,0)`
        setTimeout(() => resolve({overlapIndex, dragIndex}), 300)
      }, 0)

    }

  })
}


export function replace(arr,a, b) {
  let tempArr = arr.slice(0);
  // if (a < b) {
  //   a = a + b;
  //   b = a - b;
  //   a = a - b;
  // }
  // tempArr.splice(b, 0, tempArr.splice(a, 1)[0])

  let temp = tempArr[a];
  tempArr[a] = arr[b];
  tempArr[b] = temp;

  return tempArr;
}


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

    let emiiter = vNode.componentInstance || vNode.context;
    el.mousedown = (e) => {
      el.style.transition = `none`
      startX = e.clientX;
      startY = e.clientY;
      isMove = true;
      // 主动对z-index赋值为更高，本指令不做赋值
      emiiter.$emit('moveBegin', e);
    },
      el.mousemove = (e) => {
        if (isMove) {
          el.style.transform = `translate3d(${e.clientX - startX}px,${e.clientY - startY}px,0)`;
          emiiter.$emit('move', e);
        }
      },
      el.mouseup = (e) => {
        isMove = false;
        startX = 0;
        startY = 0;
        // el.style.transition = `transform .3s`
        // el.style.transform = `translate3d(0,0,0)`;
        // 主动对z-index恢复为原来的值，本指令不做赋值
        emiiter.$emit('moveEnd', e);
      };
    el.addEventListener('mousedown', el.mousedown)
    document.addEventListener('mousemove', el.mousemove)
    document.addEventListener('mouseup', el.mouseup)
    el.addEventListener('mouseup', el.mouseup)
  }
}
