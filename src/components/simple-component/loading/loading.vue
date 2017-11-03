<template>
  <div class="loader-box" :style="[loading&&{height:height&&height+'px'}]">
    <div class="loader" :class="[type||'loader1',{mask:showType=='mask'}]" v-if="loading">
      <div ref="loading"></div>
      <div ref="loading"></div>
      <div ref="loading"></div>
    </div>
    <!--故意留一下isLoading方便程序猿控制样式-->
    <!--无法控制孩子渲染.该undefined的还是会undefined 测试时是作为根节点-->
    <div  v-if="!loading || showType=='mask'" :class="{'is-loading':loading}">
      <slot>

      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loading',
    props:['height','wait','type','showType',"scale"],
    data(){
      return {
        loading:true
      }
    },
    methods:{
      cancel(){
        this.loading = false;
      },
      do(){
        this.loading = true;
      },
      isLoading(){
        return this.loading;
      }
    },
    created(){
      if (this.wait !== null && this.wait !== undefined) {
        this.loading = false;
      }
    },
    mounted(){
      console.log(this.$refs.loading);
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .loader-box{
    position: relative;
    height: 100%;
    .loader {
      display: -webkit-flex;/*safari弹性布局*/
      justify-content: center;
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      div{
        background-color: #526d85 !important;
      }
    }
    @-webkit-keyframes loader1 {
      0% {
        -webkit-transform: scale(1);
        opacity: 1;
      }
      45% {
        -webkit-transform: scale(0.1);
        opacity: 0.7;
      }
      80% {
        -webkit-transform: scale(1);
        opacity: 1;
      }
    }
    .loader1 div {
      width: R(15) !important;
      height: R(15) !important;

      border-radius: 50%;
      float: left;
      display: inline-block;
      margin: 2px;
    }
    .loader1 div:nth-child(1) {
      -webkit-animation: loader1 0.75s -0.12s ease infinite;
    }
    .loader1 div:nth-child(2) {
      -webkit-animation: loader1 0.75s -0.24s ease infinite;
    }
    .loader1 div:nth-child(3) {
      -webkit-animation: loader1 0.75s 0s ease infinite;
    }

    @-webkit-keyframes loader31{
      0%{-webkit-transform:scale(1);opacity:0.5;}
      50%{-webkit-transform:scale(0);opacity:1;}
      100%{-webkit-transform:scale(1);opacity:0.5;}
    }
    .loader-31{position:relative;}
    .loader-31 div{width:R(15) !important;height:R(15) !important;border-radius:50%;position:absolute;background:#fff;opacity:0.5;}
    .loader-31 div:nth-child(1){-webkit-animation:loader31 2s 0s infinite ease-in-out;}
    .loader-31 div:nth-child(2){-webkit-animation:loader31 2s -1s infinite ease-in-out;}
  }


</style>
