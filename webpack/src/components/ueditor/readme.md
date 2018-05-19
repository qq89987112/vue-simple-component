
    <script type="text/javascript" src="static/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="static/ueditor/ueditor.all.js"></script>
    <script type="text/javascript" charset="utf-8" src="static/ueditor/lang/zh-cn/zh-cn.js"></script>



# demo

        <ueditor class="ueditor" ref="ueditor" v-model="html" @ready="onUeditorReady"></ueditor>

      onUeditorReady() {
        let ueditor = this.$refs.ueditor;
        let ue = ueditor.ue;
        let ele = this.$refs.tree;
        let body = document.body || document.documentElement;
        this.__resize__ = () => {
          ue.setHeight(ele.offsetHeight - 60);
          ueditor.setWidth(body.offsetWidth-ele.offsetWidth);
        };
        this.__resize__();
        window.addEventListener("resize", this.__resize__)
      },
    },
    created() {
      this.reLoad();
    },
    destroyed() {
      window.removeEventListener("resize", this.__resize__)
    }
