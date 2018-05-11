<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import panel from "./components/panel.vue"

export default {
  name: 'app',
  components: {
    panel
  },
  data(){
    return {
      togglePanelResult:''
    }
  },
  methods:{
    onToggleClick(){
      this.$refs.panel.showPanelForResult().then((data)=>{
        this.togglePanelResult = data;
      });
    }
  },
  created(){

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
#app {
  text-align: center;
}
</style>
