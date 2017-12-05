# simple components

# 一些技巧
## 移动端empty界面
    使用 empty选择器做页面无数据时展示的内容(before的背景图以及 content文字)

## 汉字字体
    使用 font-spider 做汉字字体

## 触底加载
    scrollHeight === scrollTop + offsetHeight 做触底加载

## 多行省略
    scrollHeight>offsetHeight + css max-height 做多行省略

## empty选择器 做空界面

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
