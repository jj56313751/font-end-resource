// 获取url参数
export function getUrlStr(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// 只执行一次
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
}
// 禁用滚动条
const ModalHelper = ((bodyCls) => {
  let scrollTop;
  return {
    afterOpen: function () { //禁用滚动
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () { //启用滚动
      document.body.classList.remove(bodyCls); // scrollTop lost after set position:fixed, restore it back. 
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('noscroll');
export {ModalHelper}
// 数字转中文
export function toChinesNum(num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};
// 插入字符 str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
export function insert_flg(str,flg,sn){
  var tmp=str.substr(0, sn);
  var tmpn=str.substr(sn, str.length-sn);
  var newstr= tmp+flg+tmpn
  return newstr
};
// 查找两个固定字符串之间内容，str表示原字符串，flag1，flag2表示返回字符串前后的字符
// 例：str="{Type:'1',Value:''}"，flag1="Type:'"，flag2="'" 返回：1
export function substr_flag(str,flag1,flag2){
  var ix = str.indexOf(flag1)
  var len = flag1.length
  var endflag = str.indexOf(flag2, ix+len)
  if(ix>-1&&endflag>-1){
    var newstr = str.substring(ix+len, endflag)
    return newstr
  }
}
// 获取dom相对于视窗的位置集合
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
};
// 存储静态数据
export function staticData(data){
  return JSON.parse(JSON.stringify(data))
}