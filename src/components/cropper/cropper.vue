<template>
  <div class="cropper-editor-component">
    <slot/>
  </div>
</template>
<script>
  import Modal from "../modal";
  import CropperItem from "./cropper-item";

  export default {
    components: {
      CropperItem,
      Modal
    },
    provide(){
      return {
        cropper:this
      }
    },
    name: 'cropper',
    methods: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .cropper-editor-component {
    position: relative;
    height: 300px;
    background-color: #f0f0f0;
  }

</style>
