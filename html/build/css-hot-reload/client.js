
module.exports = function initHot() {
    var ws = new WebSocket("ws://localhost:8181");
    let link = document.head.querySelector("[id='css']");

    ws.onmessage = function (message) {
        // 这个方法报错 Refused to apply style from 'http://localhost:8088/css/index.css?v=18' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
        // 因为请求的时候文件还没有生成?
        let href = link.href;
        let result = /\?v=(\d+)/.exec(href);
        if (result) {
            let matchText = result[0];
            result = +result[1];
            result +=1;
            link.href = href.replace(matchText,`?v=${result}`)
        }else{
            link.href = `${href}?v=1`
        }
    }
}


