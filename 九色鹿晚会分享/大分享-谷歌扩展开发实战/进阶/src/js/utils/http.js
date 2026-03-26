/*****************************************************
 * 基于Axios封装的Http请求类，可支持不同域源的调用
 * eq： this.$http.httpPost()
 ****************************************************/
import { enc, HmacSHA256 } from "crypto-js";
import modal from '@src/js/utils/modal'
import hostConfig from '@src/js/utils/hostConfig'
import md5 from '@src/js/utils/md5'
import {getToken} from '@src/js/utils/fun'


import Axios from "axios";

/**
 * 获取签名串sign
 * @param "path"
 * @param {data}
 * @param "path"
 * @return "sign"
 */
let SecretKey = "piw38kulfozrea7ydmjnvbc965q1gt2x";
let createSign = function (method, URL, param, ClientTimestamp) {
  let StringToSign = method + "\n" + URL + "\n" + ClientTimestamp + "\n" + (param ? JSON.stringify(param) : "");
  console.log(StringToSign);
  let HmacSignature = enc.Base64.stringify(HmacSHA256(StringToSign, SecretKey));
  let Base64URL = function (base64Str) {
    let safeB64 = base64Str.replace(/\+/g, "-");
    safeB64 = safeB64.replace(/\//g, "_");
    let mod4 = safeB64.length % 4;
    let modAddStr = "====";
    safeB64 = safeB64 + modAddStr.substring(0, mod4);
    return safeB64;
  };
  //logZYKJ(HmacSignature, Base64URL(HmacSignature), StringToSign);
  return Base64URL(HmacSignature);
};

/**
 * 全局默认配置
 */
//  Axios.defaults.baseURL = process.env.VUE_APP_SERVER2;
Axios.defaults.timeout = 60000;
Axios.defaults.withCredentials = true;
let transformRequest = (req, headers) => {
  if (headers && headers["Content-Type"] && headers["Content-Type"].indexOf("multipart/form-data") != -1) {
    let formData = new FormData();
    for (let key in req) {
      formData.append(key, req[key]);
    }
    return formData;
  }

  return JSON.stringify(req);
};

let transformResponse = (config) => {
  return function(res){
    if (res && res.length > 0) {
      res = JSON.parse(res);
      // console.log(res,8888);
      let { error_code, message } = res;
      // error_code = 100002001
      if (error_code) {
        let duration = 4500;
        //登录失效
        if (error_code === 20000) {
          duration = 2000;
        }
        modal.msgError(message)
      }
    }
    return res;
  }
};

let request = async (method, url, path, d_p, config) => {
  let data = undefined;
  let params = undefined;
  method = method.toUpperCase();
  let isRemote = path.indexOf("http") > -1 && path.indexOf("http") < 9;
  if (isRemote) {
    url = path;
  } else {
    url = url + (path.indexOf("/") === 0 ? path.substr(1) : path);
  }
  //开发环境启用mock
  let isMock = window.isMock;
  if (typeof config !== "undefined") {
    if (typeof config.isMock !== "undefined") {
      isMock = config.isMock;
      delete config.isMock;
    }
  }
  if (isMock) {
    url = url + (path.indexOf("/") === 0 ? path.substr(1) : path);
    //mock接口要禁用上传进度回调
    if (config && config.onUploadProgress) {
      delete config.onUploadProgress;
    }
  }

  //合并请求
  let token = await getToken();
  let timestamp = new Date().getTime();
  let headers = {
    ts: timestamp,
    sign: createSign(method, url, d_p, timestamp),
    token
  };
  switch (method) {
    case "GET":
      params = d_p || {};
      break;
    default:
    case "POST":
      data = d_p || {};
      headers["Content-Type"] = config && config.contentType ? config.contentType : "application/json";
      break;
  }
  if (url instanceof Array) {
    return Axios.all([]).then(Axios.spread(function () {}));
  } else {
    let resTransformer = transformResponse(config)
    if(config && config.headers){
      headers = {...headers,...config.headers}
      delete config.headers
    }
    return Axios(
      Object.assign(
        {
          baseURL: hostConfig.baseUrl,
          headers,
          method,
          url,
          data,
          params,
          transformRequest,
          transformResponse:resTransformer
        },
        config
      )
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("服务端请求/响应错误：", error, error.config);
        return Promise.reject(error);
      });
  }
};

/**
 * Array/Object原型扩展，根据URL赋值数组
 * @author liubaohuo
 * @param variable <Array/Object> 变量
 * @param path <String> 支持完整URL，默认资源中心地址
 * @param params <Object> 数据参数
 * @param config <Object> 请求配置
 */
let assignByUrl = (variable, path, params, config) => {
  let self = variable;
  //不能直接赋值，因为Vue对组件定义的数组进行观察者模式的封装
  if (self instanceof Array) {
    self.splice(0, self.length);
  } else {
    for (var key in self) {
      delete self[key];
    }
  }
  postWeb(path, params || {}, config).then((res) => {
    let { error_code, data } = res;
    if (!error_code) {
      //不能直接赋值，因为Vue对组件定义的数组进行观察者模式的封装
      let fieldData = data;
      if (config && config.field) {
        fieldData = data[config.field];
        delete config.field;
      }
      if (fieldData instanceof Array) {
        self.push(...fieldData);
      } else {
        for (var key in fieldData) {
          if (vm) {
            vm.$set(variable, key, fieldData[key]);
          } else {
            self[key] = fieldData[key];
          }
        }
      }
    }
  });
};

function encryptStr(str) {
  let sKey = '2EACC318510775E786F9C5DC94B5CC6B'
  let md5Str = md5.hex_md5(`${str}${sKey}`).toUpperCase() + sKey.toUpperCase();
  return md5.hex_md5(md5Str)
}

export default {
  request,
  httpGet: (path, params, config) => request("GET", "/", path, params, config),
  httpPost: (path, body, config) => request("POST", "/", path, body, config),
  httpUpload: (path, body, config) => request("POST", "/upload/", path, body, config),
  httpPatch: (path, body, config) => request("PATCH", "/", path, body, config),
  httpPut: (path, body, config) => request("PUT", "/", path, body, config),
  httpDelete: (path, body, config) => request("DELETE", "/", path, body, config),
  uploadWeb: (path, body = {}, config) => {
    config = Object.assign({}, config, {
      contentType: "multipart/form-data;boundary=------WebKitFormBoundaryJi04kSpfYXB9AWBZ",
    });
    return request("POST", "/", path, body, config);
  },
  encryptStr
};
