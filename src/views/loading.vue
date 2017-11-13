<template>
    <div class="loading-page">
      <div class="button" @click="onLoadClick('loading')">加载1</div>
      <div class="button" @click="onLoadClick('loading2')">加载2</div>
      <loading  wait ref="loading"  style="height: 200px;">
        我是loading里的内容
      </loading>
      <loading mask wait ref="loading2" :loadMore="loaded" loader="loader2"  class="load-more" @loadPage="onLoad">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </loading>
    </div>
</template>
<script>
    export default {
        name: 'loading-page',
        data() {
          this.times = 1;
            return {
              loaded:false
            }
        },
        methods: {
          onLoadClick(ref){
            this.$load(ref);
            setTimeout(()=>
            {
              this.$cancel(ref);
            },3000)
          },
          onLoad(page,rows){
            console.log(page, rows);

            setTimeout(()=>
            {
              this.$cancel("loading2");
              this.times++;
              if(this.times===4){
                this.loaded = true;
              }
            },1000)
          }
        },
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.loading-page{
  height: 100vh;

  .load-more{
    height: 400px;

    li{
      height: 100px;
    }
  }
}
</style>
