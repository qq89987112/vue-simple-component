<template>
  <div class="dialog-component" v-show="isShow">
    <section class="content" @click.prevent.stop="">
      <slot name="content"></slot>
    </section>
  </div>
</template>
<script>
    export default {
        name: 'm-dialog',
        data() {
            return {
              isShow:false
            }
        },
        methods: {
          showDialog(){
            setTimeout(()=>{
              this.isShow = true;
            },0)
          },
          closeDialog(){
            this.isShow = false;
          }
        },
        created(){
          let self = this;
          this.__outclick__ = function () {
            if(self.isShow){
              self.closeDialog();
            }
          };
          window.addEventListener("click", this.__outclick__)
        },
        destroyed(){

        },
        mounted() {
          let $el = this.$el;
          let computedStyle = getComputedStyle($el.parentElement);
          $el.style.width = computedStyle.width ;
          $el.style.height = computedStyle.height ;

//          let context = this.content = this.$slots.content[0].context;
//          context.$on('showDialog',(ref)=>{
//            this.closeDialog();
//          })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-component{
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
    position: relative;
    z-index: 999;
    background-color: rgba(0,0,0,0.5);
    .content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 200px;
      line-height: 200px;
      background-color: #fff;
    }
  }
</style>
