/**
 * @module utils/object
 * @author caoshitong@moretickets.com
 * @description JS对象操作
 */


/**
 * @description 根据传入对象的路径取值
 * @param {object} 传入对象 eg. {a:{b:{c:{d:111}}}}
 * @param {string} 属性path  eg. a.b.c.d
 * @returns { * } 跟据路径获取到的 value
 */
const get = (object, propertyPath) => {
  let srcObj = object;
  const paths = propertyPath.split('.');

  for (let index = 0; index < paths.length; index += 1) {
    const key = paths[index];
    if (srcObj[key]) {
      srcObj = srcObj[key];
    } else {
      return undefined;
    }
  }
  return srcObj;
};

/**
 * @description 对象深拷贝
 * @param {object} object - 被拷贝的对象
 * @return {object} 新对象
 */
const deepClone = (object) => {
  const obj = object;
  let targetObj = {};
  // 递归出口
  // if (typeof obj !== 'object' || obj == null) {
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }

  if (obj instanceof Array) {
    targetObj = [];
  }

  Object.keys(obj).forEach((key) => {
    targetObj[key] = deepClone(obj[key]);
  });

  return targetObj;
};

/**
 *
 * @description object 转数组
 * @todo 可能不需要设置为 formdata, 只需要设置contentType即可
 * @param {object} obj - 原始对象
 * @returns {object} formdata
 */
const objectToFormData = (obj) => {
  const formData = new FormData();
  // 递归出口
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    formData.append(key, objectToFormData(obj[key]));
  });

  return formData;
};

export default {
  get,
  deepClone,
  objectToFormData,
};
