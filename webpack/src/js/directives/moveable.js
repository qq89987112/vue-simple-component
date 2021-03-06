let
  isAnimation = false,
// 只有overlap出去后再回来才能触发
  lastOverlapIndex,
  startDragElement;

//
// 如果不起作用，请确保 三个参数的父子关系。
//
// onMoveBegin(index, e) {
//   let elementList = this.$refs.baseManager.map(i => i.$refs.component.$el);
//   this.dragElement = e.target;
//   startAnimation(elementList, this.dragElement);
// },
// onMove(index, e) {
//   let elementList = this.$refs.baseManager.map(i => i.$refs.component.$el);
//   playAnimation(elementList, this.dragElement);
//
// },
// onMoveEnd(index, e) {
//   let elementList = this.$refs.baseManager.map(i => i.$refs.component.$el);
//   stopAnimation(elementList,this.dragElement).then((configList) => {
//     let compoents = this.components;
//     this.components = [];
//     this.dragElement = null;
//     this.$nextTick(() => {
//       this.components = applyConfigList(compoents,configList);
//     })
//   });
// },


// 暂时存在的问题：鼠标滚动有瑕疵


export function applyConfigList(dataSourceList, configList) {
  return configList.map(i => dataSourceList[i]);
}

export function insert(arr, src, dest) {
  let tempArr = arr.slice(0);

  // insert

  if (src > dest) {
    tempArr.splice(dest, 0, tempArr.splice(src, 1)[0])
  } else {
    tempArr.splice(dest + 1, 0, tempArr[src]);
    tempArr.splice(src, 1);
  }


  // replace
  // let temp = tempArr[a];
  // tempArr[a] = tempArr[b];
  // tempArr[b] = temp;

  return tempArr;
}


export function startAnimation(elementList, dragElement) {
  dragElement.configList = elementList.map((item, i) => i);
  isAnimation = false;
  lastOverlapIndex = undefined;
  startDragElement = dragElement;
}

// 播放回归动画(mouseup)
export function stopAnimation(elementList, dragElement) {

  return new Promise((resolve, reject) => {
    let
      configList = dragElement && dragElement.configList;
    if (configList) {
      let
        originIndex = elementList.findIndex(i => i === dragElement),
        index = configList.findIndex(i => i === originIndex),
        a, b, height,
        arr = insert(elementList, originIndex, index);


      if (originIndex >= 0 && index >= 0) {
        if (originIndex < index) {
          a = originIndex;
          b = index;
        } else {
          a = index + 1;
          b = originIndex + 1;
        }
        height = arr.slice(a, b).reduce((prev, cur) => {
          return prev + ((cur && cur.offsetHeight) || 0)
        }, 0);

        dragElement.style.transition = `transform .3s`;
        dragElement.style.transform = `translate3d(0px,${((index - originIndex) < 0 ? -1 : 1) * height}px,0px)`
        let configList = dragElement.configList;
        dragElement.configList = undefined;
        setTimeout(() => {
          resolve(configList);
        }, 300)
      } else if (startDragElement) {
        //  归位要是要归位的。
        startDragElement.style.transition = `transform .3s`;
        startDragElement.style.transform = `translate3d(0,0,0)`
        startDragElement = undefined;
      }
    }
  })

}


export function playAnimation(elementList, dragElement) {
  // overlap检测 播放动画时不检测
  let
    overlapIndex = -1,
    dragIndex = elementList.findIndex(i => i === dragElement);
  if (!isAnimation) {
    elementList.find((item, index) => {
      if (item === dragElement || !(item && dragElement)) {
        return;
      }
      //  它两顶底的距离 要是 <= 它两最高的那一个,就算是重叠了。
      let
        boundingBox = item.getBoundingClientRect(),
        dragBoundingBox = dragElement.getBoundingClientRect(),
        boundingBoxHeight = boundingBox.top + boundingBox.height,
        dragBoundingBoxHeight = dragBoundingBox.top + dragBoundingBox.height,
        top = boundingBox.top < dragBoundingBox.top ? boundingBox.top : dragBoundingBox.top,
        bottom = boundingBoxHeight > dragBoundingBoxHeight ? boundingBoxHeight : dragBoundingBoxHeight,
        height = dragBoundingBox.height > boundingBox.height ? dragBoundingBox.height : boundingBox.height;


      // height = dragElement.offsetHeight > item.offsetHeight ? dragElement.offsetHeight : item.offsetHeight;
      // console.log(bottom, top, height,bottom-top);
      // 同样的元素,总会相差那几像素,补上！
      if (bottom - top <= height + 5) {
        overlapIndex = index;
      }
      return overlapIndex !== -1;
    });


    if (lastOverlapIndex !== overlapIndex && overlapIndex >= 0) {
      let configList = dragElement.configList || [];
      let
        configOverlapIndex = configList.findIndex(i => i === overlapIndex),
        configDragIndex = configList.findIndex(i => i === dragIndex);
      dragElement.configList = insert(configList, configDragIndex, configOverlapIndex);
      applyAnimation(elementList, dragElement);
    }
    lastOverlapIndex = overlapIndex;
  }
}


function applyAnimation(elementList, dragElement) {
  let configList = dragElement.configList;
  configList.forEach((originIndex, index) => {
    let element = elementList[originIndex];
    if (element === dragElement) {
      return;
    }
    isAnimation = true;
    element.style.transition = `transform .3s`;
    element.style.transform = `translate3d(0,${(index - originIndex) * dragElement.offsetHeight}px,0)`
    setTimeout(() => {
      isAnimation = false;
    }, 300)
  })
}

export default {
  unbind(el) {
    el.removeEventListener('mousedown', el.mousedown)
    document.removeEventListener('mousemove', el.mousemove)
    document.removeEventListener('mouseup', el.mouseup)
    el.removeEventListener('mouseup', el.mouseup)
  },
  inserted(el, binding, vNode, oldVNode) {
    let absolute = binding.modifiers.absolute;

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
    //       z-index: 9999;
    //     }
    //   }

    let
      startX = 0,
      startY = 0,
      isMove = false,
      emitBegin = null,
      scrollTop;

    let emiiter = vNode.componentInstance || vNode.context;
    el.mousedown = (e) => {
      el.style.transition = `none`


      if (absolute) {
        let
          left = parseInt(el.style.left) || 0,
          top = parseInt(el.style.top) || 0;

        startX = e.clientX - left;
        startY = e.clientY - top;
      } else {
        startX = e.pageX;
        startY = e.pageY;
      }

      scrollTop = document.body.scrollTop;
      isMove = true;
      let currentTarget = e.currentTarget;
      let target = e.target;
      emitBegin = () => {
        // 主动对z-index赋值为更高，本指令不做赋值
        emiiter.$emit('moveBegin', {...e, currentTarget, target});
      };
    };
    el.mousemove = (e) => {
      if (isMove) {
        if (emitBegin) {
          emitBegin();
          emitBegin = null;
        }

        if (absolute) {
          el.style.left = `${e.pageX - startX }px`;
          el.style.top = `${e.pageY - startY }px`;
        } else {
          el.style.transform = `translate3d(${e.pageX - startX}px,${e.pageY - startY}px,0)`;
        }

        emiiter.$emit('move', e);
      }
    };
    el.mouseup = (e) => {
      if (isMove) {
        isMove = false;
        startX = 0;
        startY = 0;
        // el.style.transition = `transform .3s`
        // el.style.transform = `translate3d(0,0,0)`;
        // 主动对z-index恢复为原来的值，本指令不做赋值
        emiiter.$emit('moveEnd', e);
      }
    };
    el.onDocumentScroll = e => {
      if (isMove) {
        //translate3d(18px, 72px, 0px)
        // console.log(el.style.transform);
        let result = /translate3d\((.+)\)/.exec(el.style.transform);
        let
          deltaScrolltop = document.body.scrollTop - scrollTop,
          transformY = deltaScrolltop,
          transformX = 0;
        if (result) {
          result = result[1].split(",");
          transformX = parseInt(result[0]) || 0;
          // console.log(deltaScrolltop, parseInt(result[1]) || 0);
          transformY = transformY + parseInt(result[1]) || 0;
        }
        scrollTop = document.body.scrollTop;
        el.style.transform = `translate3d(${transformX}px,${transformY}px,0)`;
      }
    };
    el.addEventListener('mousedown', el.mousedown)
    document.addEventListener('mousemove', el.mousemove)
    document.addEventListener('mouseup', el.mouseup)
    document.addEventListener('scroll', el.onDocumentScroll)
    el.addEventListener('mouseup', el.mouseup)
  }
}
