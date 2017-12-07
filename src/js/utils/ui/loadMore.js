// loadMore(body).
// onLoad((page,row,env)=>{
//   if (!env.loadedComp && this.cur === 'completed') {
//     return true;
//   } else if (!env.loadedUnComp && this.cur === 'uncompleted') {
//     return true;
//   }
// }).reset();

export default function (element, options) {
  let
    //为了不把一些杂七杂八的变量放在vue文件中
    env = options.env || {},
    //默认已经读取了首屏,从第二页开始
    {page = 2, rows = 10} = options,
    onLoad = (page, row, env) => {
    };
    //不需要,在onLoad里自己根据env变量判断。
    // willLoad = (page,row,env)=>{};

    element.addEventListener("scroll",function (e) {
      let srcElement = e.srcElement;
      if(srcElement.scrollHeight === srcElement.scrollTop + srcElement.offsetHeight){
        onLoad(page++,rows,env);
      }
    });

  return {
    onLoad(cb) {
      if (typeof cb === 'function') {
        onLoad = cb;
      }
      return this;
    },
    reset() {
      page = options.page || 2;
      rows = options.rows || 10;
      env = options.env || {};
      return this;
    }
  }
}
