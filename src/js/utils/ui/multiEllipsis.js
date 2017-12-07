// 需要有一个max-height属性
export default function (element,ellipsisClass='ellipsis') {
  if(element.scrollHeight > element.offsetHeight){
    element.classList.add(ellipsisClass);
  }else{
    element.classList.remove(ellipsisClass);
  }
}
