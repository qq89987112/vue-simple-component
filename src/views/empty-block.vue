<template>
    <div class="empty-page">
      <div class="empty-wrapper">
        <div class="empty-block"></div>
        <div class="empty-content">
          <!--写一个纯css表情包在这儿-->
        </div>
      </div>
    </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .empty-page{
    .empty-block{
      &:empty~.empty-content{

      }
    }



  }

</style>
