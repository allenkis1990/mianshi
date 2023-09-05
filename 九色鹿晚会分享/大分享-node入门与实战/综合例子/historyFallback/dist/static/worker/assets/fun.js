/**
 * Created by Allen Liu on 2023/3/24.
 */

/**
 * 把字符+和/分别变成-和_,把=去掉
 * @author liubaohuo#gmail.com
 * @param base64Str <String>
 * @return <String> 替换后的字符串
 */
function urlsafe_b64encode(base64Str) {
  let safeB64 = base64Str.replace(/\+/g, "-");
  safeB64 = safeB64.replace(/\//g, "_");
  safeB64 = safeB64.replace(/\=/g, "");
  return safeB64;
}


/**
 * 需要加上=把Base64字符串的长度变为4的倍数，就可以正常解码
 * @author liubaohuo#gmail.com
 * @param base64Str <String>
 * @return <String> 替换后的字符串
 */
function urlsafe_b64decode(base64Str) {
  let safeB64 = base64Str.replace(/\-/g, "+");
  safeB64 = safeB64.replace(/\_/g, "/");
  let mod4 = safeB64.length % 4;
  let modAddStr = "====";
  safeB64 = safeB64 + modAddStr.substring(0, mod4);
  return safeB64;
}

/**
 * 生成全局唯一标识
 * @author liubaohuo#gmail.com
 * @return <String>
 */
function GUID() {
  let guid = "";
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    // if((i==8)||(i==12)||(i==16)||(i==20))
    // guid += "-";
  }
  return guid;
}

/**
 * 字典排序
 * @param <Object> dict
 * @return "替换后的字符串"
 */
function sortDict(dict) {
  let sortDic = {};
  let keys = Object.keys(dict);
  let keysLen = keys.length;
  for (let index = 0; index < keysLen; index++) {
    sortDic[keys[index]] = dict[keys[index]];
  }
  // logZYKJ(sortDic);
  return sortDic;
}

self.fun = {
  urlsafe_b64encode,
  urlsafe_b64decode,
  GUID,
  sortDict
}