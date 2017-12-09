// 想要重新加载可以重新调用获取新的$loadNext即可。
export default function (apiFunc, page, rows, params) {
  let
    promise = apiFunc(page, rows, params),
    isLoaded = false;
    promise.$loadNext = function () {
        return isLoaded && Promise.reject({msg: "全部加载完成"}) || apiFunc(++page, rows, params).then((data) => {
          data = data.data;
          if (data && data.length === 0) {
            isLoaded = true;
            return Promise.reject({msg: "全部加载完成"});
          }
          return data;
        });
      };
    return promise;
}
