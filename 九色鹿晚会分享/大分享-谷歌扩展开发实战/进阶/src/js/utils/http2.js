/**
 * @file http2.js
 * @description 基于 Fetch API 封装的 HTTP 请求工具类，支持跨域请求、自动签名、Token 认证等功能
 * @author Allen Liu
 * @date 2026-03-26
 * 
 * @example
 * // GET 请求
 * this.$http.httpGet('/api/user/list', { page: 1, size: 10 })
 * 
 * @example
 * // POST 请求
 * this.$http.httpPost('/api/user/create', { name: '张三', age: 25 })
 * 
 * @example
 * // 文件上传
 * this.$http.uploadWeb('/api/file/upload', { file: fileObj })
 */

import { enc, HmacSHA256 } from "crypto-js";
import modal from '@src/js/utils/modal'
import hostConfig from '@src/js/utils/hostConfig'
import md5 from '@src/js/utils/md5'
import { getToken } from '@src/js/utils/fun'

/**
 * API 签名密钥（用于生成请求签名，保证请求安全性）
 * @constant {string} SecretKey
 */
let SecretKey = "piw38kulfozrea7ydmjnvbc965q1gt2x";

/**
 * 创建请求签名
 * @function createSign
 * @param {string} method - HTTP 请求方法（GET/POST/PUT/DELETE 等）
 * @param {string} URL - 完整的请求 URL
 * @param {Object} param - 请求参数对象
 * @param {number} ClientTimestamp - 客户端时间戳（毫秒）
 * @returns {string} Base64 URL 安全的签名字符串
 * 
 * @description
 * 签名生成流程：
 * 1. 拼接签名字符串：method + \n + URL + \n + timestamp + \n + 参数 JSON
 * 2. 使用 HMAC-SHA256 算法生成签名
 * 3. 将签名转为 Base64 URL Safe 格式（+ 替换为 -，/ 替换为 _）
 */
let createSign = function (method, URL, param, ClientTimestamp) {
  // 构造待签名字符串
  let url = URL.replace(hostConfig.baseUrl,'')
  let StringToSign = method + "\n" + url + "\n" + ClientTimestamp + "\n" + (param ? JSON.stringify(param) : "");
  console.log(StringToSign,'StringToSign');
  
  // 使用 HMAC-SHA256 计算签名
  let HmacSignature = enc.Base64.stringify(HmacSHA256(StringToSign, SecretKey));
  
  /**
   * 将标准 Base64 转换为 URL Safe Base64
   * @function Base64URL
   * @param {string} base64Str - 标准 Base64 字符串
   * @returns {string} URL Safe 的 Base64 字符串
   */
  let Base64URL = function (base64Str) {
    // 替换 + 为 -
    let safeB64 = base64Str.replace(/\+/g, "-");
    // 替换 / 为 _
    safeB64 = safeB64.replace(/\//g, "_");
    
    // 补齐 = 号（Base64 长度必须是 4 的倍数）
    let mod4 = safeB64.length % 4;
    let modAddStr = "====";
    safeB64 = safeB64 + modAddStr.substring(0, mod4);
    return safeB64;
  };
  
  // 返回 URL Safe 的签名
  return Base64URL(HmacSignature);
};

/**
 * 请求超时控制
 * @function fetchWithTimeout
 * @param {string} url - 请求 URL
 * @param {Object} options - Fetch 配置选项
 * @param {number} timeout - 超时时间（毫秒）
 * @returns {Promise<Response>} Fetch 响应对象
 */
let fetchWithTimeout = async (url, options, timeout = 60000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: 'include'  // 允许携带 Cookie 凭证
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`请求超时：${timeout}ms`);
    }
    throw error;
  }
};

/**
 * 处理响应数据
 * @function handleResponse
 * @param {Response} response - Fetch 响应对象
 * @returns {Promise<any>} 解析后的响应数据
 */
let handleResponse = async (response) => {
  const res = await response.json();
  
  // 如果存在错误码，显示错误消息
  if (res && res.error_code) {
    let { error_code, message } = res;
    let duration = 4500;  // 默认显示 4.5 秒
    
    // 错误码 20000：登录失效，缩短提示时间
    if (error_code === 20000) {
      duration = 2000;
    }
    
    modal.msgError(message)
  }
  
  return res;
};

/**
 * 核心请求方法
 * @function request
 * @async
 * @param {string} method - HTTP 方法（GET/POST/PATCH/PUT/DELETE）
 * @param {string} url - 请求路径
 * @param {string} path - 完整路径或远程 URL
 * @param {Object} d_p - 请求数据（data 或 params）
 * @param {Object} config - Fetch 额外配置
 * @returns {Promise<Object>} 响应数据
 * 
 * @description
 * 请求处理流程：
 * 1. 判断是否为远程 URL 或本地路径
 * 2. 检查是否启用 Mock 模式
 * 3. 获取 Token 并生成签名
 * 4. 发送请求并处理响应
 */
let request = async (method, url, path, d_p, config) => {
  let data = undefined;
  let params = undefined;
  
  // 统一转为大写
  method = method.toUpperCase();
  
  // 判断是否为远程 URL（以 http://或 https://开头）
  let isRemote = path.indexOf("http") > -1 && path.indexOf("http") < 9;
  if (isRemote) {
    url = path;  // 直接使用完整 URL
  } else {
    url = `${hostConfig.baseUrl}${path}`;  // 拼接基础 URL
  }

  // 开发环境启用 Mock 模式
  let isMock = window.isMock;
  if (typeof config !== "undefined") {
    if (typeof config.isMock !== "undefined") {
      isMock = config.isMock;
      delete config.isMock;
    }
  }
  
  if (isMock) {
    url = hostConfig.baseUrl + (path.indexOf("/") === 0 ? path.substr(1) : path);
    // Mock 接口要禁用上传进度回调（避免报错）
    if (config && config.onUploadProgress) {
      delete config.onUploadProgress;
    }
  }

  // 获取 Token 并生成请求头
  let token = await getToken();
  let timestamp = new Date().getTime();
  let headers = {
    ts: timestamp,           // 时间戳
    sign: createSign(method, url, d_p, timestamp),  // 签名
    token                    // 用户 Token
  };
  
  // 根据请求方法设置参数位置
  switch (method) {
    case "GET":
      params = d_p || {};
      break;
    default:
    case "POST":
      data = d_p || {};
      // 设置 Content-Type（优先使用配置的，否则默认为 application/json）
      headers["Content-Type"] = config && config.contentType ? config.contentType : "application/json";
      break;
  }
  
  // 如果是数组（批量请求），暂不支持
  if (url instanceof Array) {
    return Promise.resolve([]);
  } else {
    // 合并自定义请求头
    if(config && config.headers){
      headers = {...headers,...config.headers}
      delete config.headers
    }
    
    // 构建 Fetch 配置
    let fetchOptions = {
      method,
      headers
    };
    
    // 处理请求体
    if (method !== 'GET' && method !== 'HEAD') {
      // 检查是否为 multipart/form-data
      let contentType = headers["Content-Type"] || "application/json";
      if (contentType.indexOf("multipart/form-data") != -1) {
        // FormData 不需要手动转换
        fetchOptions.body = data;
      } else {
        // JSON 数据需要字符串化
        fetchOptions.body = JSON.stringify(data);
      }
    }
    
    // 处理 URL 参数（GET 请求）
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
    
    // 发送请求
    return fetchWithTimeout(url, fetchOptions, 60000)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return handleResponse(response);
      })
      .catch((error) => {
        console.error("服务端请求/响应错误：", error);
        return Promise.reject(error);
      });
  }
};

/**
 * 加密字符串（双重 MD5 加密）
 * @function encryptStr
 * @param {string} str - 待加密的字符串
 * @returns {string} 32 位 MD5 密文（小写）
 * 
 * @description
 * 加密流程：
 * 1. 将原始字符串与盐值拼接
 * 2. 第一次 MD5 加密并转大写
 * 3. 拼接盐值后再次 MD5 加密
 */
function encryptStr(str) {
  let sKey = '2EACC318510775E786F9C5DC94B5CC6B'  // 加密盐值
  // 第一次 MD5：str + sKey，结果转大写后再拼接 sKey
  let md5Str = md5.hex_md5(`${str}${sKey}`).toUpperCase() + sKey.toUpperCase();
  // 第二次 MD5
  return md5.hex_md5(md5Str)
}

/**
 * @namespace http
 * @description HTTP 请求工具导出对象，提供多种便捷的请求方法
 */
export default {
  request,  // 核心请求方法
  
  /**
   * GET 请求
   * @function httpGet
   * @memberof http
   * @param {string} path - 请求路径
   * @param {Object} [params] - 查询参数
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  httpGet: (path, params, config) => request("GET", "/", path, params, config),
  
  /**
   * POST 请求
   * @function httpPost
   * @memberof http
   * @param {string} path - 请求路径
   * @param {Object} [body] - 请求体数据
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  httpPost: (path, body, config) => request("POST", "/", path, body, config),
  
  /**
   * 文件上传请求
   * @function httpUpload
   * @memberof http
   * @param {string} path - 上传路径
   * @param {Object} [body] - 上传数据
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  httpUpload: (path, body, config) => request("POST", "/upload/", path, body, config),
  
  /**
   * PATCH 请求（部分更新）
   * @function httpPatch
   * @memberof http
   * @param {string} path - 请求路径
   * @param {Object} [body] - 请求体数据
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  httpPatch: (path, body, config) => request("PATCH", "/", path, body, config),
  
  /**
   * PUT 请求（完整更新）
   * @function httpPut
   * @memberof http
   * @param {string} path - 请求路径
   * @param {Object} [body] - 请求体数据
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  httpPut: (path, body, config) => request("PUT", "/", path, body, config),
  
  /**
   * DELETE 请求
   * @function httpDelete
   * @memberof http
   * @param {string} path - 请求路径
   * @param {Object} [body] - 请求体数据
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  httpDelete: (path, body, config) => request("DELETE", "/", path, body, config),
  
  /**
   * 文件上传专用方法（使用 multipart/form-data）
   * @function uploadWeb
   * @memberof http
   * @param {string} path - 上传路径
   * @param {Object} [body={}] - 上传数据
   * @param {Object} [config] - 额外配置
   * @returns {Promise} 响应数据
   */
  uploadWeb: (path, body = {}, config) => {
    config = Object.assign({}, config, {
      contentType: "multipart/form-data;boundary=--------WebKitFormBoundaryJi04kSpfYXB9AWBZ",
    });
    return request("POST", "/", path, body, config);
  },
  
  encryptStr  // 加密工具函数
};
