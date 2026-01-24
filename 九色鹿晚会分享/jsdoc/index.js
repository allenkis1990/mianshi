//生成文档命令：jsdoc ./xxx.js -d ./xxx/xxx

/**
 * 传入a,b计算a+b的和
 * @param {number} a - 传入数字
 * @param {number} b - 传入数字
 * @returns {number}
 */
function count(a,b){
  return a+b
}

/**
 * 随便写一个练习
 * @class
 */
class HAHA{
  /**
   * 接收一下name和age
   * @constructor
   * @param {String} name - 传入的姓名
   * @param {Number|String} age - 传入的年龄
   */
  constructor(name,age) {
    this.name = name
    this.age = age
  }

  /**
   * console输出name和age
   * @param {String} name - 传入的姓名
   * @param {Number} age - 传入的年龄
   */
  say(name,age){
    console.log(name, age);
  }
}


/**
 * 工具模块
 * @namespace
 */
const utils = {
  /**
   * 打印fuck xxx!
   * @param {string} a - 传入的任意字符串
   * @returns {string}
   */
  fuck(a){
    return `fuck ${a}!`
  },
  /**
   * 打印shit xxx!
   * @param {string} a - 传入的任意字符串
   * @returns {string}
   */
  shit(a){
    return `shit ${a}!`
  },
  /**
   *
   * @param {Object} a - 传入的任意字符串
   * @param {Object} b - 传入的任意字符串
   * @returns {array}
   */
  getList(a,b){
    return [a,b]
  }
}