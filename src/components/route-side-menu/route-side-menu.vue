<template>
  <div class="route-side-menu-component">
    <div class="side-menu-logo">
      <slot name="logo"/>
    </div>
    <div class="side-menu-content">
      <slot></slot>
    </div>
    <div class="side-menu-bottom"><slot name="bottom"/></div>
  </div>
</template>

<script>

  export default {
    name: 'route-side-menu',
    computed: {},
    provide() {
      return {
        sideMenu: this
      };
    },
    data() {
      return {
        items:[]
      }
    },
    components: {},
    created() {
    },
    methods: {
      addItem(instance){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .route-side-menu-component {
    display: flex;
    flex-direction: column;
    background-color: #314659;
    color: white;
    .side-menu-logo {

    }
    .side-menu-content {
      flex: 1;
      .side-menu-item {
        @extend .side-menu-bottom;
      }
    }

    .side-menu-bottom {
      cursor: pointer;
      width: 100px;
      text-align: center;
      line-height: 3em;
      .iconfont {
        margin-right: 10px;
      }

      &.active {
        background-color: #fff;
        color: #314659;
      }
    }
  }


</style>
