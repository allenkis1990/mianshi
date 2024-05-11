/**
 * Created by Allen Liu on 2024/3/22.
 */

//功能：1.把let全部改成const   2.变量名字前加一个new  3.在代码最前面插入一个let d = 1+2  4.把需要运算的都进行运算
module.exports = function (babel) {
  const { types: t } = babel;
  let visitor = {
    Program:{
      exit(path){
        let res = t.variableDeclaration('let',[
          t.variableDeclarator(
              t.identifier('d'),
              t.binaryExpression('+',t.numericLiteral(1),t.numericLiteral(2))
          )
        ])
        path.node.body.unshift(res)
      }
    },
    VariableDeclaration(path) {
      let node = path.node
      node.kind = 'const'
    },
    Identifier(path) {
      let node = path.node
      node.name = 'new' + node.name

    },
    BinaryExpression(path){
      let left = path.node.left
      let right = path.node.right
      // console.log(path.key,123);
      if(t.isNumericLiteral(left) && t.isNumericLiteral(right)){
        let num = left.value + right.value
        let numNode = t.numericLiteral(num)
        path.replaceWith(numNode)
      }
      // console.log(path.parentPath.node,123);
      //left和right都是number类型说明是最后一层,如果parent还是BinaryExpression就递归
      if(path.parentPath.type === 'BinaryExpression'){
        visitor.BinaryExpression(path.parentPath)
      }
    }
  }
  return {
    visitor
  };
}
