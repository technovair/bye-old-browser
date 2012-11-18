/* Technova.ir/bye-old-browser */

var isOldBrowser=true;
var userAgent=navigator.userAgent;

if(/^.+ MSIE [5-8]{1}[^\d]+.+$/.test(userAgent)){ // is IE 6,7,8?
}else if(/^.+Firefox\/([1-9]{1}|1[0-4]{1})[^\d]+.*$/.test(userAgent)){ // is Firefox 1-14?
}else if(/^.*Opera[\/| ]([1-9]{1}|10)[^\d]+.*$/.test(userAgent)){ // is Opera 1-10?
}else if(/^.*Chrome\/([1-9]{1}|1[0-7])[^\d]+.*$/.test(userAgent)){ // is Chrome 1-17?
}else if(/^.*Version\/4[^\d]+.*Safari.*$/.test(userAgent)){ // is safari 4?
}else{
  isOldBrowser=false;
}
// show warning to user
