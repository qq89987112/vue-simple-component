<style lang="scss" scoped>

</style>

<template>
  <el-autocomplete :trigger-on-focus="false" size="mini" v-model="realInputValue" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
</template>

<script>
  export default {
    props:['value','onRequest'],
    data(){
      let value = this.value||{};
      return {
        realInputValue:value.value
      }
    },
    methods:{
      querySearchAsync(queryString, cb){
        // 数据格式 ,带value的数组
        // [{ "value": "浏阳蒸菜", "address": "天山西路430号" }]
        return this.onRequest(queryString).then(cb)
      },
      handleSelect(item){
          this.$emit('input',item);
      }
    }
  }
</script>

