<template>
  <div class="dialog-component" :class="[mType,isShow&&'active'].concat(type)" v-show="isShow" @scroll="onScroll">
    <div class="content" @click.prevent.stop="" :class="[isShow&&'active']">
      <slot :flag="flag"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'm-dialog',
    props: ['type'],
    data() {
      // full-screen
      Object.assign(this, ([].concat(this.type || [])).reduce((prev, item) => {
        prev[item] = true;
        return prev;
      }, {}));
      return {
        isShow: false,
        flag: undefined,
        mType: ''
      }
    },
    methods: {
      onScroll(e) {
        let srcEle = e.srcElement;
        if (srcEle.scrollTop + srcEle.offsetHeight === srcEle.scrollHeight && this['full-screen']) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      setType(type) {
        this.mType = type;
      },
      setIntercept(isIntercept){
        this.isIntercept = isIntercept;
      },
      showDialog(isIntercept) {
        this.setIntercept(isIntercept);
        setTimeout(() => {
          this.isShow = true;
        }, 0)
      },
      closeDialog() {
        this.isShow = false;
        this.$emit("close");
      },
      //当slot内容抽象成组件时,方便 @result="function(){dialog.onResult}" 注意这里需要包裹一层function(){}
      onResult(data) {
        this._onResult(data);
      },
      showDialogForResult() {
        this.showDialog(true);
        return new Promise((resolve, rejct) => {
          this._onResult = (data) => {
            this.closeDialog();
            resolve(data);
            this._onResult = () => {};
          };
          this.$once("result", this._onResult)
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
      // 需要在router加上这段代码
      // let path = window.location.href.split('#')[1];
      // router.push("/back");
      // router.push(path);

      // //beforeEach的优先级比  this.$router.beforeHooks.push(this.__before_leave__) 优先级高
      // router.afterEach((to, from,) => {
      //   document.title = to.meta.title||'请稍候';
      //   if (from.fullPath!=='/' && to.fullPath === '/back') {
      //     router.back();//把back页面back掉
      //     router.back();//把第一次进来的页面back掉
      //   }
      // });
      this.__before_leave__ = function (to, from, next) {
        if (self.isShow && self.isIntercept) {
          self.closeDialog();
          next(false);
          return;
        }
        next(true);
      };

      window.addEventListener("click", this.__outclick__);
      this.$router.beforeHooks.push(this.__before_leave__);
    },
    destroyed() {
      window.removeEventListener("click", this.__outclick__)
      let beforeHooks = this.$router.beforeHooks;
      beforeHooks.splice(beforeHooks.findIndex((item) => item === this.__before_leave__), 1);
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

    &.full-screen {
      background-color: unset;
      box-shadow:unset;
      .content {
        overflow-y: auto;
        width: 100%;
        height: 100%;
      }
    }

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;

      transform: translate(-50%, -50%);

    }
  }
</style>
