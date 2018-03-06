<template>
  <div class="side-menu-item"><slot/></div>
</template>

<script>

  export default {
    name: 'route-side-menu',
    computed: {
    },
    data() {
      return {
      }
    },
    components: {
    },
    created(){
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .home-page{
    display: flex;
    height: 100vh;
      .side-menu{
        display: flex;
        flex-direction: column;
        background-color: #314659;
        color: white;
        .side-menu-logo{

        }
        .side-menu-content{
          flex: 1;
          .side-menu-item{
            @extend .side-menu-bottom;
          }
        }

        .side-menu-bottom{
          cursor: pointer;
          width: 100px;
          text-align: center;
          line-height: 3em;
          .iconfont{
            margin-right: 10px;
          }

          &.active{
            background-color: #fff;
            color: #314659;
          }
        }
      }

  }


</style>
