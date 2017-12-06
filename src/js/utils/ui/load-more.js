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
    env = options.env || {},
    {page = 1, rows = 10} = options,
    onLoad = (page, row, env) => {

    };


  return {
    onLoad(cb) {
      if (typeof cb === 'function') {
        onLoad = cb;
      }
    },
    reset() {
      page = options.page || 1;
      rows = options.rows || 10;
      env = options.env || {};
    }
  }
}
