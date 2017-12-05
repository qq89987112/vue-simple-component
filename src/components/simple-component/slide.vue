<template>
  <div @touchstart="onStart" @touchmove="onMove" @touchend="onEnd" class="slide-box">
    <div class="slide" :class="[{active:isActive}]" ref="slide" :style="slideStyle">
      <slot name="slide"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "slide",
    data() {
      this.distance = 20;
      return {
        isActive: false,
        slideWidth:0,
        slideMarginRight:undefined
      }
    },
    computed:{
      slideStyle(){
        return {
          transition: this.slideMarginRight === undefined&&'margin-right 0.3s cubic-bezier(0.08, 0.29, 0.6, 0.83)',
          marginRight:`${this.slideMarginRight === undefined ? -this.slideWidth : this.slideMarginRight}px`
        }
      },
    },
    methods: {
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

              if(slideMarginRight>this.slideWidth){
                slideMarginRight = this.slideWidth;
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
      this.slideWidth = this.$refs.slide.offsetWidth;
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .slide-box{
    overflow-x: hidden;
    .slide {
      display: inline-block;
      float: right;

      &.active {
        margin-right: 0!important;
      }
    }
  }

</style>
