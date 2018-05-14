<template>
  <div :class="['custom-modal',active&&'active']" @click="hide()">
    <div class="custom-modal-content" @click.stop="">
      <div class="custom-modal-header" v-if="closeable !== false"><span class="close" @click="hide()">X</span></div>
      <slot></slot>
    </div>
  </div>
</template>
<script>

  export default {
    props: ['value','closeable'],
    name: "dialog",
    data() {
      return {
        active: false
      }
    },
    methods: {
      hide(params) {
        if (this.closeable !== false) {
          this.$emit('__hide__', params);
          this.active = false;
        }
      },
      show() {
        this.active = true;
        this.$off('__hide__');
        return new Promise((resolve, reject) => {
          this.$once('__hide__', params => {
            resolve(params);
          });
        });
      },
      toggle() {
        this.active = !this.active;
      }
    },
    watch: {
      active(newV, oldV) {
        this.$emit("input", newV);
      }
    },
    mounted() {
      // 为了 初始化为 true 时还能播放动画。
      setTimeout(()=>{
          this.active = this.value;
      },0)

    }
  }
</script>
<style lang="scss">
  .custom-modal {
    /*这个方法失效*/
    /*box-shadow: 0 0 1000px rgba(0,0,0,0.5);*/
    display: flex;
    position: fixed;
    align-items: center;
    align-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;

    animation: back .3s forwards;

    @keyframes active {
      100% {
        z-index: 11;
      }
    }
    @keyframes back {
      100% {
        z-index: -1;
      }
    }

    &.active {
      animation: active .3s forwards;
      background: rgba(0, 0, 0, 0.7);

      .custom-modal-content {
        transform: scale3d(1,1,1);
      }
    }

    .custom-modal-content {
      .custom-modal-header {
        position: relative;
        .close {
          position: absolute;
          right: -15px;
          top: -15px;
        }
      }
      padding: 15px;
      margin: 0 auto;
      background-color: #fff;
      transition: transform 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      align-self: center;
      transform: scale3d(0,0,0);
      z-index: 12;
      box-shadow: 0 0 10px #eee;
    }
  }
</style>
