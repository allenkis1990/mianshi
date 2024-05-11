/**
 * Created by Allen Liu on 2024/3/22.
 */
//功能：1. 在代码前面插入 require("haha"); require("hehe"); 2.把function fn2(){} 转成  let fn2 = function(){}
module.exports = function (babel) {
  const { types: t ,parse,traverse} = babel;
  let visitor = {
    Program:{
      exit(path){
        let str = `
        require("haha");
        require("hehe");`
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
    },
    FunctionDeclaration:{
      exit(path){
        if(path.node.id.name === 'fn2'){
          let fn2Str = 'let fn2 = function(){}'
          //先parse生成AST,再traverse来transform处理AST
          let p = parse(fn2Str)
          traverse(p,{
            Program(newPath){
              let fnObj = newPath.node.body[0]
              path.replaceWith(fnObj)
            }
          })
        }
      }
    }
  }
  return {
    visitor
  };
}
