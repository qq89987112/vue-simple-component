<template>
  <span class="button-component" :class="classes">
    <slot></slot>
  </span>
</template>
<script>
  export default {
    name: 'm-button',
    props:["bottom"],
    data () {
      this.classes = [
        ...Object.keys(this.$props).filter((item)=>{return this.$props[item]!==undefined})
      ];
      return {

      }
    },
    methods:{

    },
    created(){

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
.button-component{
  &.bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 R(15);
  }
  display: inline-block;
  height:R(40);
  line-height:R(40);
  color: white;
  text-align: center;
  background-color: #34495e;
}
</style>
