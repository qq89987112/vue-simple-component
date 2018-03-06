<template>
  <div class="route-side-menu-component">
    <div class="side-menu-logo">
      <slot name="logo"/>
    </div>
    <div class="side-menu-content">
      <slot></slot>
    </div>
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
<style lang="scss" rel="stylesheet/scss" scoped>
  .route-side-menu-component {
    display: flex;
    flex-direction: column;
    background-color: #314659;
    color: white;
    .side-menu-logo {

    }
    .side-menu-content {
      flex: 1;
    }
  }
</style>
