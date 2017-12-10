export default function (apiFunc, rows = 10) {
  // 想要重新加载可以重新调用获取新的$loadNext即可。
  // let
  //   promise = apiFunc(page, rows, params),
  //   isLoaded = false;
  //   promise.$loadNext = function () {
  //       return isLoaded && Promise.reject({msg: "全部加载完成"}) || apiFunc(++page, rows, params).then((data) => {
  //         data = data.data;
  //         if (data && data.length === 0) {
  //           isLoaded = true;
  //           return Promise.reject({msg: "全部加载完成"});
  //         }
  //         return data;
  //       });
  //     };
  //   return promise;

  let
    _page = 1,
    _isLoaded = false,
    _params = undefined;

    return {
      reLoad(params) {
        _page = 1;
        _isLoaded = false;
        _params = params;
        return apiFunc(_page, rows, params);
      },
      loadNext() {
        return _isLoaded && Promise.reject({msg: "全部加载完成"}) ||

                apiFunc(++_page, rows, _params).then((data) => {
                  data = data.data;
                  if (data && data.length === 0) {
                    _isLoaded = true;
                    return Promise.reject({msg: "全部加载完成"});
                  }
                  return data;
              });
      }
    }
}
