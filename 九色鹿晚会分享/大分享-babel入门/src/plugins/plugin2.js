/**
 * Created by Allen Liu on 2024/3/22.
 */
//功能：在代码前面插入 let c = 1+2
module.exports = function (babel) {
  const { types: t ,parse,traverse} = babel;
  let visitor = {
    Program:{
      exit(path){
        let str = `
        let c = 1 + 2`
        //先parse生成AST,再traverse来transform处理AST
        let p = parse(str)
        traverse(p,{
          Program(newPath){
            let arr = newPath.node.body
            arr.forEach((item)=>{
              path.node.body.unshift(item)
            })
          }
        })
      }
    }
  }
  return {
    visitor
  };
}
