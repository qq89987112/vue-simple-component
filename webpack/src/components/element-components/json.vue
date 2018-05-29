<style lang="scss" scoped>

</style>
<template>
    <el-tree :data='treeData'>

    </el-tree>
</template>
<script>
export default {
    props:['value'],
    data(){
        return {
            treeData:[]
        }
    },
    watch:{
        value(value){
            let obj = value || {};

            function conver(obj){
                return Object.entries(obj).map(i=>{
                    let [key,value] = i,isObject = typeof value === 'object';
                    if(isObject){
                        value = conver(value||{});
                    }
                    return {
                        label:isObject?key:`${key}:${value}`,
                        children:isObject?value:[]
                    }
                })
            }

            this.treeData = conver(obj);
        }
    }
}
</script>


