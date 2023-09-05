/**
 * Created by Allen Liu on 2021/1/23.
 */

function appChildIntoFragment(node){
  var fragment = document.createDocumentFragment(),
      firstChild;
  while(firstChild=node.firstChild){
    fragment.appendChild(firstChild)
  }
  return fragment;
}

let fragmentObj = {}
let currentRoute = ''
let loadObj = {}

window.routers.forEach((router)=>{
  let routerName = router.name
  let el = router.el
  let views = router.views
  let controller = router.controller
  fragmentObj[routerName] = null
  loadObj[routerName] = false

  Q.reg(routerName, function () {
    if (!loadObj[routerName]) {
      $.ajax({
        url: views,
        method: 'get',
        success(data) {
          let dom = $(data)
          $('#app').append(dom)
          let script = document.createElement('script')
          script.src = controller
          document.body.appendChild(script)
          loadObj[routerName] = true
        }
      })
    }else{
      $('#app').get(0).appendChild(fragmentObj[routerName])
    }
  });


})

Q.init({
  key: '', /* url里#和url名之间的分割符号 默认为感叹号 */
  pop(curRoute) {
    console.log('路由进入成功', arguments)
    if(curRoute === '' || curRoute === 'V'){
      return
    }
    fragmentObj[currentRoute] = appChildIntoFragment(document.getElementById('app'))
    currentRoute = curRoute
  }
//    index: 'a1' /* 首页地址 不可访问路径也会跳回此地址 */
});
