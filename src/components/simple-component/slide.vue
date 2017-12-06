<template>
  <div @touchstart="onStart" @touchmove="onMove" @touchend="onEnd" class="slide-box" @click="onOutSideClick">
    <div class="slide" :class="[{active:isActive}]" ref="slide" :style="slideStyle" @click.stop>
      <slot name="slide"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  //当默认slot的内容达到一定宽度时由使用者自己调整宽度,本组建默认slot符合合适的宽度
  export default {
    name: "slide",
    data() {
      this.distance = 20;
      return {
        isActive: false,
        slideWidth:undefined,
        slideMarginRight:undefined
      }
    },
    computed:{
      slideStyle(){
        return {
          transition: this.slideMarginRight === undefined&&this.slideWidth!==undefined&&'margin-right 0.3s cubic-bezier(0.08, 0.29, 0.31, 1.23)',
          marginRight:`${this.slideMarginRight === undefined ? -this.slideWidth : this.slideMarginRight}px`
        }
      },
    },
    methods: {
      hideSide(){
        this.isActive = false;
      },
      onOutSideClick(){
        this.hideSide();
      },
      onStart(e) {
        this.shouldMove = {
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          marginRight:parseInt(this.$refs.slide.style.marginRight)
        };
      },
      onMove(e) {
        let
          shouldMove = this.shouldMove;
          if (shouldMove) {
            let
              touch = e.touches[0],
              mr = shouldMove.startX - touch.clientX,
              marginRight = shouldMove.marginRight,
              slideMarginRight;

              this.lastTouch = touch;

              if (mr > 0) {
                //  从右往左
                slideMarginRight = marginRight + mr;
              }else{
                slideMarginRight = marginRight  -mr;
              }

              if(slideMarginRight>0){
                slideMarginRight = 0;
              }else if(slideMarginRight<-this.slideWidth){
                slideMarginRight = -this.slideWidth;
              }

              this.slideMarginRight = slideMarginRight;
          }
      },
      onEnd(e) {
        let
          shouldMove = this.shouldMove,
          distance = this.distance;

          this.slideMarginRight = undefined;

          if (shouldMove) {
            let
              touch = this.lastTouch,
              mr = shouldMove.startX - touch.clientX;

            if (mr > distance) {
              //  从右往左
              this.isActive = true;
            } else if (mr < -distance) {
              // 从左往右
              this.isActive = false;
            }
          }

          this.shouldMove = undefined;
      },
    },
    mounted() {
      let slide = this.$refs.slide;
      slide.style.marginRight = `${-slide.offsetWidth}px`;
      this.slideWidth = slide.offsetWidth;
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .slide-box{
    overflow-x: hidden;
    .slide {
      display: inline-block;
      float: right;
      z-index: 999;
      position: relative;
      &.active {
        margin-right: 0!important;
      }
    }
  }

</style>
