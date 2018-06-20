<template>
  <div @touchstart="onStart" @touchmove="onMove" @touchend="onEnd" class="slide-box" @click="onOutSideClick">
    <div class="slide-content" @click.capture="onContentClick" ref="slideContent" :style="slideStyle">
      <slot></slot>
    </div>
    <div class="slide" ref="slide" :class="[{active:isActive}]" @click.stop>
      <slot name="slide"></slot>
    </div>
  </div>
</template>

<script>
  //当默认slot的内容达到一定宽度时由使用者自己调整宽度,本组建默认slot符合合适的宽度
  export default {
    name: "slide",
    data() {
      this.distance = 20;
      return {
        isActive:false,
        slideWidth: undefined,
        touchState:'end'
      }
    },
    computed: {
      slideStyle() {
        return {
          transition: this.touchState === 'end'&&'right 0.3s cubic-bezier(0.08, 0.29, 0.31, 1.23)',
          right: `${this.slideWidth||0}px`
        }
      },
    },
    methods: {
      onContentClick(){
        if(this.slideWidth){
          this.slideWidth = 0;
        }else{
          this.$emit("click");
        }
      },
      hideSide() {
        this.slideWidth = 0;
      },
      onOutSideClick() {
        this.hideSide();
      },
      onStart(e) {
        this.shouldMove = {
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startSlideWidth: parseInt(this.$refs.slideContent.style.right)
        };
        this.touchState = "start";
        this.isActive = false;
      },
      onMove(e) {
        let
          shouldMove = this.shouldMove;
          this.isActive = false;
        if (shouldMove) {
          let
            touch = e.touches[0],
            mr = shouldMove.startX - touch.clientX,
            startSlideWidth = shouldMove.startSlideWidth,
            slideWidth;
          this.lastTouch = touch;
          this.touchState = 'move';
          if (mr > 0) {
            //  从右往左
          } else {
            //  从左往右
          }
         
          slideWidth = startSlideWidth + mr;
          if (slideWidth > this.slideEleWidth) {
            slideWidth = shouldMove.lastSlideWidth;
          }else if(slideWidth<0){
            slideWidth = 0;
          }
           
          this.slideWidth = shouldMove.lastSlideWidth = slideWidth;
        }
      },
      onEnd(e) {
        let
          shouldMove = this.shouldMove,
          distance = this.distance,
          touch = this.lastTouch;
        if (this.touchState === 'move' && touch) {
          let mr = shouldMove.startX - touch.clientX;
          if (mr > distance) {
            //  从右往左
            this.slideWidth = this.slideEleWidth;
          } else{
            this.slideWidth = 0;
          }
        }
        this.touchState = 'end';
        this.shouldMove = undefined;
        setTimeout(()=>{
          this.isActive = !!this.slideWidth;
        },300)
      },
    },
    mounted() {
      let slide = this.$refs.slide;
      this.slideEleWidth = slide.offsetWidth;
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .slide-box {
    overflow-x: hidden;
    white-space: nowrap;
    position: relative;
    .slide-content {
      width: 100%;
      background: white;
      position: relative;
      right: 0px;
    }
    .slide {
      z-index: -1;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      &.active {
        margin-right: 0!important;
        z-index: 2;
      }
    }
  }
</style>
