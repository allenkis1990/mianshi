/**
 * Created by Allen Liu on 2024/3/22.
 */
//功能：把箭头函数表达式转换成声明式的函数 let fn = ()=>{}    ====>   function fn(){}
module.exports = function (babel) {
  const { types: t ,parse,traverse} = babel;
  let visitor = {
    VariableDeclaration: {
      exit(path,state) {
        state.arr = []
        let ArrowFunctionExpressionArr = path.node.declarations.filter((item)=>{
          return item.init.type === 'ArrowFunctionExpression'
        })
        let OtherExpressionArr = path.node.declarations.filter((item)=>{
          return item.init.type !== 'ArrowFunctionExpression'
        })
        // if (obj.init.type === 'ArrowFunctionExpression')
        ArrowFunctionExpressionArr.forEach((obj,index)=>{
          let newParams = obj.init.params
          let newBody = obj.init.body
          let newFnName = obj.id.name
          //先随机叫一个名字防止冲突，insertAfter后把原来path删了再叫回原来path的名字
          let randomIdName = 'xxx' + new Date().getTime()
          //创建一个函数声明式的AST模板，把需要替换的箭头函数表达式的内容赋给声明式函数
          let fnStr = 'function ' + randomIdName + '(){}'
          let p = parse(fnStr)
          traverse(p, {
            FunctionDeclaration(newPath) {
              newPath.node.params = newParams
              newPath.node.body = newBody
              path.insertBefore(newPath.node)
              state.arr.push({path:newPath,name:newFnName})
              if(index === ArrowFunctionExpressionArr.length - 1){
                // delete path.node.declarations
                if(OtherExpressionArr.length){
                  let newVariableDeclaration = t.variableDeclaration('let', OtherExpressionArr)
                  path.insertAfter(newVariableDeclaration)
                }
                state.arr.forEach((item)=>{
                  item.path.node.id.name = item.name
                })
                path.remove()
              }

            }
          })
        })



      }
    }
  }
  return {
    visitor
  };
}
