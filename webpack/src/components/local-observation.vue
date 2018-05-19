<template>
  <div class="local-observation" :class="{active:active}">
    <div class="img-box" @mouseleave="onLeave" @mousemove="onHover" @mouseenter="onEnter"  ref="element">
      <img :src="small" alt="">
      <div class="mask" ref="mask" :class="{active:maskActive}"></div>
    </div>
    <div class="big-img" ref="bigimg" :class="{active:maskActive}" :style="bigImgStyle">
    </div>
  </div>
</template>
<script>

  function getElementLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  }

  function getElementTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }


  export default {
    name: 'app',
    props: ['small', 'big','active'],
    data() {
      return {
        maskActive: true,
        bigImgStyle:{},
        maskLeft:0,
        maskTop:0
      }
    },
    mounted() {
        this.register()
    },
    destory(){
      this.unregister();
    },
    methods: {
      computeBigStyle(){
        let
          element = this.$refs.element,
          mask = this.$refs.mask,
          bigimg = this.$refs.bigimg;
        let
          scaleX =  element.offsetWidth/ mask.offsetWidth,
          scaleY =  element.offsetHeight / mask.offsetHeight;



        this.bigImgStyle = {
          backgroundSize:`${scaleX*100}% ${scaleY*100}%`,
//          background:`orange url(${this.big}) no-repeat`,
          background:`white url(${this.big})`,
          backgroundPosition:`${-this.maskLeft*scaleX}px ${-this.maskTop*scaleY}px`
        };

//        使用 bigImgStyle 在第一次刷新进入时有bug
//        bigimg.style.background = this.bigImgStyle.background;
//        bigimg.style.backgroundSize = this.bigImgStyle.backgroundSize;
//        console.log(bigimg.style);


      },
      register(){
//        if(this.isRegister) return;
        this.isRegister = true;
        let
          element = this.$refs.element,
          mask = this.$refs.mask,
          self = this;
        this.maskLeft =0;
        this.maskTop = 0;
        this.maskActive = true;
        function onResize() {
          self.x = getElementLeft(element);
          self.y = getElementTop(element);
        }
        this.onResize = onResize;
        window.addEventListener("resize",onResize);


        this.$nextTick(()=>{
          this.halfMaskW = mask.offsetWidth / 2;
          this.halfMaskH = mask.offsetHeight / 2;

//          读取图片耗时
//          console.log(element.offsetWidth,mask.offsetWidth);
          this.rightLimit = element.offsetWidth - mask.offsetWidth;
          this.bottomLimit = element.offsetHeight - mask.offsetHeight;
          this.maskActive = false;
          this.computeBigStyle();
          onResize();
        });

      },
      unregister(){
        this.isRegister = false;
        window.removeEventListener("resize",this.onResize);
      },
      onHover(e) {
//        console.log(e.clientY + document.body.scrollTop - document.body.clientTop, this.y);
//        console.log(e.clientX + document.body.scrollLeft - document.body.clientLeft, this.x);
        e.stopPropagation();
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        let
          x = e.clientX + scrollLeft - document.body.clientLeft - this.x,
          y = e.clientY + scrollTop - document.body.clientTop - this.y;

        let
          left = x - this.halfMaskW,
          top = y - this.halfMaskH;

        left = left < 0 ? 0 : left;
        left = left > this.rightLimit ? this.rightLimit :left;

        top = top < 0 ? 0 : top;
        top = top > this.bottomLimit ? this.bottomLimit : top;

        this.maskLeft = left;
        this.maskTop = top;

        this.$refs.mask.style.left = left + "px";
        this.$refs.mask.style.top = top + "px";
      },
      onEnter(e) {
        e.stopPropagation();
        this.computeBigStyle();
        this.maskActive = true;
      },
      onLeave(e) {
        e.stopPropagation();
        this.maskActive = false;
      }
    },
    watch:{
      active(value){
        value ? this.register() : this.unregister();
      },
      maskLeft(){
        this.computeBigStyle();
      },
      maskTop(){
        this.computeBigStyle();
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .local-observation {
    display: none;

    &.active{
      display: inline-block;
    }

    .img-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .mask {
        position: absolute;
        background-color: gray;
        opacity: 0.7;
        width: 200px;
        height: 200px;
        display: none;

        &.active {
          display: inline-block;
        }
      }
    }
    .big-img{
      background-color: orange;
      position: absolute;
      padding: 0;
      left: 100%;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;

      &.active{
        display: block;
      }
    }
  }
</style>
