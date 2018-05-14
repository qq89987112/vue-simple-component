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
        this.ue.setContent(this.value);
        this.$emit('ready')
      });
      ue.addListener("contentChange", (data) => {
        // this.$emit('change',{html:ue.getContent()});
        this.$emit("input", ue.getContent());
      })
    },
    watch:{
      value(value){
        if (this.isReady) {
          this.ue.setContent(value||"");
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
