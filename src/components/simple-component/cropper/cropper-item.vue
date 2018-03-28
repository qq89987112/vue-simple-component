<template>
  <!--style加在这里是为了能用来判断 scrollHeight>offsetHeight-->
  <div class="cropper-item-component" v-moveable.absolute ref="component">
    <div class="cropper-area">
      <slot></slot>
    </div>
    <div class="line top" @mousedown.stop="onAdjustBegin('top',$event)"></div>
    <div class="line right" @mousedown.stop="onAdjustBegin('right',$event)"></div>
    <div class="line bottom" @mousedown.stop="onAdjustBegin('bottom',$event)"></div>
    <div class="line left" @mousedown.stop="onAdjustBegin('left',$event)"></div>
    <div class="corner left-top" @mousedown.stop="onAdjustBegin('left-top',$event)"></div>
    <div class="corner right-top" @mousedown.stop="onAdjustBegin('right-top',$event)"></div>
    <div class="corner right-bottom" @mousedown.stop="onAdjustBegin('right-bottom',$event)"></div>
    <div class="corner left-bottom" @mousedown.stop="onAdjustBegin('left-bottom',$event)"></div>
  </div>
</template>
<script>
  import Modal from "../modal";

  export default {
    components: {Modal},
    name: 'cropper-item',
    props: ['value'],
    inject: ['cropper'],
    data() {
      return {}
    },
    mounted() {
      let component = this.$refs.component;
      let cropper = this.cropper.$el;


      this.onAdjust = (e) => {
        if (this.type) {

          let deltaX = e.clientX - this.startX;
          let deltaY = e.clientY - this.startY;
          switch (this.type) {
            case "top":
              component.style.top = `${this.top + deltaY}px`;
              component.style.height = `${this.height - deltaY}px`;
              document.body.style.cursor = 's-resize';
              break;
            case "right":
              component.style.width = `${this.width + deltaX}px`;
              document.body.style.cursor = 'w-resize';
              break;
            case "bottom":
              component.style.height = `${this.height + deltaY}px`;
              document.body.style.cursor = 's-resize';
              break;
            case "left":
              component.style.left = `${this.left + deltaX}px`;
              component.style.width = `${this.width - deltaX}px`;
              document.body.style.cursor = 'w-resize';
              break;
            case "left-top":
              component.style.top = `${this.top + deltaY}px`;
              component.style.height = `${this.height - deltaY}px`;

              component.style.left = `${this.left + deltaX}px`;
              component.style.width = `${this.width - deltaX}px`;
              document.body.style.cursor = 'se-resize';
              break;
            case "right-top":
              component.style.top = `${this.top + deltaY}px`;
              component.style.height = `${this.height - deltaY}px`;

              component.style.width = `${this.width + deltaX}px`;
              document.body.style.cursor = 'sw-resize';
              break;
            case "right-bottom":
              component.style.width = `${this.width + deltaX}px`;

              component.style.height = `${this.height + deltaY}px`;
              document.body.style.cursor = 'se-resize';

              break;
            case "left-bottom":
              component.style.height = `${this.height + deltaY}px`;

              component.style.left = `${this.left + deltaX}px`;
              component.style.width = `${this.width - deltaX}px`;
              document.body.style.cursor = 'sw-resize';

              break;
          }


          let
            width = component.offsetWidth,
            height = component.offsetHeight,
            containerWidth = cropper.offsetWidth,
            containerHeight = cropper.offsetHeight;


          width = width > containerWidth ? containerWidth : width;
          height = height > containerHeight ? containerHeight : height;

          component.style.width = `${width}px`;
          component.style.height = `${height}px`;
        }
      };


      this.onAdjustEnd = e => {
        this.type = '';
        document.body.style.cursor = 'auto ';
        let
          top = parseInt(component.style.top),
          left = parseInt(component.style.left),
          width = component.offsetWidth,
          height = component.offsetHeight,
          containerWidth = cropper.offsetWidth,
          containerHeight = cropper.offsetHeight;


        top = top < 0 ? 0 : top;
        left = left < 0 ? 0 : left;

        top = top + height > containerHeight ? containerHeight - height : top;
        left = left + width > containerWidth ? containerWidth - width : left;


        component.style.top = `${top}px`;
        component.style.left = `${left}px`;
      }

      document.addEventListener("mouseup", this.onAdjustEnd)
      document.addEventListener("mousemove", this.onAdjust)
    },
    destroyed() {

    },
    methods: {
      onAdjustBegin(type, e) {
        this.type = type;
        this.startX = e.clientX;
        this.startY = e.clientY;
        let component = this.$refs.component;
        this.width = component.offsetWidth;
        this.height = component.offsetHeight;
        this.top = parseInt(component.style.top) || 0;
        this.left = parseInt(component.style.left) || 0;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .cropper-item-component {
    position: absolute;
    display: inline-block;
    background-color: rgba(51, 136, 255, .5);
    width: 60px;
    height: 60px;

    .cropper-area{
      height: 100%;
      width: 100%;
    }

    .line {
      position: absolute;
      background-color: #38f;
      user-select: none;

      &.top {
        left: 0;
        right: 0;
        top: 0;
        height: 1px;
        cursor: s-resize;
      }
      &.right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        cursor: w-resize;
      }
      &.bottom {
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        cursor: s-resize
      }
      &.left {
        left: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        cursor: w-resize;
      }
    }
    .corner {
      position: absolute;
      z-index: 2;
      width: 5px;
      height: 5px;
      display: inline-block;

      &.left-top {
        left: 0;
        top: 0;
        cursor: se-resize;
      }
      &.right-top {
        right: 0;
        top: 0;
        cursor: sw-resize;
      }
      &.right-bottom {
        right: 0;
        bottom: 0;
        cursor: se-resize;
      }
      &.left-bottom {
        left: 0;
        bottom: 0;
        cursor: sw-resize;
      }
    }
  }

</style>
