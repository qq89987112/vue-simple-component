import detector from "detector"

const handle = function () {
  let activeElement = document.activeElement;
  activeElement.scrollIntoView();
  activeElement.scrollIntoViewIfNeeded();
}
export const autoScorllIntoView  = {
  register(){
    window.addEventListener('resize',handle)
  },
  destory(){
    window.removeEventListener('resize',handle)
  }
}

//解决IOS下需要点击两次
export const clickFileInput  = (element)=>{
  if(detector.os.name==='ios'){
    element.click();
    element.click();
  }else{
    element.click();
  }
}
