<template>
    <toggle-panel>
      <div @click="$emit('result','result')">
        test
      </div>
    </toggle-panel>
</template>
<script>
    import togglePanel from "./wrapper/toggle-panel.vue"
    export default {
        name: 'panel',
        data() {
            return {}
        },
        components:{
          togglePanel
        },
        methods: {},
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
