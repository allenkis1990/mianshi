/**
 * Created by Allen Liu on 2024/3/22.
 */
//功能：把函数表达式转换成声明式的函数 function fn(){}    ====>   let fn = function(){} 并且带上函数体里的内容
module.exports = function (babel) {
  const { types: t ,parse,traverse} = babel;
  let visitor = {
    FunctionDeclaration: {
      exit(path) {
        let newParams = path.node.params
        let newBody = path.node.body
        let newFnName = path.node.id.name

        let fnStr = `let ${newFnName} = function(){}`
        let p = parse(fnStr)
        traverse(p, {
          VariableDeclaration(newPath) {
            newPath.node.declarations[0].init.params = newParams
            newPath.node.declarations[0].init.body = newBody
            path.replaceWith(newPath)
          }
        })
      }
    }
  }
  return {
    visitor
  };
}
