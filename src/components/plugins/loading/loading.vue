<template>
  <div class="loader-box" :class="{loading:loading,loadMore:types.loadMore}" @wheel="onLikeScroll" @touchmove="onLikeScroll" @scroll="onScroll">
    <template v-if="types.mask">
      <loading :loader="loader" :wait="wait" v-show="loading" class="mask-loading" ref="loading"></loading>
      <slot>
      </slot>
    </template>
    <template v-else>
      <div class="loader" :class="[loader]" v-show="loading">
        <div ref="loading"></div>
        <div ref="loading"></div>
        <div ref="loading"></div>
      </div>
      <slot v-if="!loading">
      </slot>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'loading',
    props: {
      'wait': undefined,
      'loader': {
        default: 'loader1'
      },
      'mask': undefined,
      'loadMore': undefined,
    },
    data() {
      this.types = {
        mask: this.mask !== undefined || this.loadMore !== undefined,
        loadMore: this.loadMore !== undefined
      };

      return {
        loading: true,
//        load-more
        page:1,
        rows:10,
      }
    },
    methods: {
      onLikeScroll(e){
        if(this.loading){
          e.stopPropagation();
          e.preventDefault();
        }
      },
//      load-more begin
      onScroll(e){
        if(this.types.loadMore){
          let srcEle = e.srcElement;
          if (srcEle.scrollHeight === srcEle.scrollTop + srcEle.offsetHeight && !this.loadMore) {
            this.do();
            this.$emit("loadPage",++this.page,this.rows);
          }
        }
      },
//      load-more end
      cancel() {
        if (this.types.mask) {
          this.$refs.loading.cancel();
        }
        this.loading = false;

      },
      do() {
        if (this.types.mask) {
          this.$refs.loading.do();
        }
        this.loading = true;

      },
      isLoading() {
        return this.loading;
      }
    },
    created() {
      if (this.wait !== null && this.wait !== undefined) {
        this.loading = false;
      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .loader-box {
    position: relative;
    height: 100%;

    &.load-more{
      overflow-y: auto;
    }

    &.loading {
      .mask-loading {
        display: block;
      }
    }
    .mask-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      opacity: 0.5;
      z-index: 2;
      display: none;
    }

    .loader {
      display: -webkit-flex; /*safari弹性布局*/
      justify-content: center;
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      div {
        background-color: #526d85 !important;
      }
    }
    @-webkit-keyframes loader1 {
      0% {
        -webkit-transform: scale(1);
        opacity: 1;
      }
      45% {
        -webkit-transform: scale(0.1);
        opacity: 0.7;
      }
      80% {
        -webkit-transform: scale(1);
        opacity: 1;
      }
    }
    .loader1 div {
      width: R(15) !important;
      height: R(15) !important;

      border-radius: 50%;
      float: left;
      display: inline-block;
      margin: 2px;
    }
    .loader1 div:nth-child(1) {
      -webkit-animation: loader1 0.75s -0.12s ease infinite;
    }
    .loader1 div:nth-child(2) {
      -webkit-animation: loader1 0.75s -0.24s ease infinite;
    }
    .loader1 div:nth-child(3) {
      -webkit-animation: loader1 0.75s 0s ease infinite;
    }

    @-webkit-keyframes loader31 {
      0% {
        -webkit-transform: scale(1);
        opacity: 0.5;
      }
      50% {
        -webkit-transform: scale(0);
        opacity: 1;
      }
      100% {
        -webkit-transform: scale(1);
        opacity: 0.5;
      }
    }
    .loader2 {
      position: relative;
    }
    .loader2 div {
      width: R(45) !important;
      height: R(45) !important;
      border-radius: 50%;
      position: absolute;
      background: #fff;
      opacity: 0.5;
    }
    .loader2 div:nth-child(1) {
      -webkit-animation: loader31 2s 0s infinite ease-in-out;
    }
    .loader2 div:nth-child(2) {
      -webkit-animation: loader31 2s -1s infinite ease-in-out;
    }
  }


</style>
