//http://www.cnblogs.com/axes/p/4603984.html
// 4MB(3.96) -> 40(36) KB 证件照,有些失真但依然可以被接受。
// 大部分都会变为40KB左右,原图50KB也是变为40kb
function compress(img) {
  let
    width = img.width,
    height = img.height,
    ratio,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }

  canvas.width = width;
  canvas.height = height;
  //铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    let
      tCanvas = document.createElement('canvas'),
      tctx = tCanvas.getContext('2d'),
      nw = ~~(width / count),
      nh = ~~(height / count);
    //计算每块瓦片的宽和高
    tCanvas.width = nw;
    tCanvas.height = nh;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //进行最小压缩
  return canvas.toDataURL('image/jpeg', 0.1);
}

export default function (file) {
  return new Promise((resolve, reject) => {
    if (!/\/(?:jpeg|png|gif)/i.test(file.type)) reject("格式不正确");
    let
      reader = new FileReader();

    reader.onload = function () {
      let
        result = this.result,
        img = new Image();
        img.onload = function () {
          resolve(compress(img))
        };

       img.src = result;
    };
    reader.readAsDataURL(file);
  })

}
