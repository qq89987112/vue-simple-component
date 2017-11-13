<template>
  <div id="app">
   <h1>简单组件</h1>
    <h2>toggle-panel <span class="button toggle" @click="onToggleClick">toggle</span></h2>
    <p>结果：{{togglePanelResult}}</p>
    <panel ref="panel"></panel>
  </div>
</template>

<script>
import panel from "../components/panel.vue"

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

</style>
