/**
 * Created by Allen Liu on 2024/3/21.
 */
//可视化：https://astexplorer.net/
// let p = require('./src/plugins/p2')
/*module.exports = {
  //presets带参数方式,plugins同理 entry usage 'corejs':3
  // plugins: ['@babel/plugin-transform-arrow-functions'],
  //如果使用@babel/polyfill corejs版本就定死了2
  //targets参数效果和设置"browserslist": ["firefox 58"] 效果一样，targets优先，如果没设置就是引入所有polyfill，如果设置了就是按浏览器版本引入
  //useBuiltIns polyfill相关 默认false
  //entry和usage的区别在于 1. entry需要手动引入import '@babel/polyfill'
  //                      2. entry只根据浏览器版本会把需要的API全部引进来
  //                      3. usage是根据你代码中实际用到的代码按需引入API
  // presets:[['@babel/preset-env',{useBuiltIns:'entry','corejs':2}]],
  presets:[['@babel/preset-env',{useBuiltIns:'usage','corejs':2}]],
  // presets:[['@babel/preset-env',{modules:false}]] //modules默认commonjs规范,false不转换代码规范 amd cmd umd...
  // presets:['@babel/preset-env'],
  // plugins:['@babel/plugin-transform-runtime']
  plugins:[['@babel/plugin-transform-runtime',{corejs:2}]]//不支持实例化的方法，例Array.includes(x) 就不能转化
}*/


module.exports = {
  presets:[['@babel/preset-env',{useBuiltIns:'entry','corejs':2}]],
  targets:["firefox 58"],
  plugins:[]
}



// module.exports = {
  // presets:[['@babel/preset-env',{useBuiltIns:'usage','corejs':2}]],
  // targets:["firefox 58"],
  // plugins:[['@babel/plugin-transform-runtime',{corejs:2}]]
// }


// module.exports = {
//   presets:[['@babel/preset-env',{}]],
//   plugins:[]
// }

//伪代码相关
/*let fn = function(a,b){
  alert(a+b)
}
let arr = [
  {name:'let'},
  {name:'fn'},
  {name:'function'},
  {name:'('},
  {name:'a'},
  {name:'b'},
  {name:'{'},
  {name:'alert'},
  {name:'a'},
  {name:'+'},
  {name:'b'},
  {name:')'},
  {name:'}'}
]

let body = [
  {
    "type": "VariableDeclaration",
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": "fn"
        },
        "init": {
          "type": "FunctionExpression",
          "params": [
            {
              "type": "Identifier",
              "name": "a"
            },
            {
              "type": "Identifier",
              "name": "b"
            }
          ],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "CallExpression",
                  "callee": {
                    "type": "Identifier",
                    "name": "alert"
                  },
                  "arguments": [
                    {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "operator": "+",
                      "right": {
                        "type": "Identifier",
                        "name": "b"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ],
    "kind": "let"
  }
]*/

