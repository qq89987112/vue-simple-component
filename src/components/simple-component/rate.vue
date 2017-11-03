<template>
    <div class="rate-component">
      <i class="iconfont" @click="onClick(i)" :class="[rate>=i?'icon-Star_yiguanzhu':'icon-star']" v-for="i in num"></i>
    </div>
</template>
<script>
    export default {
        name: 'register-page',
        props:{
          value:undefined,
          num:{
            default:5
          }
        },
        data() {
            return {
              rate:this.value||0
            }
        },
        methods: {
          onClick(i){
            this.rate = i;
            this.$emit("input",i);
          }
        },
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
.rate-component{
  .iconfont{
    font-size:R(20);
    &.icon-Star_yiguanzhu{
      color: #ff9800;
    }
  }
}
</style>
