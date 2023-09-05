/**
 * Created by Allen Liu on 2023/6/14.
 */
var formdata = require('formidable');
module.exports = {
  onData(req,cb) {
    var form = new formdata.IncomingForm();
    var obj = {
      files:{},
      data:{}
    }
    form.on('field', function (name, value) {
      obj.data[name] = value;//这里提取的是键值对数据
    }).on('file', function (name, file) {
      obj.files[name] = file;//这里提取上传的文件
    }).on('end', function () {
      cb(obj)
    });
    form.parse(req);
  },
  dateToStr(date) {
    var year = date.getFullYear();//年
    var month = date.getMonth();//月
    var day = date.getDate();//日
    var hours = date.getHours();//时
    var min = date.getMinutes();//分
    var second = date.getSeconds();//秒
    return year + "-" +
        ((month + 1) > 9 ? (month + 1) : "0" + (month + 1)) + "-" +
        (day > 9 ? day : ("0" + day)) + '~' + `${hours>9?hours:("0" + hours)}-${min>9?min:("0" + min)}-${second>9?second:("0" + second)}`;
  }
}