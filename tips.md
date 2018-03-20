# simple components

# 一些技巧
## 路由、emit 传参如果时对象,尽量内容越少越好，不然会卡！
## 如果对v-model的对象里头已经存在的字段进行更改,组件不需要$emit('input')即可做到数据响应。

## 移动端empty界面
    使用 empty选择器做页面无数据时展示的内容(before的背景图以及 content文字)

## 汉字字体
    使用 font-spider 做汉字字体

## 触底加载
    scrollHeight === scrollTop + offsetHeight 做触底加载

## 多行省略
    scrollHeight>offsetHeight + css max-height 做多行省略

## empty选择器 做空界面
### empty选择器 + v-if 做loading

## 如果img非透明图或无透明部分，则可以使用 background+loading gif 来做。


## div模拟textarea文本域及高度自适应


## 自定义滚动条
    *::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    *::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 16px #645654;
    }


## 常用色
  side-menu 背景色
    #3f3f3f
  蓝色
    #20a0ff
  字体色
    #333 #666 #b9b9b9 #aaa
  橙红色
    #EE5544
  border
    #eee
  Element的颜色规范


## cubic-bezier 从无到有


## 多页加载
    API 调用后返回loadNext函数,这个函数维护相关参数。

    purchaseList(mobilePhone,page,rows){
      let axiosPromise = axios.post(`/weChat/onlineService/${mobilePhone}/purchaseList?page=${page}&rows=${rows}`),
          isLoaded = false;
      axiosPromise.$loadNext = ()=>{
        debugger;
        return isLoaded&&Promise.reject({msg:"全部加载完成"})||this.purchaseList(mobilePhone,page++,rows).then((data)=>{
          if(data.data.length===0){
            isLoaded = true;
            return Promise.reject({msg: "全部加载完成"});
          }
          return data;
        });
      };
      return axiosPromise;
    }

    methods中写两个函数

      fetchList(){
        return shop.purchaseList(membership.mobilePhone, 1, rows);
      },
      loadNext() {
        this.purchaseList.$loadNext().then((data)=>{
          this.productList.concat(data.data);
        }).catch((data)=>{
          this.$toast(data.msg);
        })
      },


    先要重新加载就重新调用fetchList获取新的$loadNext即可。


# 遇到的奇怪bug
    /*莫名用不了*/
    .service-item {
        &.flow{
          background-image: url("../assets/images/score@2x.png");
        }

        &.address{
          background-image: url("../assets/images/address@2x.png");
        }

        &.buy-record{
          background-image: url("../assets/images/buy-record@2x.png");
        }

        &.service-record{
          background-image: url("../assets/images/service@2x.png");
        }
    }

    并非用不了,而是类与类之间的空格是tab符号,不是空格符
