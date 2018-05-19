<template>
  <div class="side-menu-item" :class="[active&&'active']" @click="onItemClick" ><slot/></div>
</template>

<script>

  export default {
    name: 'route-side-menu-item',
    props:["path"],
    computed: {
    },
    data() {
      return {
        active:false
      }
    },
    components: {
    },
    created(){
      this.active = this.$router.currentRoute.fullPath === this.path;
      let func = this.routeHook = (to, form)=>{
        this.active = to.fullPath === this.path;
      };
      this.$router.afterHooks.push(func)
    },
    beforeDestroy(){
      let afterHooks = this.$router.afterHooks;
      afterHooks.splice(afterHooks.indexOf(this.routeHook),1)
    },
    methods: {
      onItemClick(){
        let path = this.path;
        path&&this.$router.push(path);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .side-menu-item {
    cursor: pointer;
    width: 100px;
    text-align: center;
    line-height: 3em;
    color: rgba(255, 255, 255, 0.65);
    .iconfont {
      margin-right: 10px;
    }

    &.active {
      background-color: #1890ff;
      color: white;
    }
  }
</style>
