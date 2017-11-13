<template>
    <div class="toast-box">
      <p class="toast" :class="[this.position,{active:this.isShow},type]">{{content}}</p>
    </div>
</template>
<script>
    export default {
        name: 'toast',
        props:{
          position:{
            default:'bottom'
          },
          duration:{
            default:2000
          },
          type:{}
        },
        data(){
          return {
            content:'',
            isShow:false
          }
        },
        methods:{
          hide(){
            this.isShow = false;
          },
//        暂时性按照某个方向toast,还会恢复html中配置的position
          show(content,position = this.position){
            let temp_position = this.position;
            this.content = content;
            this.position = position;
            this.isShow = true;
            console.log("show");
            setTimeout(()=>{
              this.hide();
              this.position = temp_position;
            },this.duration);

          }
        },
        created(){
          if (this.wait !== null && this.wait !== undefined) {
              this.loading = false;
          }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .toast-box{

    .toast{
      padding: R(2.5) R(10) ;
      background: #EE554D;
      opacity: 0;
      text-align: center;
      position: fixed;
      transition: opacity .3s;
      color: white;
      font-size:R(14);
      z-index: -111;

      &.error{
        background-color: #E36049;
      }

      &.active{
        opacity: 0.8;
        z-index: 111;
      }

      &.bottom{
        bottom: R(20);
      }

      &.top{
        top: R(20);
      }

      &.right{
        right: R(20);
      }

      &.bottom{
        bottom: R(20);
        left: 50%;
        transform: translateX(-50%);
      }

      &.center{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }


  }


</style>
