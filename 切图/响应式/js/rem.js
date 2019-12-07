

//响应式实现思路
// 媒体查询定义container的宽度
// 如果设备宽度大于等于900全部都按html fontsize 100px来算rem
// 如果设备小于900就按(winWidth / designWidth) * baseNum + 'px'来换算
// 高度可以用rem  宽度尽量用百分比  太小的单位可以直接用px如边框
// 最后再用媒体查询修修补补
let designWidth = 900;
let baseNum = 100;
function setRootFontSize() {
    let winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let html = document.getElementsByTagName('html')[0];
    //本项目大于等于900都按900来算
    if(winWidth>=900){
        winWidth = 900
    }
    html.style.fontSize = (winWidth / designWidth) * baseNum + 'px';
    console.log(html.style.fontSize);
}
setRootFontSize();

window.addEventListener('resize',(e)=>{
    setRootFontSize();
})