<template>
  <div class="dialog-component" :class="[type]" v-show="isShow">
    <div class="content" @click.prevent.stop="">
      <slot :flag="flag"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'm-dialog',
    data() {
      return {
        isShow: false,
        flag: undefined,
        type: ''
      }
    },
    methods: {
      setType(type) {
        this.type = type;
      },
      showDialog() {
        setTimeout(() => {
          this.isShow = true;
        }, 0)
      },
      closeDialog() {
        this.isShow = false;
        this.$emit("close");
      },
      showDialogForResult() {
        this.showDialog();
        return new Promise((resolve, rejct) => {
          this.$once("result", (data) => {
            this.closeDialog();
            resolve(data);
          })
        });
      },
      setFlag(flag) {
        this.flag = flag;
      }
    },
    created() {
      let self = this;
      this.__outclick__ = function () {
        if (self.isShow) {
          self.closeDialog();
        }
      };
      window.addEventListener("click", this.__outclick__)
    },
    destroyed() {
      window.removeEventListener("click", this.__outclick__)
    },
    mounted() {

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-component {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);

    &.full-screen{
      .content{
        width: 100%;
        height: 100%;
      }
    }

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
  }
</style>
