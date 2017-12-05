<template>
    <div class="list-page">
        <router-link to="panel">面板(可用dialog代替)</router-link>
        <router-link to="dialog">dialog</router-link>
        <router-link to="loading">loading</router-link>
        <router-link to="validator">validator</router-link>
        <router-link to="calendar">calendar</router-link>
        <router-link to="slideDelete">slideDelete</router-link>
    </div>
</template>
<script>
    export default {
        name: 'register-page',
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" >
.list-page{
  a{
    display: block;
  }
}
</style>
