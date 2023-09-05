/*****************************************************
 * 基于Axios封装的Http请求类，可支持不同域源的调用
 ****************************************************/
importScripts(
    `${workerUrlBase}/static/worker/assets/md5.js`,
    `${workerUrlBase}/static/worker/assets/crypto-js.js`,
    `${workerUrlBase}/static/worker/assets/axios.min.js`,
    `${workerUrlBase}/static/worker/assets/fun.js`
);
var cryptoJS = CryptoJS
var Axios = axios
/**
 * 获取url的query
 * @param /
 * @param /
 * @return "获取url的query"
 */
function getLocationQuery(){
  let query = {}
  let search = location.search
  search = search.replace('?','')
  let arr = search.split('&')
  arr.forEach((item)=>{
    let subArr = item.split('=')
    query[subArr[0]] = subArr[1]
  })
  return query
}
var locationQuery = getLocationQuery()


/**
 * 数据加密
 * @param {data}
 * @param "ekey"
 * @return "MD5加密后的字符串"
 */
function encrypt(data, ekey) {
    data = cryptoJS.enc.Utf8.parse(data);
    let md5Key = md5(ekey);
    let key = cryptoJS.enc.Latin1.parse(md5Key.substring(0, 16));
    let iv = cryptoJS.enc.Latin1.parse(md5Key.substring(16, 32));
    let encrypted = cryptoJS.AES.encrypt(data, key, { iv: iv, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.ZeroPadding });
    return fun.urlsafe_b64encode(encrypted.toString());
}

function encryptDataFn(path, data, expand, token) {
    let aes = ''
    let md5str = ''
    let num = ''
    if(locationQuery.isBusinessSystem){
      aes = "2B17F843AF8CF2CC16AD0C9C64D33A40";
      md5str = "1AD2160931EC009908981C32FA066AEE"
      num = '2555633'
    }else{
      aes = 'AA22BF8D8F2B72DF529C9CB678EB0CCC';
      md5str = "716186C3471A38A2828DA07D366EC4F2";
      num = '5873575'
    }
    if(data.media_type){
      aes = '0A118590CB7417DF8DF477829AF0A2FC';
      md5str = "642611B85608E365C310803DE5F65F8C";
    }
    let staffId =  0;
    let verison = 10000
    let encryptData = {};
    let ts = (new Date()).getTime().toString().substr(0, 10);
    let guid = fun.GUID();

    encryptData["function"] = path;
    encryptData["unique_data"] = `${staffId}|${verison}|${ts}|education_platform_web_${token}|${num}|${guid}`;
    encryptData["api_version"] = verison;
    encryptData["token"] = token;
    encryptData["input_data"] = fun.sortDict(data);
    let encryptDataJson = JSON.stringify(encryptData);
    let encryptDataStr = encrypt(encryptDataJson, aes);
    let expandData = expand != null ? expand : {};
    let expandDataJson = JSON.stringify(expandData)
    let signStr = md5(encryptDataStr + "&" + expandDataJson + "&" + md5str);
    signStr =
      signStr.substring(0, 10) +
      guid.substring(0, 5) +
      signStr.substring(10, 20) +
      guid.substring(5, 10) +
      signStr.substring(20, 30) +
      guid.substring(10, 15) +
      signStr.substring(30, 32);

    let formData = new FormData();
    formData.append("encrypt", encryptDataStr)
    formData.append("expand", expandDataJson)
    formData.append("sign", signStr)
    if(data.file) {
      formData.append("file",data.file);
    }

    return formData;
}

function encryptDataNew(path, data, expand, token) {
  let aes = ''
  let md5str = ''
  let num = ''
  if(locationQuery.isBusinessSystem){
    aes = "2B17F843AF8CF2CC16AD0C9C64D33A40";
    md5str = "1AD2160931EC009908981C32FA066AEE"
    num = '2555633'
  }else{
    aes = 'AA22BF8D8F2B72DF529C9CB678EB0CCC';
    md5str = "716186C3471A38A2828DA07D366EC4F2";
    num = '5873575'
  }
  if(data.media_type){
    aes = '0A118590CB7417DF8DF477829AF0A2FC';
    md5str = "642611B85608E365C310803DE5F65F8C";
  }
  let staffId =  0;
  let verison = 10000
  let encryptData = {};
  let ts = (new Date()).getTime().toString().substr(0, 10);
  let guid = fun.GUID();

  encryptData["function"] = path;
  encryptData["unique_data"] = `${staffId}|${verison}|${ts}|education_platform_web_${token}|${num}|${guid}`;
  encryptData["api_version"] = verison;
  encryptData["token"] = token;
  encryptData["input_data"] = fun.sortDict(data);

  let encryptDataJson = JSON.stringify(encryptData);
  let encryptDataStr = encrypt(encryptDataJson, aes);
  let expandData = expand != null ? expand : {};
  let expandDataJson = JSON.stringify(expandData)
  let signStr = md5(encryptDataStr + "&" + expandDataJson + "&" + md5str);
  signStr =
      signStr.substring(0, 10) +
      guid.substring(0, 5) +
      signStr.substring(10, 20) +
      guid.substring(5, 10) +
      signStr.substring(20, 30) +
      guid.substring(10, 15) +
      signStr.substring(30, 32);

  let formData = new FormData();
  formData.append("encrypt", encryptDataStr)
  formData.append("expand", expandDataJson)
  formData.append("sign", signStr)
  if(data.file) {
    formData.append("file",data.file);
  }
  console.log("API请求参数:", encryptData);
  return formData;
}


/**
 * 数据解密
 * @param "word"
 * @param "ekey"
 * @return "MD5解密后的字符串"
 */
function decrypt(word, ekey) {
    word = fun.urlsafe_b64decode(word);
    let md5Key = md5(ekey);
    let key = cryptoJS.enc.Latin1.parse(md5Key.substring(0, 16));
    let iv = cryptoJS.enc.Latin1.parse(md5Key.substring(16, 32));
    let decrypted = cryptoJS.AES.decrypt(word, key, { iv: iv, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.ZeroPadding });
    return cryptoJS.enc.Utf8.stringify(decrypted).toString();
}


let { enc, HmacSHA256 } = cryptoJS
let SecretKey = "piw38kulfozrea7ydmjnvbc965q1gt2x";
let createSign = function(method, URL, param, ClientTimestamp,urlBase) {
  if(param!=undefined&&typeof (param["password"]) !== 'undefined'){
    param["password"] = md5.hex_md5(md5.hex_md5(param["password"] + 'FE605C9343A3A47764598FDC184EC66F').toUpperCase() + 'FE605C9343A3A47764598FDC184EC66F').toUpperCase();
  }
  let nullObjStr = method === 'get' ? "":"{}"

  let copyParams = param ? JSON.parse(JSON.stringify(param)): undefined
  if(copyParams && typeof(copyParams["isNew"]) !== 'undefined'){
    delete copyParams['isNew']
  }
  let med = method.toUpperCase()
  let StringToSign =
      med +
      "\n" +
      urlBase + URL +
      "\n" +
      ClientTimestamp +
      "\n" +
      (copyParams ? JSON.stringify(copyParams) : nullObjStr);
  let HmacSignature = enc.Base64.stringify(HmacSHA256(StringToSign, SecretKey));
  let Base64URL = function(base64Str) {
    let safeB64 = base64Str.replace(/\+/g, "-");
    safeB64 = safeB64.replace(/\//g, "_");
    let mod4 = safeB64.length % 4;
    let modAddStr = "====";
    safeB64 = safeB64 + modAddStr.substring(0, mod4);
    return safeB64;
  };
  //console.log(HmacSignature, Base64URL(HmacSignature), StringToSign);
  return Base64URL(HmacSignature);
};

let getParam = function (name, url = self.href) {
  // console.log(url,69);
  var params = url.replace(/^.*\?|#.*$/g, "");
  var obj = {};
  var _params = params.split("&");
  for (var i = 0; i < _params.length; i++) {
    var pair = decodeURIComponent(_params[i]);
    var m = pair.match(/^(.*?)(?:=(.*))?$/);
    var key = m[1];
    var value = m[2];
    if (typeof value === "undefined") {
      return;
    }
    if (obj.hasOwnProperty(key)) {
      var v = obj[key];
      if (Array.isArray(v)) {
        v.push(value);
      } else {
        obj[key] = [v, value];
      }
    } else {
      obj[key] = value;
    }
  }
  return obj[name];
}


/**
 * 全局默认配置
 */
Axios.defaults.baseURL = pathApi;
Axios.defaults.timeout = 600000;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.headers.post['token'] = self.token || '';
Axios.defaults.headers.get['token'] = self.token || '';
Axios.defaults.headers.delete['token'] = self.token || '';

// Axios.defaults.headers.get['Content-Type'] = 'application/json';
let transformRequest = (req, headers) => {
    if(typeof(req["function"]) !== 'undefined'){
        let path = req["function"];
        delete req["function"];
        console.log(req, headers);
        let token = self.token || "";
        req = encryptDataFn(path, req, {}, token);
    }
    if(typeof(req["isNew"]) !== 'undefined'){
      headers.post['Content-Type'] = 'application/json'
      delete req['isNew']
      req = JSON.stringify(req)
    }
    return req;
};

let transformResponse = (res) => {
    res = JSON.parse(res);
    let { error_code, message } = res;
    if(error_code){
        let duration = 4500;
        //登录失效
        if(error_code === 20000){

        }
    }
    return res;
};

let request = (method, url, path, d_p, config,isNew) => {
    let urlBase = url;
    let data = undefined;
    let params = undefined;
    method = method.toLowerCase();
    if (method === 'get') {
        data = d_p || {};
        params = d_p || {};
    }else if(method === 'post'){
        data = d_p || {};
    }else{
      //delete
      data = d_p || {};
      params = d_p || {};
    }
    if(isNew){
      url = url + '/' + path
    }
    //开发环境启用mock
    let isMock = false;
    if(typeof(config) !== 'undefined'){
        if(typeof(config.isMock) !== 'undefined'){
            isMock = config.isMock;
            delete config.isMock;
        }
    }
    if(isMock){
        url = url + (path.indexOf('/') === 0 ? path.substr(1) : path);
    }else{

        if(isNew){
          data["isNew"] = true;
        }else{
          data["function"] = path;
        }
    }


    // 签名规则url前必须含有斜杆
    let signPath = path
    if (path[0] !== '/') {
      signPath = '/' + path
    }
    let timestamp = new Date().getTime();
    let headers = {
      ts: timestamp,
      sign: createSign(method, signPath, d_p, timestamp,urlBase),
      token: self.token || "",
    };

    //合并请求
    if(url instanceof Array){
        return Axios.all([

        ]).then(Axios.spread(function () {
            
        }));
    }else{

        let mergeObj = {
          method,
          url,
          data,
          params,
          transformRequest,
          transformResponse,
        }
        if(isNew){
          mergeObj.headers = headers
        }
        return Axios(Object.assign(mergeObj, config)).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log('服务端请求/响应错误：', error, error.config);
            return Promise.reject(error);
        })
    }
}

/**
 * Array/Object原型扩展，根据URL赋值数组
 * @author liubaohuo
 * @param variable <Array/Object> 变量
 * @param path <String> 支持完整URL，默认资源中心地址
 * @param params <Object> 数据参数
 * @param config <Object> 请求配置
 */
let assignByUrl = (variable, path, params, config) => {
  let _this = variable;
  //不能直接赋值，因为Vue对组件定义的数组进行观察者模式的封装
  if (_this instanceof Array) {
    _this.splice(0, _this.length);
  } else {
    for (var key in _this) {
      delete _this[key];
    }
  }
  postWeb(path, (params || {}), config).then((res) => {
    let { error_code, data } = res;
    if (!error_code) {
      //不能直接赋值，因为Vue对组件定义的数组进行观察者模式的封装
      let fieldData = data;
      if (config && config.field) {
        fieldData = data[config.field];
        delete config.field;
      }
      if (fieldData instanceof Array) {
        _this.push(...fieldData);
      } else {
        for (var key in fieldData) {
          _this[key] = fieldData[key];
        }
      }
    }
  })
};
let appBase = locationQuery.isBusinessSystem ? '/educationetweb' : '/studentweb'
let appBaseNew = locationQuery.isBusinessSystem ? '/education' : '/student-web'
self.httpPost = (path, body, config) => request('POST', appBase, path, body, config);
self.httpPostNew = (path, body, config,isNew=true) => request('POST', appBaseNew, path, body, config,isNew);
self.httpGetNew = (path, body, config,isNew=true) => request('GET', appBaseNew, path, body, config,isNew);
self.httpDeleteNew = (path, body, config,isNew=true) => request('DELETE', appBaseNew, path, body, config,isNew);
self.uploadWeb = (path, body = {}, config) => {
  config = Object.assign({}, config, {
    contentType:
      "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
  });
  return request("POST", "/upload", path, body, config);
};
