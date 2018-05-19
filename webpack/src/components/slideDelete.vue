<template>
  <CellSwipe
      :right="[
      {
        content: '<p class=\'delete\'><span>删除</span></p><p class=\'back\'><span>撤回</span></p>',
        handler: () => this.$emit('delete')
      }
    ]"
    class="cellSwipe"
      :class="type"
  >
    <div class="left-delete" @click="deleteActive=false">
        <slot></slot>
        <!--优化滑动依然触发点击事件-->
        <div class="fixer"></div>
    </div>
  </CellSwipe>
</template>

<script>
  import {CellSwipe} from 'mint-ui';

  export default {
    props: {
      index: Number,
      type:String
    },
    components: {
      CellSwipe
    },
    methods: {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .cellSwipe{
    .mint-cell-swipe-button{
      padding:0;
    }
    .mint-cell-title{
      display: none;
    }

    .mint-cell-value{
      width: 100%;
    }

    .left-delete{
      width: 100%;
      position: relative;
      .fixer{
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: rem(100);
      }
    }
    .delete,.back{
      display: none;
      height: 100%;
      background-color: $color-primary;
      width:rem(113);
      text-align: center;
      position: relative;
      span{
        line-height: 1;
        position: absolute;
        top:50%;
        right: 50%;
        margin-top: -0.5em;
        margin-right:-1em;
        color: white;
        font-size:rem(33);
      }
    }
    &.delete{
      .delete{
        display: inline-block;
      }
    }
    &.back{
      .back{
        display: inline-block;
      }
    }
  }
</style>
