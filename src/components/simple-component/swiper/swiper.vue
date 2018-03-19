<template>
  <div class="swiper-component-crg">
    <div class="swiper-box-crg">
      <slot></slot>
      <div class="dot-box-crg">
        <div class="dot-crg" :class="[active===index&&'active']" v-for="(item,index) in items"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "swiper",
    // dot 不可点击,不可跨段。滑动最多只能查看左右一张图。模仿 mint-ui
    props: ["autoplay", "interval", "duration",],
    provide() {
      return {
        swiper: this
      }
    },
    data() {
      return {
        items: [],
        active: -1
      }
    },
    computed: {},
    methods: {
      play(boolean) {
      },
      next() {
        // 将下一个item置为 transform:translateX(100%) 后置为 transform:translateX(0)
        // 将本个item 置为 transform:translateX(-100%)

        let nextIndex = (this.active + 1) % items.length;
        let
          items = this.items,
          cur = items[this.active],
          next = items[nextIndex];

        this.active = nextIndex;

        cur.translateX("-100%");
        next.translateX("100%");
        next.translateX(0);
      },
      addItem(item) {
        this.items.push(item);
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .swiper-component-crg {
    white-space: nowrap;
    position: relative;

    .swiper-box-crg {
      height: 100%;
    }
    .dot-box-crg {
    }
    .dot-crg {
    }
  }

</style>
