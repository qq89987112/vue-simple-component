
export default {
  install(Vue, options){
    const closePageLoading = ()=>{
        var loading=document.getElementById("page-loading");
        if(!loading){return}
        loading.style.display="none";
    };

    window.addEventListener("load",closePageLoading)

    Vue.prototype.$isPageLoadingShow = ()=>{
      var loading=document.getElementById("page-loading");
      return loading.style.display==="block";
    }

    Vue.prototype.$showPageLoading = ()=>{
      var loading=document.getElementById("page-loading");
      if(loading){
        loading.style.display="block";
        return;
      }
      var html='<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
      var node=document.createElement("div");
      node.innerHTML=html;
      node.setAttribute("id","page-loading");
      node.setAttribute("class","partLoading");
      document.body.appendChild(node);
    }

    Vue.prototype.$closePageLoading = closePageLoading;

    // ajax-loading
    Vue.prototype.$isAjaxLoadingShow = ()=>{
      var loading=document.getElementById("ajax-loading");
      return loading.style.display==="block";
    }

    Vue.prototype.$showAjaxLoading = ()=>{
      var loading=document.getElementById("ajax-loading");
      if(loading){
        loading.style.display="block";
        return;
      }
      var html=`<div class="ajax-loading" id="ajax-loading">
          <div></div>
          <div></div>
          <div></div>
      </div>`;
      var node=document.createElement("div");
      node.innerHTML=html;
      document.body.appendChild(node);
    }

    Vue.prototype.$closeAjaxLoading = ()=>{
      var loading=document.getElementById("ajax-loading");
      if(!loading){return}
      loading.style.display="none";
    };
  }
}
