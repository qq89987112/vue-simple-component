<template>
  <div class="swiper-item-crg" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "swiper-item",
    props: ["autoplay", "interval", "duration",],
    inject:["swiper"],
    data() {
      return {
        translate:0
      }
    },
    computed: {
      style(){
        return {
          transform:`translate3d(${this.translate},0,0)`
        }
      }
    },
    methods: {
      translateX(x){
        this.translate = x;
      }
    },
    mounted() {
      this.swiper.addItem(this);
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .swiper-item-crg {
    width: 100%;
    height: 100%;
    position: absolute!important;
    left: 0;
    top: 0;
    transition: transform .3s linear;
  }
</style>
