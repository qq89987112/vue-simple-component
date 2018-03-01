<template>
  <div class="toast-box" :class="[type]">
    <p class="toast" :class="[this.position,{active:this.isShow},type]">{{content}}</p>
  </div>
</template>
<script>
  export default {
    name: 'toast',
    data() {
      return {
        content: '',
        isShow: false,
        type:'',
        position:'bottom',
        duration:2000
      }
    },
    methods: {
      showSuccess(content, position = this.position){
        debugger
        this.showOnce("",content,position);
      },
      showError(content, position = this.position){
        debugger
        this.showOnce("error",content,position);
      },
      showOnce(type, content, position = this.position) {
        const oldType = this.type;
        this.type = type;
        return this.show(content, position).then(() => {
          this.type = oldType;
        })
      },
      hide() {
        this.isShow = false;
        return new Promise((resolve,reject)=>{
          setTimeout(resolve,300);
        })
      },
//        暂时性按照某个方向toast,还会恢复html中配置的position
      show(content, position = this.position) {
        let temp_position = this.position;
        this.content = content;
        this.position = position;
        this.isShow = true;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.position = temp_position;
            this.hide().then(resolve);
          }, this.duration);
        })

      }
    },
    created() {
      if (this.wait !== null && this.wait !== undefined) {
        this.loading = false;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .toast-box {

    .toast {
      padding: R(2.5) R(10);
      background: #20a0ff;
      opacity: 0;
      text-align: center;
      position: fixed;
      transition: opacity .3s;
      color: white;
      font-size: R(14);
      z-index: -111;

      &.error {
        background-color: #EE5544;
      }

      &.active {
        opacity: 0.8;
        z-index: 111;
      }

      &.bottom {
        bottom: R(20);
      }

      &.top {
        top: R(20);
      }

      &.right {
        right: R(20);
      }

      &.bottom {
        bottom: R(20);
        left: 50%;
        transform: translateX(-50%);
      }

      &.center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

  }


</style>
