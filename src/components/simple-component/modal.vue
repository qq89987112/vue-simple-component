<template>
    <div class="wrap-modal" :class="maskFlag&&'active'">
      <div :class="['modal-mask',maskFlag&&'active']" @click="onClose"></div>
      <div class="modal-content" :style="{width:width+'px'}">
        <div class="modal-title">
          <span v-if="title">{{title}}</span>
          <span class="close" @click="onClose">X</span>
        </div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "modal",
        props:{
         width:'',
         title:''
        },
        data(){
          return {
            maskFlag:false,

          }
        },
        methods:{
          onClose(){
            this.maskFlag = !this.maskFlag;
          }

        }
    }
</script>

<style scoped lang="scss">
  .wrap-modal{
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    display: none;
    &.active{
      display: block;
    }
    .modal-mask{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      display: none;
      &.active{
        display: block;
      }
    }
    .modal-content{
      position: absolute;
      left:50%;
      top:50%;
      padding: 10px;
      background: #fff;
      border-radius: 4px;
      transform: translate(-50%,-50%);
      .modal-title{
        overflow: hidden;
        .close{
          cursor: pointer;
          float: right;
        }
      }
    }
  }

</style>
