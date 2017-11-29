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
              this.$toast("没毛病");
            }).catch((data)=>{
              this.$toastError(data.msg);
            })
          }
        },
        created() {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
