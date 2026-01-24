"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
/**
 * Created by Allen Liu on 2024/6/13.
 */
var classDecorator = function classDecorator(f) {
  console.log(f, 111);
};
var attrDecorator = function attrDecorator(obj, key, options) {
  console.log(options);
  var val = obj[key];
  Object.defineProperty(obj, key, {
    set: function set(nv) {
      console.log(222);
      val = nv;
    },
    get: function get() {
      console.log(111);
      return val + '666';
    }
  });
};
var fnDecorator = function fnDecorator(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
  var oldFn = c.value;
  c.value = function () {
    console.log(123);
    oldFn();
  };
};
var paramDecorator = function paramDecorator(target, key, index) {
  console.log(target, key, index, 123);
};

// @classDecorator
var fn = /*#__PURE__*/function (_temp) {
  function fn() {
    (0, _classCallCheck2["default"])(this, fn);
    // @attrDecorator
    (0, _defineProperty2["default"])(this, "myAttr", 1);
  }
  // @fnDecorator
  return _temp = (0, _createClass2["default"])(fn, [{
    key: "say",
    value: function say(a, b) {
      console.log(a, b);
      console.log(456);
    }
  }]), paramDecorator(fn.prototype, "say", 1), _temp;
}();
var f = new fn();
// console.log(f.myAttr);
f.myAttr = 'haha';
console.log(f.myAttr);
// f.say('a','b')
