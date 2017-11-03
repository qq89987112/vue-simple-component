import wrapper from "./dialogWrapper"

export default {
  install(Vue){
    Vue.prototype.$showImage = function (url) {
      if(!this.__has_image__){
        let imageWrapper = new Vue(wrapper).$mount();
        this.__has_image__ = true;
        this.__imageWrapper__ = imageWrapper;
        this.$el.appendChild(imageWrapper.$el);
      }
      let dialog = this.__imageWrapper__.$refs.dialog;
      dialog.show(url);
    }
  }
}
