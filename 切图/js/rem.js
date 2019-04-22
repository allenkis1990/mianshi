let designWidth = 750;
let baseNum = 100;
function setRootFontSize() {
    let winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let html = document.getElementsByTagName('html')[0];
    html.style.fontSize = winWidth / designWidth * baseNum + 'px';
    console.log(html.style.fontSize);
}
setRootFontSize();

window.addEventListener('resize',(e)=>{
    setRootFontSize();
})