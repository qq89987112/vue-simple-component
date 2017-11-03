<template>
  <md-dialog ref="imgDialog">
    <md-dialog-content>
      <img :src="imgurl" alt="">
    </md-dialog-content>
  </md-dialog>
</template>
<script>
    export default {
        name: 'app',
        data(){
          return {
            imgurl:''
          }
        },
        methods:{
          show(imgurl){
            this.imgurl = imgurl;
            this.$nextTick(() =>{
              this.$refs.imgDialog.open();
            })
          },
        },
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
