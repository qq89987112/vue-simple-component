<template>
  <div id="container"></div>
</template>
<script>
  export default {
    name: 'ueditor',
    props: ['value'],
    mounted() {
      var ue = this.ue = UE.getEditor('container');
      ue.addListener('ready', () => {
        this.isReady = true;
        this.ue.setContent(this.value||"");
        this.$emit('ready')
      });
      ue.addListener("contentChange", (data) => {
        // this.$emit('change',{html:ue.getContent()});
        this.content = ue.getContent();
        this.$emit("input", this.content);
      })
    },
    methods:{
      setWidth(width){
        this.$el.querySelector(".edui-editor").style.width = `${width}px`;
      }
    },
    watch:{
      value(value){
        if (this.isReady&&value!==this.content) {
          this.ue.setContent(value||"");
        }
      }
    },
    destroyed(){
      this.ue.destroy();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
