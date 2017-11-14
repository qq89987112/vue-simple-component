<template>
    <div>
      <input type="text" v-model="phone">
      <input type="text" v-model="password">
      <button @click="register">注册</button>
    </div>
</template>
<script>
    import regExp from "../components/plugins/validator/regExp"
    import axios from "axios"
    export default {
        name: 'register-page',
        data() {
            return {
              phone:'',
              password:''
            }
        },
        methods: {
          register(){
            this.$validate({
              [`${regExp.phoneReg}|phone`]:'手机格式错误',
              [`${regExp.password}|password`]:'密码格式错误'
            }).then(()=>{
              console.log("没毛病");
              return axios.get("/v2/loc/list");
            }).then((data)=>{
              console.log(data);
            }).catch((data)=>{
              console.log(data.msg);
            })
          }
        },
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
