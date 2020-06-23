
/**
 * @description 根据时间戳/Date实例转换成格化字符串
 * @param date 代表时间的Unix时间戳，时间对象或字符串形式的Unix时间戳
 * @param format 格式化形式参考 http://momentjs.cn/docs/ 年份、月份、日期的令牌 eg. YYYY-MM-DD HH:mm:ss
 * @param UTC https://baike.baidu.com/item/%E6%97%B6%E5%8C%BA/491122?fr=aladdin 24时区
 */
const formatDate = (date: any, format: string, UTC?: number) => {
  let result = '';
  let tempDate = null;

  if (typeof Date === 'object') {
    tempDate = date;
  } else {
    tempDate = new Date(date);
  }

  if (UTC) {
    tempDate.setUTCDate(UTC);
  }

  if (/(Y+)/.test(format)) {
    result = format.replace(RegExp.$1, tempDate.getFullYear());
  }

  const month = tempDate.getMonth() + 1;
  const day = tempDate.getDate();
  const hours = tempDate.getHours();
  const minutes = tempDate.getMinutes();
  const seconds = tempDate.getSeconds();

  const tokens = {
    'M+': `${month < 10 ? `0${month}` : month}`,
    'D+': `${day < 10 ? `0${day}` : day}`,
    'H+': `${hours < 10 ? `0${hours}` : hours}`,
    'm+': `${minutes < 10 ? `0${minutes}` : minutes}`,
    's+': `${seconds < 10 ? `0${seconds}` : seconds}`,
  };

  interface IToken {
    [key: string]: any
  }

  Object.keys(tokens).forEach((key) => {
    if (new RegExp(`(${key})`).test(format)) {
      result = result.replace(RegExp.$1, (<IToken>tokens)[key]);
    }
  });

  return result;
};

/**
 *
 * @description object 转数组
 * @todo 可能不需要设置为 formdata, 只需要设置contentType即可
 * @param {object} obj - 原始对象
 * @returns {object} formdata
 */
const objectToFormData = (obj: any) => {
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
  formatDate,
  objectToFormData,
};
