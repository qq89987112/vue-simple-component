<template>
    <div>
      <button @click="open">打开</button>
      <button @click="openPanel">打开面板</button>
      <m-dialog ref="dialog">
        <template slot-scope="props">
          <button @click="next">下一步</button>
          <div v-if="props.flag==='first'">
            第一步
          </div>
          <div v-else-if="props.flag==='second'">
            <input type="text" v-model="props.title">
            您输入的内容为:{{props.title}}
            <button @click="dialog.$emit('result',props.title)">确定</button>
          </div>
          <div v-else-if="props.flag==='panel'">
            <div @click="dialog.$emit('result',1)">1</div>
            <div @click="dialog.$emit('result',2)">2</div>
            <div @click="dialog.$emit('result',3)">3</div>
          </div>
        </template>
      </m-dialog>
    </div>
</template>
<script>
    import MDialog from "../components/dialog/dialog.vue";

    export default {
      components: {MDialog},
      name: 'register-page',
        data() {
            return {}
        },
        methods: {
          openPanel(){
            this.dialog.setFlag('panel');
            this.dialog.setType('full-screen');
            this.dialog.showDialogForResult().then((data)=>{
              this.$toastError(`获取到的panel内容为${data}。`);
            });
          },
          open(){
            this.dialog.setFlag('first');
            this.dialog.showDialogForResult().then((data)=>{
              this.$toast(`获取到的内容为${data},它无响应式但能获取到值!`);
            });
          },
          next(){
            this.dialog.setFlag('second');
          }
        },
        mounted() {
          this.dialog = this.$refs.dialog;
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
