/**
 * Created by Allen Liu on 2024/3/22.
 */

module.exports = function (babel) {
  // let {parse,transform,traverse,types} = require('@babel/core')
  const { types } = babel;
  return {
    visitor:{
      Program:{
        enter(path,state){
          //enter的时候改变a的值
          state.a = 1
        },
        exit(path,state){
          //exit的时候输出a的值
          console.log(state.a,'exit的时候输出a的值');
        }
      },
      VariableDeclaration(path){
        console.log(path,'匹配到的AST节点');
        console.log('匹配到变量声明');
      },
      FunctionDeclaration(path){
        console.log('匹配到函数声明')
      }
    }
  };
}
