import Hammer from 'hammerjs'

export default function (element) {
  let
    manager = new Hammer.Manager(element),
    doubleTap = new Hammer.Tap({
      event: 'doubletap',
      taps: 2
    }),
    pinch = new Hammer.Pinch(),
    scale = 1;

  return {
    scale(){
      manager.add([pinch, doubleTap]);
      manager.on("pinchmove pinchstart pinchin pinchout",e => {
        element.style.transform = "scale(" + (scale *= e.scale)+ ")";
      });

      manager.on('doubletap',e=>{
        element.style.transform = "scale(" + (scale = 1)+ ")";
      })
    }
  }
}
