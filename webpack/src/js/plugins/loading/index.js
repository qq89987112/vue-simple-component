
export default {
  install(Vue, options){
    const closeLoading = ()=>{
        var loading=document.getElementById("loading");
        if(!loading){return}
        loading.style.display="none";
    };

    window.addEventListener("load",closeLoading)

    Vue.prototype.$showLoading = ()=>{
      var loading=document.getElementById("loading");
      if(loading){
        loading.style.display="block";
        return;
      }
      var html='<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
      var node=document.createElement("div");
      node.innerHTML=html;
      node.setAttribute("id","loading");
      node.setAttribute("class","partLoading");
      document.body.appendChild(node);
    }

    Vue.prototype.$closeLoading = closeLoading;
  }
}
