<template>
    <div class="ripple-page">
      <p class="buttons">
        <span class="button ripple-button">删除订单</span>
        <span class="button ripple-button">查看物流</span>
        <span class="button ripple-button">再次购买</span>
      </p>
    </div>
</template>
<script>

    export default {
      name: 'ripple-page',
        data() {
            return {}
        },
        methods: {
        },
        mounted() {
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.ripple-page{
  .buttons{
    .button + .button{
      margin-left: 15px;
    }
    .button{
      background-color: #ee5544;
      border-radius: 4px;
      line-height: 2em;
      padding: 0 10px;
      display: inline-block;
      color: white;
      cursor: pointer;
    }
  }

  .ripple-button {
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10,10);
      opacity: 0;
      transition: transform .5s, opacity 1s;
    }

    &:active:after {
      transform: scale(0,0);
      opacity: .2;
      transition: 0s;
    }
  }
}
</style>
