<template>
    <slide>
      <div>
        <p>12312</p>
      </div>
      <div slot="slide" class="delete-box">删除</div>
    </slide>
</template>

<script>
    import Slide from "../components/slide";

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
