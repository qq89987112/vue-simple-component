<template>
  <div class="toggle-panel" :class="{active:selectActive}" @scroll="onScroll">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'register-page',
    data() {
      return {
        selectActive: false
      }
    },
    methods: {
      hide() {
        this.selectActive = false;
      },
      show() {
        this.selectActive = true;
      },
      toggle() {
        this.selectActive = !this.selectActive;
      },
      isShow() {
        return this.selectActive;
      },
//         这样做,发出事件的源就不是slot了
//          setResult(data){
////            result 尽量少,不然会卡
//            this.$emit('result',data);
//            this.hide();
//          },

//          解决滚动时背景还能滚动的问题。
//          1. 使用overflow:hidden 或者 position:fixed;(overflow:hidden的元素需要占有滚动条)
//          2. 拦截滚动事件
      onScroll(e) {
        let srcEle = e.srcElement;
        if (srcEle.scrollTop + srcEle.offsetHeight === srcEle.scrollHeight) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      onBack() {
//           return true 代表消耗掉这次的back
//           return false 代表无作为
//            当前一个页面也归于router管理时,才能成功拦截back。
        if (this.isShow()) {
//              此处应该请求 slot的onBack,以避免复杂情况,如多级的地址选择,云盘内容文件选择 的back。
          this.hide();
          return true;
        }
        return false;
      }
    },
    mounted() {
//          在这里应该把slot元素的toggle方法给搞上。 用extend方法有问题！
//          子元素直接写 text slotVue为空

      let slotDefault = this.$slots.default;
      if (slotDefault) {
        let slotVue = slotDefault[0].context;
        if (slotVue) {
          slotVue.hidePanel = this.hide;
          slotVue.showPanel = this.show;
          //        slot元素需要发出 result 事件
          slotVue.showPanelForResult = () => {
            this.show();
            return new Promise((resolve, reject) => {
              slotVue.$once('result', (data) => {
                resolve(data);
                this.hide();
              });
            });
          };
          slotVue.togglePanel = this.toggle;
          slotVue.isPanelShow = this.isShow;
          slotVue.setResult = this.setResult;
        }
      }

    },
    watch: {
      selectActive(value) {
        this.$emit("change", value);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .toggle-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 999;
    display: none;
    overflow: auto;

    &.active {
      display: block;
    }
  }
</style>
