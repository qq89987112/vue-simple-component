
    <script type="text/javascript" src="static/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="static/ueditor/ueditor.all.js"></script>
    <script type="text/javascript" charset="utf-8" src="static/ueditor/lang/zh-cn/zh-cn.js"></script>



# demo

        <ueditor class="ueditor" ref="ueditor" v-model="html" @ready="onUeditorReady"></ueditor>


      onUeditorReady(){
        let ue = this.$refs.ueditor.ue;
        let ele = this.$refs.tree;
        this.__resize__ =  () =>{
          // let body = document.body || document.documentElement;
          ue.setHeight(ele.offsetHeight-60)
        };
        this.__resize__();
        window.addEventListener("resize",this.__resize__)
      },
    },
    created() {
      this.reLoad();
    },
    destroyed(){
      window.removeEventListener("resize",this.__resize__)
    }
