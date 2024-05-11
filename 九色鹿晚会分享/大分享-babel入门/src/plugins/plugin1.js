/**
 * Created by Allen Liu on 2024/3/22.
 */

//功能：1.把let全部改成const   2.在代码最前面插入一个let c = 1+2
module.exports = function (babel) {
  const { types: t } = babel;
  let visitor = {
    Program:{
      exit(path){
        let res = t.variableDeclaration('let',[
          t.variableDeclarator(
              t.identifier('c'),
              t.binaryExpression('+',t.numericLiteral(1),t.numericLiteral(2))
          )
        ])
        path.node.body.unshift(res)
      }
    },
    VariableDeclaration(path) {
      let node = path.node
      node.kind = 'const'
    }
  }
  return {
    visitor
  };
}
