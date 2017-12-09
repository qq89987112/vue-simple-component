export default function (apiFunc, page, rows, params) {
  let
    promise = apiFunc(page, rows, params),
    isLoaded = false;
    promise.$loadNext = function () {
        return isLoaded && Promise.reject({msg: "全部加载完成"}) || apiFunc(++page, rows, params).then((data) => {
          if (data.data.length === 0) {
            isLoaded = true;
          }
          return data;
        });
      };
    return promise;
}
