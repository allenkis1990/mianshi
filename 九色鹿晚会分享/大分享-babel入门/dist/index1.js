"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
require("core-js/modules/es7.array.includes.js");
require("core-js/modules/es6.array.reduce.js");
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));
var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));
/**
 * Created by Allen Liu on 2024/3/21.
 */
//安装这三个包 @babel/cli @babel/core @babel/preset-env
//npx babel src/index1.js -o dist/index1.js
//presets是插件的集合
//npx babel src/index1.js -o dist/index1.js --plugins=@babel/plugin-transform-arrow-functions
//npx babel src/index1.js -o dist/index1.js --presets=@babel/preset-env
//babel配置有很多种方式可以是.babelrc文件 可以是.babelrc.js 可以是babel.config.js 也可以加在package.json里的babel属性
// import '@babel/polyfill'

// let a = require('../data/data1')
// console.log(a());

// import a from './data/data2'
// console.log(a);

var fn = function fn() {
  console.log(666);
};
var fn2 = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var f, a;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          f = function _f() {
            return new _promise["default"](function (resolve, reject) {
              setTimeout(function () {
                resolve(666);
              }, 3000);
            });
          };
          _context.next = 3;
          return f();
        case 3:
          a = _context.sent;
          console.log(a);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fn2() {
    return _ref.apply(this, arguments);
  };
}();
fn2();
var arr = [1, 2, 3];
//includes举例firefox 58  entry 和 usage区别
console.log(arr.includes(1), 'includes');
var num = arr.reduce(function (pre, next) {
  return pre + next;
});
console.log(num);
