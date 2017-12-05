<template>
    <slide>
      我是内容
      <div slot="slide" class="delete-box">删除</div>
    </slide>
</template>

<script>
    import Slide from "../components/simple-component/slide";

    export default {
      components: {Slide},
      name: "slide-delete"
    }
</script>

<style scoped>
.delete-box{
  width: 100px;
}
</style>
